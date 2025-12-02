import React, { useState } from 'react';
import { Delete, Eraser, Equal } from 'lucide-react';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(`${display} ${op} `);
    setIsNewNumber(true);
  };

  const handleMathFunc = (func: string) => {
    const val = parseFloat(display);
    let res = 0;
    switch (func) {
      case 'sin': res = Math.sin(val); break;
      case 'cos': res = Math.cos(val); break;
      case 'tan': res = Math.tan(val); break;
      case 'sqrt': res = Math.sqrt(val); break;
      case 'log': res = Math.log10(val); break;
      case 'ln': res = Math.log(val); break;
      case 'pow2': res = Math.pow(val, 2); break;
      default: return;
    }
    setDisplay(res.toString());
    setIsNewNumber(true);
  };

  const calculate = () => {
    try {
      // Safe evaluation for basic math
      const fullEq = equation + display;
      // eslint-disable-next-line no-eval
      const res = eval(fullEq.replace('×', '*').replace('÷', '/'));
      setDisplay(String(Number(res.toFixed(8)))); // clean up floats
      setEquation('');
      setIsNewNumber(true);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="mb-4 bg-slate-100 p-4 rounded-xl text-right">
        <div className="text-slate-500 text-sm h-5">{equation}</div>
        <div className="text-3xl font-bold text-slate-800 break-words">{display}</div>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {/* Scientific Row 1 */}
        <Btn onClick={() => handleMathFunc('sin')} secondary>sin</Btn>
        <Btn onClick={() => handleMathFunc('cos')} secondary>cos</Btn>
        <Btn onClick={() => handleMathFunc('tan')} secondary>tan</Btn>
        <Btn onClick={() => handleMathFunc('log')} secondary>log</Btn>
        <Btn onClick={() => handleMathFunc('ln')} secondary>ln</Btn>

        {/* Scientific Row 2 */}
        <Btn onClick={() => handleMathFunc('pow2')} secondary>x²</Btn>
        <Btn onClick={() => handleMathFunc('sqrt')} secondary>√</Btn>
        <Btn onClick={() => setDisplay(Math.PI.toString())} secondary>π</Btn>
        <Btn onClick={() => setDisplay(Math.E.toString())} secondary>e</Btn>
        <Btn onClick={() => { setDisplay(display.substring(0, display.length - 1) || '0') }} warning><Delete size={18} /></Btn>

        {/* Numpad Row 1 */}
        <Btn onClick={() => handleNumber('7')}>7</Btn>
        <Btn onClick={() => handleNumber('8')}>8</Btn>
        <Btn onClick={() => handleNumber('9')}>9</Btn>
        <Btn onClick={() => handleOperator('/')} accent>÷</Btn>
        <Btn onClick={clear} danger><Eraser size={18}/></Btn>

        {/* Numpad Row 2 */}
        <Btn onClick={() => handleNumber('4')}>4</Btn>
        <Btn onClick={() => handleNumber('5')}>5</Btn>
        <Btn onClick={() => handleNumber('6')}>6</Btn>
        <Btn onClick={() => handleOperator('*')} accent>×</Btn>
        <Btn onClick={() => handleNumber('(')} secondary>(</Btn>

        {/* Numpad Row 3 */}
        <Btn onClick={() => handleNumber('1')}>1</Btn>
        <Btn onClick={() => handleNumber('2')}>2</Btn>
        <Btn onClick={() => handleNumber('3')}>3</Btn>
        <Btn onClick={() => handleOperator('-')} accent>-</Btn>
        <Btn onClick={() => handleNumber(')')} secondary>)</Btn>

        {/* Numpad Row 4 */}
        <Btn onClick={() => handleNumber('0')}>0</Btn>
        <Btn onClick={() => handleNumber('.')}>.</Btn>
        <Btn onClick={() => handleNumber('%')}>%</Btn>
        <Btn onClick={() => handleOperator('+')} accent>+</Btn>
        <Btn onClick={calculate} primary><Equal size={20} /></Btn>
      </div>
    </div>
  );
};

const Btn: React.FC<{ 
  children: React.ReactNode; 
  onClick: () => void; 
  primary?: boolean; 
  secondary?: boolean; 
  accent?: boolean;
  danger?: boolean;
  warning?: boolean;
}> = ({ children, onClick, primary, secondary, accent, danger, warning }) => {
  let baseClass = "h-12 rounded-lg font-medium transition-all active:scale-95 flex items-center justify-center text-lg shadow-sm";
  if (primary) baseClass += " bg-indigo-600 text-white hover:bg-indigo-700";
  else if (secondary) baseClass += " bg-slate-200 text-slate-700 hover:bg-slate-300";
  else if (accent) baseClass += " bg-indigo-100 text-indigo-700 hover:bg-indigo-200";
  else if (danger) baseClass += " bg-red-100 text-red-600 hover:bg-red-200";
  else if (warning) baseClass += " bg-amber-100 text-amber-600 hover:bg-amber-200";
  else baseClass += " bg-white text-slate-800 hover:bg-slate-50 border border-slate-200";

  return <button onClick={onClick} className={baseClass}>{children}</button>;
};

export default ScientificCalculator;
