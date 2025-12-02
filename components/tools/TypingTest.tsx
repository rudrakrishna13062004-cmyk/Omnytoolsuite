import React, { useState, useEffect, useRef } from 'react';
import { RefreshCcw, Timer } from 'lucide-react';

const TEXT = "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Simplicity is the soul of efficiency.";

const TypingTest: React.FC = () => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!startTime) setStartTime(Date.now());
    setInput(val);

    // Calculate stats
    if (val === TEXT) {
        setCompleted(true);
        const timeMin = (Date.now() - (startTime || Date.now())) / 60000;
        const words = TEXT.length / 5;
        setWpm(Math.round(words / timeMin));
    }
  };

  useEffect(() => {
    if (startTime && !completed) {
      const interval = setInterval(() => {
         const timeMin = (Date.now() - startTime) / 60000;
         const words = input.length / 5;
         setWpm(Math.round(words / timeMin));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, input, completed]);

  // Accuracy calc
  useEffect(() => {
      let errors = 0;
      input.split('').forEach((char, i) => {
          if (char !== TEXT[i]) errors++;
      });
      const total = input.length || 1;
      setAccuracy(Math.max(0, Math.round(((total - errors) / total) * 100)));
  }, [input]);

  const reset = () => {
      setInput('');
      setStartTime(null);
      setWpm(0);
      setAccuracy(100);
      setCompleted(false);
      inputRef.current?.focus();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="grid grid-cols-3 gap-4">
         <div className="bg-white p-4 rounded-xl shadow border border-slate-200 text-center">
             <div className="text-xs font-bold text-slate-400 uppercase">WPM</div>
             <div className="text-3xl font-bold text-indigo-600">{wpm}</div>
         </div>
         <div className="bg-white p-4 rounded-xl shadow border border-slate-200 text-center">
             <div className="text-xs font-bold text-slate-400 uppercase">Accuracy</div>
             <div className={`text-3xl font-bold ${accuracy < 90 ? 'text-amber-500' : 'text-green-500'}`}>{accuracy}%</div>
         </div>
         <button onClick={reset} className="bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl flex flex-col items-center justify-center transition-colors">
             <RefreshCcw size={20} className="mb-1" />
             <span className="text-xs font-bold uppercase">Reset</span>
         </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 relative">
          <div className="text-lg leading-relaxed text-slate-400 font-medium mb-4 select-none">
              {TEXT.split('').map((char, i) => {
                  let color = 'text-slate-300';
                  if (i < input.length) {
                      color = input[i] === char ? 'text-indigo-600' : 'text-red-500 bg-red-100';
                  }
                  return <span key={i} className={color}>{char}</span>;
              })}
          </div>
          
          <textarea 
            ref={inputRef}
            value={input}
            onChange={handleChange}
            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-32 opacity-50 focus:opacity-100 transition-opacity"
            placeholder="Start typing the text above..."
            disabled={completed}
          />
      </div>

      {completed && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Test Completed! 🎉</h3>
              <p className="text-slate-600">You typed {wpm} WPM with {accuracy}% accuracy.</p>
          </div>
      )}
    </div>
  );
};

export default TypingTest;