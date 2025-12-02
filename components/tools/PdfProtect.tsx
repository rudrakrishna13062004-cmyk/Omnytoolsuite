import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileLock, Lock } from 'lucide-react';

const PdfProtect: React.FC = () => {
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
      const pdfDoc = await PDFDocument.load(buffer);
      
      pdfDoc.encrypt({
        userPassword: password,
        ownerPassword: password,
        permissions: { printing: 'highResolution', modifying: false, copying: false, extracting: false }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `protected-${file.name}`;
      link.click();
    } catch (e) {
      alert('Error protecting PDF.');
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        {!file ? (
          <div className="text-center">
             <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileLock size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Protect PDF</h3>
             <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="prot-upload" />
             <label htmlFor="prot-upload" className="inline-block mt-4 px-6 py-3 bg-red-600 text-white rounded-xl font-medium cursor-pointer hover:bg-red-700">
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Set Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500" placeholder="Enter password" />
                </div>
             </div>

             <button 
               onClick={process}
               disabled={processing || !password}
               className="w-full py-3 bg-red-600 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2"
             >
               {processing ? 'Encrypting...' : 'Encrypt & Download'}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfProtect;