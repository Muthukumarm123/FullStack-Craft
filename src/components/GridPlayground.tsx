import React, { useState } from 'react';
import { Copy, Check, Plus, Minus } from 'lucide-react';

export const GridPlayground: React.FC = () => {
  const [columns, setColumns] = useState<number>(3);
  const [columnMode, setColumnMode] = useState<'fr' | 'autofit' | 'fixed'>('fr');
  const [gap, setGap] = useState<number>(16);
  const [itemCount, setItemCount] = useState<number>(6);
  const [featuredItem, setFeaturedItem] = useState<number | null>(1); // Item 1 spans 2 cols
  const [copied, setCopied] = useState(false);

  const getTemplateColumns = () => {
    if (columnMode === 'autofit') return 'repeat(auto-fit, minmax(180px, 1fr))';
    if (columnMode === 'fixed') return `repeat(${columns}, 140px)`;
    return `repeat(${columns}, 1fr)`;
  };

  const templateColumnsStr = getTemplateColumns();

  const cssString = `.grid-container {
  display: grid;
  grid-template-columns: ${templateColumnsStr};
  gap: ${gap}px;
}

${featuredItem ? `/* Featured item spanning 2 columns */
.item:nth-child(${featuredItem}) {
  grid-column: span 2;
}` : ''}
.item {
  padding: 1.5rem;
  border-radius: 8px;
}`;

  const copyCss = () => {
    navigator.clipboard.writeText(cssString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Interactive CSS Grid Visualizer
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Explore 2-dimensional layouts, repeat(), fr units, minmax auto-fit, and grid-column spanning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Controls Column */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          <h2 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
            Grid Container Controls
          </h2>

          {/* Sizing mode */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">
              Column Sizing Strategy
            </label>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setColumnMode('fr')}
                className={`px-3 py-2 text-xs rounded text-left transition-colors cursor-pointer ${
                  columnMode === 'fr'
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Fractional: repeat({columns}, 1fr)
              </button>
              <button
                onClick={() => setColumnMode('autofit')}
                className={`px-3 py-2 text-xs rounded text-left transition-colors cursor-pointer ${
                  columnMode === 'autofit'
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Responsive: repeat(auto-fit, minmax(180px, 1fr))
              </button>
              <button
                onClick={() => setColumnMode('fixed')}
                className={`px-3 py-2 text-xs rounded text-left transition-colors cursor-pointer ${
                  columnMode === 'fixed'
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Fixed Width: repeat({columns}, 140px)
              </button>
            </div>
          </div>

          {/* Column count slider if fr or fixed */}
          {columnMode !== 'autofit' && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Column Count</span>
                <span className="font-mono text-indigo-400">{columns} cols</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={columns}
                onChange={e => setColumns(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          )}

          {/* Gap slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">gap</span>
              <span className="font-mono text-indigo-400">{gap}px</span>
            </div>
            <input
              type="range"
              min="4"
              max="40"
              step="4"
              value={gap}
              onChange={e => setGap(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Spanning trigger */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">
              Column Span Demo (grid-column: span 2)
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setFeaturedItem(featuredItem === 1 ? null : 1)}
                className={`flex-1 py-1.5 text-xs rounded transition-colors cursor-pointer ${
                  featuredItem === 1
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {featuredItem === 1 ? 'Span Item 1 Active' : 'Enable Span on Item 1'}
              </button>
            </div>
          </div>

          {/* Number of items */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">
              Number of Grid Items: {itemCount}
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setItemCount(prev => Math.max(3, prev - 1))}
                className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setItemCount(prev => Math.min(12, prev + 1))}
                className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Stage & CSS Output */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Live Visual CSS Grid</span>
              <span className="text-[11px] text-slate-500 font-mono">
                {templateColumnsStr}
              </span>
            </div>

            <div className="p-6 bg-slate-950/50 min-h-[340px] flex items-center justify-center overflow-auto">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: templateColumnsStr,
                  gap: `${gap}px`,
                  width: '100%',
                  border: '1px dashed #6366f1',
                  borderRadius: '10px',
                  padding: '16px',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)'
                }}
              >
                {Array.from({ length: itemCount }).map((_, idx) => {
                  const isSpanned = featuredItem === idx + 1;
                  return (
                    <div
                      key={idx}
                      style={{
                        gridColumn: isSpanned ? 'span 2' : undefined,
                        padding: '20px 16px',
                        background: isSpanned
                          ? 'linear-gradient(135deg, #312e81, #4338ca)'
                          : 'linear-gradient(135deg, #1e293b, #0f172a)',
                        border: isSpanned ? '1px solid #818cf8' : '1px solid #334155',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        minHeight: '80px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <span className="text-sm">Cell {idx + 1}</span>
                      {isSpanned && (
                        <span className="text-[10px] text-indigo-300 font-normal mt-1">
                          grid-column: span 2
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Generated CSS Grid Rules</span>
              <button
                onClick={copyCss}
                className="flex items-center gap-1.5 px-3 py-1 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-950/50 hover:bg-indigo-950 border border-indigo-800/60 rounded transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-950 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed">
              <code>{cssString}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
