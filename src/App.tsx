import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HtmlView } from './components/HtmlView';
import { CssView } from './components/CssView';
import { JsView } from './components/JsView';
import { ReactView } from './components/ReactView';
import { ExpressView } from './components/ExpressView';
import { LiveSandbox } from './components/LiveSandbox';
import { FlexboxPlayground } from './components/FlexboxPlayground';
import { GridPlayground } from './components/GridPlayground';
import { ExpressSimulator } from './components/ExpressSimulator';
import { StudyPlanView } from './components/StudyPlanView';
import { QuizModal } from './components/QuizModal';
import { RoadmapModal } from './components/RoadmapModal';
import { ArrowLeft, BookOpen, Layers, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('html');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openQuiz={() => setIsQuizOpen(true)}
        openRoadmap={() => setIsRoadmapOpen(true)}
      />

      {/* Sub-header Context Bar for Sub-Tools */}
      {(activeTab === 'flexbox' || activeTab === 'grid' || activeTab === 'express-simulator') && (
        <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => {
                if (activeTab === 'flexbox' || activeTab === 'grid') setActiveTab('css');
                if (activeTab === 'express-simulator') setActiveTab('express');
              }}
              className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to {activeTab === 'express-simulator' ? 'Node & Express Guide' : 'CSS Manual'}</span>
            </button>
            <span className="text-[11px] text-slate-500 font-mono">
              Interactive Visual Tool
            </span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'html' && <HtmlView />}
        {activeTab === 'css' && (
          <CssView
            onOpenFlexbox={() => setActiveTab('flexbox')}
            onOpenGrid={() => setActiveTab('grid')}
          />
        )}
        {activeTab === 'javascript' && (
          <JsView
            onOpenSandbox={() => setActiveTab('sandbox')}
            onOpenStudyPlan={() => setActiveTab('study-plan')}
          />
        )}
        {activeTab === 'react' && <ReactView />}
        {activeTab === 'express' && (
          <ExpressView onOpenSimulator={() => setActiveTab('express-simulator')} />
        )}
        {activeTab === 'study-plan' && (
          <StudyPlanView
            onNavigateTab={(targetTab) => setActiveTab(targetTab)}
          />
        )}
        {activeTab === 'sandbox' && <LiveSandbox />}
        {activeTab === 'flexbox' && <FlexboxPlayground />}
        {activeTab === 'grid' && <GridPlayground />}
        {activeTab === 'express-simulator' && <ExpressSimulator />}
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 sm:px-6 lg:px-8 py-8 mt-16 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-400">FullStack Craft</span>
            <span aria-hidden="true">·</span>
            <span>Educational Web Development Reference & Sandbox</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('study-plan')}
              className="hover:text-indigo-400 transition-colors cursor-pointer text-indigo-400 font-medium"
            >
              ⏱️ 24-Day Study Plan & Times
            </button>
            <button
              onClick={() => setIsRoadmapOpen(true)}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Curriculum Roadmap
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Test Knowledge
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Live Playground
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <RoadmapModal isOpen={isRoadmapOpen} onClose={() => setIsRoadmapOpen(false)} />
    </div>
  );
}
