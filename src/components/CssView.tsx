import React, { useState } from 'react';
import { Search, Copy, Check, Sparkles, Layout, Grid as GridIcon, ArrowRight } from 'lucide-react';
import { CSS_TOPICS, CSS_CATEGORIES, CssTopicItem } from '../data/cssData';

interface CssViewProps {
  onOpenFlexbox: () => void;
  onOpenGrid: () => void;
}

export const CssView: React.FC<CssViewProps> = ({ onOpenFlexbox, onOpenGrid }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTopics = CSS_TOPICS.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Modern CSS Reference & Layout Guide
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Master the CSS Box Model, Flexbox, CSS Grid, clamp() fluid typography, OKLCH colors, and container queries.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search CSS properties or topics..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Interactive Visualizers Launch Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button
            onClick={onOpenFlexbox}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-900/50 hover:border-indigo-500/70 rounded-xl transition-all cursor-pointer group text-left shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Layout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  Interactive Flexbox Visualizer
                </h3>
                <p className="text-xs text-slate-400">
                  Manipulate main & cross axes live with instant CSS code generation
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={onOpenGrid}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-900/50 hover:border-indigo-500/70 rounded-xl transition-all cursor-pointer group text-left shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <GridIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  Interactive CSS Grid Visualizer
                </h3>
                <p className="text-xs text-slate-400">
                  Configure 2D columns, repeat(), fr units, and grid spanning live
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
          {CSS_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Content List */}
      <div className="space-y-6">
        {filteredTopics.map(topic => (
          <article
            key={topic.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {topic.title}
                </h2>
                <span className="text-xs text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900/60">
                  {topic.category}
                </span>
              </div>

              {topic.category === 'Flexbox' && (
                <button
                  onClick={onOpenFlexbox}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer self-start sm:self-auto"
                >
                  Open in Visualizer &rarr;
                </button>
              )}
              {topic.category === 'CSS Grid' && (
                <button
                  onClick={onOpenGrid}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer self-start sm:self-auto"
                >
                  Open in Visualizer &rarr;
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              {topic.summary}
            </p>

            {/* Code snippet block */}
            <div className="relative mb-4 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-950/80 text-[11px] text-slate-400">
                <span className="font-mono">CSS Snippet</span>
                <button
                  onClick={() => handleCopy(topic.codeSnippet, topic.id)}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedId === topic.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed">
                <code>{topic.codeSnippet}</code>
              </pre>
            </div>

            {/* Deep dive explanation & pro tip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-950/50 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-slate-200 mb-1">Under The Hood</h4>
                <p className="text-slate-400 leading-relaxed">{topic.explanation}</p>
              </div>

              <div className="p-3.5 bg-slate-950/50 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-indigo-400 mb-1">Senior Engineer Pro-Tip</h4>
                <p className="text-slate-400 leading-relaxed">{topic.proTip}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
