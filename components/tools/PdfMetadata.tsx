import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileCog, Save } from 'lucide-react';

const PdfMetadata: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState({ title: '', author: '', subject: '', keywords: '' });
  const [processing, setProcessing] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      try {
        const buffer = await f.arrayBuffer();
        const doc = await PDFDocument.load(buffer);
        setMeta({
          title: doc.getTitle() || '',
          author: doc.getAuthor() || '',
          subject: doc.getSubject() || '',
          keywords: doc.getKeywords() || '',
        });
      } catch(e) {
        console.error(e);
      }
    }
  };

  const save = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer);
      
      doc.setTitle(meta.title);
      doc.setAuthor(meta.author);
      doc.setSubject(meta.subject);
      doc.setKeywords(meta.keywords.split(',').map(s => s.trim()));

      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `metadata-${file.name}`;
      link.click();
    } catch (e) {
      alert('Error saving metadata.');
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        {!file ? (
          <div className="text-center">
             <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCog size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Edit PDF Metadata</h3>
             <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="meta-upload" />
             <label htmlFor="meta-upload" className="inline-block mt-4 px-6 py-3 bg-slate-800 text-white rounded-xl font-medium cursor-pointer hover:bg-slate-900">
                Upload PDF
             </label>
          </div>
        ) : (
          <div className="space-y-4">
             <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                <div className="flex-1 font-medium text-slate-700 truncate">{file.name}</div>
                <button onClick={() => setFile(null)} className="text-sm text-red-500 hover:underline">Change</button>
             </div>

             <div className="space-y-3">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input value={meta.title} onChange={e => setMeta({...meta, title: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
                  <input value={meta.author} onChange={e => setMeta({...meta, author: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <input value={meta.subject} onChange={e => setMeta({...meta, subject: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Keywords (comma separated)</label>
                  <input value={meta.keywords} onChange={e => setMeta({...meta, keywords: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
               </div>
             </div>

             <button 
               onClick={save}
               disabled={processing}
               className="w-full py-3 bg-indigo-600 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2 mt-6"
             >
               {processing ? 'Processing...' : <><Save size={20} /> Save PDF</>}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfMetadata;