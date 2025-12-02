import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { TOOLS } from './constants';
import { ToolCategory } from './types';
import { Menu, X, ChevronRight, Search, Zap } from 'lucide-react';

// Wrapper to handle navigation logic
const AppContent: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const activeToolId = location.pathname.replace('/', '');
  const activeTool = TOOLS.find(t => t.id === activeToolId);

  // Group tools by category for sidebar
  const categories = Object.values(ToolCategory);
  const toolsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = TOOLS.filter(t => t.category === cat);
    return acc;
  }, {} as Record<ToolCategory, typeof TOOLS>);

  const filteredTools = TOOLS.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  // Close sidebar on mobile when navigating
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
               <Zap size={20} fill="currentColor" />
             </div>
             <span className="text-xl font-bold text-slate-800">OmniTools</span>
          </div>

          <div className="p-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search tools..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
             </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
            {search ? (
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Search Results</div>
                {filteredTools.map(tool => (
                  <ToolLink key={tool.id} tool={tool} isActive={activeToolId === tool.id} onClick={() => navigate(`/${tool.id}`)} />
                ))}
                {filteredTools.length === 0 && <div className="text-sm text-slate-500 px-2">No tools found.</div>}
              </div>
            ) : (
              categories.map(cat => (
                <div key={cat}>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">{cat}</div>
                  <div className="space-y-1">
                    {toolsByCategory[cat].map(tool => (
                      <ToolLink key={tool.id} tool={tool} isActive={activeToolId === tool.id} onClick={() => navigate(`/${tool.id}`)} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </nav>

          <div className="p-4 border-t border-slate-100 text-xs text-slate-400 text-center">
            v1.0.0 • Built with React
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            {activeTool ? (
              <div className="flex items-center gap-2">
                <activeTool.icon className="text-indigo-600" size={24} />
                <h1 className="text-lg font-bold text-slate-800">{activeTool.name}</h1>
              </div>
            ) : (
              <h1 className="text-lg font-bold text-slate-800">Dashboard</h1>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50/50">
          <Routes>
            <Route path="/" element={<Dashboard tools={TOOLS} navigate={navigate} />} />
            {TOOLS.map(tool => (
              <Route key={tool.id} path={`/${tool.id}`} element={<div className="animate-in fade-in duration-300 max-w-5xl mx-auto"><tool.component /></div>} />
            ))}
          </Routes>
        </div>
      </main>
    </div>
  );
};

const ToolLink: React.FC<{ tool: any, isActive: boolean, onClick: () => void }> = ({ tool, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-indigo-50 text-indigo-700' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <tool.icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
    {tool.name}
  </button>
);

const Dashboard: React.FC<{ tools: any[], navigate: (p: string) => void }> = ({ tools, navigate }) => (
  <div className="max-w-6xl mx-auto">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
      <p className="text-slate-500">Select a utility to get started.</p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map(tool => (
        <button
          key={tool.id}
          onClick={() => navigate(`/${tool.id}`)}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all text-left group flex flex-col h-full"
        >
          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <tool.icon size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">{tool.name}</h3>
          <p className="text-sm text-slate-500 mb-4 flex-1">{tool.description}</p>
          <div className="flex items-center text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
            Open Tool <ChevronRight size={16} className="ml-1" />
          </div>
        </button>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
