import React, { useState } from 'react';
import { Eye, Code } from 'lucide-react';

const MarkdownPreview: React.FC = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown\n\nType on the left, see results on the right.\n\n## Features\n- **Bold** and *Italic*\n- Lists\n- Links`);

  // Simple Regex-based parser
  const parseMarkdown = (text: string) => {
    let html = text
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 border-b pb-2">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3 mt-4">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2 mt-3">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' class='max-w-full rounded-lg my-2' />")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' class='text-indigo-600 hover:underline'>$1</a>")
      .replace(/^\s*-\s+(.*)/gim, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n/gim, '<br />');

    return html;
  };

  return (
    <div className="h-[600px] flex flex-col md:flex-row gap-4">
      <div className="flex-1 flex flex-col">
        <div className="bg-slate-100 p-2 rounded-t-xl border border-slate-200 border-b-0 flex items-center gap-2 text-slate-600 text-sm font-medium">
          <Code size={16} /> Editor
        </div>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="flex-1 w-full p-4 border border-slate-200 rounded-b-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-indigo-50 p-2 rounded-t-xl border border-indigo-100 border-b-0 flex items-center gap-2 text-indigo-700 text-sm font-medium">
          <Eye size={16} /> Preview
        </div>
        <div 
          className="flex-1 bg-white p-6 border border-slate-200 rounded-b-xl shadow-sm overflow-y-auto prose prose-indigo max-w-none"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
        />
      </div>
    </div>
  );
};

export default MarkdownPreview;