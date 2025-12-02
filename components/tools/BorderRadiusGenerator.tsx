import React, { useState } from 'react';
import { Copy, Box } from 'lucide-react';

const BorderRadiusGenerator: React.FC = () => {
  const [tl, setTl] = useState(30);
  const [tr, setTr] = useState(80);
  const [br, setBr] = useState(30);
  const [bl, setBl] = useState(80);

  const css = `border-radius: ${tl}% ${tr}% ${br}% ${bl}%;`;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="relative h-64 md:h-80 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center p-8">
        {/* Interactive Shape */}
        <div 
            className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl transition-all duration-300"
            style={{ borderRadius: `${tl}% ${tr}% ${br}% ${bl}%` }}
        ></div>

        {/* Controls Overlay */}
        <input 
            type="range" min="0" max="100" value={tl} 
            onChange={(e) => setTl(Number(e.target.value))}
            className="absolute top-4 left-4 w-24 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-slate-800"
        />
        <input 
            type="range" min="0" max="100" value={tr} 
            onChange={(e) => setTr(Number(e.target.value))}
            className="absolute top-4 right-4 w-24 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-slate-800"
        />
        <input 
            type="range" min="0" max="100" value={br} 
            onChange={(e) => setBr(Number(e.target.value))}
            className="absolute bottom-4 right-4 w-24 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-slate-800"
        />
        <input 
            type="range" min="0" max="100" value={bl} 
            onChange={(e) => setBl(Number(e.target.value))}
            className="absolute bottom-4 left-4 w-24 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-slate-800"
        />
      </div>

      <div className="bg-slate-800 text-slate-300 p-6 rounded-2xl shadow-lg relative font-mono">
        <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-slate-500 uppercase">CSS Output</span>
            <button 
                onClick={() => navigator.clipboard.writeText(css)}
                className="text-slate-400 hover:text-white transition-colors"
            >
                <Copy size={18} />
            </button>
        </div>
        <div className="text-lg text-white break-all">{css}</div>
      </div>
    </div>
  );
};

export default BorderRadiusGenerator;