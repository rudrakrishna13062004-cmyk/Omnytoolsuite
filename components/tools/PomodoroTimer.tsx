import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';

const MODES = {
  work: { label: 'Focus', minutes: 25, color: 'bg-red-500', text: 'text-red-500', bgSoft: 'bg-red-50' },
  short: { label: 'Short Break', minutes: 5, color: 'bg-teal-500', text: 'text-teal-500', bgSoft: 'bg-teal-50' },
  long: { label: 'Long Break', minutes: 15, color: 'bg-blue-500', text: 'text-blue-500', bgSoft: 'bg-blue-50' },
};

const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<keyof typeof MODES>('work');
  const [timeLeft, setTimeLeft] = useState(MODES.work.minutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play sound here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const switchMode = (newMode: keyof typeof MODES) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(MODES[newMode].minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentConfig = MODES[mode];

  return (
    <div className={`max-w-md mx-auto ${currentConfig.bgSoft} p-8 rounded-2xl shadow-lg border border-slate-200 transition-colors duration-500`}>
      <div className="flex justify-center gap-2 mb-8 bg-white/50 p-1 rounded-xl backdrop-blur-sm">
        <ModeBtn 
          active={mode === 'work'} 
          onClick={() => switchMode('work')} 
          label="Focus"
          icon={Briefcase}
        />
        <ModeBtn 
          active={mode === 'short'} 
          onClick={() => switchMode('short')} 
          label="Short"
          icon={Coffee}
        />
        <ModeBtn 
          active={mode === 'long'} 
          onClick={() => switchMode('long')} 
          label="Long"
          icon={Coffee}
        />
      </div>

      <div className="text-center mb-8">
        <div className={`text-8xl font-bold ${currentConfig.text} font-mono tracking-tighter`}>
          {formatTime(timeLeft)}
        </div>
        <div className={`text-lg font-medium ${currentConfig.text} opacity-75 mt-2`}>
          {isActive ? 'Running' : 'Paused'}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`h-16 px-8 rounded-2xl ${currentConfig.color} text-white font-bold text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2`}
        >
          {isActive ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
          {isActive ? 'PAUSE' : 'START'}
        </button>
        <button
          onClick={() => { setIsActive(false); setTimeLeft(currentConfig.minutes * 60); }}
          className="h-16 w-16 bg-white text-slate-500 rounded-2xl shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
        >
          <RotateCcw />
        </button>
      </div>
    </div>
  );
};

const ModeBtn: React.FC<{ active: boolean; onClick: () => void; label: string; icon: any }> = ({ active, onClick, label, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
      active ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:bg-white/50'
    }`}
  >
    <Icon size={14} /> {label}
  </button>
);

export default PomodoroTimer;