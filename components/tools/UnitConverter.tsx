import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const CATEGORIES = {
  Length: {
    units: { m: 1, cm: 0.01, mm: 0.001, km: 1000, inch: 0.0254, ft: 0.3048, yd: 0.9144, mile: 1609.34 }
  },
  Weight: {
    units: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 }
  },
  Data: {
    units: { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 }
  }
};

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<keyof typeof CATEGORIES>('Length');
  const [fromUnit, setFromUnit] = useState(Object.keys(CATEGORIES['Length'].units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(CATEGORIES['Length'].units)[1]);
  const [value, setValue] = useState(1);
  const [result, setResult] = useState(0);

  // Update units when category changes
  useEffect(() => {
    const units = Object.keys(CATEGORIES[category].units);
    setFromUnit(units[0]);
    setToUnit(units[1]);
  }, [category]);

  // Calculate conversion
  useEffect(() => {
    const units = CATEGORIES[category].units as Record<string, number>;
    const fromFactor = units[fromUnit];
    const toFactor = units[toUnit];
    if (fromFactor !== undefined && toFactor !== undefined) {
      setResult(value * (fromFactor / toFactor));
    }
  }, [value, fromUnit, toUnit, category]);

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.keys(CATEGORIES).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase">From</label>
          <input 
            type="number" 
            value={value} 
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
            className="w-full text-2xl font-bold text-slate-800 border-b-2 border-slate-200 focus:border-indigo-500 outline-none py-2 bg-transparent" 
          />
          <select 
            value={fromUnit} 
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm"
          >
            {Object.keys(CATEGORIES[category].units).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div className="flex justify-center text-slate-400 pt-6">
          <ArrowRightLeft size={24} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase">To</label>
          <div className="w-full text-2xl font-bold text-indigo-600 border-b-2 border-indigo-100 py-2 truncate">
            {Number(result.toPrecision(6))}
          </div>
          <select 
            value={toUnit} 
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm"
          >
            {Object.keys(CATEGORIES[category].units).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;