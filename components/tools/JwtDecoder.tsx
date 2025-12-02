import React, { useState, useEffect } from 'react';
import { Unlock, AlertCircle } from 'lucide-react';

const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState({});
  const [payload, setPayload] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setHeader({});
      setPayload({});
      setError('');
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');

      const decode = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      };

      setHeader(decode(parts[0]));
      setPayload(decode(parts[1]));
      setError('');
    } catch (e) {
      setError('Invalid Token');
      setHeader({});
      setPayload({});
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <label className="block text-sm font-medium text-slate-700 mb-2">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-4 border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none font-mono text-sm"
          placeholder="eyJh..."
        />
        {error && (
           <div className="mt-2 text-red-600 text-sm flex items-center gap-1">
             <AlertCircle size={14}/> {error}
           </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col">
           <div className="text-xs font-bold text-slate-500 uppercase mb-2">Header</div>
           <pre className="flex-1 bg-slate-800 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono min-h-[200px]">
             {JSON.stringify(header, null, 2)}
           </pre>
        </div>
        <div className="flex flex-col">
           <div className="text-xs font-bold text-slate-500 uppercase mb-2">Payload</div>
           <pre className="flex-1 bg-slate-800 text-blue-400 p-4 rounded-xl overflow-x-auto text-sm font-mono min-h-[200px]">
             {JSON.stringify(payload, null, 2)}
           </pre>
        </div>
      </div>
    </div>
  );
};

export default JwtDecoder;