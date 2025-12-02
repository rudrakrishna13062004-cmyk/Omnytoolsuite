import React, { useState } from 'react';
import { Download, Link } from 'lucide-react';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(250);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading QR Code', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter text or URL"
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">Size: {size}px</label>
             <input
              type="range"
              min="100"
              max="500"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
             />
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Download size={18} /> Download PNG
          </button>
        </div>

        <div className="flex justify-center bg-slate-50 p-6 rounded-xl border border-slate-100">
           {text ? (
             <img src={qrUrl} alt="QR Code" className="mix-blend-multiply" style={{ width: 200, height: 200 }} />
           ) : (
             <div className="w-[200px] h-[200px] flex items-center justify-center text-slate-300 text-sm">
               Enter text to generate
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;