import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Circle, Group, Text } from 'react-konva';
import { io } from 'socket.io-client';
import Toolbar from './toolbar';
import jsPDF from 'jspdf';
import './style.css'; // Ensure to import the styles

const socket = io('http://localhost:3001');

interface LineType {
  tool: string;
  points: number[];
  color: string;
  strokeWidth: number;
  whiteboardId: string;
}

const Whiteboard: React.FC<{ whiteboardId: string, userName: string }> = ({ whiteboardId, userName }) => {
  const [lines, setLines] = useState<LineType[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [users, setUsers] = useState<string[]>([]);
  const [cursors, setCursors] = useState<{ [userId: string]: { x: number; y: number } }>({});
  const [whiteboardUsers, setWhiteboardUsers] = useState<{ [userId: string]: string }>({});
  const stageRef = useRef<any>(null);

  useEffect(() => {
    socket.emit('joinWhiteboard', { whiteboardId, userName });

    socket.on('drawing', (data: LineType) => {
      setLines(prevLines => [...prevLines, data]);
    });

    socket.on('updateUsers', (userList: string[]) => {
      setUsers(userList);
    });

    socket.on('updateCursors', (cursorData: { [userId: string]: { x: number; y: number } }) => {
      setCursors(cursorData);
    });

    socket.on('initialLines', (initialLines: LineType[]) => {
      setLines(initialLines);
    });

    return () => {
      socket.off('drawing');
      socket.off('updateUsers');
      socket.off('updateCursors');
      socket.off('initialLines');
    };
  }, [whiteboardId, userName]);

  const handleMouseDown = () => {
    setIsDrawing(true);
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    setLines([...lines, { tool: 'pen', points: [pos.x, pos.y], color, strokeWidth, whiteboardId }]);
  };

  const handleMouseMove = () => {
    if (isDrawing) {
      const stage = stageRef.current;
      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      setLines([...lines.slice(0, -1), lastLine]);
      socket.emit('drawing', lastLine);
    } else {
      const stage = stageRef.current;
      const point = stage.getPointerPosition();
      socket.emit('cursorMove', { x: point.x, y: point.y, whiteboardId });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const exportAsImage = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsPDF = () => {
    const uri = stageRef.current.toDataURL();
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(uri);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(uri, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('whiteboard.pdf');
  };

  return (
    <div className="whiteboard-container">
      <Toolbar setColor={setColor} setStrokeWidth={setStrokeWidth} exportAsImage={exportAsImage} exportAsPDF={exportAsPDF} />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 50} // Adjust height for toolbar
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}
          {Object.keys(cursors).map((userId, index) => (
            <Group key={userId} x={cursors[userId].x} y={cursors[userId].y}>
              <Circle radius={5} fill="red" />
              <Text text={whiteboardUsers[userId]} fontSize={12} fill="white" />
            </Group>
          ))}
        </Layer>
      </Stage>
      <div className="users-list">
        <h4>Whiteboard ID: {whiteboardId}</h4>
        <h4>Users:</h4>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Whiteboard;
