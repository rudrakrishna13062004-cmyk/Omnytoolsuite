import React, { useState } from 'react';
import { Users, Receipt } from 'lucide-react';

const TipCalculator: React.FC = () => {
  const [bill, setBill] = useState(100);
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(2);

  const tipAmount = bill * (tip / 100);
  const total = bill + tipAmount;
  const perPerson = total / people;

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Bill Amount</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">$</div>
            <input 
              type="number" 
              value={bill}
              onChange={(e) => setBill(parseFloat(e.target.value) || 0)}
              className="block w-full rounded-lg border-slate-300 py-2 pl-8 pr-4 border focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
            <span>Tip Percentage</span>
            <span className="text-indigo-600 font-bold">{tip}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={tip}
            onChange={(e) => setTip(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between mt-2">
            {[10, 15, 20, 25].map(t => (
              <button 
                key={t} 
                onClick={() => setTip(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${tip === t ? 'bg-indigo-600 text-white border-indigo-600' : 'text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                {t}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Split Between</label>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPeople(Math.max(1, people - 1))}
              className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 font-bold"
            >-</button>
            <div className="flex-1 text-center font-bold text-slate-800 flex items-center justify-center gap-2">
              <Users size={18} className="text-slate-400" /> {people}
            </div>
            <button 
              onClick={() => setPeople(people + 1)}
              className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 font-bold"
            >+</button>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-6 space-y-4 border border-indigo-100">
          <div className="flex justify-between items-center">
             <span className="text-indigo-800 text-sm font-medium">Tip Amount</span>
             <span className="text-indigo-900 font-bold">${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-indigo-800 text-sm font-medium">Total Bill</span>
             <span className="text-indigo-900 font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="h-px bg-indigo-200"></div>
          <div className="flex justify-between items-end">
             <span className="text-indigo-800 font-bold flex items-center gap-2"><Receipt size={18}/> Per Person</span>
             <span className="text-3xl font-bold text-indigo-600">${perPerson.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;
