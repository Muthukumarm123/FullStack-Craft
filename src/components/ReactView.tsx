import React, { useState } from 'react';
import { Copy, Check, Terminal, FolderTree, FileCode, Sparkles, Plus, Minus, RotateCcw } from 'lucide-react';
import { REACT_TOPICS, REACT_INSTALL_STEPS, REACT_PROJECT_STRUCTURE, REACT_CATEGORIES } from '../data/reactData';

export const ReactView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState(REACT_PROJECT_STRUCTURE[1]); // main.tsx

  // Interactive Live React State Demo widget
  const [demoCount, setDemoCount] = useState<number>(0);
  const [demoHistory, setDemoHistory] = useState<string[]>(['Initial render count: 0']);

  const handleIncrement = () => {
    setDemoCount(prev => {
      const next = prev + 1;
      setDemoHistory(h => [`useState update: count is now ${next}`, ...h.slice(0, 4)]);
      return next;
    });
  };

  const handleDecrement = () => {
    setDemoCount(prev => {
      const next = prev - 1;
      setDemoHistory(h => [`useState update: count is now ${next}`, ...h.slice(0, 4)]);
      return next;
    });
  };

  const handleReset = () => {
    setDemoCount(0);
    setDemoHistory(h => ['State reset to 0', ...h.slice(0, 4)]);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredTopics = REACT_TOPICS.filter(
    item => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          React Complete Masterclass
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Learn how to install React with Vite + TypeScript, understand component lifecycles, master essential hooks (useState, useEffect, useRef, useMemo), and build controlled applications.
        </p>
      </div>

      {/* Section 1: How to Install React */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">
            1. How to Install & Run React (The Modern Standard)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          The modern standard for building React single-page applications is <strong>Vite</strong> paired with <strong>TypeScript</strong>. Vite provides sub-second server starts, instant Hot Module Replacement (HMR), and lightweight production bundles.
        </p>

        {/* Step-by-step install cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {REACT_INSTALL_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-indigo-400 block mb-1">
                  {step.step}
                </span>
                <p className="text-xs text-slate-400 mb-3">{step.description}</p>
              </div>

              <div className="bg-slate-900 px-3 py-2 rounded font-mono text-xs text-emerald-300 border border-slate-800 flex items-center justify-between">
                <span className="truncate">{step.command}</span>
                <button
                  onClick={() => handleCopy(step.command, `step-${idx}`)}
                  className="text-slate-500 hover:text-white p-1 cursor-pointer shrink-0 ml-2"
                  title="Copy command"
                >
                  {copiedText === `step-${idx}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project File Tree Anatomy Inspector */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <FolderTree className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">
              Anatomy of the Generated React Project
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Click any file below to inspect its purpose in the React architecture:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-5 bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              {REACT_PROJECT_STRUCTURE.map(file => (
                <button
                  key={file.file}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                    selectedFile.file === file.file
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileCode className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{file.file}</span>
                  </span>
                  {selectedFile.file === file.file && (
                    <span className="text-[10px] text-indigo-400 font-sans">Active</span>
                  )}
                </button>
              ))}
            </div>

            <div className="md:col-span-7 bg-slate-950 p-4 rounded-lg border border-slate-800 min-h-[140px] flex flex-col justify-center">
              <span className="font-mono text-xs font-semibold text-indigo-400 mb-1">
                {selectedFile.file}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedFile.purpose}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive React Reactivity Sandbox */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">
            2. Interactive Live Reactivity Sandbox (useState Demo)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          See React reconciliation and state updates in action. Every time you click the counter, React re-invokes the component function and synchronizes the DOM.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Interactive Component Stage */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-slate-400 uppercase tracking-wider mb-2">
              Rendered Component State
            </span>
            <div className="text-5xl font-extrabold text-white font-mono my-2 tabular-nums">
              {demoCount}
            </div>
            <p className="text-xs text-indigo-300 mb-5">
              const [count, setCount] = useState(0);
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                className="flex items-center gap-1 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
                <span>Decrement</span>
              </button>
              <button
                onClick={handleIncrement}
                className="flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Increment</span>
              </button>
              <button
                onClick={handleReset}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
                title="Reset counter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Render Timeline Log */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col font-mono text-xs">
            <span className="text-slate-400 mb-2 font-semibold font-sans">
              Re-render Lifecycle Event Stream:
            </span>
            <div className="flex-1 space-y-1.5 overflow-y-auto">
              {demoHistory.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400">⚡</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: React Curriculum Chapters */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">
              3. React Curriculum & Essential Concepts
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Deep dive into functional components, state management, hooks, and clean architecture.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {REACT_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredTopics.map(topic => (
            <article
              key={topic.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {topic.title}
                </h3>
                <span className="text-xs text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-900/60">
                  {topic.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                {topic.summary}
              </p>

              {/* Code snippet */}
              <div className="relative mb-4 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-950/80 text-[11px] text-slate-400">
                  <span className="font-mono">React (TypeScript)</span>
                  <button
                    onClick={() => handleCopy(topic.codeSnippet, topic.id)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedText === topic.id ? (
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
                <pre className="p-4 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed">
                  <code>{topic.codeSnippet}</code>
                </pre>
              </div>

              {/* Deep dive & Best practices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-950/50 rounded-lg border border-slate-800">
                  <h4 className="font-semibold text-slate-200 mb-1">How It Works</h4>
                  <p className="text-slate-400 leading-relaxed">{topic.explanation}</p>
                </div>

                <div className="p-3.5 bg-slate-950/50 rounded-lg border border-slate-800">
                  <h4 className="font-semibold text-indigo-400 mb-1">Production Best Practice</h4>
                  <p className="text-slate-400 leading-relaxed">{topic.bestPractices}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
