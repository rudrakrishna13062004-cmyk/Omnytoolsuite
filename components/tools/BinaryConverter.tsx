import React, { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

const BinaryConverter: React.FC = () => {
  const [text, setText] = useState('Hello');
  const [binary, setBinary] = useState('');

  const textToBinary = (str: string) => {
    return str.split('').map(char => {
       return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
  };

  const binaryToText = (bin: string) => {
    return bin.split(' ').map(b => {
       return String.fromCharCode(parseInt(b, 2));
    }).join('');
  };

  // Init
  React.useEffect(() => {
      setBinary(textToBinary(text));
  }, []);

  const handleText = (val: string) => {
      setText(val);
      setBinary(textToBinary(val));
  };

  const handleBinary = (val: string) => {
      const clean = val.replace(/[^01 ]/g, '');
      setBinary(clean);
      setText(binaryToText(clean));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
         <div className="flex flex-col">
            <label className="text-sm font-bold text-slate-700 mb-2">Text Input</label>
            <textarea 
              value={text} 
              onChange={e => handleText(e.target.value)} 
              className="flex-1 w-full p-4 border border-slate-300 rounded-xl focus:ring-indigo-500 outline-none resize-none min-h-[200px]"
            />
         </div>
         
         <div className="flex items-center justify-center md:hidden text-slate-400">
             <ArrowDownUp />
         </div>

         <div className="flex flex-col">
            <label className="text-sm font-bold text-slate-700 mb-2">Binary Output (010101)</label>
            <textarea 
              value={binary} 
              onChange={e => handleBinary(e.target.value)} 
              className="flex-1 w-full p-4 border border-slate-300 rounded-xl focus:ring-indigo-500 outline-none resize-none font-mono text-sm min-h-[200px]"
            />
         </div>
      </div>
    </div>
  );
};

export default BinaryConverter;