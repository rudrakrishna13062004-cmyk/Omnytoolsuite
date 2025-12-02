import React, { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

const ROMAN_MAP: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
];

const RomanConverter: React.FC = () => {
  const [num, setNum] = useState<number | ''>(2024);
  const [roman, setRoman] = useState('MMXXIV');

  const toRoman = (n: number) => {
    if (n < 1 || n > 3999) return '';
    let res = '';
    let val = n;
    for (const [v, s] of ROMAN_MAP) {
      while (val >= v) {
        res += s;
        val -= v;
      }
    }
    return res;
  };

  const fromRoman = (str: string) => {
    const s = str.toUpperCase();
    let res = 0;
    let i = 0;
    for (const [v, ch] of ROMAN_MAP) {
        while (s.indexOf(ch, i) === i) {
            res += v;
            i += ch.length;
        }
    }
    return res;
  };

  const handleNum = (val: string) => {
    const n = parseInt(val);
    if (!isNaN(n)) {
        setNum(n);
        setRoman(toRoman(n));
    } else {
        setNum('');
        setRoman('');
    }
  };

  const handleRoman = (val: string) => {
    const r = val.toUpperCase().replace(/[^IVXLCDM]/g, '');
    setRoman(r);
    const n = fromRoman(r);
    setNum(n || '');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Decimal Number (1-3999)</label>
            <input 
                type="number" 
                value={num} 
                onChange={(e) => handleNum(e.target.value)}
                className="w-full text-4xl font-bold p-4 border border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
        </div>

        <div className="flex justify-center text-slate-300">
            <ArrowDownUp size={32} />
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Roman Numeral</label>
            <input 
                type="text" 
                value={roman} 
                onChange={(e) => handleRoman(e.target.value)}
                className="w-full text-4xl font-bold font-serif p-4 border border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase"
            />
        </div>
      </div>
    </div>
  );
};

export default RomanConverter;