import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

const GradientGenerator: React.FC = () => {
  const [color1, setColor1] = useState('#6366f1');
  const [color2, setColor2] = useState('#ec4899');
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<'linear' | 'radial'>('linear');

  const gradient = type === 'linear' 
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})` 
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const generateRandom = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor1(randomColor());
    setColor2(randomColor());
    setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
       <div 
         className="w-full min-h-[300px] rounded-2xl shadow-lg border border-slate-200 transition-all duration-300"
         style={{ background: gradient }}
       ></div>

       <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-800">Settings</h3>
              <button onClick={generateRandom} className="text-slate-400 hover:text-indigo-600"><RefreshCw size={20}/></button>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                 <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Start Color</label>
                 <div className="flex gap-2">
                     <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer" />
                     <input type="text" value={color1} onChange={e => setColor1(e.target.value)} className="w-full border border-slate-300 rounded px-2 text-sm" />
                 </div>
             </div>
             <div>
                 <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">End Color</label>
                 <div className="flex gap-2">
                     <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer" />
                     <input type="text" value={color2} onChange={e => setColor2(e.target.value)} className="w-full border border-slate-300 rounded px-2 text-sm" />
                 </div>
             </div>
          </div>

          <div>
             <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Type</label>
             <div className="flex bg-slate-100 p-1 rounded-lg">
                 <button onClick={() => setType('linear')} className={`flex-1 py-1 rounded-md text-sm font-medium ${type === 'linear' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>Linear</button>
                 <button onClick={() => setType('radial')} className={`flex-1 py-1 rounded-md text-sm font-medium ${type === 'radial' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>Radial</button>
             </div>
          </div>

          {type === 'linear' && (
              <div>
                  <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Angle: {angle}°</label>
                  <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600" />
              </div>
          )}

          <div className="bg-slate-800 p-4 rounded-xl relative">
              <code className="text-green-400 text-sm font-mono break-all block pr-8">background: {gradient};</code>
              <button 
                onClick={() => navigator.clipboard.writeText(`background: ${gradient};`)}
                className="absolute top-2 right-2 text-slate-400 hover:text-white"
              >
                  <Copy size={16} />
              </button>
          </div>
       </div>
    </div>
  );
};

export default GradientGenerator;