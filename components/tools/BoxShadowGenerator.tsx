import React, { useState } from 'react';
import { Layers } from 'lucide-react';

const BoxShadowGenerator: React.FC = () => {
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(20);
  const [inset, setInset] = useState(false);

  const rgba = `rgba(${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}, ${opacity/100})`;
  const shadow = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${rgba}`;

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 mb-4 border-b pb-4">
          <Layers className="text-indigo-600" />
          <h3 className="font-bold text-slate-800">Configuration</h3>
        </div>

        <Control label={`Horizontal: ${x}px`} value={x} min={-100} max={100} onChange={setX} />
        <Control label={`Vertical: ${y}px`} value={y} min={-100} max={100} onChange={setY} />
        <Control label={`Blur: ${blur}px`} value={blur} min={0} max={100} onChange={setBlur} />
        <Control label={`Spread: ${spread}px`} value={spread} min={-50} max={50} onChange={setSpread} />
        <Control label={`Opacity: ${opacity}%`} value={opacity} min={0} max={100} onChange={setOpacity} />
        
        <div>
           <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
           <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="w-5 h-5 accent-indigo-600" />
          <span className="text-sm font-medium text-slate-700">Inset Shadow</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-50 h-64 rounded-2xl border border-slate-200 flex items-center justify-center overflow-hidden">
           <div 
             className="w-32 h-32 bg-white rounded-2xl"
             style={{ boxShadow: shadow }}
           ></div>
        </div>

        <div className="bg-slate-800 text-slate-300 p-4 rounded-xl font-mono text-sm relative">
           <div className="mb-1 text-slate-500">box-shadow:</div>
           <div className="text-white break-all">{shadow};</div>
        </div>
      </div>
    </div>
  );
};

const Control: React.FC<{ label: string; value: number; min: number; max: number; onChange: (v: number) => void }> = ({ label, value, min, max, onChange }) => (
  <div>
    <div className="flex justify-between text-xs font-medium text-slate-500 mb-1">
      <span>{label}</span>
    </div>
    <input 
      type="range" min={min} max={max} value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
    />
  </div>
);

export default BoxShadowGenerator;