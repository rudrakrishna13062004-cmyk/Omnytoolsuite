import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';

const ImageCompressor: React.FC = () => {
  const [original, setOriginal] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setOriginal(ev.target?.result as string);
        compress(ev.target?.result as string, quality);
      };
      reader.readAsDataURL(file);
    }
  };

  const compress = (src: string, q: number) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const dataUrl = canvas.toDataURL('image/jpeg', q);
      setCompressed(dataUrl);
      
      // Calculate approximate size
      const head = 'data:image/jpeg;base64,';
      const size = Math.round((dataUrl.length - head.length) * 3 / 4);
      setCompressedSize(size);
    };
  };

  const handleQualityChange = (val: number) => {
    setQuality(val);
    if (original) compress(original, val);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!original ? (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:bg-slate-50 transition-colors">
           <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <Upload size={32} />
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-2">Upload an Image</h3>
           <p className="text-slate-500 mb-6">JPG, PNG or WEBP</p>
           <input 
             type="file" 
             accept="image/*" 
             onChange={handleUpload} 
             className="hidden" 
             id="img-upload" 
           />
           <label htmlFor="img-upload" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium cursor-pointer hover:bg-indigo-700">
             Select File
           </label>
        </div>
      ) : (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-700">Quality: {Math.round(quality * 100)}%</span>
                    <input 
                        type="range" 
                        min="0.1" 
                        max="1" 
                        step="0.1" 
                        value={quality} 
                        onChange={(e) => handleQualityChange(parseFloat(e.target.value))}
                        className="w-48 h-2 bg-slate-200 rounded-lg accent-indigo-600" 
                    />
                </div>
                <div className="text-right">
                    <div className="text-sm text-slate-500">Savings</div>
                    <div className="text-lg font-bold text-green-600">
                        {originalSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0}%
                    </div>
                </div>
                <button onClick={() => setOriginal(null)} className="text-sm text-red-500 hover:underline">Reset</button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-slate-600">
                        <span>Original</span>
                        <span>{formatSize(originalSize)}</span>
                    </div>
                    <img src={original} alt="Original" className="w-full rounded-xl border border-slate-200 bg-white" />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-slate-600">
                        <span>Compressed</span>
                        <span>{formatSize(compressedSize)}</span>
                    </div>
                    {compressed && (
                        <div className="relative group">
                            <img src={compressed} alt="Compressed" className="w-full rounded-xl border border-slate-200 bg-white" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                <a 
                                    href={compressed} 
                                    download="compressed-image.jpg"
                                    className="px-6 py-3 bg-white text-slate-900 rounded-lg font-bold flex items-center gap-2"
                                >
                                    <Download size={20} /> Download
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
      {/* Hidden Canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageCompressor;