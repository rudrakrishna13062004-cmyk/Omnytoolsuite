import React, { useState, useEffect } from 'react';
import { Maximize, ArrowRight } from 'lucide-react';

const AspectRatioCalculator: React.FC = () => {
  const [w1, setW1] = useState(1920);
  const [h1, setH1] = useState(1080);
  const [w2, setW2] = useState(1280);
  const [h2, setH2] = useState(720);
  const [mode, setMode] = useState<'w' | 'h'>('w'); // Which one to calculate for set 2

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const divisor = gcd(w1, h1);
  const ratio = `${w1 / divisor}:${h1 / divisor}`;

  useEffect(() => {
    if (mode === 'w') {
      // Calculate W2 based on H2
      setW2(Math.round((w1 / h1) * h2));
    } else {
      // Calculate H2 based on W2
      setH2(Math.round((h1 / w1) * w2));
    }
  }, [w1, h1, w2, h2, mode]); // Dependencies need care to avoid loops, simplified below

  const handleRatioChange = (nw: number, nh: number) => {
    setW1(nw);
    setH1(nh);
    // Recalculate dependent
    if (mode === 'w') setW2(Math.round((nw / nh) * h2));
    else setH2(Math.round((nh / nw) * w2));
  };

  const handleCalcInput = (val: number, isWidth: boolean) => {
    if (isWidth) {
      setW2(val);
      setMode('h');
      setH2(Math.round((h1 / w1) * val));
    } else {
      setH2(val);
      setMode('w');
      setW2(Math.round((w1 / h1) * val));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-slate-800">Aspect Ratio Calculator</h3>
        <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-mono font-bold">
          {ratio}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="font-medium text-slate-500 text-sm uppercase tracking-wide">Original Size</div>
          <div className="flex gap-4 items-center">
            <input 
              type="number" value={w1} onChange={(e) => handleRatioChange(Number(e.target.value), h1)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold"
            />
            <span className="text-slate-400">x</span>
            <input 
              type="number" value={h1} onChange={(e) => handleRatioChange(w1, Number(e.target.value))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
             {[
               [1920, 1080], [1280, 720], [1080, 1080], 
               [800, 600], [4096, 2160], [3840, 2160]
             ].map(([w, h]) => (
               <button 
                 key={`${w}x${h}`}
                 onClick={() => handleRatioChange(w, h)}
                 className="text-xs py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-600"
               >
                 {w} x {h}
               </button>
             ))}
          </div>
        </div>

        <div className="space-y-4 relative">
          <div className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 text-slate-300">
             <ArrowRight size={24} />
          </div>
          <div className="font-medium text-slate-500 text-sm uppercase tracking-wide">New Size</div>
          <div className="flex gap-4 items-center">
             <div className="w-full">
               <label className="text-xs text-slate-400 mb-1 block">Width</label>
               <input 
                 type="number" value={w2} onChange={(e) => handleCalcInput(Number(e.target.value), true)}
                 className="w-full p-3 border border-indigo-300 focus:ring-2 focus:ring-indigo-500 rounded-lg text-center font-bold text-indigo-700"
               />
             </div>
             <div className="w-full">
               <label className="text-xs text-slate-400 mb-1 block">Height</label>
               <input 
                 type="number" value={h2} onChange={(e) => handleCalcInput(Number(e.target.value), false)}
                 className="w-full p-3 border border-indigo-300 focus:ring-2 focus:ring-indigo-500 rounded-lg text-center font-bold text-indigo-700"
               />
             </div>
          </div>
          <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
            <div 
              className="bg-indigo-500/20 border border-indigo-500"
              style={{
                width: '60%',
                aspectRatio: `${w1}/${h1}`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioCalculator;