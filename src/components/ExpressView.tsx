import React, { useState } from 'react';
import { Copy, Check, Terminal, Server, ArrowRight, Play, ShieldAlert, Cpu } from 'lucide-react';
import {
  EXPRESS_TOPICS,
  ENVIRONMENT_SETUP_STEPS,
  EXPRESS_CATEGORIES,
  ExpressTopicItem
} from '../data/expressData';

interface ExpressViewProps {
  onOpenSimulator: () => void;
}

export const ExpressView: React.FC<ExpressViewProps> = ({ onOpenSimulator }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTopics = EXPRESS_TOPICS.filter(
    item => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Node.js & Express.js Backend Guide
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Everything you need to set up your local development environment, build RESTful APIs with Express, write middleware pipelines, and connect your React frontend.
        </p>
      </div>

      {/* Simulator Launch Banner */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/50 border border-indigo-900/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Try the Interactive Express Request Simulator
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate GET, POST, DELETE requests, watch middleware execute, and inspect responses live.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenSimulator}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Launch Express Simulator</span>
        </button>
      </div>

      {/* Section 1: Complete Environment Setup Guide */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">
            1. Setting Up Your Development Environment
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          Before building full-stack websites, you must set up your machine with <strong>Node.js</strong>, the <strong>npm</strong> package manager, an efficient code editor like <strong>VS Code</strong>, and terminal tooling. Follow these 5 steps:
        </p>

        <div className="space-y-4">
          {ENVIRONMENT_SETUP_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-indigo-400">{step.step}:</span>
                  <h3 className="text-xs font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{step.details}</p>
              </div>

              <div className="bg-slate-900 px-3 py-2 rounded font-mono text-xs text-emerald-300 border border-slate-800 flex items-center justify-between md:min-w-[240px]">
                <span className="truncate">{step.terminal}</span>
                <button
                  onClick={() => handleCopy(step.terminal, `setup-${idx}`)}
                  className="text-slate-500 hover:text-white p-1 cursor-pointer shrink-0 ml-2"
                  title="Copy terminal command"
                >
                  {copiedId === `setup-${idx}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Core Concepts & Curriculum */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">
              2. Node.js & Express.js Curriculum
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore core Node APIs, express.Router, request parsing, middleware chaining, and connecting to React.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {EXPRESS_CATEGORIES.map(cat => (
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
                <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-900/60">
                  {topic.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                {topic.summary}
              </p>

              {/* Terminal command strip if provided */}
              {topic.terminalCommands && (
                <div className="mb-4 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                    Terminal Setup Commands:
                  </div>
                  {topic.terminalCommands.map((cmd, i) => (
                    <div key={i}>{cmd}</div>
                  ))}
                </div>
              )}

              {/* Code snippet block */}
              <div className="relative mb-4 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-950/80 text-[11px] text-slate-400">
                  <span className="font-mono">TypeScript / Node.js</span>
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
                <pre className="p-4 font-mono text-xs text-emerald-200 overflow-x-auto leading-relaxed">
                  <code>{topic.codeSnippet}</code>
                </pre>
              </div>

              {/* Explanation & Pro-tip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-950/50 rounded-lg border border-slate-800">
                  <h4 className="font-semibold text-slate-200 mb-1">Architectural Insight</h4>
                  <p className="text-slate-400 leading-relaxed">{topic.explanation}</p>
                </div>

                <div className="p-3.5 bg-slate-950/50 rounded-lg border border-slate-800">
                  <h4 className="font-semibold text-indigo-400 mb-1">Full-Stack Best Practice</h4>
                  <p className="text-slate-400 leading-relaxed">{topic.proTip}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
