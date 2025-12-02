import React, { useState } from 'react';
import { AlignLeft, Clock } from 'lucide-react';

const TextAnalyzer: React.FC = () => {
  const [text, setText] = useState('');

  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const sentences = text.split(/[.!?]+/).filter(x => x.trim().length > 0).length;
  const paragraphs = text.split(/\n+/).filter(x => x.trim().length > 0).length;
  const readTime = Math.ceil(words / 200);

  return (
    <div className="max-w-3xl mx-auto h-[600px] flex flex-col gap-4">
       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatBox label="Words" value={words} />
        <StatBox label="Characters" value={chars} />
        <StatBox label="Sentences" value={sentences} />
        <StatBox label="Paragraphs" value={paragraphs} />
        <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center">
          <Clock size={16} className="mb-1 opacity-80" />
          <div className="text-xl font-bold">{readTime} min</div>
          <div className="text-xs opacity-80 uppercase">Read Time</div>
        </div>
      </div>

      <textarea
        className="flex-1 w-full p-6 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-slate-700 leading-relaxed text-lg"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">{label}</div>
  </div>
);

export default TextAnalyzer;
