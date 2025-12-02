import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileKey, Unlock } from 'lucide-react';

const PdfUnlock: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const process = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      // To "remove" password, we load it WITH the password, then save it WITHOUT encryption (default save)
      // pdf-lib requires the password to load encrypted files
      let pdfDoc;
      try {
          pdfDoc = await PDFDocument.load(buffer, { password });
      } catch(e) {
          alert('Incorrect password or file not encrypted.');
          setProcessing(false);
          return;
      }
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `unlocked-${file.name}`;
      link.click();
    } catch (e) {
      alert('Error unlocking PDF.');
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        {!file ? (
          <div className="text-center">
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileKey size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Unlock PDF</h3>
             <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="unlock-upload" />
             <label htmlFor="unlock-upload" className="inline-block mt-4 px-6 py-3 bg-green-600 text-white rounded-xl font-medium cursor-pointer hover:bg-green-700">
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                <div className="relative">
                    <Unlock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter password to unlock" />
                </div>
             </div>

             <button 
               onClick={process}
               disabled={processing || !password}
               className="w-full py-3 bg-green-600 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2"
             >
               {processing ? 'Processing...' : 'Unlock & Download'}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfUnlock;