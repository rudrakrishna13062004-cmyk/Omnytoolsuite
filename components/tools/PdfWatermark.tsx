import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import { Upload, Stamp, Download } from 'lucide-react';

const PdfWatermark: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('CONFIDENTIAL');
  const [color, setColor] = useState('#ff0000');
  const [opacity, setOpacity] = useState(0.3);
  const [size, setSize] = useState(50);
  const [processing, setProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 };
  };

  const process = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const rgbColor = hexToRgb(color);

      pages.forEach(page => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - (size * text.length) / 4, // Rough centering
          y: height / 2,
          size: size,
          font: helveticaFont,
          color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
          rotate: degrees(45),
          opacity: opacity,
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `watermarked-${file.name}`;
      link.click();
    } catch (e) {
      alert('Error adding watermark.');
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        {!file ? (
          <div className="text-center">
             <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stamp size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Watermark PDF</h3>
             <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="wm-upload" />
             <label htmlFor="wm-upload" className="inline-block mt-4 px-6 py-3 bg-orange-600 text-white rounded-xl font-medium cursor-pointer hover:bg-orange-700">
                Upload PDF
             </label>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex-1 font-medium text-slate-700 truncate">{file.name}</div>
                <button onClick={() => setFile(null)} className="text-sm text-red-500 hover:underline">Change</button>
             </div>

             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Watermark Text</label>
                <input value={text} onChange={e => setText(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500" />
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
                  <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-10 cursor-pointer rounded-lg border border-slate-300 p-1" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Opacity: {Math.round(opacity * 100)}%</label>
                  <input type="range" min="0.1" max="1" step="0.1" value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg accent-orange-600" />
               </div>
             </div>

             <button 
               onClick={process}
               disabled={processing || !text}
               className="w-full py-3 bg-orange-600 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2"
             >
               {processing ? 'Processing...' : <><Download size={20} /> Download PDF</>}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfWatermark;