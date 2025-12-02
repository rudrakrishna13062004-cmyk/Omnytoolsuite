import React, { useState } from 'react';
import { FileCode, ArrowRightLeft } from 'lucide-react';

const HtmlEntityEncoder: React.FC = () => {
  const [input, setInput] = useState('<div class="test">Hello & Welcome</div>');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  React.useEffect(() => {
      if (mode === 'encode') {
          setOutput(input.replace(/[\u00A0-\u9999<>&]/g, function(i) {
             return '&#'+i.charCodeAt(0)+';';
          }));
      } else {
          const doc = new DOMParser().parseFromString(input, "text/html");
          setOutput(doc.documentElement.textContent || "");
      }
  }, [input, mode]);

  return (
    <div className="max-w-4xl mx-auto h-[500px] flex flex-col gap-6">
      <div className="flex justify-center">
          <div className="bg-slate-100 p-1 rounded-lg flex">
             <button onClick={() => setMode('encode')} className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${mode === 'encode' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>Encode</button>
             <button onClick={() => setMode('decode')} className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${mode === 'decode' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>Decode</button>
          </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-6 min-h-0">
          <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2">Input</label>
              <textarea 
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 w-full p-4 border border-slate-300 rounded-xl focus:ring-indigo-500 outline-none resize-none font-mono text-sm"
              />
          </div>
          <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2">Output</label>
              <textarea 
                readOnly
                value={output}
                className="flex-1 w-full p-4 border border-slate-200 bg-slate-50 rounded-xl outline-none resize-none font-mono text-sm text-slate-600"
              />
          </div>
      </div>
    </div>
  );
};

export default HtmlEntityEncoder;