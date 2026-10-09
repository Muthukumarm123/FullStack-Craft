import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const filteredQuestions = QUIZ_QUESTIONS.filter(
    q => selectedTopic === 'All' || q.topic === selectedTopic
  );

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];
  const isCorrect = selectedOption === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleReset = (topic: string = selectedTopic) => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  const isCompleted = isAnswered && currentIndex === filteredQuestions.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Knowledge Mastery Quiz</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Topic filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {(['All', 'HTML', 'CSS', 'JavaScript', 'React', 'Express'] as const).map(topic => (
            <button
              key={topic}
              onClick={() => handleReset(topic)}
              className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedTopic === topic
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Question progress */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
          <span>Question {currentIndex + 1} of {filteredQuestions.length}</span>
          <span>Score: {score} correct</span>
        </div>

        {/* Question Body */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-5">
          <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider block mb-1">
            {currentQ.topic}
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-2.5 mb-5">
          {currentQ.options.map((option, idx) => {
            let optionStyles = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

            if (isAnswered) {
              if (idx === currentQ.correctIndex) {
                optionStyles = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
              } else if (idx === selectedOption) {
                optionStyles = 'bg-rose-950/80 border-rose-500 text-rose-200';
              } else {
                optionStyles = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optionStyles}`}
              >
                <span>{option}</span>
                {isAnswered && idx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                )}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation once answered */}
        {isAnswered && (
          <div className={`p-4 rounded-xl border text-xs mb-5 ${
            isCorrect ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' : 'bg-rose-950/40 border-rose-800 text-rose-200'
          }`}>
            <span className="font-semibold block mb-1">
              {isCorrect ? '✓ Correct Answer!' : '✕ Incorrect'}
            </span>
            <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-auto">
          <button
            onClick={() => handleReset()}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Quiz</span>
          </button>

          {isAnswered && !isCompleted && (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm"
            >
              <span>Next Question</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {isCompleted && (
            <div className="text-right">
              <span className="text-xs text-emerald-400 font-semibold block">
                Quiz Complete! ({score}/{filteredQuestions.length})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
