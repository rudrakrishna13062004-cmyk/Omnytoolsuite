import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';

const DateDifference: React.FC = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const diff = (() => {
      if (!start || !end) return null;
      const d1 = new Date(start);
      const d2 = new Date(end);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30);
      const days = Math.floor((diffDays % 365) % 30);

      return { total: diffDays, y: years, m: months, d: days };
  })();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
       <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
           <CalendarDays className="text-indigo-600"/> Date Duration
       </h3>

       <div className="space-y-4 mb-8">
           <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
               <input type="date" value={start} onChange={e => setStart(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
           </div>
           <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
               <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
           </div>
       </div>

       {diff ? (
           <div className="text-center animate-in fade-in zoom-in-95">
               <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-4">
                   <div className="text-4xl font-bold text-indigo-700 mb-1">{diff.total.toLocaleString()}</div>
                   <div className="text-xs text-indigo-400 uppercase font-bold tracking-widest">Total Days</div>
               </div>
               <div className="text-slate-500 font-medium">
                   {diff.y > 0 && <span>{diff.y} Years, </span>}
                   {diff.m > 0 && <span>{diff.m} Months, </span>}
                   <span>{diff.d} Days</span>
               </div>
           </div>
       ) : (
           <div className="text-center text-slate-400 py-8">
               Select two dates to calculate duration
           </div>
       )}
    </div>
  );
};

export default DateDifference;