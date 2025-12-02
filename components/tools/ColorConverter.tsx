import React, { useState, useEffect } from 'react';

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#6366f1');
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  
  const updateFromHex = (h: string) => {
    setHex(h);
    if (/^#[0-9A-Fa-f]{6}$/i.test(h)) {
      const r = parseInt(h.slice(1, 3), 16);
      const g = parseInt(h.slice(3, 5), 16);
      const b = parseInt(h.slice(5, 7), 16);
      setRgb({ r, g, b });
    }
  };

  const updateFromRgb = (key: 'r' | 'g' | 'b', val: number) => {
    const newRgb = { ...rgb, [key]: val };
    setRgb(newRgb);
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    setHex(`#${toHex(newRgb.r)}${toHex(newRgb.g)}${toHex(newRgb.b)}`);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div 
        className="w-full h-32 rounded-xl shadow-inner mb-8 transition-colors duration-300 border border-slate-200"
        style={{ backgroundColor: hex }}
      ></div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">HEX</label>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500">#</span>
            <input 
              type="text" 
              value={hex.replace('#', '')}
              onChange={(e) => updateFromHex('#' + e.target.value)}
              maxLength={6}
              className="block w-full rounded-none rounded-r-md border-slate-300 py-2 px-3 border focus:ring-indigo-500 focus:border-indigo-500 uppercase font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <RgbInput label="R" value={rgb.r} onChange={(v) => updateFromRgb('r', v)} />
          <RgbInput label="G" value={rgb.g} onChange={(v) => updateFromRgb('g', v)} />
          <RgbInput label="B" value={rgb.b} onChange={(v) => updateFromRgb('b', v)} />
        </div>
        
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 uppercase mb-2">CSS Output</p>
          <code className="block text-sm text-slate-700 font-mono select-all">background-color: {hex};</code>
          <code className="block text-sm text-slate-700 font-mono select-all mt-1">rgb({rgb.r}, {rgb.g}, {rgb.b});</code>
        </div>
      </div>
    </div>
  );
};

const RgbInput: React.FC<{ label: string; value: number; onChange: (v: number) => void }> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input 
      type="number"
      min="0"
      max="255"
      value={value}
      onChange={(e) => onChange(Math.min(255, Math.max(0, parseInt(e.target.value) || 0)))}
      className="block w-full rounded-md border-slate-300 py-2 px-3 border focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

export default ColorConverter;
