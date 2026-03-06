"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { springDefault } from "@/lib/animations/motion";
import { useAudience } from "@/contexts/AudienceContext";
import { PageTransition } from "@/components/shared/PageTransition";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const LEVEL_COLORS = [
  { bg: "bg-red-500", text: "text-red-600", light: "bg-red-500/10", border: "border-red-500/20", hex: "#EF4444" },
  { bg: "bg-orange-500", text: "text-orange-600", light: "bg-orange-500/10", border: "border-orange-500/20", hex: "#F97316" },
  { bg: "bg-yellow-500", text: "text-yellow-700", light: "bg-yellow-500/10", border: "border-yellow-500/20", hex: "#EAB308" },
  { bg: "bg-sky-blue", text: "text-sky-blue", light: "bg-sky-blue/10", border: "border-sky-blue/20", hex: "#418FDE" },
  { bg: "bg-gator-green", text: "text-gator-green", light: "bg-gator-green/10", border: "border-gator-green/20", hex: "#6CB443" },
];

interface LevelData {
  num: number;
  name: string;
  quote: string;
  desc: {
    student: string;
    faculty: string;
    staff: string;
  };
  studentTip: string;
  facultyDesignTip: string;
  facultySyllabusLanguage: string;
  facultyCommunicationTip: string;
  staffTalkingPoints: string[];
  staffPolicyNote: string;
}

const levels: LevelData[] = [
  {
    num: 1,
    name: "No AI",
    quote: "You must not use AI at any point during the assessment.",
    desc: {
      student:
        "This means you do all the work yourself, no AI help at all. Think of it like a closed-book exam. Your professor wants to see YOUR thinking, YOUR writing, YOUR ideas.",
      faculty:
        "Complete prohibition of AI tools. Ideal for assessments measuring foundational knowledge, in-class exams, and skill demonstrations where authentic individual performance is critical.",
      staff:
        "No AI tools permitted. Used when the institution needs to verify individual competency, such as certification exams, placement tests, or compliance-related assessments.",
    },
    studentTip: "Treat it like a traditional exam. No ChatGPT, no Copilot, no AI grammar tools. If you are unsure whether a tool counts as AI, ask your professor.",
    facultyDesignTip: "Use controlled environments (proctored settings, handwritten components) to support this level. Consider timed in-class writing to ensure authenticity.",
    facultySyllabusLanguage: "No artificial intelligence tools, including but not limited to ChatGPT, Copilot, Gemini, or Grammarly AI features, may be used at any stage of this assignment. All work must be entirely your own.",
    facultyCommunicationTip: "Explain WHY AI is restricted: emphasize building foundational skills and demonstrating individual mastery, not punishment.",
    staffTalkingPoints: [
      "Ensures authentic assessment of individual competency",
      "Critical for accreditation-sensitive evaluations",
      "Not anti-AI, but pro-foundational skills",
    ],
    staffPolicyNote: "Aligns with academic integrity policies. Institutions should provide clear definitions of what constitutes an AI tool at this level.",
  },
  {
    num: 2,
    name: "AI Planning",
    quote: "You may use AI for planning and research only.",
    desc: {
      student:
        "You can use AI to brainstorm ideas, create outlines, or research topics, but when it comes to actually writing or creating your work, that part has to be 100% you.",
      faculty:
        "AI may be used for pre-task activities such as brainstorming, outlining, and initial research. All drafted content, analysis, and final submissions must be student-generated.",
      staff:
        "AI is permitted only for preparatory work. The final deliverable must be human-authored. This level balances AI literacy development with authentic skill demonstration.",
    },
    studentTip: "If your professor says Level 2, here is what you can do: ask AI for topic ideas, use it to make an outline, or have it explain a concept. But your actual paper, project, or response? That is all you.",
    facultyDesignTip: "Require students to submit their AI-generated brainstorm/outline alongside the final product. This teaches transparency and helps you see their process.",
    facultySyllabusLanguage: "You may use AI tools for brainstorming, outlining, and preliminary research. However, all written content, analysis, and final submissions must be your own original work. Submit your AI-generated planning materials alongside your final product.",
    facultyCommunicationTip: "Frame this as 'AI as a thinking partner' not 'AI as a writer.' Students respond well to the analogy of using a calculator for checking math but still showing your work.",
    staffTalkingPoints: [
      "Introduces students to AI as a research and planning tool",
      "Maintains academic integrity for the final product",
      "Builds AI literacy while preserving core skill development",
    ],
    staffPolicyNote: "A practical middle ground that acknowledges AI as a productivity tool while ensuring students develop writing and analytical skills independently.",
  },
  {
    num: 3,
    name: "AI Collaboration",
    quote: "You may use AI to assist with specific tasks and drafting.",
    desc: {
      student:
        "Think of AI as a study buddy or writing tutor. You can use it to help draft sections, get feedback on your writing, or refine your ideas. But you are the one driving the work and making the final calls.",
      faculty:
        "AI may assist with drafting, feedback, and refinement. Students must critically evaluate and substantially modify AI outputs. The emphasis shifts to curation, judgment, and original synthesis.",
      staff:
        "AI serves as a collaborative tool in the creation process. Students are expected to demonstrate critical evaluation of AI outputs and contribute substantial original thought.",
    },
    studentTip: "You can ask AI to help you draft a paragraph, then rewrite it in your voice. You can paste your essay and ask for feedback. The key is: you are the author, AI is the assistant.",
    facultyDesignTip: "Design rubrics that evaluate the quality of student revisions and critical thinking, not just the final output. Ask students to annotate what they changed from AI suggestions and why.",
    facultySyllabusLanguage: "You may use AI tools to assist with drafting, receive feedback, and refine your work. You must critically evaluate all AI-generated content, make substantial modifications, and ensure the final submission reflects your own analysis and voice. Document your AI interactions.",
    facultyCommunicationTip: "Emphasize that this level teaches a critical workplace skill: evaluating and improving AI-generated content. The learning is in the revision process.",
    staffTalkingPoints: [
      "Mirrors real-world AI-augmented workflows",
      "Develops critical evaluation skills alongside AI literacy",
      "Prepares students for AI-collaborative workplaces",
    ],
    staffPolicyNote: "Reflects the direction most industries are moving. Positions the institution as forward-thinking while maintaining rigorous standards for student learning.",
  },
  {
    num: 4,
    name: "Full AI",
    quote: "You may use AI extensively throughout your work.",
    desc: {
      student:
        "You can use AI for pretty much everything: research, writing, editing, coding, you name it. The focus is on how well you direct the AI and evaluate what it gives you. Think of yourself as the project manager.",
      faculty:
        "AI may be used for all elements of the assignment. Assessment focuses on the student's ability to effectively direct AI, evaluate outputs, iterate on results, and produce high-quality final work.",
      staff:
        "Extensive AI use is permitted. Assessment shifts from content creation to AI direction, prompt engineering, output evaluation, and quality assurance. Students demonstrate mastery through orchestration.",
    },
    studentTip: "The focus here is not what the AI wrote, but how well you used it. Did you give good prompts? Did you check the facts? Did you refine the output? Your grade is about your AI skills.",
    facultyDesignTip: "Assess prompt engineering quality, iteration depth, and output evaluation. Consider requiring a 'process portfolio' showing prompt evolution and decision-making rationale.",
    facultySyllabusLanguage: "You may use AI tools extensively throughout this assignment. Your grade will reflect your ability to effectively direct AI tools, critically evaluate outputs, iterate on results, and produce polished, accurate final work. Submit a process log documenting your AI interactions and refinements.",
    facultyCommunicationTip: "Help students understand that 'using AI well' is a skill that employers value. This is not easier, it is different. The bar for quality should be HIGHER when AI is available.",
    staffTalkingPoints: [
      "Teaches prompt engineering and AI direction, high-demand skills",
      "Raises the quality bar since AI handles basics, students must add value",
      "Prepares graduates for AI-native workplaces",
    ],
    staffPolicyNote: "Positions graduates as AI-competent professionals. Important for workforce development messaging and industry partnerships.",
  },
  {
    num: 5,
    name: "AI Exploration",
    quote: "You should use AI creatively to solve the task.",
    desc: {
      student:
        "This is the creative playground. Your professor wants you to push the boundaries of what AI can do. Try new tools, combine approaches, and come up with solutions nobody has thought of before.",
      faculty:
        "Creative and innovative AI use is the primary objective. Students explore cutting-edge AI capabilities, develop novel workflows, and demonstrate original thinking through their AI-augmented approaches.",
      staff:
        "Encourages experimental and innovative AI use. Students are assessed on creativity, novel approaches, and the ability to leverage AI in unprecedented ways. Drives institutional AI innovation.",
    },
    studentTip: "Get creative! Combine different AI tools, try unconventional prompts, build something new. This is your chance to experiment and innovate. Document everything because your process IS the assignment.",
    facultyDesignTip: "Frame assignments as open-ended challenges. Reward novel approaches, creative tool combinations, and thoughtful reflection on AI capabilities and limitations. Consider showcase presentations.",
    facultySyllabusLanguage: "You are encouraged to use AI tools creatively and innovatively to complete this assignment. Explore new AI capabilities, develop novel workflows, and push boundaries. Your grade will reflect the creativity of your approach, the quality of your reflection, and the innovation demonstrated. Document your full process.",
    facultyCommunicationTip: "Position this as an opportunity for students to be pioneers. Share examples of innovative AI use to inspire creativity. Create a safe space for experimentation where 'failure' in AI exploration is still learning.",
    staffTalkingPoints: [
      "Positions the institution at the forefront of AI education",
      "Drives innovation that can inform institutional AI strategy",
      "Attracts forward-thinking students and faculty",
    ],
    staffPolicyNote: "Demonstrates institutional leadership in AI education. Outcomes from Level 5 assignments can inform broader institutional AI adoption and showcase innovation to stakeholders.",
  },
];

const comparisonRows = [
  { activity: "Planning & Brainstorming", levels: [false, true, true, true, true] },
  { activity: "Research & Sourcing", levels: [false, true, true, true, true] },
  { activity: "Drafting & Writing", levels: [false, false, true, true, true] },
  { activity: "Refinement & Editing", levels: [false, false, true, true, true] },
  { activity: "Full Content Generation", levels: [false, false, false, true, true] },
  { activity: "Creative / Novel AI Use", levels: [false, false, false, false, true] },
];

/* ------------------------------------------------------------------ */
/*  SPECTRUM SLIDER COMPONENT                                          */
/* ------------------------------------------------------------------ */

function SpectrumSlider({ activeLevel, onSelect, disabled }: { activeLevel: number | null; onSelect: (n: number) => void; disabled?: boolean }) {
  return (
    <div className="relative mx-auto mt-10 max-w-4xl px-4" role={disabled ? "img" : undefined} aria-label={disabled ? "AI assessment spectrum from Level 1 (No AI) to Level 5 (AI Exploration)" : undefined}>
      <div className="relative h-4 overflow-hidden rounded-full" aria-hidden="true" style={{ background: "linear-gradient(to right, #EF4444, #F97316, #EAB308, #418FDE, #6CB443)" }}>
        {activeLevel !== null && (
          <motion.div
            className="absolute top-0 h-full w-1 bg-white shadow-lg"
            style={{ left: `${((activeLevel - 1) / 4) * 100}%` }}
            layoutId="spectrum-indicator"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>
      <div className="mt-3 flex justify-between">
        {levels.map((level, i) => (
          <button
            key={level.num}
            onClick={() => onSelect(level.num)}
            aria-label={`Select Level ${level.num}`}
            aria-pressed={activeLevel === level.num}
            aria-disabled={disabled ? "true" : undefined}
            tabIndex={disabled ? -1 : undefined}
            className={`flex flex-col items-center transition-all duration-200 ${
              activeLevel === level.num ? "scale-110" : "opacity-60 hover:opacity-100"
            }`}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full font-heading text-sm font-black text-white shadow-md sm:h-12 sm:w-12 sm:text-base"
              style={{ backgroundColor: LEVEL_COLORS[i].hex }}
            >
              {level.num}
            </div>
            <span className="mt-1.5 font-body text-[10px] font-semibold uppercase tracking-wide text-pine-cone/80 sm:text-xs">
              {level.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STUDENT VIEW                                                       */
/* ------------------------------------------------------------------ */

function StudentView() {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  return (
    <>
      {/* Syllabus Banner */}
      <ScrollReveal>
        <div className="mb-10 overflow-hidden rounded-3xl border-2 border-sky-blue/30 bg-sky-blue/5 p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-blue/20">
              <svg className="h-7 w-7 text-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-pine-cone">Always Check Your Syllabus First</h3>
              <p className="mt-1 font-body text-base leading-relaxed text-pine-cone/70">
                Every professor sets their own AI policy. The level they choose can vary by assignment. When in doubt, ask your professor directly. This guide helps you understand what each level means.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Quick Guide Card */}
      <ScrollReveal delay={0.1}>
        <div className="mb-12 overflow-hidden rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-pine-cone">Quick Guide</h2>
          <p className="mt-2 font-body text-base text-pine-cone/80">The scale in plain English:</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {levels.map((level, i) => (
              <motion.div
                key={level.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border p-4 text-center"
                style={{ borderColor: `${LEVEL_COLORS[i].hex}33`, backgroundColor: `${LEVEL_COLORS[i].hex}08` }}
              >
                <div className="font-heading text-3xl font-black" style={{ color: LEVEL_COLORS[i].hex }}>
                  {level.num}
                </div>
                <div className="mt-1 font-heading text-sm font-bold text-pine-cone/80">{level.name}</div>
                <div className="mt-2 font-body text-xs leading-relaxed text-pine-cone/70">
                  {i === 0 && "No AI allowed"}
                  {i === 1 && "AI for brainstorming only"}
                  {i === 2 && "AI helps, you drive"}
                  {i === 3 && "Use AI for everything"}
                  {i === 4 && "Full AI partnership"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Spectrum */}
      <ScrollReveal delay={0.15}>
        <div className="mb-12 overflow-hidden rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-pine-cone">Where Does Your Assignment Fall?</h2>
          <p className="mt-2 font-body text-base text-pine-cone/70">
            Tap a level to see what it means for you.
          </p>
          <SpectrumSlider activeLevel={activeLevel} onSelect={setActiveLevel} />
          {activeLevel !== null && (
            <motion.div
              key={activeLevel}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={springDefault}
              className="mt-8 overflow-hidden rounded-2xl border p-6"
              style={{
                borderColor: `${LEVEL_COLORS[activeLevel - 1].hex}33`,
                backgroundColor: `${LEVEL_COLORS[activeLevel - 1].hex}06`,
              }}
            >
              <h3 className="font-heading text-lg font-bold text-ever-green">
                Level {activeLevel}: {levels[activeLevel - 1].name}
              </h3>
              <p className="mt-3 font-body text-base leading-relaxed text-pine-cone/70">
                {levels[activeLevel - 1].desc.student}
              </p>
              <div className="mt-4 rounded-xl bg-ever-green/[0.04] p-4">
                <p className="font-body text-sm font-semibold text-ever-green">What this means for you:</p>
                <p className="mt-1 font-body text-sm leading-relaxed text-pine-cone/80">
                  {levels[activeLevel - 1].studentTip}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollReveal>

      {/* Level Cards - Student */}
      <div className="space-y-4">
        {levels.map((level, i) => (
          <ScrollReveal key={level.num} delay={i * 0.06}>
            <Link
              href={`/assessment-scale/${level.num}`}
              data-ai-id={`level-${level.num}`}
              className="group flex items-start gap-5 rounded-3xl border border-ever-green/[0.06] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated sm:p-8"
            >
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl" style={{ backgroundColor: `${LEVEL_COLORS[i].hex}12` }}>
                <span className="absolute font-heading text-5xl font-black" style={{ color: `${LEVEL_COLORS[i].hex}20` }}>
                  {level.num}
                </span>
                <span className="relative font-heading text-2xl font-black" style={{ color: LEVEL_COLORS[i].hex }}>
                  {level.num}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-bold text-ever-green sm:text-xl">
                  Level {level.num}: {level.name}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/80">
                  {level.desc.student}
                </p>
              </div>
              <svg className="mt-2 h-5 w-5 shrink-0 text-pine-cone/20 transition-all group-hover:translate-x-1 group-hover:text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FACULTY VIEW                                                       */
/* ------------------------------------------------------------------ */

function FacultyView() {
  const [copiedLevel, setCopiedLevel] = useState<number | null>(null);

  return (
    <>
      {/* For Faculty / For Students info cards */}
      <ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-pill bg-gator-green/10 px-3.5 py-1 font-body text-sm font-bold uppercase tracking-[0.12em] text-gator-green">
              For Faculty
            </div>
            <ul className="mt-2 space-y-3 font-body text-base leading-relaxed text-pine-cone/70">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gator-green" />
                Clearly communicate AI expectations for each assignment
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gator-green" />
                Design assessments that align with learning objectives
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gator-green" />
                Create a consistent course policy around AI use
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gator-green" />
                Adapt assessment strategies as AI tools evolve
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-pill bg-sky-blue/10 px-3.5 py-1 font-body text-sm font-bold uppercase tracking-[0.12em] text-sky-blue">
              For Students
            </div>
            <ul className="mt-2 space-y-3 font-body text-base leading-relaxed text-pine-cone/70">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-blue" />
                Understand when and how AI can be used in your coursework
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-blue" />
                Develop critical thinking skills alongside AI tools
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-blue" />
                Learn to evaluate AI-generated content effectively
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-blue" />
                Build digital literacy skills for the modern workforce
              </li>
            </ul>
          </div>
        </div>
      </ScrollReveal>

      <div className="divider-glow mt-14" />

      {/* Comparison Table */}
      <ScrollReveal>
        <div className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-pine-cone sm:text-3xl">
            What&apos;s Allowed at Each Level
          </h2>
          <p className="mt-3 max-w-2xl font-body text-base text-pine-cone/70">
            A quick visual comparison of AI activities permitted across the five levels.
          </p>

          <div className="mt-8 overflow-x-auto rounded-3xl border border-ever-green/[0.06] bg-white">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-ever-green/[0.06]">
                  <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-pine-cone/80">
                    Activity
                  </th>
                  {levels.map((l) => (
                    <th key={l.num} className="px-4 py-4 text-center font-heading text-sm font-bold uppercase tracking-wider text-pine-cone/80">
                      <span aria-hidden="true">L{l.num}</span>
                      <span className="sr-only">Level {l.num}: {l.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.activity} className={i < comparisonRows.length - 1 ? "border-b border-ever-green/[0.04]" : ""}>
                    <td className="px-6 py-3.5 font-body text-sm font-medium text-pine-cone/70">{row.activity}</td>
                    {row.levels.map((allowed, j) => (
                      <td key={j} className="px-4 py-3.5 text-center" aria-label={allowed ? "Allowed" : "Not allowed"}>
                        {allowed ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gator-green/10 text-gator-green">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-500/5 text-red-400/60">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                        <span className="sr-only">{allowed ? "Allowed" : "Not allowed"}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      <div className="divider-glow mt-14" />

      {/* Spectrum */}
      <ScrollReveal>
        <div className="mt-14 overflow-hidden rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-pine-cone sm:text-3xl">Level Spectrum</h2>
          <p className="mt-2 font-body text-base text-pine-cone/70">The five levels form a continuous spectrum from full restriction to full creative freedom.</p>
          <SpectrumSlider activeLevel={null} onSelect={() => {}} disabled />
        </div>
      </ScrollReveal>

      <div className="divider-glow mt-14" />

      {/* Level Cards with Design Tips + Syllabus Language + Communication Tips */}
      <div className="mt-14">
        <h2 className="font-heading text-2xl font-bold text-pine-cone sm:text-3xl">The Five Levels</h2>
        <p className="mt-3 max-w-2xl font-body text-base text-pine-cone/70">
          Detailed guidance, assignment design tips, and ready-to-use syllabus language for each level.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {levels.map((level, i) => (
          <ScrollReveal key={level.num} delay={i * 0.06}>
            <div data-ai-id={`level-${level.num}`} className="overflow-hidden rounded-3xl border border-ever-green/[0.06] bg-white">
              {/* Card header */}
              <Link
                href={`/assessment-scale/${level.num}`}
                className="group flex items-start gap-6 p-6 transition-colors hover:bg-surface-dim sm:p-8"
              >
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl" style={{ backgroundColor: `${LEVEL_COLORS[i].hex}10` }}>
                  <span className="absolute font-heading text-7xl font-black" style={{ color: `${LEVEL_COLORS[i].hex}15` }}>
                    {level.num}
                  </span>
                  <span className="relative font-heading text-3xl font-black" style={{ color: LEVEL_COLORS[i].hex }}>
                    {level.num}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-pine-cone sm:text-2xl">
                    Level {level.num}: {level.name}
                  </h3>
                  <p className="mt-1 font-body text-sm italic text-pine-cone/80">
                    &ldquo;{level.quote}&rdquo;
                  </p>
                  <p className="mt-2 font-body text-base leading-relaxed text-pine-cone/70">{level.desc.faculty}</p>
                </div>
                <svg className="mt-2 h-5 w-5 shrink-0 text-pine-cone/20 transition-all group-hover:translate-x-1 group-hover:text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              {/* Callouts */}
              <div className="grid gap-4 border-t border-ever-green/[0.04] px-6 py-6 sm:grid-cols-3 sm:px-8">
                {/* Assignment Design Tip */}
                <div className="rounded-2xl bg-gator-green/[0.04] p-5">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    <h4 className="font-heading text-sm font-bold text-ever-green">Assignment Design Tip</h4>
                  </div>
                  <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/80">{level.facultyDesignTip}</p>
                </div>

                {/* Syllabus Language */}
                <div className="rounded-2xl bg-sky-blue/[0.04] p-5">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <h4 className="font-heading text-sm font-bold text-ever-green">Syllabus Language</h4>
                  </div>
                  <p className="mt-2 font-body text-sm italic leading-relaxed text-pine-cone/80">&ldquo;{level.facultySyllabusLanguage}&rdquo;</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigator.clipboard.writeText(level.facultySyllabusLanguage);
                      setCopiedLevel(level.num);
                      setTimeout(() => setCopiedLevel(null), 2000);
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-sky-blue/10 px-3 py-1.5 font-body text-xs font-semibold text-sky-blue transition-colors hover:bg-sky-blue/20"
                  >
                    {copiedLevel === level.num ? (
                      <>
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                        Copy to clipboard
                      </>
                    )}
                  </button>
                </div>

                {/* How to Communicate */}
                <div className="rounded-2xl bg-sunrise-orange/[0.04] p-5">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-sunrise-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                    <h4 className="font-heading text-sm font-bold text-ever-green">Communicating to Students</h4>
                  </div>
                  <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/80">{level.facultyCommunicationTip}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  STAFF VIEW                                                         */
/* ------------------------------------------------------------------ */

function StaffView() {
  return (
    <>
      {/* Institutional Context */}
      <ScrollReveal>
        <div className="mb-10 rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-pill bg-sunrise-orange/10 px-3.5 py-1 font-body text-sm font-bold uppercase tracking-[0.12em] text-sunrise-orange">
            Institutional Communications
          </div>
          <h2 className="font-heading text-xl font-bold text-pine-cone sm:text-2xl">
            Explaining the AI Assessment Scale
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed text-pine-cone/80">
            The AI Assessment Scale gives Green River College a consistent, institution-wide framework for communicating AI expectations.
            Whether you are speaking with parents, board members, accreditation bodies, or community partners, this scale demonstrates
            that AI use is intentional, structured, and aligned with learning outcomes.
          </p>
        </div>
      </ScrollReveal>

      {/* Spectrum */}
      <ScrollReveal delay={0.1}>
        <div className="mb-12 overflow-hidden rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-pine-cone sm:text-3xl">The Spectrum at a Glance</h2>
          <p className="mt-2 font-body text-base text-pine-cone/70">From full restriction to full creative freedom.</p>
          <SpectrumSlider activeLevel={null} onSelect={() => {}} disabled />
        </div>
      </ScrollReveal>

      {/* How to Explain to Different Audiences */}
      <ScrollReveal delay={0.15}>
        <div className="mb-12 rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
          <h2 className="font-heading text-xl font-bold text-pine-cone sm:text-2xl">
            How to Explain the Scale
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-gator-green/[0.04] p-5">
              <h4 className="font-heading text-sm font-bold text-ever-green">To Parents & Families</h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/80">
                &ldquo;Our college uses a clear 5-level system so students always know exactly when and how AI tools can be used.
                This ensures academic integrity while preparing students for an AI-enabled workforce.&rdquo;
              </p>
            </div>
            <div className="rounded-2xl bg-sky-blue/[0.04] p-5">
              <h4 className="font-heading text-sm font-bold text-ever-green">To Board Members</h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/80">
                &ldquo;The AI Assessment Scale provides institutional governance over AI integration in curriculum.
                It standardizes expectations, supports accreditation compliance, and positions us as leaders in responsible AI adoption.&rdquo;
              </p>
            </div>
            <div className="rounded-2xl bg-sunrise-orange/[0.04] p-5">
              <h4 className="font-heading text-sm font-bold text-ever-green">To Community Partners</h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/80">
                &ldquo;Our graduates learn to work with AI responsibly and effectively, from understanding when not to use it
                to leveraging it for creative problem-solving. This prepares them for real-world AI-augmented roles.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="divider-glow" />

      {/* Level Cards with Talking Points + Policy Notes */}
      <div className="mt-14">
        <h2 className="font-heading text-2xl font-bold text-pine-cone sm:text-3xl">Levels & Talking Points</h2>
        <p className="mt-3 max-w-2xl font-body text-base text-pine-cone/70">
          Key messaging and policy context for each level of the scale.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {levels.map((level, i) => (
          <ScrollReveal key={level.num} delay={i * 0.06}>
            <div data-ai-id={`level-${level.num}`} className="overflow-hidden rounded-3xl border border-ever-green/[0.06] bg-white">
              <Link
                href={`/assessment-scale/${level.num}`}
                className="group flex items-start gap-6 p-6 transition-colors hover:bg-surface-dim sm:p-8"
              >
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl" style={{ backgroundColor: `${LEVEL_COLORS[i].hex}10` }}>
                  <span className="absolute font-heading text-7xl font-black" style={{ color: `${LEVEL_COLORS[i].hex}15` }}>
                    {level.num}
                  </span>
                  <span className="relative font-heading text-3xl font-black" style={{ color: LEVEL_COLORS[i].hex }}>
                    {level.num}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-pine-cone sm:text-2xl">
                    Level {level.num}: {level.name}
                  </h3>
                  <p className="mt-2 font-body text-base leading-relaxed text-pine-cone/70">{level.desc.staff}</p>
                </div>
                <svg className="mt-2 h-5 w-5 shrink-0 text-pine-cone/20 transition-all group-hover:translate-x-1 group-hover:text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <div className="grid gap-4 border-t border-ever-green/[0.04] px-6 py-6 sm:grid-cols-2 sm:px-8">
                {/* Talking Points */}
                <div className="rounded-2xl bg-ever-green/[0.03] p-5">
                  <h4 className="flex items-center gap-2 font-heading text-sm font-bold text-ever-green">
                    <svg className="h-4 w-4 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    Key Talking Points
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {level.staffTalkingPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2 font-body text-sm leading-relaxed text-pine-cone/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gator-green" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Policy Implications */}
                <div className="rounded-2xl bg-sky-blue/[0.03] p-5">
                  <h4 className="flex items-center gap-2 font-heading text-sm font-bold text-ever-green">
                    <svg className="h-4 w-4 text-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                    Policy Implications
                  </h4>
                  <p className="mt-3 font-body text-sm leading-relaxed text-pine-cone/80">{level.staffPolicyNote}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function AssessmentScalePage() {
  const { audience } = useAudience();
  const isStudent = audience === "student";
  const isStaff = audience === "staff";

  return (
    <PageTransition>
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden" aria-hidden="true">
          <div className="mx-auto flex max-w-7xl justify-between px-4 opacity-[0.03]">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <span key={n} className="font-heading font-black" style={{ fontSize: "clamp(8rem, 15vw, 20rem)", color: LEVEL_COLORS[i].hex }}>
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="relative max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-pill bg-sky-blue/10 px-3.5 py-1 font-body text-sm font-bold uppercase tracking-[0.12em] text-sky-blue"
          >
            Framework
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-title font-heading font-extrabold text-pine-cone"
          >
            {isStudent ? "What This Means For You" : "AI Assessment Scale"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-subtitle font-body text-pine-cone/80"
          >
            {isStudent
              ? "Your professors use a 5-level scale to tell you how much AI you can use on each assignment. Here is what each level means and how to stay on the right side of the rules."
              : isStaff
                ? "The 5-Level AI Assessment Scale provides an institution-wide framework for communicating AI expectations across courses, departments, and external stakeholders."
                : "The 5-Level AI Assessment Scale provides a structured approach to incorporating AI tools in your courses, acknowledging the reality that AI is here to stay in education."}
          </motion.p>
        </div>

        {/* Gradient accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...springDefault, delay: 0.3 }}
          className="mt-10 h-1 origin-left rounded-full"
          style={{ background: "linear-gradient(to right, #EF4444, #F97316, #EAB308, #418FDE, #6CB443)" }}
        />

        <div className="mt-14" data-ai-id="scale-overview">
          {isStudent ? (
            <StudentView />
          ) : isStaff ? (
            <StaffView />
          ) : (
            <FacultyView />
          )}
        </div>

        {/* External Resources */}
        <div className="mt-16 rounded-3xl border border-ever-green/[0.06] bg-gradient-to-br from-gator-green/[0.03] to-sky-blue/[0.03] p-8 sm:p-10">
          <h2 className="font-heading text-xl font-bold text-pine-cone">Assessment Scale Resources</h2>
          <p className="mt-2 font-body text-sm text-pine-cone/70">
            Access the full assessment toolkit documents and learn more about the AI Assessment Scale framework.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://docs.google.com/document/d/1KkPL3nzr0Z-kh66G6MwN3WdrRxk_h99NSZZP_3RE3nY/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gator-green/10 px-5 py-2.5 font-body text-sm font-semibold text-gator-green transition-colors hover:bg-gator-green/20"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              Full Assessment Toolkit (Google Doc)
            </a>
            <a
              href="https://aiassessmentscale.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-ever-green/15 bg-white px-5 py-2.5 font-body text-sm font-semibold text-ever-green transition-colors hover:bg-ever-green/[0.04]"
            >
              AI Assessment Scale Official Site
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
