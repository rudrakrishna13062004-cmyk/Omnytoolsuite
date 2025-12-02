import React, { useState } from 'react';
import { Radio } from 'lucide-react';

const MORSE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MAP = Object.entries(MORSE_MAP).reduce((acc, [char, code]) => {
  acc[code] = char;
  return acc;
}, {} as Record<string, string>);

const MorseConverter: React.FC = () => {
  const [text, setText] = useState('SOS');
  const [morse, setMorse] = useState('... --- ...');

  const handleTextChange = (val: string) => {
    setText(val);
    const m = val.toUpperCase().split('').map(c => MORSE_MAP[c] || c).join(' ');
    setMorse(m);
  };

  const handleMorseChange = (val: string) => {
    setMorse(val);
    const t = val.split(' ').map(c => REVERSE_MAP[c] || c).join('');
    setText(t);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-slate-800 text-green-400 p-6 rounded-2xl font-mono text-center shadow-lg border-4 border-slate-700">
         <Radio className="mx-auto mb-2 opacity-50" />
         <div className="text-3xl break-words">{morse || '...'}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Text (Alpha-Numeric)</label>
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full h-32 p-4 rounded-xl border border-slate-300 focus:ring-indigo-500 outline-none uppercase"
            placeholder="TYPE HERE..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Morse (Dots . Dashes -)</label>
          <textarea
            value={morse}
            onChange={(e) => handleMorseChange(e.target.value)}
            className="w-full h-32 p-4 rounded-xl border border-slate-300 focus:ring-indigo-500 outline-none font-mono"
            placeholder="... --- ..."
          />
        </div>
      </div>
    </div>
  );
};

export default MorseConverter;