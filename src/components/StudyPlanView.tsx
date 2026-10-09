import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
  Filter,
  Check
} from 'lucide-react';
import { STUDY_PHASES, StudyPhase, StudyDayPlan } from '../data/studyPlanData';

interface StudyPlanViewProps {
  onNavigateTab: (tab: 'javascript' | 'react' | 'express' | 'sandbox') => void;
}

export const StudyPlanView: React.FC<StudyPlanViewProps> = ({ onNavigateTab }) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('all');
  const [dailyHoursPace, setDailyHoursPace] = useState<number>(1.5); // 1.5 hrs/day
  const [completedDays, setCompletedDays] = useState<Record<number, boolean>>({});

  const toggleDayCompletion = (dayNum: number) => {
    setCompletedDays(prev => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  const totalDays = STUDY_PHASES.flatMap(p => p.days).length; // 24 days
  const completedCount = Object.values(completedDays).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  // Total curriculum hours
  const totalCurriculumHours = STUDY_PHASES.reduce((acc, p) => acc + p.estimatedTotalHours, 0); // 49 hours
  const estimatedCalendarDays = Math.ceil(totalCurriculumHours / dailyHoursPace);
  const estimatedCalendarWeeks = (estimatedCalendarDays / 7).toFixed(1);

  const filteredPhases = selectedPhaseId === 'all'
    ? STUDY_PHASES
    : STUDY_PHASES.filter(p => p.id === selectedPhaseId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Banner: Tailored for Learners transitioning from Basic JS */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-900/50 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tailored Plan: "I Know Half of JS & Starting React + Express"</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Personalized Study Roadmap & Timeline
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Since you already know basic JavaScript (variables, if/else, loops), you do not need to restart from scratch! Follow this 4-phase, 24-day curriculum to bridge the exact remaining JS concepts directly into React and Express.
          </p>
        </div>

        {/* Dynamic Study Pace Calculator */}
        <div className="mt-8 pt-6 border-t border-indigo-900/40 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Select Your Daily Study Commitment:
            </label>
            <div className="flex gap-2">
              {[
                { hours: 0.75, label: '45 mins/day (Casual)' },
                { hours: 1.5, label: '1.5 hrs/day (Recommended)' },
                { hours: 3.0, label: '3 hrs/day (Intensive)' }
              ].map(pace => (
                <button
                  key={pace.hours}
                  onClick={() => setDailyHoursPace(pace.hours)}
                  className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer truncate ${
                    dailyHoursPace === pace.hours
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {pace.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Estimated Total Time</span>
              <span className="text-base font-bold text-white font-mono">
                ~{totalCurriculumHours} Hours
              </span>
              <span className="text-[11px] text-indigo-400 block mt-0.5">
                (Across 24 focused modules)
              </span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Projected Calendar Duration</span>
              <span className="text-base font-bold text-emerald-300 font-mono">
                ~{estimatedCalendarWeeks} Weeks ({estimatedCalendarDays} days)
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                At {dailyHoursPace} hrs/day pace
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-4 border-t border-indigo-900/40">
          <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
            <span className="font-semibold">Curriculum Completion Progress:</span>
            <span className="font-mono text-indigo-400 font-bold">
              {completedCount} / {totalDays} Modules Completed ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Phase Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
        <button
          onClick={() => setSelectedPhaseId('all')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            selectedPhaseId === 'all'
              ? 'bg-indigo-600 text-white font-medium'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          All 4 Phases
        </button>
        {STUDY_PHASES.map(phase => (
          <button
            key={phase.id}
            onClick={() => setSelectedPhaseId(phase.id)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              selectedPhaseId === phase.id
                ? 'bg-indigo-600 text-white font-medium'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Phase {phase.phaseNumber}: {phase.title.split(':')[1]?.split('(')[0]?.trim() || phase.title}
          </button>
        ))}
      </div>

      {/* Phases & Daily Modules */}
      <div className="space-y-12">
        {filteredPhases.map(phase => (
          <section key={phase.id} className="space-y-5">
            {/* Phase Header Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                    Phase {phase.phaseNumber} Overview
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    {phase.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300">
                    ⏱️ Total: ~{phase.estimatedTotalHours} Hours
                  </div>
                  <div className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                    📅 {phase.estimatedCalendarWeeks}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                {phase.subtitle}
              </p>

              {/* Key Outcomes */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  What You Will Be Able to Do After This Phase:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {phase.keyOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Action Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {phase.days.map(day => {
                const isChecked = !!completedDays[day.dayNumber];

                return (
                  <div
                    key={day.dayNumber}
                    className={`bg-slate-900 border rounded-xl p-5 flex flex-col justify-between transition-all ${
                      isChecked
                        ? 'border-emerald-500/50 bg-emerald-950/10'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      {/* Top Bar of Day */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                            Day {day.dayNumber}
                          </span>
                          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {day.estimatedMinutes} mins
                          </span>
                        </div>

                        <button
                          onClick={() => toggleDayCompletion(day.dayNumber)}
                          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600" />
                          )}
                          <span className={isChecked ? 'text-emerald-400 font-semibold' : ''}>
                            {isChecked ? 'Completed' : 'Mark Done'}
                          </span>
                        </button>
                      </div>

                      <h3 className={`text-sm sm:text-base font-bold mb-2 ${isChecked ? 'line-through text-slate-400' : 'text-white'}`}>
                        {day.title}
                      </h3>

                      <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
                        {day.whatYouWillLearn}
                      </p>

                      {/* Action Items Checklist */}
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 mb-3 space-y-1.5">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                          Today's Action Steps:
                        </span>
                        {day.actionItems.map((act, i) => (
                          <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-indigo-400 font-bold">›</span>
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>

                      {/* Key Concept Formula */}
                      <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800/60 font-mono text-[11px] text-cyan-300 mb-3">
                        {day.keyConcept}
                      </div>

                      {/* Bridge Callout */}
                      <div className="text-[11px] text-indigo-300 bg-indigo-950/40 p-2.5 rounded border border-indigo-900/40">
                        <span className="font-semibold text-indigo-200">Why React & Express Need This: </span>
                        {day.reactExpressConnection}
                      </div>
                    </div>

                    {/* Quick navigation to relevant section */}
                    <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                      {phase.phaseNumber === 1 && (
                        <button
                          onClick={() => onNavigateTab('javascript')}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open JavaScript Lesson</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {phase.phaseNumber === 2 && (
                        <button
                          onClick={() => onNavigateTab('react')}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open React Guide</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {(phase.phaseNumber === 3 || phase.phaseNumber === 4) && (
                        <button
                          onClick={() => onNavigateTab('express')}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Express Guide</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
