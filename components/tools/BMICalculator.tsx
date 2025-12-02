import React, { useState } from 'react';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState(170); // cm
  const [weight, setWeight] = useState(70); // kg

  const bmi = weight / Math.pow(height / 100, 2);
  let status = "";
  let color = "";
  
  if (bmi < 18.5) { status = "Underweight"; color = "text-blue-500"; }
  else if (bmi < 25) { status = "Normal"; color = "text-green-500"; }
  else if (bmi < 30) { status = "Overweight"; color = "text-amber-500"; }
  else { status = "Obese"; color = "text-red-500"; }

  const percentage = Math.min(Math.max((bmi - 10) * 2.5, 0), 100);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <div className="space-y-8">
        <div>
          <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
            <span>Height</span>
            <span className="text-indigo-600">{height} cm</span>
          </label>
          <input
            type="range"
            min="100"
            max="220"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
            <span>Weight</span>
            <span className="text-indigo-600">{weight} kg</span>
          </label>
          <input
            type="range"
            min="30"
            max="150"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="text-center pt-4">
          <div className="text-sm text-slate-500 uppercase tracking-wide">Your BMI</div>
          <div className="text-5xl font-bold text-slate-800 my-2">{bmi.toFixed(1)}</div>
          <div className={`text-xl font-medium ${color}`}>{status}</div>
        </div>

        {/* Gauge */}
        <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/4 bg-blue-300"></div>
          <div className="absolute top-0 left-[25%] h-full w-1/4 bg-green-300"></div>
          <div className="absolute top-0 left-[50%] h-full w-1/4 bg-amber-300"></div>
          <div className="absolute top-0 left-[75%] h-full w-1/4 bg-red-300"></div>
          <div 
            className="absolute top-0 h-full w-1 bg-slate-800 shadow-xl scale-y-150 transition-all duration-300"
            style={{ left: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-slate-400 px-1">
          <span>10</span>
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
          <span>50</span>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
