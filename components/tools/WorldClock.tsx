import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const ZONES = [
  { name: 'Los Angeles', zone: 'America/Los_Angeles' },
  { name: 'New York', zone: 'America/New_York' },
  { name: 'London', zone: 'Europe/London' },
  { name: 'Paris', zone: 'Europe/Paris' },
  { name: 'Mumbai', zone: 'Asia/Kolkata' },
  { name: 'Tokyo', zone: 'Asia/Tokyo' },
  { name: 'Sydney', zone: 'Australia/Sydney' },
  { name: 'UTC', zone: 'UTC' },
];

const WorldClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-center relative overflow-hidden">
            <Clock className="absolute -right-6 -bottom-6 text-indigo-500 opacity-50" size={120} />
            <div className="text-indigo-200 font-medium mb-1">Local Time</div>
            <div className="text-4xl font-bold mb-2">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-indigo-100">
                {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
        </div>

        {ZONES.map((city) => (
            <div key={city.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between h-32 hover:border-indigo-200 transition-colors">
                <div className="flex justify-between items-start">
                    <span className="text-slate-500 font-medium text-sm uppercase tracking-wide">{city.name}</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">
                        {city.zone.split('/')[0]}
                    </span>
                </div>
                <div>
                    <div className="text-3xl font-bold text-slate-800">
                        {time.toLocaleTimeString('en-US', { timeZone: city.zone, hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                        {time.toLocaleDateString('en-US', { timeZone: city.zone, weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;