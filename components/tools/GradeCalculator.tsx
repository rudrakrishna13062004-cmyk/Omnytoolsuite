import React, { useState } from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface Assignment {
  id: number;
  name: string;
  weight: number;
  grade: number;
}

const GradeCalculator: React.FC = () => {
  const [items, setItems] = useState<Assignment[]>([
    { id: 1, name: 'Homework', weight: 20, grade: 85 },
    { id: 2, name: 'Midterm', weight: 30, grade: 78 },
    { id: 3, name: 'Final', weight: 50, grade: 92 },
  ]);

  const addRow = () => {
    setItems([...items, { id: Date.now(), name: 'New Item', weight: 0, grade: 0 }]);
  };

  const removeRow = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  const update = (id: number, field: keyof Assignment, val: string | number) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: val } : i));
  };

  const totalWeight = items.reduce((sum, i) => sum + i.weight, 0);
  const weightedSum = items.reduce((sum, i) => sum + (i.grade * (i.weight / 100)), 0);
  // If weights don't add to 100, normalize? Or just show current. 
  // Let's assume weights are absolute percentages for simplicity, 
  // but better to calculate 'Current Grade' based on total weight so far.
  const currentGrade = totalWeight > 0 ? (items.reduce((sum, i) => sum + (i.grade * i.weight), 0) / totalWeight) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Assignments</h3>
                <button onClick={addRow} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors">
                    <Plus size={20} />
                </button>
            </div>
            
            <div className="space-y-3">
                <div className="grid grid-cols-12 gap-2 text-xs font-bold text-slate-400 uppercase px-2">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-3">Weight %</div>
                    <div className="col-span-3">Grade %</div>
                    <div className="col-span-1"></div>
                </div>
                {items.map(item => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                        <input 
                            className="col-span-5 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={item.name}
                            onChange={(e) => update(item.id, 'name', e.target.value)}
                            placeholder="Assignment"
                        />
                        <input 
                            className="col-span-3 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            type="number"
                            value={item.weight}
                            onChange={(e) => update(item.id, 'weight', parseFloat(e.target.value) || 0)}
                        />
                        <input 
                            className="col-span-3 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            type="number"
                            value={item.grade}
                            onChange={(e) => update(item.id, 'grade', parseFloat(e.target.value) || 0)}
                        />
                        <button 
                            onClick={() => removeRow(item.id)}
                            className="col-span-1 text-slate-400 hover:text-red-500 flex justify-center"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 mb-4 opacity-80">
                    <GraduationCap size={20} /> Results
                </div>
                <div className="text-5xl font-bold mb-2">{currentGrade.toFixed(2)}%</div>
                <div className="text-sm opacity-70">Current Average</div>
            </div>
            
            <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="opacity-80">Total Weight</span>
                    <span className="font-bold">{totalWeight}%</span>
                </div>
                {totalWeight < 100 && (
                    <div className="text-xs bg-white/20 p-2 rounded text-center mt-2">
                        {100 - totalWeight}% weight remaining
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default GradeCalculator;