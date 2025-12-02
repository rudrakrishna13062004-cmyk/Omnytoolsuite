import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileMinus, Trash2 } from 'lucide-react';

const PdfDeletePages: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageInput, setPageInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      try {
          const buffer = await f.arrayBuffer();
          const doc = await PDFDocument.load(buffer);
          setPageCount(doc.getPageCount());
      } catch (e) {
          console.error(e);
      }
    }
  };

  const process = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      
      // Parse input (e.g., "1, 3-5")
      const pagesToDelete = new Set<number>();
      const parts = pageInput.split(',').map(p => p.trim());
      
      parts.forEach(part => {
          if (part.includes('-')) {
              const [start, end] = part.split('-').map(n => parseInt(n));
              if (!isNaN(start) && !isNaN(end)) {
                  for (let i = start; i <= end; i++) pagesToDelete.add(i - 1); // 0-indexed
              }
          } else {
              const num = parseInt(part);
              if (!isNaN(num)) pagesToDelete.add(num - 1);
          }
      });

      // Sort descending to delete without shifting indices issues
      const sortedIndices = Array.from(pagesToDelete).sort((a, b) => b - a);
      
      sortedIndices.forEach(idx => {
          if (idx >= 0 && idx < pdfDoc.getPageCount()) {
              pdfDoc.removePage(idx);
          }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `modified-${file.name}`;
      link.click();
    } catch (e) {
      alert('Error processing pages.');
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        {!file ? (
          <div className="text-center">
             <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileMinus size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Delete PDF Pages</h3>
             <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="del-upload" />
             <label htmlFor="del-upload" className="inline-block mt-4 px-6 py-3 bg-red-600 text-white rounded-xl font-medium cursor-pointer hover:bg-red-700">
                Upload PDF
             </label>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex-1 font-medium text-slate-700 truncate">{file.name}</div>
                <div className="text-xs font-bold bg-slate-200 px-2 py-1 rounded text-slate-600">{pageCount} Pages</div>
                <button onClick={() => setFile(null)} className="text-sm text-red-500 hover:underline">Change</button>
             </div>

             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pages to Remove</label>
                <input 
                  value={pageInput} 
                  onChange={e => setPageInput(e.target.value)} 
                  className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500" 
                  placeholder="e.g. 1, 3-5, 8"
                />
                <p className="text-xs text-slate-500 mt-2">Enter page numbers or ranges separated by commas.</p>
             </div>

             <button 
               onClick={process}
               disabled={processing || !pageInput}
               className="w-full py-3 bg-red-600 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2"
             >
               {processing ? 'Processing...' : <><Trash2 size={20} /> Remove Pages & Download</>}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfDeletePages;