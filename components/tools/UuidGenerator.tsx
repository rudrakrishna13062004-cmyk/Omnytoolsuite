import React, { useState } from 'react';
import { Fingerprint, RefreshCcw, Copy } from 'lucide-react';

const UuidGenerator: React.FC = () => {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  };

  const generate = () => {
    const arr = [];
    for(let i=0; i<count; i++) arr.push(generateUUID());
    setUuids(arr);
  };

  React.useEffect(generate, [count]);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
           <Fingerprint className="text-indigo-600" />
           <h3 className="text-lg font-bold text-slate-800">UUID v4 Generator</h3>
        </div>
        <div className="flex items-center gap-2">
           <label className="text-sm text-slate-500">Count:</label>
           <select 
             value={count} 
             onChange={(e) => setCount(Number(e.target.value))}
             className="bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-sm"
           >
             {[1, 5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
           </select>
           <button onClick={generate} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
             <RefreshCcw size={18} />
           </button>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-200 max-h-[400px] overflow-y-auto">
        {uuids.map((uuid, i) => (
          <div key={i} className="flex justify-between items-center p-3 border-b border-slate-200 last:border-0 hover:bg-white transition-colors group">
            <span className="font-mono text-slate-600 text-sm md:text-base">{uuid}</span>
            <button 
              onClick={() => navigator.clipboard.writeText(uuid)}
              className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Copy size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => navigator.clipboard.writeText(uuids.join('\n'))}
          className="text-sm text-indigo-600 font-medium hover:underline"
        >
          Copy All to Clipboard
        </button>
      </div>
    </div>
  );
};

export default UuidGenerator;