import React, { useState } from 'react';
import {
  Search,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
  Play,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Code2,
  BookOpen,
  Award
} from 'lucide-react';
import { JS_TOPICS, JS_CATEGORIES, JsTopicItem } from '../data/jsData';

interface JsViewProps {
  onOpenSandbox?: () => void;
  onOpenStudyPlan?: () => void;
}

export const JsView: React.FC<JsViewProps> = ({ onOpenSandbox, onOpenStudyPlan }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Stepper state for interactive code execution walkthrough
  const [activeWalkthroughTopic, setActiveWalkthroughTopic] = useState<string>('js-array-methods');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const filteredTopics = JS_TOPICS.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mentalModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  // Interactive Execution Stepper data for beginner clarity
  const EXECUTION_STEPS = [
    {
      step: 'Step 1: The Input Array',
      code: 'const scores = [65, 88, 42, 95];',
      explanation: 'We have an array of test scores in memory. JavaScript stores them in order: index 0 is 65, index 1 is 88, etc.',
      visual: '[ 65, 88, 42, 95 ]'
    },
    {
      step: 'Step 2: .filter() Tests Each Item',
      code: 'const passing = scores.filter(score => score >= 70);',
      explanation: '.filter() asks the arrow function: "Is score >= 70?". It tests 65 (false, discarded), 88 (true, kept), 42 (false, discarded), 95 (true, kept).',
      visual: '[ 88, 95 ]  (Only items passing the condition survived!)'
    },
    {
      step: 'Step 3: .map() Transforms the Results',
      code: 'const grades = passing.map(score => `${score} points - PASSED`);',
      explanation: '.map() takes the surviving [88, 95] array, visits each number, and creates a brand-new formatted string.',
      visual: '[ "88 points - PASSED", "95 points - PASSED" ]'
    },
    {
      step: 'Step 4: Ready for React JSX!',
      code: '{grades.map(grade => <li key={grade}>{grade}</li>)}',
      explanation: 'In React, this is exactly how dynamic data becomes HTML elements on the user screen without writing manual DOM manipulation!',
      visual: '<li>88 points - PASSED</li>\n<li>95 points - PASSED</li>'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Banner: Clearer JS for Beginners Transitioning to React & Express */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-indigo-900/50 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Intuitive Mental Models & Plain English Explanations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              JavaScript (ES6+) Made Crystal Clear
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              No cryptic jargon or raw code dumps. Every concept is explained with real-life analogies, step-by-step visual logic, estimated study times, and explicit connections to why React and Express need it.
            </p>
          </div>

          {onOpenStudyPlan && (
            <button
              onClick={onOpenStudyPlan}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-auto"
            >
              <BookOpen className="w-4 h-4" />
              <span>View 24-Day Study Plan & Times</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Concept Stepper: "How JS Actually Runs Step-by-Step" */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span>Visual Execution Walkthrough (Interactive Stepper)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click through the steps below to watch how array methods (.filter & .map) transform data in memory for React.
            </p>
          </div>

          <span className="text-xs font-mono text-indigo-400">
            Step {activeStepIndex + 1} of {EXECUTION_STEPS.length}
          </span>
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {EXECUTION_STEPS.map((st, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-2.5 rounded-lg text-xs font-medium text-left transition-all cursor-pointer ${
                activeStepIndex === idx
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 border border-indigo-400/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span className="block font-bold">Step {idx + 1}</span>
              <span className="truncate block opacity-80 text-[11px]">{st.step.split(':')[1] || st.step}</span>
            </button>
          ))}
        </div>

        {/* Current Step Active Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-400 block mb-1">
                {EXECUTION_STEPS[activeStepIndex].step}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {EXECUTION_STEPS[activeStepIndex].explanation}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded text-xs cursor-pointer"
              >
                Previous Step
              </button>
              <button
                disabled={activeStepIndex === EXECUTION_STEPS.length - 1}
                onClick={() => setActiveStepIndex(prev => Math.min(EXECUTION_STEPS.length - 1, prev + 1))}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded text-xs font-semibold cursor-pointer"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>

          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] text-slate-500 block mb-1 uppercase tracking-wider font-sans">
                Code In Action:
              </span>
              <pre className="p-3 bg-slate-900 rounded-lg text-amber-300 border border-slate-800 overflow-x-auto">
                <code>{EXECUTION_STEPS[activeStepIndex].code}</code>
              </pre>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 block mb-1 uppercase tracking-wider font-sans">
                Visual State in Memory:
              </span>
              <pre className="p-3 bg-slate-900 rounded-lg text-emerald-300 border border-slate-800 overflow-x-auto">
                <code>{EXECUTION_STEPS[activeStepIndex].visual}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Category Filters */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Curated JavaScript Concepts (With Real-World Mental Models)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any topic below to read its everyday analogy, step-by-step logic, and why React/Express strictly depend on it.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search concepts (e.g., destructuring, closures)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
          {JS_CATEGORIES.map(category => (
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

      {/* Topic Cards with Explanations */}
      <div className="space-y-8">
        {filteredTopics.map(topic => (
          <article
            key={topic.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg space-y-6"
          >
            {/* Topic Header with Time Estimate and Difficulty */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {topic.title}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${
                    topic.difficulty === 'React-Crucial'
                      ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700'
                      : topic.difficulty === 'Express-Crucial'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                      : 'bg-amber-950/80 text-amber-300 border-amber-700'
                  }`}>
                    {topic.difficulty}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {topic.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Est: {topic.estimatedMinutes} mins</span>
                </div>
                {onOpenSandbox && (
                  <button
                    onClick={onOpenSandbox}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-white bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-800/60 px-3 py-1 rounded transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>Run in Sandbox</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mental Model Analogy Box */}
            <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-4 flex items-start gap-3.5">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-1">
                  Mental Model (Think of it like this):
                </span>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                  {topic.mentalModel}
                </p>
              </div>
            </div>

            {/* Why Needed in React or Express */}
            <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-xl p-4 flex items-start gap-3.5">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Why You Need This for React & Express:
                </span>
                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                  {topic.whyNeededForReactOrExpress}
                </p>
              </div>
            </div>

            {/* Step-by-Step Logic Breakdown */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block mb-2">
                Step-by-Step Conceptual Breakdown:
              </span>
              {topic.stepByStepExplanation.map((step, sIdx) => (
                <div key={sIdx} className="text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="text-indigo-400 font-bold shrink-0 font-mono">{sIdx + 1}.</span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            {/* Annotated Code Block */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/80 text-xs text-slate-400">
                <span className="font-mono text-[11px]">Annotated Example Code</span>
                <button
                  onClick={() => handleCopy(topic.codeSnippet, topic.id)}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
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
              <pre className="p-4 font-mono text-xs text-amber-200 overflow-x-auto leading-relaxed">
                <code>{topic.codeSnippet}</code>
              </pre>
            </div>

            {/* Deep Dive & Gotchas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-200 mb-1">Deep Dive (How the Engine Thinks)</h4>
                  <p className="text-slate-400 leading-relaxed">{topic.deepDive}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-rose-300 mb-1">Common Beginner Trap</h4>
                  <p className="text-slate-400 leading-relaxed">{topic.commonPitfalls}</p>
                </div>
              </div>
            </div>

            {/* 5-Minute Practice Challenge */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 mb-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white">5-Minute Practice Challenge:</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {topic.practiceChallenge}
              </p>
              {onOpenSandbox && (
                <button
                  onClick={onOpenSandbox}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Sandbox to try this challenge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
