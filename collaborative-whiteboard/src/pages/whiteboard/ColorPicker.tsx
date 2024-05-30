import React from 'react';

interface ColorPickerProps {
  setColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ setColor }) => {
  return (
    <div className="color-picker" >
      <button onClick={() => setColor('#000000')} style={{ backgroundColor: '#000000', width:"20px", height:"20px" }}></button>
      <button onClick={() => setColor('#ff0000')} style={{ backgroundColor: '#ff0000', width:"20px", height:"20px"  }}></button>
      <button onClick={() => setColor('#00ff00')} style={{ backgroundColor: '#00ff00', width:"20px", height:"20px"  }}></button>
      <button onClick={() => setColor('#0000ff')} style={{ backgroundColor: '#0000ff', width:"20px", height:"20px"  }}></button>
      {/* We can add more colors */}
    </div>
  );
};

export default ColorPicker;
