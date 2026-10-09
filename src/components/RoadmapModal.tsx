import React, { useState } from 'react';
import { BookOpen, CheckCircle, Circle, Clock } from 'lucide-react';

interface Milestone {
  id: string;
  phase: string;
  title: string;
  estimatedHours: string;
  topics: string[];
}

const ROADMAP_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    phase: 'Phase 1: Environment Setup',
    title: 'Developer Tooling & Terminal Proficiency',
    estimatedHours: '3 - 4 Hours',
    topics: [
      'Install Node.js LTS and npm package manager',
      'Set up VS Code with ESLint and Prettier extensions',
      'Master CLI commands (cd, ls, mkdir, npm init -y)',
      'Understand package.json and semantic versioning'
    ]
  },
  {
    id: 'm2',
    phase: 'Phase 2: Semantic HTML5',
    title: 'The Semantic Skeleton & Accessibility',
    estimatedHours: '5 - 6 Hours',
    topics: [
      'Document structure (<!DOCTYPE>, html, head, body)',
      'Semantic landmark elements (main, header, nav, article, section, footer)',
      'Accessible form controls (input, label with for attribute, select, button)',
      'Modern multimedia (<picture>, <video>, loading="lazy", WebP/AVIF)'
    ]
  },
  {
    id: 'm3',
    phase: 'Phase 3: Modern CSS Layouts',
    title: 'Styling, Flexbox & CSS Grid Mastery',
    estimatedHours: '8 - 10 Hours',
    topics: [
      'Box Model and universal box-sizing: border-box',
      'Flexbox 1D layout (flex-direction, justify-content, align-items, gap)',
      'CSS Grid 2D layout (repeat, minmax, auto-fit, 1fr units)',
      'Fluid typography with clamp() and parent container queries'
    ]
  },
  {
    id: 'm4',
    phase: 'Phase 4: JavaScript ES6+ Engine (React Prerequisites)',
    title: 'Modern Logic, Functions & Async Flow',
    estimatedHours: '9 - 10 Hours',
    topics: [
      'let & const scoping vs var; primitive immutability',
      'Arrow functions, closures, and lexical scope',
      'Array mastery (map, filter, reduce, find, spread)',
      'The Event Loop, Promises, async/await, and Fetch API',
      'High-performance DOM event delegation'
    ]
  },
  {
    id: 'm5',
    phase: 'Phase 5: React & Vite Frontend',
    title: 'Component Architecture & Reactive State',
    estimatedHours: '16 - 18 Hours',
    topics: [
      'Scaffolding with npm create vite@latest --template react-ts',
      'JSX syntax, props destructuring, and TypeScript contracts',
      'State management with useState (immutable updater pattern)',
      'Side effect lifecycle and cleanups with useEffect',
      'Advanced Hooks: useRef, useMemo, useCallback, and custom hooks'
    ]
  },
  {
    id: 'm6',
    phase: 'Phase 6: Node.js & Express.js Backend',
    title: 'Building Scalable Server REST APIs',
    estimatedHours: '12 - 14 Hours',
    topics: [
      'Node.js V8 runtime and non-blocking I/O',
      'Minimal Express server with dotenv and environment ports',
      'Full CRUD RESTful API routes (GET, POST, PUT, DELETE)',
      'Middleware pipeline (express.json, CORS, route guards, error handlers)'
    ]
  },
  {
    id: 'm7',
    phase: 'Phase 7: Full-Stack Integration',
    title: 'Connecting React to Express & Production Deployment',
    estimatedHours: '10 - 12 Hours',
    topics: [
      'Configuring CORS and Vite dev server proxy (/api)',
      'Calling Express endpoints from React components with fetch',
      'Handling loading states, network errors, and optimistic UI',
      'Building for production (npm run build) and serving static bundles'
    ]
  }
];

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({ isOpen, onClose }) => {
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleMilestone = (id: string) => {
    setCompletedMilestones(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalCount = ROADMAP_MILESTONES.length;
  const completedCount = Object.values(completedMilestones).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base font-bold text-white">Full-Stack Developer Roadmap</h2>
              <p className="text-xs text-slate-400">Estimated Times & Milestones from Day 1 to Production</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
            <span>Roadmap Completion</span>
            <span className="font-mono text-indigo-400">{completedCount} of {totalCount} Completed ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Milestones list */}
        <div className="space-y-4 mb-6">
          {ROADMAP_MILESTONES.map((milestone) => {
            const isDone = !!completedMilestones[milestone.id];
            return (
              <div
                key={milestone.id}
                onClick={() => toggleMilestone(milestone.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-indigo-950/20 border-indigo-500/60'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="mt-0.5 text-indigo-400">
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                      {milestone.phase}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {milestone.estimatedHours}
                    </span>
                  </div>

                  <h3 className={`text-sm font-bold mb-2 ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                    {milestone.title}
                  </h3>
                  <ul className="space-y-1">
                    {milestone.topics.map((t, ti) => (
                      <li key={ti} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="text-slate-600">·</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Close Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};
