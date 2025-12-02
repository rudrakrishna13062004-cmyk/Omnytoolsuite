import React, { useState } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowers = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let chars = '';
    if (includeUpper) chars += uppers;
    if (includeLower) chars += lowers;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') return '';

    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  const [password, setPassword] = useState(generate());

  const handleGenerate = () => {
    setPassword(generate());
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="relative mb-6">
        <div className="bg-slate-100 p-4 rounded-xl text-center break-all text-xl font-mono text-slate-800 min-h-[3.5rem] flex items-center justify-center">
          {password}
        </div>
        <button 
          onClick={handleCopy}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-indigo-600 transition-colors"
        >
          {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
            <span>Length</span>
            <span>{length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Checkbox label="Uppercase (A-Z)" checked={includeUpper} onChange={setIncludeUpper} />
          <Checkbox label="Lowercase (a-z)" checked={includeLower} onChange={setIncludeLower} />
          <Checkbox label="Numbers (0-9)" checked={includeNumbers} onChange={setIncludeNumbers} />
          <Checkbox label="Symbols (!@#)" checked={includeSymbols} onChange={setIncludeSymbols} />
        </div>

        <button 
          onClick={handleGenerate}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 shadow-md"
        >
          <RefreshCw size={20} /> Generate New
        </button>
      </div>
    </div>
  );
};

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (b: boolean) => void }> = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100">
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={(e) => onChange(e.target.checked)}
      className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
    />
    <span className="text-sm text-slate-700 font-medium">{label}</span>
  </label>
);

export default PasswordGenerator;
