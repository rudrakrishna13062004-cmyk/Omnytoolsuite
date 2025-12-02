import React, { useState } from 'react';
import { Link } from 'lucide-react';

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  
  const encoded = encodeURIComponent(input);
  let decoded = '';
  try {
    decoded = decodeURIComponent(input);
  } catch(e) { decoded = 'Invalid URI'; }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
          <Link size={16}/> Input String
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 border border-slate-300 rounded-xl focus:ring-indigo-500 outline-none h-32 resize-none"
          placeholder="Enter text or URL to process..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ResultBox label="Encoded (Safe for URL params)" value={encoded} />
        <ResultBox label="Decoded (Readable string)" value={decoded} />
      </div>
    </div>
  );
};

const ResultBox: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col h-48">
    <div className="text-xs font-bold text-slate-500 uppercase mb-2">{label}</div>
    <textarea 
      readOnly 
      value={value} 
      className="flex-1 bg-transparent resize-none outline-none font-mono text-sm text-slate-700"
    />
  </div>
);

export default UrlEncoder;