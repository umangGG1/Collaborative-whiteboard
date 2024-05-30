import React from 'react';

interface BrushSizePickerProps {
  setStrokeWidth: (size: number) => void;
}

const BrushSizePicker: React.FC<BrushSizePickerProps> = ({ setStrokeWidth }) => {
  return (
    <div className="brush-size-picker">
      <button onClick={() => setStrokeWidth(5)} style={{border:'0px', borderRadius: "4px", color: "white", backgroundColor:"black", margin:"10px" }}>Small</button>
      <button onClick={() => setStrokeWidth(10)} style={{border:'0px', borderRadius: "4px", color: "white", backgroundColor:"black", margin:"10px" }}>Medium</button>
      <button onClick={() => setStrokeWidth(15)} style={{border:'0px', borderRadius: "4px", color: "white", backgroundColor:"black", margin:"10px" }}>Large</button>
    </div>
  );
};

export default BrushSizePicker;
