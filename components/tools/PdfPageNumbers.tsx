import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Upload, Hash, Download } from 'lucide-react';

const PdfPageNumbers: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const process = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const total = pages.length;

      pages.forEach((page, idx) => {
        const { width } = page.getSize();
        const text = `${idx + 1} / ${total}`;
        const fontSize = 10;
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        
        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: 20,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `numbered-${file.name}`;
      link.click();
    } catch (e) {
      alert('Error adding page numbers.');
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        {!file ? (
          <div className="text-center">
             <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hash size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Add Page Numbers</h3>
             <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="num-upload" />
             <label htmlFor="num-upload" className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium cursor-pointer hover:bg-indigo-700">
                Upload PDF
             </label>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex-1 font-medium text-slate-700 truncate">{file.name}</div>
                <button onClick={() => setFile(null)} className="text-sm text-red-500 hover:underline">Change</button>
             </div>
             
             <div className="text-sm text-slate-500 text-center">
               Page numbers (e.g., "1 / 5") will be added to the bottom center of each page.
             </div>

             <button 
               onClick={process}
               disabled={processing}
               className="w-full py-3 bg-indigo-600 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2"
             >
               {processing ? 'Processing...' : <><Download size={20} /> Add Numbers & Download</>}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfPageNumbers;