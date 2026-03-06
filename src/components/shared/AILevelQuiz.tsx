"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { springDefault } from "@/lib/animations/motion";
import { quizQuestions, calculateResult, getQuestionForAudience, getLevelSummary, type QuizResult } from "@/lib/data/quiz-questions";
import type { Audience } from "@/contexts/AudienceContext";

const STORAGE_KEY = "grc-quiz-result";

const accentColors: Record<string, { bar: string; badge: string; hover: string; cta: string; ctaHover: string }> = {
  student: { bar: "bg-sky-blue", badge: "bg-sky-blue/10 text-sky-blue-text", hover: "hover:border-sky-blue/30", cta: "bg-sky-blue hover:bg-sky-blue/90", ctaHover: "text-sky-blue hover:bg-sky-blue/5 border-sky-blue/15" },
  faculty: { bar: "bg-gator-green", badge: "bg-gator-green/10 text-gator-green-text", hover: "hover:border-gator-green/30", cta: "bg-ever-green hover:bg-grc-green", ctaHover: "text-ever-green hover:bg-ever-green/5 border-ever-green/15" },
  staff: { bar: "bg-sunrise-orange", badge: "bg-sunrise-orange/10 text-sunrise-orange-text", hover: "hover:border-sunrise-orange/30", cta: "bg-sunrise-orange hover:bg-sunrise-orange/90", ctaHover: "text-sunrise-orange hover:bg-sunrise-orange/5 border-sunrise-orange/15" },
};

const defaultAccent = accentColors.faculty;

interface AILevelQuizProps {
  audience?: Audience;
}

export function AILevelQuiz({ audience }: AILevelQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setResult(JSON.parse(stored));
        setStep(quizQuestions.length);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  function handleSelect(optionIndex: number) {
    if (transitioning) return;
    setTransitioning(true);

    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (newAnswers.length === quizQuestions.length) {
      const res = calculateResult(newAnswers);
      setResult(res);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
      setStep(quizQuestions.length);
    } else {
      setStep((s) => s + 1);
    }

    setTimeout(() => setTransitioning(false), 300);
  }

  function handleBack() {
    if (step <= 0 || transitioning) return;
    setTransitioning(true);
    setAnswers((prev) => prev.slice(0, -1));
    setStep((s) => s - 1);
    setTimeout(() => setTransitioning(false), 300);
  }

  function handleRetake() {
    setStep(0);
    setAnswers([]);
    setResult(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const prefersReduced = useReducedMotion();
  const total = quizQuestions.length;
  const progress = Math.round(((step) / total) * 100);
  const isResult = step >= total && result;
  const colors = audience ? (accentColors[audience] ?? defaultAccent) : defaultAccent;
  const slide = prefersReduced ? {} : { x: 40 };
  const slideExit = prefersReduced ? {} : { x: -40 };

  const currentQuestion = step < total ? getQuestionForAudience(step, audience) : null;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      {!isResult && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-sm font-medium text-pine-cone/80">
              Question {step + 1} of {total}
            </span>
            <span className="font-body text-sm font-bold text-pine-cone/70">{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-pine-cone/10">
            <motion.div
              className={`h-full rounded-full ${colors.bar}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={springDefault}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isResult && result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, ...slide }}
            animate={{ opacity: 1, x: 0 }}
            transition={springDefault}
            className="text-center"
          >
            {/* Level ring */}
            <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 128 128" aria-hidden="true">
                <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="6" className="text-ever-green/10" />
                <motion.circle
                  cx="64" cy="64" r="56"
                  fill="none" stroke="currentColor" strokeWidth="6"
                  className={result.description.color}
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - result.confidence / 100) }}
                  transition={springDefault}
                  strokeLinecap="round"
                />
              </svg>
              <span className={`font-heading text-5xl font-black ${result.description.color}`}>
                {result.level}
              </span>
            </div>

            <h2 className="font-heading text-3xl font-extrabold text-pine-cone">
              Level {result.level}: {result.description.name}
            </h2>
            <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-pine-cone/70">
              {getLevelSummary(result.description, audience)}
            </p>
            <p className="mt-2 font-body text-sm text-pine-cone/80">
              Confidence: {result.confidence}%
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={result.description.href}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-body text-sm font-semibold text-white transition-all btn-press ${colors.cta}`}
              >
                Learn about Level {result.level}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <button
                onClick={handleRetake}
                className={`rounded-xl border px-5 py-2.5 font-body text-sm font-semibold transition-all ${colors.ctaHover}`}
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        ) : currentQuestion ? (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, ...slide }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, ...slideExit }}
            transition={springDefault}
          >
            <div className="flex items-center gap-3">
              {step > 0 && (
                <button
                  onClick={handleBack}
                  aria-label="Go back to previous question"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ever-green/[0.06] text-pine-cone/70 transition-colors hover:bg-ever-green/5 hover:text-pine-cone"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}
              <h2 className="font-heading text-2xl font-bold text-pine-cone sm:text-3xl">
                {currentQuestion.question}
              </h2>
            </div>
            <fieldset className="mt-6 space-y-3" role="radiogroup">
              <legend className="sr-only">{currentQuestion.question}</legend>
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  role="radio"
                  aria-checked={false}
                  className={`group w-full rounded-2xl border-2 border-ever-green/[0.06] bg-white p-5 text-left font-body text-base text-pine-cone transition-all bento-card-hover option-pop ${colors.hover}`}
                >
                  <span className="mr-3 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ever-green/[0.06] font-heading text-xs font-bold text-ever-green">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option.text}
                </button>
              ))}
            </fieldset>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
