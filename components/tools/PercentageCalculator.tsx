import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const PercentageCalculator: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
      <CalcCard 
        title="What is X% of Y?" 
        render={(setRes) => {
          const [x, setX] = useState(15);
          const [y, setY] = useState(100);
          React.useEffect(() => setRes((x/100)*y), [x, y, setRes]);
          return (
            <div className="flex items-center gap-2">
                What is <Input val={x} set={setX} /> % of <Input val={y} set={setY} /> ?
            </div>
          );
        }}
      />
      
      <CalcCard 
        title="X is what % of Y?" 
        render={(setRes) => {
          const [x, setX] = useState(20);
          const [y, setY] = useState(50);
          React.useEffect(() => setRes((x/y)*100), [x, y, setRes]);
          return (
            <div className="flex items-center gap-2">
                <Input val={x} set={setX} /> is what % of <Input val={y} set={setY} /> ?
            </div>
          );
        }}
        suffix="%"
      />

      <CalcCard 
        title="Percentage Change" 
        render={(setRes) => {
          const [x, setX] = useState(50);
          const [y, setY] = useState(75);
          React.useEffect(() => {
              if (x === 0) setRes(0);
              else setRes(((y-x)/x)*100);
          }, [x, y, setRes]);
          return (
            <div className="flex items-center gap-2">
                Change from <Input val={x} set={setX} /> to <Input val={y} set={setY} /> ?
            </div>
          );
        }}
        suffix="%"
      />
    </div>
  );
};

const Input: React.FC<{ val: number, set: (n: number) => void }> = ({ val, set }) => (
    <input 
        type="number" 
        value={val} 
        onChange={e => set(parseFloat(e.target.value) || 0)}
        className="w-20 p-2 border border-slate-300 rounded-lg text-center font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none" 
    />
);

const CalcCard: React.FC<{ title: string, suffix?: string, render: (setRes: any) => React.ReactNode }> = ({ title, suffix, render }) => {
    const [result, setResult] = useState(0);
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">{title}</h3>
            <div className="mb-6 text-slate-700 font-medium">
                {render(setResult)}
            </div>
            <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                <span className="text-slate-400 font-medium">Result</span>
                <span className="text-2xl font-bold text-slate-800">
                    {Number.isFinite(result) ? result.toFixed(2).replace(/\.00$/, '') : '0'}{suffix}
                </span>
            </div>
        </div>
    );
};

export default PercentageCalculator;