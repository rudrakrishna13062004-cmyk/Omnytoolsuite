import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const GlassmorphismGenerator: React.FC = () => {
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(0.5);
  const [saturation, setSaturation] = useState(180);

  const style: React.CSSProperties = {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const css = `
background: rgba(255, 255, 255, ${opacity});
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border: 1px solid rgba(255, 255, 255, 0.3);
`.trim();

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
         <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
             <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Configuration</h3>
             <div className="space-y-4">
                 <Control label={`Blur: ${blur}px`} value={blur} min={0} max={40} onChange={setBlur} />
                 <Control label={`Transparency: ${opacity}`} value={opacity} min={0} max={1} step={0.01} onChange={setOpacity} />
                 <Control label={`Saturation: ${saturation}%`} value={saturation} min={0} max={200} onChange={setSaturation} />
             </div>
         </div>
         
         <div className="bg-slate-800 p-4 rounded-xl relative">
             <pre className="text-blue-300 font-mono text-sm whitespace-pre-wrap">{css}</pre>
             <button onClick={() => navigator.clipboard.writeText(css)} className="absolute top-2 right-2 text-slate-400 hover:text-white">
                 <Copy size={18} />
             </button>
         </div>
      </div>

      <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
         <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
         <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
         
         <div 
           className="w-full h-48 rounded-2xl shadow-xl flex items-center justify-center text-white font-bold text-2xl relative z-10"
           style={style}
         >
           Glass Effect
         </div>
      </div>
    </div>
  );
};

const Control: React.FC<{ label: string, value: number, min: number, max: number, step?: number, onChange: (n: number) => void }> = ({ label, value, min, max, step=1, onChange }) => (
    <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{label}</label>
        <input 
            type="range" min={min} max={max} step={step} value={value} 
            onChange={e => onChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600"
        />
    </div>
);

export default GlassmorphismGenerator;