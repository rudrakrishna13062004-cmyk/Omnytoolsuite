import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import { Upload, RotateCw, Download } from 'lucide-react';

const PdfRotator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(90);
  const [processing, setProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const process = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const pages = pdfDoc.getPages();
      
      pages.forEach(page => {
        const current = page.getRotation().angle;
        page.setRotation(degrees(current + rotation));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `rotated-${file.name}`;
      link.click();
    } catch (e) {
      alert('Error processing PDF.');
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        {!file ? (
          <div className="text-center">
             <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Select PDF to Rotate</h3>
             <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="rot-upload" />
             <label htmlFor="rot-upload" className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium cursor-pointer hover:bg-blue-700">
                Choose PDF
             </label>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex-1 font-medium text-slate-700 truncate">{file.name}</div>
                <button onClick={() => setFile(null)} className="text-sm text-red-500 hover:underline">Change</button>
             </div>

             <div className="grid grid-cols-3 gap-4">
               {[90, 180, 270].map(deg => (
                 <button 
                   key={deg}
                   onClick={() => setRotation(deg)}
                   className={`p-4 rounded-xl border-2 font-bold flex flex-col items-center gap-2 transition-all ${
                     rotation === deg 
                     ? 'border-blue-600 bg-blue-50 text-blue-700' 
                     : 'border-slate-200 hover:border-blue-300 text-slate-600'
                   }`}
                 >
                   <RotateCw size={24} className={rotation === deg ? 'text-blue-600' : 'text-slate-400'} />
                   {deg}°
                 </button>
               ))}
             </div>

             <button 
               onClick={process}
               disabled={processing}
               className="w-full py-3 bg-blue-600 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2"
             >
               {processing ? 'Rotating...' : <><Download size={20} /> Download Rotated PDF</>}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfRotator;