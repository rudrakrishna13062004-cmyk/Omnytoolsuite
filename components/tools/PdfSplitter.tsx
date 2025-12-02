import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Scissors, Download } from 'lucide-react';

const PdfSplitter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState('');
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
      const srcDoc = await PDFDocument.load(buffer);
      const newDoc = await PDFDocument.create();
      
      // Parse range (e.g. "1-5")
      // Simple range for extract: "start-end"
      const [start, end] = range.split('-').map(n => parseInt(n.trim()));
      
      if (isNaN(start) || isNaN(end) || start < 1 || end > srcDoc.getPageCount()) {
          alert('Invalid range');
          setProcessing(false);
          return;
      }

      // Convert 1-based range to 0-based indices
      const indices = [];
      for (let i = start; i <= end; i++) indices.push(i - 1);
      
      const copiedPages = await newDoc.copyPages(srcDoc, indices);
      copiedPages.forEach(page => newDoc.addPage(page));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `split-${start}-${end}.pdf`;
      link.click();
    } catch (e) {
      alert('Error splitting PDF.');
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        {!file ? (
          <div className="text-center">
             <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Split PDF</h3>
             <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="split-upload" />
             <label htmlFor="split-upload" className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium cursor-pointer hover:bg-purple-700">
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Page Range to Extract</label>
                <input 
                  value={range} 
                  onChange={e => setRange(e.target.value)} 
                  className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder="e.g. 1-5"
                />
             </div>

             <button 
               onClick={process}
               disabled={processing || !range}
               className="w-full py-3 bg-purple-600 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2"
             >
               {processing ? 'Processing...' : <><Download size={20} /> Extract Pages</>}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfSplitter;