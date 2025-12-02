import React, { useState } from 'react';
import { Dices } from 'lucide-react';

const DiceRoller: React.FC = () => {
  const [numDice, setNumDice] = useState(1);
  const [results, setResults] = useState([1]);
  const [isRolling, setIsRolling] = useState(false);

  const roll = () => {
    setIsRolling(true);
    // Animation effect
    let count = 0;
    const interval = setInterval(() => {
      setResults(Array(numDice).fill(0).map(() => Math.floor(Math.random() * 6) + 1));
      count++;
      if (count > 10) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 50);
  };

  const total = results.reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-700 mb-2">Number of Dice: {numDice}</label>
        <input
          type="range"
          min="1"
          max="6"
          value={numDice}
          onChange={(e) => {
             const n = Number(e.target.value);
             setNumDice(n);
             setResults(Array(n).fill(1));
          }}
          className="w-48 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-12 min-h-[120px]">
        {results.map((val, i) => (
          <Die key={i} value={val} isRolling={isRolling} />
        ))}
      </div>

      <div className="mb-8">
        <div className="text-sm text-slate-400 uppercase tracking-widest">Total</div>
        <div className="text-4xl font-bold text-slate-800">{total}</div>
      </div>

      <button
        onClick={roll}
        disabled={isRolling}
        className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
      >
        <Dices /> Roll Dice
      </button>
    </div>
  );
};

const Die: React.FC<{ value: number; isRolling: boolean }> = ({ value, isRolling }) => {
  const dots: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };

  return (
    <div className={`w-24 h-24 bg-white border-2 border-slate-200 rounded-2xl shadow-lg flex flex-wrap p-4 content-between justify-between transition-transform duration-100 ${isRolling ? 'rotate-12 scale-110' : ''}`}>
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <div key={i} className={`w-4 h-4 rounded-full ${dots[value].includes(i) ? 'bg-slate-800' : 'bg-transparent'}`}></div>
      ))}
    </div>
  );
};

export default DiceRoller;