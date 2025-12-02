import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';

const Metronome: React.FC = () => {
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(0); // For visualizer
  
  const audioContext = useRef<AudioContext | null>(null);
  const nextNoteTime = useRef(0);
  const timerID = useRef<number | null>(null);
  const lookahead = 25.0; // ms
  const scheduleAheadTime = 0.1; // s

  const playClick = (time: number) => {
    if (!audioContext.current) return;
    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.current.destination);

    osc.frequency.value = 1000;
    gain.gain.value = 1;
    
    osc.start(time);
    osc.stop(time + 0.05);

    // Visual trigger sync
    setTimeout(() => {
      setBeat(b => (b + 1) % 4);
    }, (time - audioContext.current.currentTime) * 1000);
  };

  const scheduler = () => {
    if (!audioContext.current) return;
    while (nextNoteTime.current < audioContext.current.currentTime + scheduleAheadTime) {
      playClick(nextNoteTime.current);
      const secondsPerBeat = 60.0 / bpm;
      nextNoteTime.current += secondsPerBeat;
    }
    timerID.current = window.setTimeout(scheduler, lookahead);
  };

  useEffect(() => {
    if (isPlaying) {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      nextNoteTime.current = audioContext.current.currentTime + 0.05;
      scheduler();
    } else {
      if (timerID.current) window.clearTimeout(timerID.current);
    }
    return () => {
      if (timerID.current) window.clearTimeout(timerID.current);
    };
  }, [isPlaying, bpm]);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          {[0, 1, 2, 3].map(i => (
             <div 
               key={i} 
               className={`w-4 h-12 rounded-full transition-colors duration-75 ${beat === i && isPlaying ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-200'}`}
             ></div>
          ))}
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-slate-800 font-mono">{bpm}</div>
        <div className="text-sm text-slate-400 uppercase tracking-widest mt-1">BPM</div>
      </div>

      <input
        type="range"
        min="40"
        max="220"
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-8"
      />

      <div className="flex justify-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
            isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white`}
        >
          {isPlaying ? <Square fill="currentColor" size={24} /> : <Play fill="currentColor" size={32} className="ml-1" />}
        </button>
      </div>
    </div>
  );
};

export default Metronome;