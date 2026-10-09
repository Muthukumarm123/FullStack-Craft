import React, { useState } from 'react';
import { Search, ExternalLink, Copy, Check, Info, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { HTML_TAGS, HTML_CATEGORIES, HtmlTagItem } from '../data/htmlData';

interface HtmlViewProps {
  onOpenSandboxWithCode?: (code: string) => void;
}

export const HtmlView: React.FC<HtmlViewProps> = ({ onOpenSandboxWithCode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<HtmlTagItem | null>(null);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const filteredTags = HTML_TAGS.filter(item => {
    const matchesSearch =
      item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (code: string, tag: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              HTML5 Elements Encyclopedia
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Every essential HTML5 element explained with semantic roles, essential attributes, accessibility notes, and code samples.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tags (e.g., <dialog>, picture)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
          {HTML_CATEGORIES.map(category => (
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

      {/* Grid of HTML Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTags.map(item => (
          <div
            key={item.tag}
            className="bg-slate-900 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-sm font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900/60">
                  {item.tag}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Attributes unboxed text */}
              <div className="text-[11px] text-slate-500 mb-4">
                <span className="font-medium text-slate-400">Key Attributes: </span>
                {item.commonAttributes.join(' · ')}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedTag(item)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                View Full Details &rarr;
              </button>
              <button
                onClick={() => handleCopy(item.example, item.tag)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 py-1 px-2 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {copiedTag === item.tag ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTags.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-xl border border-slate-800">
          <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-300">No HTML elements match your filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or choosing another category.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedTag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold font-mono text-indigo-400">
                    {selectedTag.tag}
                  </h2>
                  <span className="text-xs text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                    {selectedTag.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedTag.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedTag(null)}
                className="text-slate-400 hover:text-white text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Syntax */}
              <div>
                <span className="text-slate-400 font-semibold block mb-1">Syntax Structure</span>
                <pre className="p-3 bg-slate-950 rounded-lg font-mono text-emerald-300 border border-slate-800">
                  <code>{selectedTag.syntax}</code>
                </pre>
              </div>

              {/* Code Example */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 font-semibold">Practical Example</span>
                  <button
                    onClick={() => handleCopy(selectedTag.example, 'modal')}
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    {copiedTag === 'modal' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTag === 'modal' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-lg font-mono text-slate-200 border border-slate-800 overflow-x-auto leading-relaxed">
                  <code>{selectedTag.example}</code>
                </pre>
              </div>

              {/* Best Practices */}
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <span className="text-indigo-400 font-semibold block mb-1">Best Practice & SEO Tip</span>
                <p className="text-slate-300 leading-relaxed">{selectedTag.bestPractices}</p>
              </div>

              {/* Accessibility Notes */}
              {selectedTag.accessibilityNotes && (
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                  <span className="text-amber-400 font-semibold block mb-1">Accessibility (a11y) Consideration</span>
                  <p className="text-slate-300 leading-relaxed">{selectedTag.accessibilityNotes}</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedTag(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
