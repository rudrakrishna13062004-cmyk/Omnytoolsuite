import React, { useState } from 'react';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';

const CaseConverter: React.FC = () => {
  const [text, setText] = useState('Welcome to OmniTools');
  const [copied, setCopied] = useState(false);

  const transformers = {
    'UPPERCASE': (s: string) => s.toUpperCase(),
    'lowercase': (s: string) => s.toLowerCase(),
    'Title Case': (s: string) => s.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
    'camelCase': (s: string) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''),
    'snake_case': (s: string) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || s,
    'kebab-case': (s: string) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || s,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col gap-6">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-slate-700">Input Text</label>
          <button 
            onClick={handleCopy}
            className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-800"
          >
            {copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 w-full p-6 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-slate-700 leading-relaxed text-lg"
          placeholder="Type something..."
        ></textarea>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Convert To</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(transformers).map(([name, fn]) => (
            <button
              key={name}
              onClick={() => setText(fn(text))}
              className="px-4 py-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded-xl font-medium text-sm transition-colors text-slate-600"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;