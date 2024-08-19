import React from 'react';
import { saveAs } from 'file-saver';

const DownloadSignature: React.FC<{ signatureDataURL: string }> = ({ signatureDataURL }) => {
  const downloadSignature = () => {
    if (signatureDataURL) {
      const blob = dataURLToBlob(signatureDataURL);
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

  return <button onClick={downloadSignature}>Download Signature</button>;
};

export default DownloadSignature;
