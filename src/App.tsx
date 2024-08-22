import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Tooltip from '@mui/material/Tooltip';
import jsPDF from 'jspdf';
import './App.css';

function App() {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [textColor, setTextColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [fontSize, setFontSize] = useState<number>(16);

  const clear = () => sigCanvas.current?.clear();

  const downloadPDF = () => {
    if (sigCanvas.current) {
      const imgData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('signature.pdf');
    }
  };

  return (
    <div className="App card-background-colour">
      <h2>Sign and Download</h2>
      <div className="signature-container" style={{ backgroundColor: bgColor }}>
        <div className="controls">
          <label>
            Text Color:
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
          </label>
          <label>
            Font Size:
            <input
              type="number"
              value={fontSize}
              min="1"
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              style={{ fontSize: `${fontSize}px` }}
            />
          </label>
          <label>
            Background Color:
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </label>
        </div>
        <SignatureCanvas
          ref={sigCanvas}
          penColor={textColor}
          canvasProps={{
            width: 1000,
            height: 300,
            className: 'signature-canvas',
            style: { fontSize: `${fontSize}px`, backgroundColor: bgColor }
          }}
        />
        <div className="button-container">
          <Tooltip title="Clear the signature" arrow>
            <button onClick={clear}>Clear</button>
          </Tooltip>
          <Tooltip title="Download the signature as PDF" arrow>
            <button onClick={downloadPDF}>Download as PDF</button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default App;
