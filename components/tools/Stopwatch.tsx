import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Flag, RotateCcw } from 'lucide-react';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      const start = Date.now() - time;
      intervalRef.current = window.setInterval(() => {
        setTime(Date.now() - start);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const centi = Math.floor((ms % 1000) / 10);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${centi.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    setLaps([time, ...laps]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="text-center py-8">
        <div className="text-6xl font-mono font-bold text-slate-800 tracking-wider">
          {formatTime(time)}
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {!isRunning ? (
          <button 
            onClick={() => setIsRunning(true)}
            className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 shadow-lg transition-transform active:scale-95"
          >
            <Play fill="currentColor" size={24} />
          </button>
        ) : (
          <button 
            onClick={() => setIsRunning(false)}
            className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 shadow-lg transition-transform active:scale-95"
          >
            <Pause fill="currentColor" size={24} />
          </button>
        )}
        
        <button 
          onClick={isRunning ? handleLap : handleReset}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
            isRunning 
              ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
          }`}
        >
          {isRunning ? <Flag size={24} /> : <RotateCcw size={24} />}
        </button>
      </div>

      {laps.length > 0 && (
        <div className="border-t border-slate-100 pt-4 max-h-60 overflow-y-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400">
                <th className="text-left py-2">Lap</th>
                <th className="text-right py-2">Time</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {laps.map((lapTime, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0 text-slate-600 font-mono">
                  <td className="py-2">#{laps.length - i}</td>
                  <td className="text-right py-2">
                    +{formatTime(lapTime - (laps[i + 1] || 0))}
                  </td>
                  <td className="text-right py-2 font-bold">{formatTime(lapTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
