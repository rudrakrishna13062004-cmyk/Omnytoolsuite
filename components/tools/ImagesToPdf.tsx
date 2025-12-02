import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, Image as ImageIcon, Trash2 } from 'lucide-react';

const ImagesToPdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Filter images only
      const imgs = Array.from(e.target.files).filter((f: File) => f.type.startsWith('image/'));
      setFiles([...files, ...imgs]);
    }
  };

  const removeFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  const convert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      const doc = await PDFDocument.create();
      
      for (const file of files) {
        const buffer = await file.arrayBuffer();
        let img;
        if (file.type === 'image/jpeg') {
          img = await doc.embedJpg(buffer);
        } else if (file.type === 'image/png') {
          img = await doc.embedPng(buffer);
        } else {
          continue; // Skip unsupported
        }

        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, {
          x: 0,
          y: 0,
          width: img.width,
          height: img.height,
        });
      }

      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'images.pdf';
      link.click();
    } catch (err) {
      alert('Error converting images.');
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
        <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Upload Images</h3>
        <p className="text-slate-500 mb-6">JPG or PNG. They will be converted to PDF pages.</p>
        <input 
          type="file" 
          accept="image/jpeg, image/png" 
          multiple 
          onChange={handleUpload} 
          className="hidden" 
          id="img-upload" 
        />
        <label htmlFor="img-upload" className="px-6 py-3 bg-pink-600 text-white rounded-xl font-medium cursor-pointer hover:bg-pink-700 transition-colors">
          Select Images
        </label>
      </div>

      {files.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 font-medium text-slate-600 flex justify-between items-center">
            <span>{files.length} Images Selected</span>
            <button onClick={() => setFiles([])} className="text-sm text-red-500 hover:text-red-700">Clear All</button>
          </div>
          <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
            {files.map((file, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 overflow-hidden">
                    <ImageIcon size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">{file.name}</span>
                </div>
                <button onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200">
             <button 
               onClick={convert}
               disabled={processing}
               className="w-full py-3 bg-pink-600 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center justify-center gap-2"
             >
               {processing ? 'Processing...' : <><Download size={20} /> Convert to PDF</>}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesToPdf;