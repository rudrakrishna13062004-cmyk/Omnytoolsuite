import React, { useState } from 'react';
import { Copy, Check, AlertCircle, Trash2 } from 'lucide-react';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const format = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const minify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const clear = () => {
    setInput('');
    setError(null);
  };

  const copy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[600px] flex flex-col max-w-4xl mx-auto">
      <div className="flex gap-2 mb-4">
        <button onClick={format} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">Beautify</button>
        <button onClick={minify} className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50">Minify</button>
        <button onClick={copy} className="ml-auto px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 flex items-center gap-2">
          {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>} Copy
        </button>
        <button onClick={clear} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="relative flex-1">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON here..."
          className={`w-full h-full p-4 rounded-xl border ${error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500'} focus:ring-2 outline-none font-mono text-sm resize-none`}
        />
        {error && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-100 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm animate-in slide-in-from-bottom-2">
            <AlertCircle size={18} />
            <span className="font-medium truncate">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonFormatter;