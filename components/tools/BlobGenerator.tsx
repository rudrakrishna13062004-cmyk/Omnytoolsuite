import React, { useState, useEffect } from 'react';
import { RefreshCcw, Copy, Download } from 'lucide-react';

const BlobGenerator: React.FC = () => {
  const [complexity, setComplexity] = useState(10);
  const [contrast, setContrast] = useState(5);
  const [path, setPath] = useState('');
  const [color, setColor] = useState('#6366f1');

  // Simple blob generation logic (randomized polygon smoothed)
  // Note: A true spline implementation is complex, this is a simplified version for demonstration
  const generate = () => {
    const size = 200;
    const center = size / 2;
    const points = [];
    const numPoints = Math.max(3, complexity);
    const radius = size / 3;
    const randomization = contrast * 5;

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * randomization;
      const x = center + Math.cos(angle) * r;
      const y = center + Math.sin(angle) * r;
      points.push([x, y]);
    }

    // Catmull-Rom spline approximation for smooth blob
    if (points.length === 0) return;
    
    // Duplicate points for closing the loop
    const p = [...points, ...points.slice(0, 3)];
    let d = `M ${p[0][0]},${p[0][1]} `;

    // For a truly smooth blob without a library, we use quadratic curves between midpoints
    let pathStr = "";
    const len = points.length;
    for (let i = 0; i < len; i++) {
        const curr = points[i];
        const next = points[(i + 1) % len];
        const midX = (curr[0] + next[0]) / 2;
        const midY = (curr[1] + next[1]) / 2;
        if (i === 0) pathStr += `M ${midX},${midY} `;
        pathStr += `Q ${curr[0]},${curr[1]} ${midX},${midY} `;
    }
    pathStr += "Z";
    setPath(pathStr);
  };

  useEffect(generate, []);

  const svgString = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="${color}" d="${path}" /></svg>`;

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
           <label className="block text-sm font-medium text-slate-700 mb-2">Complexity</label>
           <input type="range" min="3" max="20" value={complexity} onChange={e => setComplexity(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600" />
           
           <label className="block text-sm font-medium text-slate-700 mt-4 mb-2">Contrast (Randomness)</label>
           <input type="range" min="0" max="15" value={contrast} onChange={e => setContrast(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600" />
           
           <label className="block text-sm font-medium text-slate-700 mt-4 mb-2">Color</label>
           <div className="flex gap-2">
             <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-10 w-10 rounded cursor-pointer border-0" />
             <input type="text" value={color} onChange={e => setColor(e.target.value)} className="flex-1 border border-slate-300 rounded-lg px-3" />
           </div>
        </div>
        
        <button onClick={generate} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700">
          <RefreshCcw size={20} /> Generate New
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-80 h-80 bg-white rounded-2xl shadow-lg border border-slate-200 flex items-center justify-center mb-6 overflow-hidden bg-checkerboard">
            <svg viewBox="0 0 200 200" width="100%" height="100%">
               <path fill={color} d={path} />
            </svg>
        </div>
        <div className="flex gap-4">
             <button onClick={() => navigator.clipboard.writeText(svgString)} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
               <Copy size={18} /> Copy SVG
             </button>
             <button 
                onClick={() => {
                    const blob = new Blob([svgString], {type: "image/svg+xml"});
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "blob.svg";
                    link.click();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium"
             >
               <Download size={18} /> Download
             </button>
        </div>
      </div>
    </div>
  );
};

export default BlobGenerator;