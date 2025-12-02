import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, FileText, Trash2 } from 'lucide-react';

const PdfMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  const merge = async () => {
    if (files.length < 2) return;
    setProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'merged-document.pdf';
      link.click();
    } catch (err) {
      alert('Error merging PDFs. Ensure they are not password protected.');
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Upload PDFs</h3>
        <p className="text-slate-500 mb-6">Select multiple files to merge them into one.</p>
        <input 
          type="file" 
          accept=".pdf" 
          multiple 
          onChange={handleUpload} 
          className="hidden" 
          id="pdf-upload" 
        />
        <label htmlFor="pdf-upload" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium cursor-pointer hover:bg-indigo-700 transition-colors">
          Select PDF Files
        </label>
      </div>

      {files.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 font-medium text-slate-600 flex justify-between items-center">
            <span>{files.length} Files Selected</span>
            <button onClick={() => setFiles([])} className="text-sm text-red-500 hover:text-red-700">Clear All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {files.map((file, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                    <FileText size={16} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 truncate max-w-[200px] sm:max-w-md">{file.name}</span>
                </div>
                <button onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200">
             <button 
               onClick={merge}
               disabled={files.length < 2 || processing}
               className="w-full py-3 bg-indigo-600 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2"
             >
               {processing ? 'Processing...' : <><Download size={20} /> Merge & Download</>}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfMerger;