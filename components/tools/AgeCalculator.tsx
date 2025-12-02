import React, { useState } from 'react';
import { Cake } from 'lucide-react';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  
  const calculateAge = () => {
    if (!birthDate) return null;
    const start = new Date(birthDate);
    const end = new Date();
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return { years, months, days, totalDays };
  };

  const age = calculateAge();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mb-4">
          <Cake size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Age Calculator</h3>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
        <input 
          type="date" 
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="block w-full rounded-lg border-slate-300 py-3 px-4 border focus:ring-pink-500 focus:border-pink-500 shadow-sm"
        />
      </div>

      {age && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-sm font-medium opacity-90 mb-1">You are</div>
            <div className="text-4xl font-bold mb-1">{age.years} <span className="text-lg font-normal">Years</span></div>
            <div className="flex justify-center gap-2 text-sm opacity-90">
              <span>{age.months} Months</span>
              <span>•</span>
              <span>{age.days} Days</span>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
            <span className="text-slate-500 text-sm">Total Days Alive</span>
            <span className="text-slate-800 font-bold font-mono text-lg">{age.totalDays.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
