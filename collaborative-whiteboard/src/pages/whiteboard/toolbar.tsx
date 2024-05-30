import React from 'react';
import ColorPicker from './ColorPicker';
import BrushSizePicker from './BrushSizePicker';

interface ToolbarProps {
  setColor: (color: string) => void;
  setStrokeWidth: (size: number) => void;
  exportAsImage: () => void;
  exportAsPDF: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ setColor, setStrokeWidth, exportAsImage, exportAsPDF }) => {
  return (
    <div className="toolbar">
      <ColorPicker setColor={setColor} />
      <BrushSizePicker setStrokeWidth={setStrokeWidth} />
      <button onClick={exportAsImage}>Export as Image</button>
      <button onClick={exportAsPDF}>Export as PDF</button>
    </div>
  );
};

export default Toolbar;

