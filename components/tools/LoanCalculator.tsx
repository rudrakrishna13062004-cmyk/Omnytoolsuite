import React, { useState } from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState(250000);
  const [rate, setRate] = useState(5.5);
  const [years, setYears] = useState(30);

  const calculateLoan = () => {
    const r = rate / 100 / 12;
    const n = years * 12;
    
    // Monthly Payment Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    let monthly = 0;
    if (rate > 0) {
      monthly = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      monthly = amount / n;
    }

    const totalPaid = monthly * n;
    const totalInterest = totalPaid - amount;

    return { monthly, totalPaid, totalInterest };
  };

  const { monthly, totalPaid, totalInterest } = calculateLoan();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 space-y-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Loan Details</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Loan Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Interest Rate (%)</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Loan Term (Years)</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-center space-y-6">
        <div className="text-center p-6 bg-indigo-50 rounded-xl border border-indigo-100">
          <div className="text-indigo-600 font-medium mb-1">Monthly Payment</div>
          <div className="text-4xl font-bold text-indigo-900">${monthly.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50">
            <span className="text-slate-600">Total Principal</span>
            <span className="font-semibold text-slate-800">${amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50">
            <span className="text-slate-600">Total Interest</span>
            <span className="font-semibold text-amber-600">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="h-px bg-slate-200 my-2"></div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
            <span className="font-bold text-slate-800">Total Cost</span>
            <span className="font-bold text-slate-900">${totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;