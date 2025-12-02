import React, { useState } from 'react';
import { Link2, Copy, Check } from 'lucide-react';

const SlugGenerator: React.FC = () => {
  const [input, setInput] = useState('Hello World! This is a Title.');
  const [separator, setSeparator] = useState('-');
  const [copied, setCopied] = useState(false);

  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, separator)
    .replace(/^-+|-+$/g, '');

  const copy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <label className="block text-sm font-medium text-slate-700 mb-2">Input String</label>
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 text-lg border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            placeholder="Enter article title or text..."
        />
        
        <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-slate-500 font-medium">Separator:</span>
            <div className="flex gap-2">
                {['-', '_', '.'].map(s => (
                    <button
                        key={s}
                        onClick={() => setSeparator(s)}
                        className={`w-8 h-8 rounded-lg font-mono font-bold border transition-colors ${
                            separator === s 
                            ? 'bg-indigo-600 text-white border-indigo-600' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 relative">
         <div className="text-xs font-bold text-indigo-400 uppercase mb-2">Generated Slug</div>
         <div className="text-2xl font-mono text-indigo-900 break-all pr-12">{slug || '...'}</div>
         <button 
            onClick={copy}
            className="absolute top-6 right-6 p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
         >
            {copied ? <Check size={20} /> : <Copy size={20} />}
         </button>
      </div>
    </div>
  );
};

export default SlugGenerator;