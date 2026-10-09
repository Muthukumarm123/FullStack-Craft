import React, { useState } from 'react';
import { Copy, Check, Sparkles, Plus, Minus, ArrowRight } from 'lucide-react';

export const FlexboxPlayground: React.FC = () => {
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>('space-between');
  const [alignItems, setAlignItems] = useState<'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline'>('center');
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap' | 'wrap-reverse'>('wrap');
  const [gap, setGap] = useState<number>(16);
  const [itemCount, setItemCount] = useState<number>(4);
  const [copied, setCopied] = useState(false);

  const cssString = `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}

.item {
  /* Default flex item */
  padding: 1.25rem;
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
          Interactive Flexbox Visualizer
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manipulate the main and cross axes interactively to understand 1-dimensional flex layouts and instantly export valid CSS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Controls Column (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          <h2 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
            Container Controls
          </h2>

          {/* flex-direction */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">
              flex-direction <span className="text-slate-600">(Main axis direction)</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map(dir => (
                <button
                  key={dir}
                  onClick={() => setFlexDirection(dir)}
                  className={`px-2.5 py-1.5 text-xs rounded font-mono transition-colors cursor-pointer truncate ${
                    flexDirection === dir
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          {/* justify-content */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">
              justify-content <span className="text-slate-600">(Main axis alignment)</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const).map(j => (
                <button
                  key={j}
                  onClick={() => setJustifyContent(j)}
                  className={`px-2 py-1.5 text-xs rounded font-mono transition-colors cursor-pointer truncate ${
                    justifyContent === j
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {j}
                </button>
              ))}
            </div>
          </div>

          {/* align-items */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">
              align-items <span className="text-slate-600">(Cross axis alignment)</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['stretch', 'flex-start', 'center', 'flex-end', 'baseline'] as const).map(a => (
                <button
                  key={a}
                  onClick={() => setAlignItems(a)}
                  className={`px-2 py-1.5 text-xs rounded font-mono transition-colors cursor-pointer truncate ${
                    alignItems === a
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* flex-wrap */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">
              flex-wrap
            </label>
            <div className="flex gap-1.5">
              {(['nowrap', 'wrap', 'wrap-reverse'] as const).map(w => (
                <button
                  key={w}
                  onClick={() => setFlexWrap(w)}
                  className={`flex-1 py-1.5 text-xs rounded font-mono transition-colors cursor-pointer ${
                    flexWrap === w
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* gap slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">gap</span>
              <span className="font-mono text-indigo-400">{gap}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              step="4"
              value={gap}
              onChange={e => setGap(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Item count */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">
              Number of Items: {itemCount}
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setItemCount(prev => Math.max(2, prev - 1))}
                className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setItemCount(prev => Math.min(8, prev + 1))}
                className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Stage & CSS Output (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visual Canvas */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Live Visual Flex Container</span>
              <span className="text-[11px] text-slate-500 font-mono">
                Axis: {flexDirection.includes('row') ? 'Horizontal (X)' : 'Vertical (Y)'}
              </span>
            </div>

            <div className="p-6 bg-slate-950/50 min-h-[340px] flex items-center justify-center overflow-auto">
              <div
                style={{
                  display: 'flex',
                  flexDirection,
                  justifyContent,
                  alignItems,
                  flexWrap,
                  gap: `${gap}px`,
                  minHeight: '280px',
                  width: '100%',
                  border: '1px dashed #4338ca',
                  borderRadius: '10px',
                  padding: '16px',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)'
                }}
              >
                {Array.from({ length: itemCount }).map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: alignItems === 'stretch' ? 'auto' : `${70 + (idx % 3) * 20}px`,
                      minWidth: '70px',
                      padding: '12px 18px',
                      background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
                      border: '1px solid #4338ca',
                      borderRadius: '8px',
                      color: '#e0e7ff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <span className="text-sm">Item {idx + 1}</span>
                    <span className="text-[10px] text-indigo-300 font-normal">flex item</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generated CSS Snippet */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Generated CSS Rules</span>
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
