import React, { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [isEncode, setIsEncode] = useState(true);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    try {
      if (!input) {
        setOutput('');
        setError('');
        return;
      }
      if (isEncode) {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
      setError('');
    } catch (e) {
      setError('Invalid input for decoding');
    }
  }, [input, isEncode]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-center mb-6">
        <div className="bg-slate-100 p-1 rounded-lg flex">
          <button 
            onClick={() => setIsEncode(true)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${isEncode ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Encode
          </button>
          <button 
            onClick={() => setIsEncode(false)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${!isEncode ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">{isEncode ? 'Text' : 'Base64'}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none h-64 font-mono text-sm"
            placeholder={isEncode ? "Type text to encode..." : "Paste Base64 to decode..."}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">{isEncode ? 'Base64' : 'Text'}</label>
          <div className="relative flex-1">
             <textarea
              readOnly
              value={output}
              className={`w-full h-64 p-4 rounded-xl border ${error ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-slate-50'} outline-none resize-none font-mono text-sm`}
              placeholder="Result will appear here..."
            />
            {error && <div className="absolute bottom-4 left-4 text-red-600 text-xs font-medium bg-red-100 px-2 py-1 rounded">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Converter;