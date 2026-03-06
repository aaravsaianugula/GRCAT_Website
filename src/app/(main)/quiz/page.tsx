"use client";

import { PageTransition } from "@/components/shared/PageTransition";
import { AILevelQuiz } from "@/components/shared/AILevelQuiz";
import { useAudience } from "@/contexts/AudienceContext";

const badgeColors: Record<string, string> = {
  student: "bg-sky-blue/10 text-sky-blue",
  faculty: "bg-gator-green/10 text-gator-green",
  staff: "bg-sunrise-orange/10 text-sunrise-orange",
};

export default function QuizPage() {
  const { audience } = useAudience();
  const badge = audience ? (badgeColors[audience] ?? "bg-gator-green/10 text-gator-green") : "bg-gator-green/10 text-gator-green";

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="mb-12 text-center">
          <span className={`mb-4 inline-flex items-center rounded-pill px-3.5 py-1 font-body text-sm font-bold uppercase tracking-[0.12em] ${badge}`}>
            Interactive
          </span>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-pine-cone sm:text-5xl">
            What&apos;s Your AI Level?
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-body text-lg text-pine-cone/60">
            Answer 6 quick questions to find out which AI Assessment Scale level
            matches your current comfort and approach.
          </p>
        </div>
        <AILevelQuiz audience={audience} />
      </div>
    </PageTransition>
  );
}
