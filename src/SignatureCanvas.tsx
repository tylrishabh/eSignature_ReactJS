// src/SignatureCanvas.tsx
import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { saveAs } from 'file-saver';

const SignatureCanvasComponent: React.FC = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [textColor, setTextColor] = useState<string>('#000000');
  const [fontSize, setFontSize] = useState<number>(16);
  const [bgColor, setBgColor] = useState<string>('#ffffff');

  const clear = () => sigCanvas.current?.clear();

  const download = () => {
    if (sigCanvas.current) {
      const canvas = sigCanvas.current.getCanvas();
      const dataURL = canvas.toDataURL('image/png');

      // Convert data URL to a Blob
      const blob = dataURLToBlob(dataURL);

      // Save the Blob as a PNG file
      saveAs(blob, 'signature.png');
    }
  };

  const dataURLToBlob = (dataURL: string) => {
    const [header, data] = dataURL.split(',');
    const mime = header.match(/:(.*?);/)?.[1];
    const binary = atob(data);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime || 'application/octet-stream' });
  };

  useEffect(() => {
    const canvas = sigCanvas.current?.getCanvas();
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = bgColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [bgColor]);

  return (  
    <div className="signature-container">
      <div className="controls">
        <label>
          Text Color:
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </label>
        <label>
          Font Size:
          <input
            type="number"
            value={fontSize}
            min="1"
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
        </label>
        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
      </div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor={textColor}
        canvasProps={{ width: 1000, height: 300, className: 'signature-canvas' }}
      />
      <div className="button-container">
        <button onClick={clear}>Clear</button>
        <button onClick={download}>Download Signature</button>
      </div>
    </div>
  );
};

export default SignatureCanvasComponent;
