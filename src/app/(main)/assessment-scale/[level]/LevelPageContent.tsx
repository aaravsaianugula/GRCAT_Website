"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/shared/PageTransition";
import { useAudience } from "@/contexts/AudienceContext";

interface LevelInfo {
  name: string;
  color: string;
  borderAccent: string;
  bgColor: string;
  quote: string;
  desc: string;
  studentDesc: string;
  facultyTips: string[];
  staffTalkingPoints: string[];
  bestFor: string[];
  activities: string[];
  guidance: string;
  studentTip: string;
  toolkitDocUrl?: string;
}

const levelData: Record<string, LevelInfo> = {
  "1": {
    name: "No AI",
    color: "bg-red-500/10 text-red-600 border-red-500/20",
    borderAccent: "border-l-red-500",
    bgColor: "from-red-500/5 to-red-500/0",
    quote: "You must not use AI at any point during the assessment.",
    desc: "Students complete all work without any AI assistance in a controlled environment. This level is appropriate when the learning objective requires demonstrating personal mastery of foundational skills, ensuring that the student can perform the task independently.",
    studentDesc: "This means you need to do ALL the work yourself — no ChatGPT, no Grammarly, no AI tools at all. Your instructor wants to see what YOU know and can do on your own. Think of it like an open-book test where the only 'book' is your brain.",
    facultyTips: [
      "Use proctored or in-class environments to ensure compliance",
      "Communicate clearly what counts as 'AI' — including grammar checkers and autocomplete",
      "Design assessments that test recall, synthesis, or physical demonstration",
      "Consider timed conditions to reinforce independent work",
    ],
    staffTalkingPoints: [
      "Level 1 ensures academic integrity in foundational skill assessments",
      "Used primarily for exams, practicals, and core competency verification",
      "Faculty determine when Level 1 is appropriate based on learning objectives",
    ],
    bestFor: [
      "Core skill demonstrations",
      "Exams and quizzes",
      "Foundational knowledge assessments",
      "Lab practicals",
    ],
    activities: [
      "In-class handwritten essays or exams",
      "Proctored tests that assess core competency",
      "Lab practicals requiring hands-on skill demonstration",
      "Timed assessments where independent recall is essential",
      "Oral presentations or defenses",
    ],
    guidance: "Use this level when it is critical to verify that a student has internalized the knowledge or skill being assessed. No AI tools, including grammar checkers or spell-check beyond basic word processing, should be used.",
    studentTip: "If your syllabus says Level 1, plan to complete the entire assignment without any AI help. This includes brainstorming, drafting, and editing — it's all you!",
    toolkitDocUrl: "https://docs.google.com/document/d/1HI2thmfAtqRfbSgBX2An86aTEswhs5gEzc3OKzYnYSw/edit?usp=sharing",
  },
  "2": {
    name: "AI Planning",
    color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    borderAccent: "border-l-orange-500",
    bgColor: "from-orange-500/5 to-orange-500/0",
    quote: "You may use AI for planning and research only.",
    desc: "Students may use AI for pre-task activities like brainstorming, outlining, and research. However, all drafting, writing, and final content must be entirely the student's own work. AI is a starting point, not a co-author.",
    studentDesc: "You CAN use AI to help you get started — brainstorm ideas, create an outline, or research a topic. But once you start actually writing or creating your final work, that needs to be 100% you. Think of AI as a study buddy who helps you plan, not a ghostwriter.",
    facultyTips: [
      "Require students to submit their AI-generated outlines alongside final work",
      "Create a 'planning disclosure' template for students to document AI use",
      "Design rubrics that weight the final product over the planning process",
      "Consider having students submit planning artifacts separately",
    ],
    staffTalkingPoints: [
      "Level 2 allows AI as a research and planning aid, not a content creator",
      "Students must clearly distinguish between AI-assisted planning and their own work",
      "This is one of the most commonly used levels across departments",
    ],
    bestFor: [
      "Essays and research papers",
      "Project planning",
      "Brainstorming sessions",
      "Literature reviews",
    ],
    activities: [
      "Using AI to generate topic ideas or explore angles for a paper",
      "Creating initial outlines with AI assistance before writing independently",
      "Researching background information through AI-powered search",
      "Generating questions to guide independent investigation",
      "Using AI to identify relevant sources or frameworks",
    ],
    guidance: "Students should disclose any AI use during the planning phase. The final submitted work must be entirely student-written. AI outputs used in planning should not appear verbatim in the final product.",
    studentTip: "Great for getting unstuck! Use ChatGPT to brainstorm 10 essay topics, then pick one and write it yourself. Just remember to mention that you used AI for planning.",
    toolkitDocUrl: "https://docs.google.com/document/d/1GsDegd_wFRlBLdWZ04ueprY5ZQBM4UNODlXGSdMJ2tI/edit?usp=sharing",
  },
  "3": {
    name: "AI Collaboration",
    color: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    borderAccent: "border-l-yellow-500",
    bgColor: "from-yellow-500/5 to-yellow-500/0",
    quote: "You may use AI to assist with specific tasks and drafting.",
    desc: "Students may use AI to assist with drafting, receive feedback, and refine their work. Critical evaluation of all AI-generated content is required. Students must demonstrate that they can assess, revise, and improve upon what AI produces.",
    studentDesc: "This is a real partnership between you and AI. You can use AI to help draft sections, get feedback on your writing, or refine your ideas. BUT — you need to think critically about what the AI gives you. Don't just copy-paste; evaluate, revise, and make it better.",
    facultyTips: [
      "Require a 'revision log' showing how students modified AI-generated content",
      "Design assignments where critical evaluation of AI output IS the learning",
      "Have students compare their revisions to the original AI output",
      "Create rubrics that assess the quality of student revision, not just the final product",
    ],
    staffTalkingPoints: [
      "Level 3 develops critical thinking skills alongside AI literacy",
      "Students learn to evaluate and improve AI-generated content",
      "Documentation of the collaboration process is a key component",
    ],
    bestFor: [
      "Writing assignments with multiple drafts",
      "Projects requiring iterative refinement",
      "Critical evaluation exercises",
      "Peer review with AI augmentation",
    ],
    activities: [
      "Using AI to generate a first draft, then substantially revising it",
      "Asking AI for feedback on grammar, structure, or argumentation",
      "Collaborating with AI on specific sections while writing others independently",
      "Comparing AI-generated content with student work to develop critical evaluation skills",
      "Using AI to translate or adapt content for different audiences",
    ],
    guidance: "Students must document their AI interactions and clearly show how they revised and improved upon AI-generated content. The focus is on the student's ability to think critically about AI output.",
    studentTip: "Think of AI as a first-draft partner. It gives you something to work with, but YOUR job is to make it better, more accurate, and more personal. Keep track of what the AI wrote vs. what you changed.",
    toolkitDocUrl: "https://docs.google.com/document/d/1hczLasu4eaoJJvs3iolxBgyEYWr1a2H7rH6qef_4AlQ/edit?usp=sharing",
  },
  "4": {
    name: "Full AI",
    color: "bg-sky-blue/10 text-sky-blue border-sky-blue/20",
    borderAccent: "border-l-sky-blue",
    bgColor: "from-sky-blue/5 to-sky-blue/0",
    quote: "You may use AI extensively throughout your work.",
    desc: "Students may use AI for any elements of the assignment. The focus shifts to how effectively the student can direct AI, evaluate its output, and integrate AI-generated content into a polished final product.",
    studentDesc: "You can use AI for basically everything in this assignment! But here's the catch — your grade depends on HOW WELL you use it. Can you write good prompts? Can you spot when the AI is wrong? Can you combine AI outputs into something polished? This level tests your AI skills.",
    facultyTips: [
      "Assess prompt engineering quality, not just final output",
      "Require detailed documentation of the AI workflow used",
      "Design rubrics that evaluate tool selection and integration",
      "Have students reflect on AI limitations they encountered",
    ],
    staffTalkingPoints: [
      "Level 4 develops workforce-ready AI skills",
      "Focus is on directing and evaluating AI, not on AI replacement of learning",
      "Prepares students for careers where AI proficiency is expected",
    ],
    bestFor: [
      "Prompt engineering exercises",
      "AI tool exploration and learning",
      "Output evaluation and curation",
      "Workflow documentation",
    ],
    activities: [
      "Crafting effective prompts to achieve specific outcomes",
      "Using multiple AI tools and comparing their outputs",
      "Evaluating and curating AI-generated content for accuracy and quality",
      "Documenting the AI workflow and reflecting on the process",
      "Building multi-step AI workflows for complex tasks",
    ],
    guidance: "Assessment at this level focuses on the student's skill in using AI as a tool: prompt quality, evaluation rigor, and the ability to identify and correct AI errors or biases. Detailed documentation of the AI interaction process is expected.",
    studentTip: "This is where your prompt engineering skills shine! Try different approaches, use multiple AI tools, and document everything. Your ability to GET GREAT RESULTS from AI is what's being graded.",
    toolkitDocUrl: "https://docs.google.com/document/d/1-z3iszlYJU0w3LWq2S3HZVx99LE5xAiRyPmQTQucMvk/edit?usp=sharing",
  },
  "5": {
    name: "AI Exploration",
    color: "bg-gator-green/10 text-gator-green border-gator-green/20",
    borderAccent: "border-l-gator-green",
    bgColor: "from-gator-green/5 to-gator-green/0",
    quote: "You should use AI creatively to solve the task.",
    desc: "Students are encouraged to use AI creatively to develop innovative solutions and approaches. This level pushes students to explore the boundaries of what AI can do and to find novel ways to leverage AI for complex problem-solving.",
    studentDesc: "Go wild with AI! This level wants you to be creative and innovative. Push the boundaries of what AI can do, combine tools in new ways, and come up with solutions nobody has thought of. This is about YOUR creativity + AI's power = something amazing.",
    facultyTips: [
      "Design open-ended problems that have no single correct answer",
      "Assess creativity, innovation, and ethical reflection",
      "Allow students to choose their own AI tools and approaches",
      "Encourage experimentation and documentation of failures as learning",
    ],
    staffTalkingPoints: [
      "Level 5 is used for advanced courses and capstone experiences",
      "Develops innovation skills and creative problem-solving with AI",
      "Students explore ethical boundaries and document limitations",
    ],
    bestFor: [
      "Advanced capstone projects",
      "Innovative problem-solving challenges",
      "Portfolio experiences",
      "Research projects",
    ],
    activities: [
      "Designing novel AI workflows to solve open-ended problems",
      "Combining multiple AI tools in creative ways",
      "Pushing AI capabilities to their limits and documenting findings",
      "Developing original methodologies that integrate AI as a core component",
      "Creating AI-augmented portfolios or presentations",
    ],
    guidance: "Students are assessed on creativity, innovation, and their ability to push beyond conventional AI use. Reflection on the process, limitations encountered, and ethical considerations is an important component at this level.",
    studentTip: "This is the most exciting level! Experiment, iterate, fail forward, and create something truly original. Document your process — the journey matters as much as the destination.",
    toolkitDocUrl: "https://docs.google.com/document/d/1bz0YCMVuhn5waMYALM4nw4idO4CrCDcxbv-Z69FS5ko/edit?usp=sharing",
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function LevelPageContent({ level }: { level: string }) {
  const { audience } = useAudience();
  const data = levelData[level];

  if (!data) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
          <Link
            href="/assessment-scale"
            className="mb-8 inline-flex items-center gap-2 font-body text-sm font-medium text-pine-cone/60 transition-colors hover:text-ever-green"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Assessment Scale
          </Link>
          <h1 className="text-title font-heading font-extrabold text-pine-cone">Level Not Found</h1>
          <p className="mt-4 font-body text-lg text-pine-cone/70">
            The assessment level you requested does not exist. Please return to the overview.
          </p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Hero banner */}
      <div className={`bg-gradient-to-br ${data.bgColor} border-b border-ever-green/[0.06]`}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
          <Link
            href="/assessment-scale"
            className="mb-6 inline-flex items-center gap-2 font-body text-sm font-medium text-pine-cone/60 transition-colors hover:text-ever-green"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Assessment Scale
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 sm:flex-row sm:items-start"
          >
            <div
              className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-2 ${data.color} font-heading text-5xl font-black`}
            >
              {level}
            </div>
            <div>
              <h1 className="text-title font-heading font-extrabold text-pine-cone">
                Level {level}: {data.name}
              </h1>
              <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-pine-cone/80">
                {audience === "student" ? data.studentDesc : data.desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
        {/* Student tip banner */}
        {audience === "student" && (
          <motion.div {...fadeUp} className="mb-10 rounded-3xl border border-sky-blue/20 bg-sky-blue/5 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-blue/15 text-sky-blue">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-ever-green">Student Tip</h3>
                <p className="mt-1 font-body text-sm leading-relaxed text-pine-cone/80">{data.studentTip}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blockquote — Syllabus Language */}
        <motion.div
          {...fadeUp}
          className={`rounded-3xl border-l-4 ${data.borderAccent} bg-white p-6 shadow-card sm:p-8`}
        >
          <p className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-pine-cone/60">
            Suggested Syllabus Language
          </p>
          <blockquote className="font-body text-xl italic leading-relaxed text-pine-cone/80">
            &ldquo;{data.quote}&rdquo;
          </blockquote>
          {audience === "faculty" && (
            <p className="mt-4 font-body text-sm text-pine-cone/60">
              Copy this language directly into your syllabus, or customize it for your course context.
              See the <Link href="/toolkits/syllabus" className="font-semibold text-ever-green hover:underline">Syllabus Statement Toolkit</Link> for more options.
            </p>
          )}
        </motion.div>

        <div className="divider-glow mt-12" />

        {/* Best For tags */}
        <motion.div {...fadeUp} className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-pine-cone">
            {audience === "student" ? "When Your Instructor Uses This Level" : "Best For"}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {data.bestFor.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center rounded-pill border px-4 py-2 font-body text-sm font-semibold ${data.color}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="divider-glow mt-12" />

        {/* Activities */}
        <motion.div {...fadeUp} className="mt-12 rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-pine-cone">
            {audience === "student" ? "What This Looks Like in Practice" : "Activities That Fit This Level"}
          </h2>
          <ul className="mt-6 space-y-4">
            {data.activities.map((activity) => (
              <li key={activity} className="flex items-start gap-3 font-body text-base leading-relaxed text-pine-cone/80">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gator-green" />
                {activity}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Faculty tips section */}
        {audience === "faculty" && (
          <motion.div {...fadeUp} className="mt-6 rounded-3xl border border-gator-green/10 bg-gator-green/5 p-8 sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-pine-cone">
              Assignment Design Tips
            </h2>
            <ul className="mt-6 space-y-4">
              {data.facultyTips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 font-body text-base leading-relaxed text-pine-cone/80">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  {tip}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/toolkits/assessment-design"
                className="inline-flex items-center gap-2 rounded-xl bg-ever-green px-5 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-grc-green"
              >
                Assessment Design Toolkit
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/toolkits/syllabus"
                className="inline-flex items-center gap-2 rounded-xl border border-ever-green/20 bg-white px-5 py-2.5 font-body text-sm font-semibold text-ever-green transition-all hover:bg-ever-green/5"
              >
                Syllabus Language Toolkit
              </Link>
            </div>
          </motion.div>
        )}

        {/* Staff talking points */}
        {audience === "staff" && (
          <motion.div {...fadeUp} className="mt-6 rounded-3xl border border-sunrise-orange/10 bg-sunrise-orange/5 p-8 sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-pine-cone">
              Key Talking Points
            </h2>
            <p className="mt-2 font-body text-sm text-pine-cone/60">
              Use these points when communicating about AI assessment policies to parents, board members, or community stakeholders.
            </p>
            <ul className="mt-6 space-y-4">
              {data.staffTalkingPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 font-body text-base leading-relaxed text-pine-cone/80">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-sunrise-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Guidance */}
        <motion.div {...fadeUp} className="mt-6 rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-pine-cone">
            {audience === "student" ? "What Your Instructor Expects" : "Implementation Guidance"}
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-pine-cone/80">
            {data.guidance}
          </p>
          {data.toolkitDocUrl && audience !== "student" && (
            <a
              href={data.toolkitDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gator-green/10 px-5 py-2.5 font-body text-sm font-semibold text-gator-green transition-colors hover:bg-gator-green/20"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              View Level {level} Assessment Toolkit (Google Doc)
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}
        </motion.div>

        {/* Level spectrum */}
        <motion.div {...fadeUp} className="mt-12">
          <h3 className="mb-6 font-heading text-lg font-bold text-ever-green">All Levels</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(levelData).map(([n, d]) => (
              <Link
                key={n}
                href={`/assessment-scale/${n}`}
                className={`flex shrink-0 flex-col items-center gap-1 rounded-2xl border px-5 py-4 transition-all hover:scale-105 ${
                  n === level ? `${d.color} ring-2 ring-current shadow-card` : "border-ever-green/[0.06] bg-white hover:shadow-card"
                }`}
              >
                <span className="font-heading text-2xl font-black">{n}</span>
                <span className="font-body text-xs font-medium">{d.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Navigation between levels */}
        <div className="mt-12 flex items-center justify-between">
          {Number(level) > 1 ? (
            <Link
              href={`/assessment-scale/${Number(level) - 1}`}
              className="inline-flex items-center gap-2 rounded-2xl border border-ever-green/[0.06] bg-white px-5 py-3 font-body text-sm font-medium text-pine-cone/70 transition-all hover:-translate-y-0.5 hover:shadow-elevated hover:text-ever-green"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Level {Number(level) - 1}: {levelData[String(Number(level) - 1)]?.name}
            </Link>
          ) : (
            <div />
          )}
          {Number(level) < 5 ? (
            <Link
              href={`/assessment-scale/${Number(level) + 1}`}
              className="inline-flex items-center gap-2 rounded-2xl border border-ever-green/[0.06] bg-white px-5 py-3 font-body text-sm font-medium text-pine-cone/70 transition-all hover:-translate-y-0.5 hover:shadow-elevated hover:text-ever-green"
            >
              Level {Number(level) + 1}: {levelData[String(Number(level) + 1)]?.name}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </PageTransition>
  );
}
