import React, { useState } from 'react';
import { Shuffle, ArrowDownAZ, ArrowUpAZ, Trash2 } from 'lucide-react';

const ListRandomizer: React.FC = () => {
  const [text, setText] = useState('Apple\nBanana\nCherry\nDate\nElderberry');

  const process = (fn: (arr: string[]) => string[]) => {
    const lines = text.split('\n').filter(l => l.trim());
    setText(fn(lines).join('\n'));
  };

  const shuffle = (arr: string[]) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  return (
    <div className="max-w-2xl mx-auto h-[600px] flex flex-col gap-4">
      <div className="flex gap-2">
        <ToolBtn onClick={() => process(shuffle)} icon={Shuffle} label="Shuffle" primary />
        <ToolBtn onClick={() => process(a => a.sort())} icon={ArrowDownAZ} label="Sort A-Z" />
        <ToolBtn onClick={() => process(a => a.sort().reverse())} icon={ArrowUpAZ} label="Sort Z-A" />
        <div className="flex-1"></div>
        <button 
          onClick={() => setText('')}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
         <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-xs font-medium text-slate-500">
           One item per line
         </div>
         <textarea
           value={text}
           onChange={(e) => setText(e.target.value)}
           className="flex-1 w-full p-4 outline-none resize-none text-slate-700 leading-relaxed"
           placeholder="Enter your list here..."
         />
         <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-xs text-right text-slate-400">
           {text.split('\n').filter(l => l.trim()).length} Items
         </div>
      </div>
    </div>
  );
};

const ToolBtn: React.FC<{ onClick: () => void; icon: any; label: string; primary?: boolean }> = ({ onClick, icon: Icon, label, primary }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
      primary 
        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
    }`}
  >
    <Icon size={16} /> {label}
  </button>
);

export default ListRandomizer;