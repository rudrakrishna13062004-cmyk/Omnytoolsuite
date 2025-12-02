import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const MetaTagGenerator: React.FC = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow'
  });

  const code = `
<!-- Primary Meta Tags -->
<title>${form.title}</title>
<meta name="title" content="${form.title}" />
<meta name="description" content="${form.description}" />
<meta name="keywords" content="${form.keywords}" />
<meta name="author" content="${form.author}" />
<meta name="viewport" content="${form.viewport}" />
<meta name="robots" content="${form.robots}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${form.title}" />
<meta property="og:description" content="${form.description}" />
`.trim();

  const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 space-y-4">
        <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Site Information</h3>
        <Input label="Page Title" value={form.title} onChange={v => update('title', v)} placeholder="My Awesome Website" />
        <TextArea label="Description" value={form.description} onChange={v => update('description', v)} placeholder="A brief description of the content..." />
        <Input label="Keywords (comma separated)" value={form.keywords} onChange={v => update('keywords', v)} placeholder="react, tools, seo" />
        <Input label="Author" value={form.author} onChange={v => update('author', v)} placeholder="John Doe" />
        <div className="grid grid-cols-2 gap-4">
             <Input label="Viewport" value={form.viewport} onChange={v => update('viewport', v)} />
             <Input label="Robots" value={form.robots} onChange={v => update('robots', v)} />
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 overflow-hidden flex flex-col h-full min-h-[400px]">
        <div className="bg-slate-900 p-3 border-b border-slate-700 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase">HTML Output</span>
            <button 
                onClick={() => navigator.clipboard.writeText(code)}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-xs font-medium"
            >
                <Copy size={14} /> Copy
            </button>
        </div>
        <div className="p-4 overflow-auto">
            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">{code}</pre>
        </div>
      </div>
    </div>
  );
};

const Input: React.FC<{ label: string, value: string, onChange: (s: string) => void, placeholder?: string }> = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input 
            value={value} 
            onChange={e => onChange(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
            placeholder={placeholder}
        />
    </div>
);

const TextArea: React.FC<{ label: string, value: string, onChange: (s: string) => void, placeholder?: string }> = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <textarea
            value={value} 
            onChange={e => onChange(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm h-24 resize-none"
            placeholder={placeholder}
        />
    </div>
);

export default MetaTagGenerator;