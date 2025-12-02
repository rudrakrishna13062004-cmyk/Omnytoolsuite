import React, { useState, useEffect } from 'react';
import { ShieldCheck, Copy } from 'lucide-react';

const HashGenerator: React.FC = () => {
  const [text, setText] = useState('Hello World');
  const [hashes, setHashes] = useState({ sha1: '', sha256: '', sha384: '', sha512: '' });

  useEffect(() => {
    const generate = async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      const toHex = (buf: ArrayBuffer) => {
        return Array.from(new Uint8Array(buf))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      };

      const [s1, s256, s384, s512] = await Promise.all([
        window.crypto.subtle.digest('SHA-1', data),
        window.crypto.subtle.digest('SHA-256', data),
        window.crypto.subtle.digest('SHA-384', data),
        window.crypto.subtle.digest('SHA-512', data),
      ]);

      setHashes({
        sha1: toHex(s1),
        sha256: toHex(s256),
        sha384: toHex(s384),
        sha512: toHex(s512)
      });
    };

    if (text) generate();
    else setHashes({ sha1: '', sha256: '', sha384: '', sha512: '' });
  }, [text]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <label className="block text-sm font-medium text-slate-700 mb-2">Input Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none"
          placeholder="Type something to hash..."
        />
      </div>

      <div className="space-y-4">
        <HashBox label="SHA-1" value={hashes.sha1} />
        <HashBox label="SHA-256" value={hashes.sha256} highlight />
        <HashBox label="SHA-384" value={hashes.sha384} />
        <HashBox label="SHA-512" value={hashes.sha512} />
      </div>
    </div>
  );
};

const HashBox: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div className={`p-4 rounded-xl border ${highlight ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200 shadow-sm'}`}>
    <div className="flex justify-between items-center mb-2">
      <span className={`text-xs font-bold uppercase ${highlight ? 'text-indigo-600' : 'text-slate-500'}`}>{label}</span>
      <button 
        onClick={() => navigator.clipboard.writeText(value)}
        className="text-slate-400 hover:text-indigo-600"
      >
        <Copy size={14} />
      </button>
    </div>
    <div className="font-mono text-sm break-all text-slate-700">
      {value || '...'}
    </div>
  </div>
);

export default HashGenerator;