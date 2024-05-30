import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3001');
socket.on('connect', () => {
  console.log("Connected to server");
});

const CreateJoinWhiteboard: React.FC<{ setWhiteboardId: (id: string) => void, setUserName: (name: string) => void }> = ({ setWhiteboardId, setUserName }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [key, setKey] = useState('');

  const handleCreate = () => {
    console.log("Create button clicked");
    socket.emit('createWhiteboard', (whiteboardId: string) => {
      console.log("Whiteboard created with ID:", whiteboardId);
      setWhiteboardId(whiteboardId);
      setUserName(name);
      localStorage.setItem('userName', name); 
      navigate(`/whiteboard/${whiteboardId}`);
    });
  };

  const handleJoin = () => {
    socket.emit('joinWhiteboard', { whiteboardId: key, userName: name }, (response: any) => {
      if (response.status === 'ok') {
        console.log("Joined whiteboard:", key);
        setWhiteboardId(key);
        setUserName(name);
        localStorage.setItem('userName', name); 
        navigate(`/whiteboard/${key}`);
      } else {
        console.error("Failed to join whiteboard:", response.message);
        alert(response.message);
      }
    });
  };

  return (
    <div className="create-join-container">
      <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleCreate}>Create New Whiteboard</button>
      <input type="text" placeholder="Whiteboard Key" value={key} onChange={(e) => setKey(e.target.value)} />
      <button onClick={handleJoin}>Join Whiteboard</button>
    </div>
  );
};

export default CreateJoinWhiteboard;
