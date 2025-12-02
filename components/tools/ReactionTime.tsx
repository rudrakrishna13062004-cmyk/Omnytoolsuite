import React, { useState, useRef } from 'react';
import { Gamepad2, RotateCcw } from 'lucide-react';

type State = 'idle' | 'waiting' | 'ready' | 'result' | 'early';

const ReactionTime: React.FC = () => {
  const [state, setState] = useState<State>('idle');
  const [time, setTime] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);

  const start = () => {
    setState('waiting');
    const delay = 2000 + Math.random() * 3000;
    timerRef.current = window.setTimeout(() => {
      setState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (state === 'idle') {
      start();
    } else if (state === 'waiting') {
      if (timerRef.current) clearTimeout(timerRef.current);
      setState('early');
    } else if (state === 'ready') {
      const diff = Date.now() - startTimeRef.current;
      setTime(diff);
      setState('result');
    } else if (state === 'result' || state === 'early') {
      start();
    }
  };

  const getUI = () => {
    switch (state) {
      case 'idle':
        return { bg: 'bg-slate-800', icon: <Gamepad2 size={48}/>, title: 'Reaction Time Test', text: 'Click anywhere to start' };
      case 'waiting':
        return { bg: 'bg-rose-500', icon: <div className="text-4xl">...</div>, title: 'Wait for Green', text: 'Prepare yourself...' };
      case 'ready':
        return { bg: 'bg-emerald-500', icon: <div className="text-4xl">GO!</div>, title: 'CLICK!', text: 'Click as fast as you can!' };
      case 'result':
        return { bg: 'bg-indigo-600', icon: <div className="text-6xl font-mono">{time}ms</div>, title: 'Nice!', text: 'Click to try again' };
      case 'early':
        return { bg: 'bg-amber-500', icon: <RotateCcw size={48}/>, title: 'Too Soon!', text: 'You clicked before green. Click to retry.' };
    }
  };

  const ui = getUI();

  return (
    <div 
      onMouseDown={handleClick}
      className={`max-w-3xl mx-auto h-[500px] rounded-3xl shadow-2xl cursor-pointer select-none transition-colors duration-200 flex flex-col items-center justify-center text-white ${ui.bg}`}
    >
      <div className="mb-6 animate-bounce-slow">
        {ui.icon}
      </div>
      <h2 className="text-4xl font-bold mb-2">{ui.title}</h2>
      <p className="text-lg opacity-80">{ui.text}</p>
    </div>
  );
};

export default ReactionTime;