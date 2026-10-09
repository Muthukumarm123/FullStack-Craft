import React from 'react';
import { Code2, Play, CheckCircle2, Calendar, BookOpen } from 'lucide-react';

export type ActiveTab =
  | 'html'
  | 'css'
  | 'javascript'
  | 'react'
  | 'express'
  | 'sandbox'
  | 'flexbox'
  | 'grid'
  | 'express-simulator'
  | 'study-plan';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openQuiz: () => void;
  openRoadmap: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openQuiz,
  openRoadmap,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant 3-zone Top Bar Contract: Brand - 4-5 single-line Nav Links - 1 Primary Action */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('html')}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <span>FullStack Craft</span>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('html')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'html'
                  ? 'text-indigo-400 border-b-2 border-indigo-500 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              HTML Elements
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'css' || activeTab === 'flexbox' || activeTab === 'grid'
                  ? 'text-indigo-400 border-b-2 border-indigo-500 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              CSS Manual
            </button>
            <button
              onClick={() => setActiveTab('javascript')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'javascript'
                  ? 'text-indigo-400 border-b-2 border-indigo-500 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              JavaScript ES6+
            </button>
            <button
              onClick={() => setActiveTab('react')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'react'
                  ? 'text-indigo-400 border-b-2 border-indigo-500 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              React Complete
            </button>
            <button
              onClick={() => setActiveTab('express')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                activeTab === 'express' || activeTab === 'express-simulator'
                  ? 'text-indigo-400 border-b-2 border-indigo-500 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Node & Express
            </button>
          </nav>

          {/* Zone 3: 1 primary action or group */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('study-plan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'study-plan'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-800/80'
              }`}
              title="Tailored Study Plan with Estimated Times"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Study Plan & Times</span>
            </button>
            <button
              onClick={openQuiz}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quiz</span>
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-all shadow-sm whitespace-nowrap cursor-pointer ${
                activeTab === 'sandbox'
                  ? 'bg-indigo-500 shadow-indigo-500/25 ring-2 ring-indigo-400/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Live Sandbox</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-2 border-t border-slate-800/80 no-scrollbar">
          {(['html', 'css', 'javascript', 'react', 'express', 'study-plan'] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap shrink-0 transition-colors ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'html' && 'HTML'}
              {tab === 'css' && 'CSS'}
              {tab === 'javascript' && 'JavaScript'}
              {tab === 'react' && 'React'}
              {tab === 'express' && 'Node & Express'}
              {tab === 'study-plan' && '⏱️ Study Plan & Times'}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
