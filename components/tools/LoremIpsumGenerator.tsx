import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

const LoremIpsumGenerator: React.FC = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [text, setText] = useState('');

  const generate = () => {
    let result = [];
    for (let i = 0; i < paragraphs; i++) {
      const len = Math.floor(Math.random() * 30) + 20; // 20-50 words per para
      let para = [];
      for (let j = 0; j < len; j++) {
        para.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
      }
      // Capitalize first letter and add period
      const str = para.join(' ');
      result.push(str.charAt(0).toUpperCase() + str.slice(1) + '.');
    }
    setText(result.join('\n\n'));
  };

  // Generate on mount/change
  React.useEffect(generate, [paragraphs]);

  return (
    <div className="max-w-3xl mx-auto h-[600px] flex flex-col">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700">Paragraphs: {paragraphs}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={paragraphs}
            onChange={(e) => setParagraphs(Number(e.target.value))}
            className="w-32 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
        <div className="flex gap-2">
           <button onClick={generate} className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg">
             <RefreshCw size={20} />
           </button>
           <button onClick={() => navigator.clipboard.writeText(text)} className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg">
             <Copy size={20} />
           </button>
        </div>
      </div>

      <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 overflow-y-auto">
        {text.split('\n\n').map((p, i) => (
          <p key={i} className="mb-4 text-slate-600 leading-relaxed last:mb-0">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LoremIpsumGenerator;