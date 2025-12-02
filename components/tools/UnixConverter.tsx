import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const UnixConverter: React.FC = () => {
  const [current, setCurrent] = useState(Math.floor(Date.now() / 1000));
  const [inputUnix, setInputUnix] = useState(current);
  const [inputDate, setInputDate] = useState(new Date().toISOString().slice(0, 16));

  useEffect(() => {
    const timer = setInterval(() => setCurrent(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnixChange = (val: number) => {
    setInputUnix(val);
    const date = new Date(val * 1000);
    // Safe format for datetime-local
    const pad = (n: number) => n.toString().padStart(2, '0');
    const localIso = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    setInputDate(localIso);
  };

  const handleDateChange = (val: string) => {
    setInputDate(val);
    const date = new Date(val);
    if (!isNaN(date.getTime())) {
      setInputUnix(Math.floor(date.getTime() / 1000));
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-xl text-center">
        <div className="text-sm text-slate-400 font-mono mb-2">CURRENT UNIX TIME</div>
        <div className="text-5xl font-mono font-bold tracking-widest text-green-400">{current}</div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
            <Clock size={16} /> Unix Timestamp (Seconds)
          </label>
          <input
            type="number"
            value={inputUnix}
            onChange={(e) => handleUnixChange(parseInt(e.target.value) || 0)}
            className="w-full p-3 border border-slate-300 rounded-lg font-mono text-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-center text-slate-400">
          ↓ ↑
        </div>

        <div>
           <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
            <Calendar size={16} /> Human Date (Local)
          </label>
          <input
            type="datetime-local"
            value={inputDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg font-mono text-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="pt-4 bg-slate-50 p-4 rounded-lg text-sm text-slate-600 space-y-1">
          <div className="flex justify-between"><span>UTC:</span> <span className="font-mono">{new Date(inputUnix * 1000).toUTCString()}</span></div>
          <div className="flex justify-between"><span>Local:</span> <span className="font-mono">{new Date(inputUnix * 1000).toString()}</span></div>
        </div>
      </div>
    </div>
  );
};

export default UnixConverter;