import React, { useState, useMemo } from 'react';

const DiffViewer: React.FC = () => {
  const [textA, setTextA] = useState('Line 1\nLine 2\nLine 3\nLine 4');
  const [textB, setTextB] = useState('Line 1\nLine 2 changed\nLine 4\nLine 5');

  const diff = useMemo(() => {
    const linesA = textA.split('\n');
    const linesB = textB.split('\n');
    const maxLength = Math.max(linesA.length, linesB.length);
    
    const result = [];
    
    // Very naive line-by-line diff for demonstration purposes
    // A production app would use 'diff' library for Myers algorithm
    for (let i = 0; i < maxLength; i++) {
      const a = linesA[i];
      const b = linesB[i];

      if (a === b) {
        result.push({ type: 'same', content: a, line: i + 1 });
      } else {
        if (a !== undefined) result.push({ type: 'removed', content: a, line: i + 1 });
        if (b !== undefined) result.push({ type: 'added', content: b, line: i + 1 });
      }
    }
    return result;
  }, [textA, textB]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 h-[600px]">
      <div className="grid md:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col">
           <label className="text-sm font-bold text-slate-700 mb-2">Original Text</label>
           <textarea
             value={textA}
             onChange={(e) => setTextA(e.target.value)}
             className="flex-1 w-full p-4 border border-slate-300 rounded-xl focus:ring-indigo-500 outline-none resize-none font-mono text-sm"
           />
        </div>
        <div className="flex flex-col">
           <label className="text-sm font-bold text-slate-700 mb-2">Modified Text</label>
           <textarea
             value={textB}
             onChange={(e) => setTextB(e.target.value)}
             className="flex-1 w-full p-4 border border-slate-300 rounded-xl focus:ring-indigo-500 outline-none resize-none font-mono text-sm"
           />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="bg-slate-100 p-2 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">Diff Result</div>
        <div className="overflow-y-auto p-4 font-mono text-sm space-y-0.5">
          {diff.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex ${
                item.type === 'added' ? 'bg-green-100 text-green-800' :
                item.type === 'removed' ? 'bg-red-100 text-red-800 line-through decoration-red-400/50' :
                'text-slate-600'
              }`}
            >
               <div className="w-8 shrink-0 text-right pr-3 select-none opacity-50 text-xs py-0.5">{item.line}</div>
               <div className="whitespace-pre-wrap py-0.5 w-full break-all">
                 {item.type === 'added' && '+ '}
                 {item.type === 'removed' && '- '}
                 {item.content}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiffViewer;