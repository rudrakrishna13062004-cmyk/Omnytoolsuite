import React, { useEffect, useState } from 'react';
import { Keyboard } from 'lucide-react';

const KeycodeInfo: React.FC = () => {
  const [event, setEvent] = useState<KeyboardEvent | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      setEvent(e);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="max-w-3xl mx-auto h-[500px] flex flex-col items-center justify-center outline-none" tabIndex={0}>
      {!event ? (
        <div className="text-center animate-pulse">
            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Keyboard size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">Press any key</h3>
            <p className="text-slate-400">The javascript event info will appear here</p>
        </div>
      ) : (
        <div className="w-full space-y-8 animate-in zoom-in-95 duration-200">
            <div className="text-center">
                <div className="text-8xl font-bold text-indigo-600 font-mono mb-2">{event.keyCode}</div>
                <div className="text-slate-400 uppercase tracking-widest font-medium">event.keyCode</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard label="event.key" value={event.key === ' ' ? '(Space)' : event.key} />
                <InfoCard label="event.code" value={event.code} />
                <InfoCard label="event.which" value={event.which.toString()} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <MetaCard label="Shift" active={event.shiftKey} />
                <MetaCard label="Ctrl" active={event.ctrlKey} />
                <MetaCard label="Alt" active={event.altKey} />
                <MetaCard label="Meta" active={event.metaKey} />
            </div>
        </div>
      )}
    </div>
  );
};

const InfoCard: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 text-center">
        <div className="text-slate-500 text-sm font-medium mb-1">{label}</div>
        <div className="text-xl font-bold text-slate-800 font-mono break-all">{value}</div>
    </div>
);

const MetaCard: React.FC<{ label: string, active: boolean }> = ({ label, active }) => (
    <div className={`p-3 rounded-xl border text-center font-medium transition-colors ${
        active 
        ? 'bg-green-500 border-green-600 text-white shadow-md' 
        : 'bg-slate-50 border-slate-200 text-slate-400'
    }`}>
        {label}
    </div>
);

export default KeycodeInfo;