import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/shared/PageTransition";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Best Practices",
  description:
    "AI best practices and guidelines tailored for your role at Green River College.",
};

/* ------------------------------------------------------------------ */
/*  SVG Icon Components                                                */
/* ------------------------------------------------------------------ */

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function LightBulbIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function BookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function ChatIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  );
}

function ClipboardIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
    </svg>
  );
}

function UserGroupIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  );
}

function AcademicCapIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  );
}

function LockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}

function CogIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data types                                                         */
/* ------------------------------------------------------------------ */

interface DoItem {
  title: string;
  description: string;
  prompt?: string;
}

interface DontItem {
  title: string;
  description: string;
}

interface Principle {
  title: string;
  description: string;
}

interface Scenario {
  quote: string;
  attribution: string;
}

interface ToolRec {
  name: string;
  purpose: string;
  tip: string;
}

interface ChecklistItem {
  label: string;
  category: string;
}

interface AudienceData {
  title: string;
  accent: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  cardAccent: string;
  desc: string;
  overview: string;
  principles: Principle[];
  dos: DoItem[];
  donts: DontItem[];
  scenarios: Scenario[];
  tools: ToolRec[];
  checklist: ChecklistItem[];
  ctaText: string;
  ctaHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
}

/* ------------------------------------------------------------------ */
/*  Audience data — sourced from GRC AI Task Force LibGuide PDFs       */
/* ------------------------------------------------------------------ */

const audienceData: Record<string, AudienceData> = {
  students: {
    title: "Student Best Practices",
    accent: "Students",
    accentColor: "text-sky-blue",
    accentBg: "bg-sky-blue/10",
    accentBorder: "border-sky-blue/20",
    cardAccent: "card-accent-blue",
    desc: "Guidelines for using AI ethically in your coursework — from brainstorming to citation.",
    overview:
      "This guide helps you understand how to use artificial intelligence tools ethically and effectively in your coursework. Learn what is appropriate, what to avoid, and how to make the most of these powerful resources while maintaining academic integrity.",
    principles: [
      {
        title: "Be Transparent",
        description:
          "Let your instructor know how you used AI in your process. Many instructors appreciate honesty about AI use and may even encourage it for certain tasks.",
      },
      {
        title: "Stay in Control",
        description:
          "Use AI for support, not shortcuts. You should always understand the content you are submitting and be able to explain it in your own words.",
      },
      {
        title: "Know the Rules",
        description:
          "Each course may have its own AI policy — follow it. Some instructors may prohibit AI use entirely, while others may encourage it for specific assignments.",
      },
    ],
    dos: [
      {
        title: "Brainstorm Ideas",
        description:
          "Get unstuck with topic ideas or outlines when you are not sure where to start.",
        prompt:
          "Give me 3 ways to start a paper on climate change.",
      },
      {
        title: "Ask AI to Explain a Concept",
        description:
          "Use AI to clarify terms, summarize readings, or rephrase content in simpler terms.",
        prompt:
          "Explain the concept of photosynthesis in simple terms.",
      },
      {
        title: "Edit or Polish Your Own Writing",
        description:
          "Use Grammarly or AI to check grammar or suggest tone improvements for work you have already written.",
        prompt:
          "Can you help me make this paragraph more concise while keeping the main points?",
      },
      {
        title: "Create Study Materials",
        description:
          "Generate practice questions, flashcards, or summaries to help you study more effectively.",
        prompt:
          "Create 5 practice questions about cell biology based on these key terms: mitochondria, nucleus, endoplasmic reticulum.",
      },
    ],
    donts: [
      {
        title: "Copy and Paste Entire Essays",
        description:
          "AI-written content is still plagiarism unless your instructor says otherwise. Submitting AI-generated work as your own violates academic integrity policies.",
      },
      {
        title: "Fake Discussions or Peer Replies",
        description:
          "Learning is a dialogue, not something to automate. Using AI to generate discussion posts prevents genuine engagement with your classmates and instructors.",
      },
      {
        title: "Assume AI Is Always Right",
        description:
          "AI can make things up or provide incorrect information. Always verify facts from your course materials, textbooks, or other reliable sources before using AI-generated content.",
      },
      {
        title: "Upload Private Information",
        description:
          "Never share your name, student ID, grades, or other personal information with public AI tools. This information could be stored and potentially accessed by others.",
      },
    ],
    scenarios: [
      {
        quote:
          "I used ChatGPT to help me structure my outline, then wrote the essay myself. This helped me organize my thoughts without relying on AI for the actual content.",
        attribution: "First-year Biology student",
      },
      {
        quote:
          "I asked AI to quiz me on key points from my notes. It helped me identify gaps in my understanding and focus my study time more effectively.",
        attribution: "Second-year Nursing student",
      },
      {
        quote:
          "I used Grammarly to help me write a polite message to my instructor about missing class due to illness. It helped me sound professional while still being authentic.",
        attribution: "Transfer student, Business major",
      },
    ],
    tools: [
      {
        name: "ChatGPT",
        purpose: "Brainstorming, questions, explanations",
        tip: "Do not submit full AI drafts",
      },
      {
        name: "Grammarly",
        purpose: "Grammar and tone improvements",
        tip: "Use with your own words",
      },
      {
        name: "Canva AI",
        purpose: "Design ideas, captions, presentations",
        tip: "Customize everything",
      },
      {
        name: "Quillbot",
        purpose: "Paraphrasing, summarizing",
        tip: "Always cite original sources",
      },
      {
        name: "Microsoft Copilot",
        purpose: "Office documents, presentations",
        tip: "Review all generated content",
      },
    ],
    checklist: [
      { label: "Read my syllabus for AI policies", category: "Before You Start" },
      { label: "Asked my instructor if unsure about AI use", category: "Before You Start" },
      { label: "Checked the AI Assessment Scale level for this assignment", category: "Before You Start" },
      { label: "Wrote my own original draft first", category: "During Your Work" },
      { label: "Used AI only for permitted purposes", category: "During Your Work" },
      { label: "Verified all AI-generated facts against reliable sources", category: "During Your Work" },
      { label: "Disclosed my AI use to my instructor", category: "Before Submitting" },
      { label: "Can explain everything in my submission in my own words", category: "Before Submitting" },
      { label: "Did not share any personal information with AI tools", category: "Before Submitting" },
    ],
    ctaText: "Student-Facing Language Toolkit",
    ctaHref: "/toolkits/student-language",
    ctaSecondaryText: "AI Assessment Scale",
    ctaSecondaryHref: "/assessment-scale",
  },

  faculty: {
    title: "Faculty Best Practices",
    accent: "Faculty",
    accentColor: "text-gator-green",
    accentBg: "bg-gator-green/10",
    accentBorder: "border-gator-green/20",
    cardAccent: "card-accent-green",
    desc: "Comprehensive guidelines for teaching with AI effectively and setting clear expectations.",
    overview:
      "Artificial Intelligence tools are rapidly transforming education. When used responsibly, AI can enhance teaching practices, provide personalized learning experiences, and help students develop critical thinking skills. This resource guide offers faculty practical strategies for integrating AI tools ethically and effectively, ensuring that technology supports — rather than replaces — the essential human elements of teaching and learning.",
    principles: [
      {
        title: "Student-Centered",
        description:
          "Prioritize student learning outcomes and experiences in all AI implementation decisions.",
      },
      {
        title: "Academic Integrity",
        description:
          "Maintain high standards of honesty, fairness, and responsibility in teaching and assessment.",
      },
      {
        title: "Transparency",
        description:
          "Clearly communicate how and when AI is being used in course materials and assessments.",
      },
      {
        title: "Equity & Inclusion",
        description:
          "Ensure AI implementation supports all students and addresses potential biases.",
      },
      {
        title: "Faculty Autonomy",
        description:
          "Respect faculty expertise and decision-making in how AI is integrated into their courses.",
      },
    ],
    dos: [
      {
        title: "Draft Weekly Overviews",
        description:
          "Use AI to generate learning outcomes, summaries, or module introductions that give students a clear roadmap for the week.",
      },
      {
        title: "Craft Learning Objectives",
        description:
          "Draft measurable objectives aligned to course outcomes with AI assistance, then refine them with your expertise.",
      },
      {
        title: "Design Canvas Home Pages",
        description:
          "Create welcoming, organized Canvas entry pages using prompts to improve student navigation and engagement.",
      },
      {
        title: "Build Course Shells",
        description:
          "Use AI to draft course shells that reflect state and institutional quality standards, saving prep time.",
      },
      {
        title: "Include Clear AI Policies in Your Syllabus",
        description:
          "Be transparent with students about your AI use in course design and delivery. Use the AI Assessment Scale to set expectations per assignment.",
      },
      {
        title: "Design Assignments That Teach Responsible AI Use",
        description:
          "Rather than banning AI, design assignments that integrate AI literacy and teach students to evaluate AI outputs critically.",
      },
    ],
    donts: [
      {
        title: "Use AI-Generated Content Without Review",
        description:
          "Never share AI-generated materials with students without first reviewing for accuracy, bias, and appropriateness.",
      },
      {
        title: "Implement AI Without Pedagogical Purpose",
        description:
          "Technology should serve learning goals. Avoid using AI tools just because they are available.",
      },
      {
        title: "Rely on AI for High-Stakes Assessment",
        description:
          "AI should not replace human judgment in grading or evaluating student work, especially for high-stakes assessments.",
      },
      {
        title: "Penalize Without Teaching",
        description:
          "Do not create policies that penalize students for AI use without first teaching responsible use and setting clear expectations.",
      },
      {
        title: "Input Sensitive Student Information",
        description:
          "Never enter student names, IDs, grades, or other personally identifiable information into public AI tools.",
      },
      {
        title: "Assume Equal Access",
        description:
          "Not all students have the same access to or comfort with AI tools. Always provide alternatives.",
      },
    ],
    scenarios: [
      {
        quote:
          "I use AI to draft my weekly module overviews, then personalize them with class-specific details. It saves me hours while keeping content fresh and relevant each quarter.",
        attribution: "English Faculty",
      },
      {
        quote:
          "I include my AI Assessment Scale level on every assignment in my syllabus. Students always know exactly what is expected, and I have seen fewer integrity issues since I started.",
        attribution: "Biology Faculty",
      },
      {
        quote:
          "I assign students to fact-check AI outputs as part of their research process. It teaches critical evaluation while embracing the tool rather than fighting it.",
        attribution: "Communications Faculty",
      },
    ],
    tools: [
      {
        name: "AI Ethics & Privacy Toolkit",
        purpose: "Ethical AI use and student data protection guidelines",
        tip: "Review before implementing any AI tool",
      },
      {
        name: "Syllabus Statement Toolkit",
        purpose: "Customizable language for communicating AI policies",
        tip: "Adapt statements to your course level",
      },
      {
        name: "AI Assignment Design Toolkit",
        purpose: "Templates for AI-enhanced and AI-resistant assignments",
        tip: "Match assignment design to Assessment Scale levels",
      },
      {
        name: "Student-Facing Language Toolkit",
        purpose: "Templates for discussing AI with students",
        tip: "Use in syllabi, Canvas, and first-day discussions",
      },
      {
        name: "Academic Integrity Toolkit",
        purpose: "Resources for addressing AI use in integrity policies",
        tip: "Pair with conversations, not just policies",
      },
    ],
    checklist: [
      { label: "Communicated how I use AI in this course", category: "Transparency & Student Trust" },
      { label: "Named acceptable and unacceptable AI uses in the syllabus", category: "Transparency & Student Trust" },
      { label: "Reviewed AI-generated content for bias or stereotypes", category: "Equity & Inclusion" },
      { label: "Material reflects diverse voices and inclusive practices", category: "Equity & Inclusion" },
      { label: "Using AI to enhance, not replace, human connection", category: "Pedagogical Integrity" },
      { label: "AI use supports my course learning goals", category: "Pedagogical Integrity" },
      { label: "Verified the AI tool is FERPA-compliant", category: "Privacy & Data Ethics" },
      { label: "Avoided tools with unclear data practices", category: "Privacy & Data Ethics" },
      { label: "Gathering multiple forms of student work for assessment", category: "Academic Integrity" },
      { label: "Not relying solely on AI detectors", category: "Academic Integrity" },
      { label: "Tested the tool myself before assigning it to students", category: "Effectiveness" },
      { label: "AI is saving time, not adding unnecessary complexity", category: "Effectiveness" },
      { label: "Practices align with college and union expectations", category: "Professional Accountability" },
      { label: "Would feel confident explaining my AI use if audited", category: "Professional Accountability" },
      { label: "One change I will make based on this checklist is...", category: "Reflection" },
    ],
    ctaText: "Explore Faculty Toolkits",
    ctaHref: "/toolkits/syllabus",
    ctaSecondaryText: "AI Assessment Scale",
    ctaSecondaryHref: "/assessment-scale",
  },

  staff: {
    title: "Staff & Administration Best Practices",
    accent: "Staff",
    accentColor: "text-sunrise-orange",
    accentBg: "bg-sunrise-orange/10",
    accentBorder: "border-sunrise-orange/20",
    cardAccent: "card-accent-orange",
    desc: "Guidelines for using AI responsibly in administrative workflows and institutional communications.",
    overview:
      "Artificial Intelligence tools are transforming how we work in higher education. At Green River College, responsible AI use means prioritizing student privacy, enhancing operational efficiency, and supporting student success. These guidelines help ensure our AI implementations align with our institutional values and comply with educational regulations while empowering staff to innovate and improve services.",
    principles: [
      {
        title: "Student-Centered",
        description:
          "All AI use prioritizes student success and experience above operational convenience.",
      },
      {
        title: "Privacy First",
        description:
          "FERPA-compliant practices protect student information at every step.",
      },
      {
        title: "Transparency",
        description:
          "Clear communication about how and when AI is used in institutional operations.",
      },
      {
        title: "Equity & Inclusion",
        description:
          "AI implementation that serves all students equitably and avoids perpetuating bias.",
      },
      {
        title: "Human Oversight",
        description:
          "AI assists but does not replace human judgment in decisions that affect students and staff.",
      },
    ],
    dos: [
      {
        title: "Draft and Refine Communications",
        description:
          "Use AI to draft emails, memos, and announcements, then review and personalize before sending.",
      },
      {
        title: "Summarize Meeting Notes",
        description:
          "Let AI help you create concise meeting summaries and action items to keep teams aligned.",
      },
      {
        title: "Generate Ideas and Brainstorm Solutions",
        description:
          "Use AI as a thinking partner for strategic planning, event ideas, or process improvements.",
      },
      {
        title: "Create Templates for Routine Communications",
        description:
          "Build reusable templates for common emails, reports, and documents to maintain consistency.",
      },
      {
        title: "Streamline Administrative Workflows",
        description:
          "AI can assist with data analysis, report generation, scheduling, and resource allocation.",
      },
      {
        title: "Draft Standard Operating Procedures",
        description:
          "Use AI to create initial drafts of SOPs, then refine with institutional knowledge and context.",
      },
    ],
    donts: [
      {
        title: "Share Student Identifiable Information",
        description:
          "Never input student names, IDs, grades, transcripts, or other personally identifiable information into any AI tool.",
      },
      {
        title: "Use AI for Sensitive Decisions Without Review",
        description:
          "AI should assist with analysis, not make final decisions on matters affecting students or staff.",
      },
      {
        title: "Rely on AI for Policy Interpretation",
        description:
          "College policies, legal requirements, and regulatory compliance must be verified by authorized personnel, not AI.",
      },
      {
        title: "Use Unsecured or Public Platforms",
        description:
          "Only use college-approved AI platforms with appropriate data protection measures in place.",
      },
      {
        title: "Accept AI Outputs Without Verification",
        description:
          "Always review AI-generated content for accuracy, bias, and appropriateness before using or distributing.",
      },
      {
        title: "Upload Student Work or Academic Records",
        description:
          "Student work, transcripts, and academic records must never be processed through AI tools.",
      },
    ],
    scenarios: [
      {
        quote:
          "I use AI to draft our weekly departmental newsletter, then add personal touches and verify all dates and details. It cut my prep time in half while keeping communications consistent.",
        attribution: "Student Services Coordinator",
      },
      {
        quote:
          "After meetings, I paste my notes into AI to generate organized action items and summaries. I always anonymize any student references first. It keeps our team on track.",
        attribution: "Administrative Assistant",
      },
      {
        quote:
          "I use AI to brainstorm outreach strategies for underserved student populations. The ideas give me a starting point, but the final approach always centers our students' real needs.",
        attribution: "Enrollment Services Staff",
      },
    ],
    tools: [
      {
        name: "Prompt Engineering Resources",
        purpose: "Ready-to-use templates and task-specific examples",
        tip: "Start with templates, then refine for your needs",
      },
      {
        name: "Privacy & Security Guide",
        purpose: "FERPA compliance, data anonymization techniques",
        tip: "Review before using any new AI tool",
      },
      {
        name: "GRC-Approved AI Tools",
        purpose: "Vetted tools and custom GPTs for staff use",
        tip: "Check the approved list before adopting new tools",
      },
      {
        name: "AI Ethics Reflection Guide",
        purpose: "Practical scenarios and decision frameworks",
        tip: "Use for team discussions about AI adoption",
      },
    ],
    checklist: [
      { label: "Would I be comfortable sharing this output with a student?", category: "Content Review" },
      { label: "Have I reviewed this for bias or stereotypes?", category: "Content Review" },
      { label: "Does this save time or create confusion?", category: "Effectiveness" },
      { label: "Am I using a college-approved AI platform?", category: "Privacy & Compliance" },
      { label: "Have I removed all student identifiable information?", category: "Privacy & Compliance" },
      { label: "Is this use FERPA-compliant?", category: "Privacy & Compliance" },
      { label: "Have I verified the accuracy of AI-generated content?", category: "Quality Assurance" },
      { label: "Is a human making the final decision?", category: "Quality Assurance" },
      { label: "Have I considered accessibility and equity impacts?", category: "Equity" },
      { label: "Would I be okay being audited on this use?", category: "Accountability" },
    ],
    ctaText: "Staff Prompt Library",
    ctaHref: "/toolkits/prompting",
    ctaSecondaryText: "Ethics & Privacy Toolkit",
    ctaSecondaryHref: "/toolkits/ethics-privacy",
  },
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function BestPracticesPage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const data = audienceData[audience];

  if (!data) {
    notFound();
  }

  // Group checklist items by category
  const checklistGroups = data.checklist.reduce<Record<string, string[]>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item.label);
      return acc;
    },
    {},
  );

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <Breadcrumbs
          crumbs={[
            { label: "Best Practices", href: "/best-practices" },
            { label: data.title },
          ]}
        />

        {/* ---- Header ---- */}
        <div className="max-w-3xl">
          <span
            className={`mb-4 inline-flex items-center gap-2 rounded-pill px-3.5 py-1 font-body text-sm font-bold uppercase tracking-[0.12em] ${data.accentBg} ${data.accentColor}`}
          >
            {data.accent}
          </span>
          <h1 className="text-title font-heading font-extrabold text-pine-cone">
            {data.title}
          </h1>
          <p className="mt-5 text-subtitle font-body text-pine-cone/60">
            {data.desc}
          </p>
        </div>

        <div className="divider-glow mt-12" />

        {/* ---- Overview ---- */}
        <div className="mt-12 rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${data.accentBg}`}>
              <BookIcon className={`h-5 w-5 ${data.accentColor}`} />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-pine-cone">
                Overview
              </h2>
              <p className="mt-3 font-body text-base leading-relaxed text-pine-cone/60">
                {data.overview}
              </p>
            </div>
          </div>
        </div>

        {/* ---- Start Here (Students only) ---- */}
        {audience === "students" && (
          <div className="mt-6 card-feature rounded-3xl p-8 sm:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <ClipboardIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">
                  Start Here &mdash; Always Check Your Class Policy
                </h2>
                <p className="mt-3 font-body text-base leading-relaxed text-white/70">
                  Every instructor has different expectations for using AI in their
                  course. Before using any AI tools, read your syllabus carefully and
                  ask your instructor if you are unsure what is allowed. AI use varies
                  by class, and what is acceptable in one course may not be in another.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5">
                    <ChatIcon className="h-4 w-4 text-white/60" />
                    <span className="font-body text-sm font-semibold text-white/80">
                      When in doubt, ask your instructor!
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5">
                    <BookIcon className="h-4 w-4 text-white/60" />
                    <span className="font-body text-sm font-semibold text-white/80">
                      Visit the Writing &amp; Tutoring Center for help
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- Guiding Principles ---- */}
        <ScrollReveal>
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-3">
            <span
              className={`inline-flex items-center rounded-xl px-3.5 py-1.5 font-body text-sm font-bold ${data.accentBg} ${data.accentColor}`}
            >
              Guiding Principles
            </span>
            <div className="h-px flex-1 bg-ever-green/[0.06]" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.principles.map((p) => (
              <div
                key={p.title}
                className="rounded-3xl border border-ever-green/[0.06] bg-white p-8"
              >
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${data.accentBg}`}>
                  <ShieldIcon className={`h-5 w-5 ${data.accentColor}`} />
                </div>
                <h3 className="font-heading text-lg font-bold text-ever-green">
                  {p.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>

        {/* ---- Do's ---- */}
        <ScrollReveal delay={0.1}>
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex items-center rounded-xl bg-gator-green/10 px-3.5 py-1.5 font-body text-sm font-bold text-gator-green">
              What You CAN Do
            </span>
            <div className="h-px flex-1 bg-ever-green/[0.06]" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.dos.map((item) => (
              <div
                key={item.title}
                className="card-accent-green rounded-3xl p-8"
              >
                <div className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-gator-green" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ever-green">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                      {item.description}
                    </p>
                    {item.prompt && (
                      <div className="mt-3 rounded-xl border border-gator-green/10 bg-gator-green/5 px-4 py-3">
                        <p className="font-body text-xs font-semibold uppercase tracking-wider text-gator-green/70">
                          Example Prompt
                        </p>
                        <p className="mt-1 font-body text-sm italic text-pine-cone/60">
                          &ldquo;{item.prompt}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>

        {/* ---- Don'ts ---- */}
        <ScrollReveal delay={0.1}>
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex items-center rounded-xl bg-red-500/10 px-3.5 py-1.5 font-body text-sm font-bold text-red-600">
              What You Should NOT Do
            </span>
            <div className="h-px flex-1 bg-ever-green/[0.06]" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.donts.map((item) => (
              <div
                key={item.title}
                className="card-accent-orange rounded-3xl p-8"
              >
                <div className="flex items-start gap-3">
                  <XIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ever-green">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>

        {/* ---- FERPA / Privacy (Staff only) ---- */}
        {audience === "staff" && (
          <div className="mt-14">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex items-center rounded-xl bg-red-500/10 px-3.5 py-1.5 font-body text-sm font-bold text-red-600">
                FERPA Compliance
              </span>
              <div className="h-px flex-1 bg-ever-green/[0.06]" />
            </div>
            <div className="rounded-3xl border-2 border-red-500/10 bg-red-50/50 p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                  <LockIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-pine-cone">
                    FERPA Compliance Reminder
                  </h3>
                  <p className="mt-3 font-body text-base leading-relaxed text-pine-cone/60">
                    The Family Educational Rights and Privacy Act (FERPA) protects the
                    privacy of student education records. Student information entered
                    into third-party AI systems may constitute a FERPA violation.
                    Always consult with the Registrar&apos;s Office if you have questions
                    about what information can be processed using AI tools.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <span className="font-body text-sm text-pine-cone/60">
                        Never input student names, IDs, or other PII
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <span className="font-body text-sm text-pine-cone/60">
                        Do not upload transcripts or academic records
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gator-green" />
                      <span className="font-body text-sm text-pine-cone/60">
                        Use only college-approved AI platforms
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gator-green" />
                      <span className="font-body text-sm text-pine-cone/60">
                        Anonymize all case examples before processing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- Faculty Self-Check (Faculty only) ---- */}
        {audience === "faculty" && (
          <div className="mt-14">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex items-center rounded-xl bg-gator-green/10 px-3.5 py-1.5 font-body text-sm font-bold text-gator-green">
                Privacy & Ethics
              </span>
              <div className="h-px flex-1 bg-ever-green/[0.06]" />
            </div>
            <div className="rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gator-green/10">
                  <ShieldIcon className="h-5 w-5 text-gator-green" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-pine-cone">
                    Privacy Guidelines for Faculty
                  </h3>
                  <p className="mt-3 font-body text-base leading-relaxed text-pine-cone/60">
                    Protecting student privacy and maintaining ethical standards are
                    foundational to AI use in the classroom.
                  </p>
                  <div className="mt-5 space-y-3">
                    {[
                      "Never input student names, IDs, or grades into public AI tools",
                      "Use institution-approved AI tools when working with student data",
                      "Inform students when AI is being used to generate or evaluate course materials",
                      "Review AI-generated content for accuracy before sharing with students",
                      "Avoid requiring AI tools that collect personal data without alternatives",
                    ].map((guideline) => (
                      <div key={guideline} className="flex items-start gap-2">
                        <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-gator-green" />
                        <span className="font-body text-sm text-pine-cone/60">
                          {guideline}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- Use Cases (Faculty / Staff) ---- */}
        {(audience === "faculty" || audience === "staff") && (
          <div className="mt-14">
            <div className="mb-5 flex items-center gap-3">
              <span
                className={`inline-flex items-center rounded-xl px-3.5 py-1.5 font-body text-sm font-bold ${data.accentBg} ${data.accentColor}`}
              >
                {audience === "faculty" ? "Course Design Use Cases" : "Operational Use Cases"}
              </span>
              <div className="h-px flex-1 bg-ever-green/[0.06]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {audience === "faculty"
                ? [
                    { icon: BookIcon, label: "Course Design", desc: "Weekly overviews, learning objectives, Canvas pages" },
                    { icon: ClipboardIcon, label: "Grading & Feedback", desc: "Rubric drafting, feedback templates, comment banks" },
                    { icon: AcademicCapIcon, label: "Assignment Design", desc: "AI-enhanced and AI-resistant assignment templates" },
                    { icon: ShieldIcon, label: "Accessibility & UDL", desc: "Making content more accessible, universal design for learning" },
                    { icon: UserGroupIcon, label: "Student Engagement", desc: "Discussion prompts, active learning activities" },
                  ].map((uc) => (
                    <div
                      key={uc.label}
                      className="rounded-3xl border border-ever-green/[0.06] bg-white p-8"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gator-green/10">
                        <uc.icon className="h-5 w-5 text-gator-green" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-ever-green">
                        {uc.label}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                        {uc.desc}
                      </p>
                    </div>
                  ))
                : [
                    { icon: CogIcon, label: "Operations", desc: "Process automation, data analysis, documentation assistance" },
                    { icon: UserGroupIcon, label: "Student Services", desc: "Communication drafts, outreach planning, FAQ generation" },
                    { icon: ChatIcon, label: "Communications", desc: "Newsletters, announcements, social media content" },
                    { icon: LightBulbIcon, label: "Planning", desc: "Strategic brainstorming, event planning, resource allocation" },
                  ].map((uc) => (
                    <div
                      key={uc.label}
                      className="rounded-3xl border border-ever-green/[0.06] bg-white p-8"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sunrise-orange/10">
                        <uc.icon className="h-5 w-5 text-sunrise-orange" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-ever-green">
                        {uc.label}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                        {uc.desc}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        )}

        {/* ---- Real Scenarios ---- */}
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-3">
            <span
              className={`inline-flex items-center rounded-xl px-3.5 py-1.5 font-body text-sm font-bold ${data.accentBg} ${data.accentColor}`}
            >
              {audience === "students" ? "Student Voices" : "Real-World Scenarios"}
            </span>
            <div className="h-px flex-1 bg-ever-green/[0.06]" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {data.scenarios.map((s) => (
              <div
                key={s.attribution}
                className="rounded-3xl border border-ever-green/[0.06] bg-white p-8"
              >
                <blockquote className="border-l-4 border-gator-green/30 pl-4">
                  <p className="font-body text-sm italic leading-relaxed text-pine-cone/60">
                    &ldquo;{s.quote}&rdquo;
                  </p>
                </blockquote>
                <p className="mt-4 font-heading text-sm font-bold text-ever-green">
                  &mdash; {s.attribution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Tools & Resources ---- */}
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-3">
            <span
              className={`inline-flex items-center rounded-xl px-3.5 py-1.5 font-body text-sm font-bold ${data.accentBg} ${data.accentColor}`}
            >
              {audience === "students" ? "Helpful AI Tools" : "Toolkits & Resources"}
            </span>
            <div className="h-px flex-1 bg-ever-green/[0.06]" />
          </div>
          <div className="overflow-hidden rounded-3xl border border-ever-green/[0.06] bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ever-green/[0.06]">
                  <th className="px-6 py-4 text-left font-heading text-sm font-bold text-ever-green sm:px-8">
                    {audience === "students" ? "Tool" : "Resource"}
                  </th>
                  <th className="hidden px-6 py-4 text-left font-heading text-sm font-bold text-ever-green sm:table-cell sm:px-8">
                    {audience === "students" ? "Best For" : "Purpose"}
                  </th>
                  <th className="px-6 py-4 text-left font-heading text-sm font-bold text-ever-green sm:px-8">
                    Tip
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.tools.map((tool, i) => (
                  <tr
                    key={tool.name}
                    className={
                      i < data.tools.length - 1
                        ? "border-b border-ever-green/[0.04]"
                        : ""
                    }
                  >
                    <td className="px-6 py-4 font-heading text-sm font-bold text-ever-green sm:px-8">
                      {tool.name}
                    </td>
                    <td className="hidden px-6 py-4 font-body text-sm text-pine-cone/70 sm:table-cell sm:px-8">
                      {tool.purpose}
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-pine-cone/70 sm:px-8">
                      {tool.tip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {audience === "students" && (
            <p className="mt-3 font-body text-xs text-pine-cone/60">
              AI tools are constantly changing. Always check the latest features and
              limitations before using them for your coursework.
            </p>
          )}
        </div>

        {/* ---- Self-Check / Checklist ---- */}
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-3">
            <span
              className={`inline-flex items-center rounded-xl px-3.5 py-1.5 font-body text-sm font-bold ${data.accentBg} ${data.accentColor}`}
            >
              {audience === "faculty"
                ? "Faculty AI Self-Check"
                : audience === "staff"
                  ? "Reflection Checklist"
                  : "Before You Submit"}
            </span>
            <div className="h-px flex-1 bg-ever-green/[0.06]" />
          </div>
          <div className="rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
            <div className="space-y-8">
              {Object.entries(checklistGroups).map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-3 font-heading text-base font-bold text-ever-green">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <label key={item} className="flex cursor-pointer items-start gap-3 group">
                        <input
                          type="checkbox"
                          className={`mt-1 h-5 w-5 shrink-0 rounded border-2 ${data.accentBorder} accent-ever-green`}
                        />
                        <span className="font-body text-sm leading-relaxed text-pine-cone/60 group-has-[:checked]:text-pine-cone group-has-[:checked]:line-through">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Staff Reflection Prompts ---- */}
        {audience === "staff" && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                prompt: "Would I be comfortable sharing this with a student?",
                context:
                  "Consider whether the AI-generated content aligns with our educational mission and values.",
              },
              {
                prompt: "Have I reviewed this for bias?",
                context:
                  "AI systems can unintentionally perpetuate biases present in their training data.",
              },
              {
                prompt: "Does this save time or create confusion?",
                context:
                  "The purpose of using AI tools is to enhance efficiency and effectiveness, not add complexity.",
              },
            ].map((rp) => (
              <div
                key={rp.prompt}
                className="rounded-3xl border border-ever-green/[0.06] bg-white p-8"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sunrise-orange/10">
                  <LightBulbIcon className="h-5 w-5 text-sunrise-orange" />
                </div>
                <h3 className="font-heading text-base font-bold text-ever-green">
                  {rp.prompt}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                  {rp.context}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ---- CTA ---- */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={data.ctaHref}
            className="inline-flex items-center gap-2 rounded-xl bg-ever-green px-6 py-3.5 font-body text-base font-semibold text-white transition-all hover:bg-grc-green"
          >
            {data.ctaText}
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link
            href={data.ctaSecondaryHref}
            className="inline-flex items-center gap-2 rounded-xl border border-ever-green/10 px-6 py-3.5 font-body text-base font-medium text-pine-cone/60 transition-all hover:border-gator-green/20 hover:text-ever-green"
          >
            {data.ctaSecondaryText}
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
