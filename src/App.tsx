// src/App.tsx
import React from 'react';
import SignatureCanvasComponent from './SignatureCanvas';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sign and Download</h1>
      <SignatureCanvasComponent />
    </div>
  );
};

export default App;
