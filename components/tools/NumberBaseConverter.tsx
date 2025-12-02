import React, { useState } from 'react';

const NumberBaseConverter: React.FC = () => {
  const [dec, setDec] = useState('');
  const [bin, setBin] = useState('');
  const [oct, setOct] = useState('');
  const [hex, setHex] = useState('');

  const update = (val: string, base: number) => {
    if (val === '') {
      setDec(''); setBin(''); setOct(''); setHex('');
      return;
    }
    const num = parseInt(val, base);
    if (!isNaN(num)) {
      setDec(num.toString(10));
      setBin(num.toString(2));
      setOct(num.toString(8));
      setHex(num.toString(16).toUpperCase());
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 space-y-6">
      <BaseInput label="Decimal (10)" value={dec} onChange={(v) => update(v, 10)} />
      <BaseInput label="Binary (2)" value={bin} onChange={(v) => update(v, 2)} pattern="[0-1]*" />
      <BaseInput label="Octal (8)" value={oct} onChange={(v) => update(v, 8)} pattern="[0-7]*" />
      <BaseInput label="Hexadecimal (16)" value={hex} onChange={(v) => update(v, 16)} pattern="[0-9a-fA-F]*" />
    </div>
  );
};

const BaseInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; pattern?: string }> = ({ label, value, onChange, pattern }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input 
      type="text"
      value={value}
      onChange={(e) => {
        if (!pattern || new RegExp(`^${pattern}$`).test(e.target.value)) {
          onChange(e.target.value);
        }
      }}
      className="block w-full rounded-lg border-slate-300 py-3 px-4 border focus:ring-indigo-500 focus:border-indigo-500 font-mono"
      placeholder="0"
    />
  </div>
);

export default NumberBaseConverter;