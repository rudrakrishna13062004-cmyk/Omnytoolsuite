import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp } from 'lucide-react';

const FinanceCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);

  const data = useMemo(() => {
    const result = [];
    let currentBalance = principal;
    let totalContributed = principal;

    for (let i = 0; i <= years; i++) {
      result.push({
        year: i,
        balance: Math.round(currentBalance),
        invested: Math.round(totalContributed),
        interest: Math.round(currentBalance - totalContributed)
      });
      
      // Calculate next year
      for (let m = 0; m < 12; m++) {
        currentBalance += monthly;
        currentBalance *= (1 + (rate / 100) / 12);
        totalContributed += monthly;
      }
    }
    return result;
  }, [principal, monthly, rate, years]);

  const finalAmount = data[data.length - 1].balance;
  const totalInterest = data[data.length - 1].interest;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <DollarSign className="text-indigo-600" size={20} /> Parameters
          </h3>
          
          <InputGroup label="Initial Investment" value={principal} onChange={setPrincipal} prefix="$" />
          <InputGroup label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="$" />
          <InputGroup label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.1} />
          <InputGroup label="Time Period" value={years} onChange={setYears} suffix="Years" max={50} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-center">
           <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <TrendingUp className="text-green-600" size={20} /> Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl">
              <div className="text-sm text-indigo-600 font-medium">Future Balance</div>
              <div className="text-2xl font-bold text-indigo-900">${finalAmount.toLocaleString()}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="text-sm text-green-600 font-medium">Total Interest</div>
              <div className="text-2xl font-bold text-green-900">${totalInterest.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-[400px]">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Growth Projection</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(val) => `$${val/1000}k`} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, '']} />
            <Area type="monotone" dataKey="invested" stackId="1" stroke="#6366f1" fill="url(#colorInvested)" name="Principal" />
            <Area type="monotone" dataKey="interest" stackId="1" stroke="#10b981" fill="url(#colorBalance)" name="Interest" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const InputGroup: React.FC<{ 
  label: string; 
  value: number; 
  onChange: (v: number) => void; 
  prefix?: string; 
  suffix?: string;
  step?: number;
  max?: number;
}> = ({ label, value, onChange, prefix, suffix, step = 1, max }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <div className="relative rounded-md shadow-sm">
      {prefix && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-slate-500 sm:text-sm">{prefix}</span></div>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        step={step}
        max={max}
        className={`block w-full rounded-md border-slate-300 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border pl-3 ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-12' : ''}`}
      />
      {suffix && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="text-slate-500 sm:text-sm">{suffix}</span></div>}
    </div>
  </div>
);

export default FinanceCalculator;
