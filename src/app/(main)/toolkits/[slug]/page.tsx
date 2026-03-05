import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: "Toolkit",
  description:
    "Explore this AI toolkit resource provided by the Green River College AI Task Force.",
};

/* ────────────────────────────────────────────────────────────────
   Toolkit Data — sourced from the GRC AI Taskforce LibGuide PDFs
   ──────────────────────────────────────────────────────────────── */

interface ToolkitLevel {
  level: number;
  title: string;
  description: string;
  sampleStatement: string;
  bestFor: string[];
  designTips: string[];
}

interface PromptTemplate {
  title: string;
  prompt: string;
  tip: string;
}

interface PromptMakeover {
  title: string;
  before: string;
  after: string;
  why: string;
}

interface EthicsResource {
  title: string;
  description: string;
  audience: string;
}

interface CustomGPT {
  name: string;
  description: string;
  audience: string;
  url?: string;
}

interface StudentLanguageSection {
  title: string;
  description: string;
}

interface AssessmentLevel {
  level: number;
  title: string;
  description: string;
  statement: string;
  bestFor: string[];
  assignmentExamples: string[];
  resources: string[];
  whenToUse: string[];
}

interface ToolkitEntry {
  name: string;
  desc: string;
  color: string;
  heroStat?: { value: string; label: string };
  levels?: ToolkitLevel[];
  promptTemplates?: PromptTemplate[];
  promptMakeovers?: PromptMakeover[];
  ethicsResources?: EthicsResource[];
  ethicsDownloadables?: { title: string; format: string; description: string }[];
  customGPTs?: CustomGPT[];
  studentLanguageSections?: StudentLanguageSection[];
  studentLanguageDownloads?: { title: string; description: string }[];
  assessmentLevels?: AssessmentLevel[];
  acknowledgmentExamples?: { context: string; example: string }[];
  externalPromptLibraries?: { name: string; description: string; url: string }[];
}

const toolkitData: Record<string, ToolkitEntry> = {
  syllabus: {
    name: "Syllabus Statement Toolkit",
    desc: "Ready-to-use AI policy language for every assessment level. Copy, customize, and add to your syllabus.",
    color: "card-accent-green",
    heroStat: { value: "73%", label: "of students want clear AI guidelines" },
    levels: [
      {
        level: 1,
        title: "No AI Use",
        description:
          "For hand-written or reflection-based assignments where AI tools are not appropriate. Focus on independent thinking and skill demonstration.",
        sampleStatement:
          "For this assignment, please complete all work without the use of AI tools. The purpose is to demonstrate your individual understanding and skills.",
        bestFor: ["In-class exams", "Proctored assessments", "Live presentations", "Oral exams"],
        designTips: [
          "Use reflection logs to document the thinking process",
          "Assign personal stories that connect learning to authentic experiences",
          "Use draft checkpoints to break assignments into development stages",
          "Define 'No AI' clearly with explicit expectations and boundaries",
        ],
      },
      {
        level: 2,
        title: "AI Planning Only",
        description:
          "Allows AI use for brainstorming, outlining, or research\u2014but not for writing or creating the final product.",
        sampleStatement:
          "You may use AI tools for brainstorming or planning stages only. The actual writing and final product must be entirely your own work.",
        bestFor: ["Research projects", "Essays", "Prewriting and outlining"],
        designTips: [
          "Use planning logs to require documentation of AI interactions",
          "Focus on process\u2014grade planning quality, not AI usage",
          "Include guided questions that prompt critical thinking about AI use",
          "Have students compare AI and non-AI outlines to drive discussion",
        ],
      },
      {
        level: 3,
        title: "Collaborative Use",
        description:
          "Permits AI for support roles like revising, providing examples, or feedback. Attribution of AI use is required.",
        sampleStatement:
          "You may use AI tools for support (revising, examples, feedback) but must document how AI was used in your process and clearly attribute any AI-generated content.",
        bestFor: ["Writing assignments", "Case studies", "Collaborative writing"],
        designTips: [
          "Require students to maintain a log of AI interactions including prompts and decisions",
          "Ask students to explain why they accepted or rejected specific AI suggestions",
          "Build in opportunities for reflection on how AI collaboration affected learning",
          "Evaluate both the final product and the documented process",
        ],
      },
      {
        level: 4,
        title: "Full Integration",
        description:
          "Encourages AI use throughout the entire process with required reflection on how AI contributed to learning outcomes.",
        sampleStatement:
          "AI tools may be used throughout your process. Include a reflection explaining how AI contributed to your learning and what you learned from the collaboration.",
        bestFor: ["Problem-solving projects", "Marketing campaigns", "Data analysis"],
        designTips: [
          "Require AI reflection at each step of the process",
          "Encourage students to experiment with different AI platforms and compare results",
          "Accept final products created with significant AI assistance, focusing on process documentation",
          "Provide structured guides for ethical AI use throughout the creative process",
        ],
      },
      {
        level: 5,
        title: "AI Exploration",
        description:
          "Focuses on critical and creative AI use with deep reflection on the process, limitations, and ethical considerations.",
        sampleStatement:
          "Explore AI capabilities creatively for this assignment. Document your process, analyze AI strengths/limitations, and reflect on ethical implications of your collaboration.",
        bestFor: ["Innovation projects", "Creative solutions", "Capstone work", "Honors courses"],
        designTips: [
          "Prioritize curiosity, nontraditional formats, and student choice",
          "Encourage multimedia outputs, speculative prompts, and collaborative experimentation",
          "Turn 'What If' questions into project-based learning opportunities",
          "Include prompt engineering as part of the assignment",
        ],
      },
    ],
  },
  "student-language": {
    name: "Student-Facing Language Toolkit",
    desc: "Clear, accessible templates for communicating AI expectations directly to students.",
    color: "card-accent-blue",
    heroStat: {
      value: "85%",
      label: "of faculty report clear AI guidelines reduced academic dishonesty",
    },
    studentLanguageSections: [
      {
        title: "Quick Syllabus Add-ons",
        description:
          "One-liners to state your policy level clearly. Easy to integrate into existing syllabi without rewriting your entire document.",
      },
      {
        title: "Assignment Language Templates",
        description:
          "Ready-to-use language for Canvas or handouts. Clarify expectations for each assignment type with precise, student-friendly wording.",
      },
      {
        title: "Reflection Prompts",
        description:
          "Help students think critically about their AI use. Encourage metacognition and ethical decision-making through guided self-assessment.",
      },
      {
        title: "Misuse Conversation Starters",
        description:
          "Scripts for kind, clear accountability. Address concerns about potential academic integrity violations while maintaining student dignity and trust.",
      },
      {
        title: "Optional Add-ons",
        description:
          "Prompt journals, citations, voice comparisons. Additional tools to enhance AI literacy and help students develop documentation habits.",
      },
      {
        title: "Email & Announcement Templates",
        description:
          "Save time when explaining your AI expectations. Pre-written communication templates for various scenarios including course introductions and policy changes.",
      },
    ],
    studentLanguageDownloads: [
      {
        title: "Complete Toolkit",
        description: "All templates and resources in one comprehensive document.",
      },
      {
        title: "Misuse Conversation Template",
        description:
          "Step-by-step guide for addressing potential academic integrity concerns with empathy.",
      },
      {
        title: "Student Handout Version",
        description:
          "Simplified guide for students on AI use expectations and best practices.",
      },
    ],
  },
  "ethics-privacy": {
    name: "AI Ethics & Privacy Toolkit",
    desc: "FERPA compliance guidelines, data handling best practices, and ethical frameworks for AI use.",
    color: "card-accent-orange",
    ethicsResources: [
      {
        title: "Bias & Fairness",
        description:
          "Tools and frameworks to identify and mitigate bias in AI systems, ensuring equitable outcomes for all students and staff.",
        audience: "All",
      },
      {
        title: "Attribution Guidelines",
        description:
          "Guidelines and templates for properly citing AI-generated content in academic and professional contexts.",
        audience: "All",
      },
      {
        title: "Decision Journals",
        description:
          "Templates to document AI-assisted decision-making processes, promoting transparency and accountability.",
        audience: "Faculty",
      },
      {
        title: "Scenario Walkthroughs",
        description:
          "Interactive case studies exploring ethical dilemmas in AI use across various campus contexts.",
        audience: "All",
      },
      {
        title: "Ethics Audit Tools",
        description:
          "Comprehensive checklists and frameworks to evaluate the ethical implications of AI implementation.",
        audience: "Staff",
      },
      {
        title: "Data Privacy Guidelines",
        description:
          "Essential protocols for protecting personal and institutional data when implementing AI systems across campus.",
        audience: "All",
      },
    ],
    ethicsDownloadables: [
      { title: "AI Ethics Decision Framework", format: "PDF", description: "Step-by-step guide for ethical decision-making when implementing AI tools in educational and institutional contexts." },
      { title: "AI Attribution Templates", format: "Word Doc", description: "Editable templates for citing AI assistance in academic papers, course materials, and professional documents." },
      { title: "AI Bias Assessment Checklist", format: "Excel", description: "Comprehensive checklist for identifying potential bias in AI-generated content and decision-making processes." },
      { title: "AI Implementation Planner", format: "PDF", description: "Strategic planning template for ethical AI integration across courses, departments, and campus operations." },
      { title: "Data Privacy Toolkit", format: "ZIP", description: "Comprehensive resources for protecting personal and institutional data when working with AI systems." },
    ],
  },
  prompting: {
    name: "Prompting Toolkit",
    desc: "Master the art of effective AI prompting for teaching, research, grading, and operational tasks.",
    color: "card-accent-green",
    promptTemplates: [
      {
        title: "Lesson Planning",
        prompt:
          "Create a 50-minute lesson plan on [topic] for [course level] students. Include 3 learning objectives, a 10-minute opening activity, 25-minute main lesson, and 15-minute application exercise.",
        tip: "Specify your teaching style (lecture, discussion, hands-on) to get more relevant activities.",
      },
      {
        title: "Assignment Design",
        prompt:
          "Design a [assignment type] that assesses students' understanding of [concept]. Include clear instructions, grading criteria, and estimated completion time.",
        tip: "Mention any accessibility considerations to ensure the assignment is inclusive.",
      },
      {
        title: "Student Engagement",
        prompt:
          "Generate 5 discussion prompts about [topic] that encourage critical thinking and personal reflection for [course level] students.",
        tip: "Ask for prompts that connect course content to current events or students' experiences.",
      },
      {
        title: "Grading & Feedback",
        prompt:
          "Create a rubric for evaluating [assignment type] with 4 criteria and 3 performance levels (exceeds, meets, needs improvement).",
        tip: "Include examples of feedback phrases for each performance level.",
      },
      {
        title: "Accessibility Support",
        prompt:
          "Suggest 3 ways to make my [content type] more accessible for students with [specific need], while maintaining academic rigor.",
        tip: "Be specific about the type of content (lecture slides, videos, readings) for targeted suggestions.",
      },
    ],
    promptMakeovers: [
      {
        title: "Shakespeare Help",
        before: "Help with Shakespeare",
        after:
          "Summarize Hamlet's theme of revenge in 3 sentences, for a 10th-grade audience.",
        why: "The improved prompt specifies the exact play, theme, length, and audience level.",
      },
      {
        title: "Discussion Post",
        before: "Write a discussion post.",
        after:
          "Write a discussion post exploring how social media affects mental health. Include one example from your own experience.",
        why: "The improved prompt provides a specific topic and asks for personal reflection.",
      },
      {
        title: "Student Email",
        before: "Write an email to students.",
        after:
          "Write a supportive email to biology students who performed below average on the midterm. Offer 3 specific study strategies and office hour information.",
        why: "The improved prompt specifies the audience, tone, and exact content needed.",
      },
      {
        title: "Assignment Instructions",
        before: "Help me write assignment instructions.",
        after:
          "Create clear instructions for a 2-page reflection paper for first-year nursing students. Include grading criteria, formatting requirements, and 3 prompt questions about ethical decision-making.",
        why: "The improved prompt details the assignment type, length, audience, and specific components needed.",
      },
    ],
    acknowledgmentExamples: [
      {
        context: "For Emails",
        example: "This email was drafted with help from Microsoft Copilot.",
      },
      {
        context: "For Documents",
        example:
          "This policy was summarized using Claude.ai and reviewed by our team.",
      },
      {
        context: "For Course Materials",
        example:
          "Initial content generated with ChatGPT. Final edits by instructor.",
      },
    ],
    externalPromptLibraries: [
      {
        name: "Prompt Genie",
        description: "Interactive prompt builder with templates for education and professional use.",
        url: "https://www.promptgenie.ai/",
      },
      {
        name: "AI for Education Prompt Library",
        description: "Curated collection of prompts specifically designed for educators.",
        url: "https://www.aiforeducation.io/prompt-library",
      },
      {
        name: "More Useful Things Prompt Library",
        description: "Extensive collection of prompts for various professional contexts.",
        url: "https://www.moreusefulthings.com/prompts",
      },
      {
        name: "Gruvy Education",
        description: "Specialized prompts for curriculum development and student engagement.",
        url: "https://www.gruvyeducation.com/",
      },
      {
        name: "The Little Book of AI Prompts",
        description: "Downloadable PDF with categorized prompts for higher education.",
        url: "https://www.facultyfocus.com/",
      },
    ],
  },
  "assessment-design": {
    name: "AI-Enhanced Assessment Toolkit",
    desc: "Redesign assignments for an AI world \u2014 strategies from AI-proof to AI-enhanced.",
    color: "card-accent-blue",
    assessmentLevels: [
      {
        level: 1,
        title: "No AI",
        description:
          "Completed entirely without AI assistance in a controlled environment.",
        statement:
          "You must not use AI at any point during the assessment. You must demonstrate your core skills and knowledge.",
        bestFor: ["Exams", "Presentations", "Vivas", "Oral exams"],
        assignmentExamples: [
          "Reflective Essay (Ethics) \u2014 Students write a reflective essay connecting ethical theories to a personal real-life situation",
          "Personal Reflection on Learning \u2014 Students write a personal reflection on a significant learning moment",
          "Teaching Philosophy Reflection \u2014 Students write a personal reflection on their teaching philosophy",
        ],
        resources: [
          "AI Use Logs for documenting technology decisions",
          "Feedback Comment Bank with 200+ ready-to-use statements",
          "Guided Reflection Worksheet for tracking AI tool usage",
        ],
        whenToUse: [
          "First-year courses to build foundational skills",
          "Reflection-heavy work emphasizing authentic voice",
          "Subjects that benefit from individual perspective",
          "Process documentation with scaffolded learning",
        ],
      },
      {
        level: 2,
        title: "AI Planning",
        description:
          "AI used for pre-task activities such as brainstorming and research.",
        statement:
          "You may use AI for planning, idea development, and research. Your final submission should show refinement.",
        bestFor: ["Research projects", "Essays", "Prewriting"],
        assignmentExamples: [
          "Essay Planning (Philosophy) \u2014 Students use AI to brainstorm and outline an ethics essay, then independently write and reflect",
          "Project Proposal (Environmental Science) \u2014 Students use AI for idea generation and proposal structure but research and write independently",
        ],
        resources: [
          "General Assignment Template \u2014 plug-and-play for designing AI Planning assignments",
          "Reflection Prompt Library for Level 2",
          "Rubric Library aligned with AI planning",
          "AI Use Logs for transparency",
        ],
        whenToUse: [
          "First-year or intermediate courses",
          "Classes where process is emphasized",
          "Idea development rather than polished work",
          "Early stages of writing process",
        ],
      },
      {
        level: 3,
        title: "AI Collaboration",
        description:
          "AI used for drafting, feedback, and refinement with critical evaluation.",
        statement:
          "You may use AI to assist with drafting and refining. You must critically evaluate AI-generated content.",
        bestFor: ["Writing", "Case studies", "Collaborative projects"],
        assignmentExamples: [
          "Research Proposal (Psychology) \u2014 Students develop a research proposal on social media's impact, using AI for clarity while ensuring original content",
          "Lab Report (Biology) \u2014 Students write a lab report using AI to improve clarity and organization without altering scientific accuracy",
          "Problem Set Refinement (Mathematics) \u2014 Students solve problems then use AI to review steps, identify errors, and explore alternate approaches",
        ],
        resources: [
          "7+ assignment templates across disciplines",
          "15 reflection prompts for various learning styles",
          "200+ feedback comments ready to use",
          "Four rubric models: analytic, reflective, contract, and comparative",
          "Group Reflection Protocols for collaborative assignments",
        ],
        whenToUse: [
          "Teaching professional technology skills",
          "Emphasizing process over product",
          "Developing critical evaluation skills",
          "Teaching ethical technology use",
        ],
      },
      {
        level: 4,
        title: "Full AI Integration",
        description:
          "Extensive AI use with student direction to achieve assessment goals.",
        statement:
          "You may use AI extensively. Focus on directing AI while demonstrating critical thinking.",
        bestFor: ["Problem-solving", "Complex projects", "Professional tasks"],
        assignmentExamples: [
          "Creative Writing Project (English Literature) \u2014 Students write an original sci-fi story using AI throughout the creative process with reflective commentary",
          "Comprehensive Data Analysis (Statistics) \u2014 Students use AI for data cleaning, modeling, and report writing with reflections",
          "AI-Enhanced Marketing Campaign (Business) \u2014 Students create a campaign using AI for research, content, and presentation",
        ],
        resources: [
          "AI Use Logs for group work documentation",
          "Rubric Library for all AI levels including multimodal formats",
          "Scaffolded templates for ethical AI use",
        ],
        whenToUse: [
          "Upper-level courses with strong disciplinary foundations",
          "Professional programs preparing for workplace AI tools",
          "Real-world tasks: marketing, research, content creation",
          "Cross-disciplinary projects",
        ],
      },
      {
        level: 5,
        title: "AI Exploration",
        description:
          "Creative AI use to enhance problem-solving and develop innovative solutions.",
        statement:
          "Use AI creatively to solve tasks, potentially co-designing new approaches.",
        bestFor: ["Innovation", "Creative solutions", "Capstones", "Honors courses"],
        assignmentExamples: [
          "AI Remix of Classic Story \u2014 Students retell a classic story using AI, then analyze how AI choices alter its meaning",
          "Marketing Campaign \u2014 Students build a full campaign using AI to create ads, personas, and visuals",
          "AI Speculative Fiction \u2014 Students create future scenarios exploring AI's impact on society and their field",
          "AI Tool Comparison \u2014 Students evaluate multiple AI tools for specific tasks in their discipline",
        ],
        resources: [
          "6 ready-to-use assignment templates",
          "Customizable rubrics and assessment guides",
          "AI + Ethics Journals for exploring personal and ethical choices",
          "Multimodal Reflections for flexible reflection formats",
          "Innovation journals for tracking learning progression",
        ],
        whenToUse: [
          "Interdisciplinary or experimental settings",
          "Capstone projects and honors courses",
          "Emerging technology courses",
          "Classes valuing creative exploration and risk-taking",
        ],
      },
    ],
  },
  "custom-gpts": {
    name: "GRC Custom GPTs & Tools",
    desc: "Purpose-built AI tools created by the Taskforce for specific GRC needs.",
    color: "card-accent-orange",
    heroStat: { value: "5+", label: "custom tools built by faculty" },
    customGPTs: [
      {
        name: "AI Policy Assistant",
        description:
          "Helps build clear syllabus policies with built-in templates for AI use in your courses. Generates custom syllabus language for any assessment level, creates assignment-specific AI guidelines, answers questions about AI in education, and produces Canvas announcement templates.",
        audience: "Faculty",
        url: "https://chatgpt.com/g/g-6836032b4588819193c56ab6950d8b99-ai-policy-assistant-grc",
      },
      {
        name: "Assignment Designer GPT",
        description:
          "Helps faculty brainstorm and align assignments with different AI use levels and learning outcomes. Design assessments that match your course objectives with the appropriate AI Assessment Scale level.",
        audience: "Faculty",
      },
      {
        name: "Student Reflection Prompt Generator",
        description:
          "Suggests ethical and metacognitive student prompts to encourage deeper learning and AI literacy. Creates reflection activities that help students think critically about their AI usage.",
        audience: "Faculty & Students",
      },
      {
        name: "Accessibility Checker GPT",
        description:
          "Helps revise Canvas content for accessibility compliance and suggests improvements for inclusive design. Ensures your course materials meet accessibility standards while maintaining quality.",
        audience: "Faculty & Staff",
      },
      {
        name: "Classroom Scenarios Generator",
        description:
          "For exploring ethical AI use discussions with students through realistic classroom scenarios and case studies. Creates discussion-ready scenarios that prompt critical thinking about AI ethics.",
        audience: "Faculty & Students",
      },
    ],
  },
};

/* ────────────────────────────────────────────────────────────────
   Section Renderers
   ──────────────────────────────────────────────────────────────── */

function SyllabusContent({ data }: { data: ToolkitEntry }) {
  return (
    <>
      {/* Hero stat */}
      {data.heroStat && (
        <div className="mb-12 flex flex-wrap gap-6">
          <div className="rounded-2xl border border-ever-green/[0.08] bg-ever-green/[0.03] px-8 py-6 text-center">
            <p className="font-heading text-4xl font-extrabold text-gator-green">
              {data.heroStat.value}
            </p>
            <p className="mt-1 font-body text-sm text-pine-cone/70">
              {data.heroStat.label}
            </p>
          </div>
          <div className="rounded-2xl border border-ever-green/[0.08] bg-ever-green/[0.03] px-8 py-6 text-center">
            <p className="font-heading text-4xl font-extrabold text-gator-green">68%</p>
            <p className="mt-1 font-body text-sm text-pine-cone/70">
              of faculty find AI policies reduce confusion
            </p>
          </div>
          <div className="rounded-2xl border border-ever-green/[0.08] bg-ever-green/[0.03] px-8 py-6 text-center">
            <p className="font-heading text-4xl font-extrabold text-gator-green">85%</p>
            <p className="mt-1 font-body text-sm text-pine-cone/70">
              of workplaces now use AI tools
            </p>
          </div>
        </div>
      )}

      {/* Why clear AI policies matter */}
      <div className="mb-12 rounded-3xl border border-ever-green/[0.06] p-8 sm:p-10 card-accent-green">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Why Clear AI Policies Matter
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Clear Expectations",
              text: "Students know exactly when and how they can use AI tools, preventing confusion and anxiety.",
            },
            {
              title: "Academic Integrity",
              text: "Establishes clear boundaries between appropriate AI assistance and academic dishonesty.",
            },
            {
              title: "Equity & Fairness",
              text: "Creates a level playing field where all students understand acceptable AI use.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-ever-green/[0.06] bg-white/60 p-5"
            >
              <h3 className="font-heading text-base font-bold text-ever-green">
                {item.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Level-by-level statements */}
      <h2 className="font-heading text-2xl font-bold text-pine-cone">
        Syllabus Language by Assessment Level
      </h2>
      <p className="mt-3 mb-8 font-body text-base text-pine-cone/70">
        Select the level that matches your assignment goals. Copy and customize
        the sample statement for your syllabus.
      </p>

      <div className="space-y-6">
        {data.levels?.map((lvl) => (
          <details
            key={lvl.level}
            className="group rounded-3xl border border-ever-green/[0.06] bg-white/40 transition-all open:shadow-lg"
          >
            <summary className="flex cursor-pointer items-center gap-4 px-8 py-6 font-heading text-lg font-bold text-ever-green transition-colors hover:text-gator-green">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gator-green font-heading text-sm font-extrabold text-white">
                {lvl.level}
              </span>
              Level {lvl.level}: {lvl.title}
              <svg
                className="ml-auto h-5 w-5 shrink-0 text-pine-cone/55 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <div className="px-8 pb-8">
              <p className="font-body text-sm leading-relaxed text-pine-cone/60">
                {lvl.description}
              </p>

              <blockquote className="mt-5 rounded-2xl border-l-4 border-gator-green bg-gator-green/[0.04] px-6 py-4 font-body text-sm italic leading-relaxed text-pine-cone/70">
                &ldquo;{lvl.sampleStatement}&rdquo;
              </blockquote>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-pine-cone/60">
                    Best For
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {lvl.bestFor.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 font-body text-sm text-pine-cone/60"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gator-green" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-pine-cone/60">
                    Design Tips
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {lvl.designTips.map((t) => (
                      <li
                        key={t}
                        className="flex items-start gap-2 font-body text-sm text-pine-cone/60"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sunrise-orange" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>

      {/* GPT assistant CTA */}
      <div className="mt-12 rounded-3xl border border-ever-green/[0.06] bg-gradient-to-br from-ever-green/[0.04] to-gator-green/[0.06] p-8 sm:p-10">
        <h2 className="font-heading text-xl font-bold text-pine-cone">
          Custom GPT Assistant
        </h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-pine-cone/70">
          Want help crafting your course AI policy in minutes? The AI Policy
          Assistant can help you create a customized policy that aligns with your
          teaching style and course objectives.
        </p>
        <ul className="mt-4 space-y-2">
          {[
            "Generates custom syllabus language for any assessment level",
            "Creates assignment-specific AI guidelines",
            "Answers questions about AI in education",
            "Produces Canvas announcement templates and FAQ responses",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 font-body text-sm text-pine-cone/60"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gator-green" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://chatgpt.com/g/g-6836032b4588819193c56ab6950d8b99-ai-policy-assistant-grc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gator-green px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-ever-green"
          >
            Try the AI Policy Assistant
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
          <Link
            href="/toolkits/custom-gpts"
            className="inline-flex items-center gap-2 rounded-xl border border-gator-green/20 bg-gator-green/10 px-5 py-2.5 font-heading text-sm font-bold text-gator-green transition-colors hover:bg-gator-green/20"
          >
            Explore All Custom GPTs
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

function StudentLanguageContent({ data }: { data: ToolkitEntry }) {
  return (
    <>
      {/* Hero stat */}
      {data.heroStat && (
        <div className="mb-12 rounded-2xl border border-sky-blue/20 bg-sky-blue/[0.04] px-8 py-6 text-center">
          <p className="font-heading text-5xl font-extrabold text-sky-blue">
            {data.heroStat.value}
          </p>
          <p className="mt-1 font-body text-sm text-pine-cone/70">
            {data.heroStat.label}
          </p>
        </div>
      )}

      {/* Why set the tone early */}
      <div className="mb-12 rounded-3xl border border-ever-green/[0.06] p-8 sm:p-10 card-accent-blue">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Why Set the Tone Early?
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Supports Academic Integrity",
              text: "Clear expectations help students understand boundaries and make ethical choices.",
            },
            {
              title: "Reduces Confusion",
              text: "Prevents unintentional violations of course policies through clear guidelines.",
            },
            {
              title: "Promotes Ethical AI Use",
              text: "Teaches responsible technology practices students will need in future careers.",
            },
            {
              title: "Encourages Dialogue",
              text: "Opens reflective conversations about technology's role in learning.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-ever-green/[0.06] bg-white/60 p-5"
            >
              <h3 className="font-heading text-base font-bold text-ever-green">
                {item.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Toolkit sections */}
      <h2 className="font-heading text-2xl font-bold text-pine-cone">
        Explore the Toolkit
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.studentLanguageSections?.map((sec) => (
          <div
            key={sec.title}
            className="rounded-2xl border border-ever-green/[0.06] bg-white/40 p-6 transition-shadow hover:shadow-md"
          >
            <h3 className="font-heading text-base font-bold text-ever-green">
              {sec.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
              {sec.description}
            </p>
          </div>
        ))}
      </div>

      {/* Downloads */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Downloadable Resources
        </h2>
        <p className="mt-2 text-sm text-pine-cone/60">
          Resources are being prepared by the AI Task Force and will be available for download soon.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {data.studentLanguageDownloads?.map((dl) => (
            <div
              key={dl.title}
              className="rounded-2xl border border-ever-green/[0.06] bg-white/40 p-6 opacity-75"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-bold text-ever-green">
                  {dl.title}
                </h3>
                <span className="rounded-full bg-ever-green/[0.06] px-2.5 py-0.5 font-body text-[11px] font-medium text-pine-cone/60">
                  Coming Soon
                </span>
              </div>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                {dl.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="mt-12 rounded-3xl border border-ever-green/[0.06] bg-ever-green/[0.03] p-8 text-center">
        <p className="font-body text-lg italic leading-relaxed text-pine-cone/60">
          &ldquo;Even in a world of machine learning, the most powerful thing
          you can do is learn how to be fully human.&rdquo;
        </p>
        <cite className="mt-3 block font-body text-sm not-italic text-pine-cone/60">
          &mdash; Inspired by the work of Sherry Turkle
        </cite>
      </blockquote>

      {/* CTA */}
      <div className="mt-10 rounded-3xl border border-sky-blue/10 bg-sky-blue/[0.04] p-8 text-center">
        <p className="font-body text-sm text-pine-cone/70">
          Students are learning alongside us&mdash;these tools help build
          relationships while promoting academic integrity.
        </p>
        <Link
          href="/toolkits/syllabus"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-blue px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-ever-green"
        >
          See Syllabus Statements
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </>
  );
}

function EthicsPrivacyContent({ data }: { data: ToolkitEntry }) {
  return (
    <>
      {/* Intro */}
      <div className="mb-12 rounded-3xl border border-ever-green/[0.06] p-8 sm:p-10 card-accent-orange">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Ethical Use of AI at Green River College
        </h2>
        <p className="mt-4 font-body text-base leading-relaxed text-pine-cone/70">
          We invite students, faculty, and staff to explore these resources
          designed to promote responsible and ethical use of artificial
          intelligence in learning, teaching, and campus operations. Together, we
          can harness the power of AI while upholding our values of integrity,
          equity, and excellence.
        </p>
      </div>

      {/* Resource cards */}
      <h2 className="font-heading text-2xl font-bold text-pine-cone">
        Ethics & Privacy Resources
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.ethicsResources?.map((res) => (
          <div
            key={res.title}
            className="rounded-2xl border border-ever-green/[0.06] bg-white/40 p-6 transition-shadow hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-sunrise-orange/10 px-3 py-0.5 font-body text-xs font-medium text-sunrise-orange">
              {res.audience}
            </span>
            <h3 className="mt-3 font-heading text-base font-bold text-ever-green">
              {res.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
              {res.description}
            </p>
          </div>
        ))}
      </div>

      {/* Downloadables */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Downloadable Ethics Tools & Checklists
        </h2>
        <p className="mt-2 text-sm text-pine-cone/60">
          Resources are being prepared by the AI Task Force and will be available for download soon.
        </p>
        <div className="mt-6 space-y-3">
          {data.ethicsDownloadables?.map((dl) => (
            <div
              key={dl.title}
              className="rounded-2xl border border-ever-green/[0.06] bg-white/40 px-6 py-4 opacity-75"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-bold text-ever-green">
                  {dl.title}
                </h3>
                <span className="rounded-full bg-ever-green/[0.06] px-3 py-1 font-body text-xs font-medium text-pine-cone/70">
                  {dl.format} — Coming Soon
                </span>
              </div>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                {dl.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Key principles */}
      <div className="mt-12 rounded-3xl border border-ever-green/[0.06] bg-gradient-to-br from-ever-green/[0.03] to-sunrise-orange/[0.04] p-8 sm:p-10">
        <h2 className="font-heading text-xl font-bold text-pine-cone">
          Key Ethical Principles
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {[
            {
              title: "FERPA Compliance",
              text: "Never input student names, IDs, grades, or other personally identifiable information into AI tools. Use anonymized or hypothetical data when prompting AI for student-related tasks.",
            },
            {
              title: "Data Privacy",
              text: "Understand that anything entered into AI tools may be stored, used for training, or surfaced in future outputs. Avoid sharing confidential institutional data, personal information, or proprietary content.",
            },
            {
              title: "Transparency",
              text: "Acknowledge when AI has been used to draft, summarize, or revise content. Model ethical AI use for students and colleagues by being open about your AI-assisted workflows.",
            },
            {
              title: "Bias Awareness",
              text: "AI outputs can reflect and amplify biases present in training data. Always review AI-generated content critically, especially when it involves diverse populations or sensitive topics.",
            },
          ].map((principle) => (
            <div
              key={principle.title}
              className="rounded-2xl border border-ever-green/[0.06] bg-white/60 p-5"
            >
              <h3 className="font-heading text-base font-bold text-ever-green">
                {principle.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                {principle.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PromptingContent({ data }: { data: ToolkitEntry }) {
  return (
    <>
      {/* Intro */}
      <div className="mb-12 rounded-3xl border border-ever-green/[0.06] p-8 sm:p-10 card-accent-green">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Prompting Toolkit for Faculty, Staff & Admin
        </h2>
        <p className="mt-4 font-body text-base leading-relaxed text-pine-cone/70">
          Writing effective prompts is the key to unlocking useful, accurate, and
          ethical responses from AI tools. Whether you&apos;re teaching,
          advising, drafting reports, or writing emails, this toolkit will help
          you get better results&mdash;faster.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { step: "Learn", text: "Discover the principles of effective AI prompting" },
            { step: "Practice", text: "Try ready-to-use templates for common tasks" },
            { step: "Improve", text: "Transform basic prompts into powerful instructions" },
          ].map((s) => (
            <div key={s.step} className="rounded-xl bg-white/60 p-4 text-center">
              <p className="font-heading text-sm font-bold text-gator-green">{s.step}</p>
              <p className="mt-1 font-body text-xs text-pine-cone/70">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What makes a good prompt */}
      <h2 className="font-heading text-2xl font-bold text-pine-cone">
        What Makes a Good Prompt?
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            element: "Role",
            question: "Who should the AI act as?",
            example: "You are a faculty advisor helping first-year students.",
            why: "Giving AI a specific role helps it understand the perspective it should take.",
          },
          {
            element: "Task",
            question: "What should the AI do?",
            example: "Write a checklist, email, or discussion prompt.",
            why: "Be specific about what you want the AI to create or help with.",
          },
          {
            element: "Context",
            question: "What\u2019s the situation?",
            example: "For multilingual students in a hybrid course.",
            why: "Providing context helps the AI tailor its response to your specific situation.",
          },
          {
            element: "Constraints",
            question: "What are the limits?",
            example: "Limit to 5 bullet points, plain language.",
            why: "Setting constraints helps control the length and style of the AI\u2019s response.",
          },
          {
            element: "Format",
            question: "How should it look?",
            example: "Response should be in email format with greeting and closing.",
            why: "Specifying a format ensures the AI delivers content in your preferred structure.",
          },
        ].map((card) => (
          <div
            key={card.element}
            className="rounded-2xl border border-ever-green/[0.06] bg-white/40 p-5 transition-shadow hover:shadow-md"
          >
            <h3 className="font-heading text-base font-bold text-gator-green">
              {card.element}
            </h3>
            <p className="mt-1 font-body text-sm font-medium text-ever-green">
              {card.question}
            </p>
            <p className="mt-2 font-body text-xs italic text-pine-cone/70">
              &ldquo;{card.example}&rdquo;
            </p>
            <p className="mt-2 font-body text-xs text-pine-cone/60">{card.why}</p>
          </div>
        ))}
      </div>

      {/* Putting it all together */}
      <div className="mt-10 rounded-3xl border border-gator-green/10 bg-gator-green/[0.03] p-8">
        <h3 className="font-heading text-lg font-bold text-ever-green">
          Putting It All Together
        </h3>
        <blockquote className="mt-4 rounded-2xl border-l-4 border-gator-green bg-white/60 px-6 py-4 font-body text-sm leading-relaxed text-pine-cone/60">
          <strong>Role:</strong> You are a faculty advisor helping first-year students.
          <br />
          <strong>Task:</strong> Write an email template.
          <br />
          <strong>Context:</strong> For multilingual students in a hybrid course who missed the first week.
          <br />
          <strong>Constraints:</strong> Limit to 5 bullet points, use plain language, avoid idioms.
          <br />
          <strong>Format:</strong> Response should be in email format with greeting and closing.
        </blockquote>
      </div>

      {/* Prompt Makeovers */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Prompt Makeovers
        </h2>
        <p className="mt-2 mb-6 font-body text-sm text-pine-cone/70">
          See how small changes can dramatically improve your results.
        </p>
        <div className="space-y-4">
          {data.promptMakeovers?.map((mo) => (
            <div
              key={mo.title}
              className="rounded-2xl border border-ever-green/[0.06] bg-white/40 p-6"
            >
              <h3 className="font-heading text-base font-bold text-ever-green">
                {mo.title}
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-red-50/60 p-4">
                  <p className="font-body text-xs font-bold uppercase tracking-wider text-red-400">
                    Before
                  </p>
                  <p className="mt-2 font-body text-sm italic text-pine-cone/60">
                    &ldquo;{mo.before}&rdquo;
                  </p>
                </div>
                <div className="rounded-xl bg-green-50/60 p-4">
                  <p className="font-body text-xs font-bold uppercase tracking-wider text-gator-green">
                    After
                  </p>
                  <p className="mt-2 font-body text-sm italic text-pine-cone/60">
                    &ldquo;{mo.after}&rdquo;
                  </p>
                </div>
              </div>
              <p className="mt-3 font-body text-xs text-pine-cone/60">
                <strong className="text-pine-cone/60">Why it works:</strong>{" "}
                {mo.why}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Templates */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Prompt Templates by Use Case
        </h2>
        <div className="mt-6 space-y-4">
          {data.promptTemplates?.map((tmpl) => (
            <details
              key={tmpl.title}
              className="group rounded-2xl border border-ever-green/[0.06] bg-white/40 transition-all open:shadow-md"
            >
              <summary className="flex cursor-pointer items-center gap-3 px-6 py-4 font-heading text-base font-bold text-ever-green transition-colors hover:text-gator-green">
                {tmpl.title}
                <svg
                  className="ml-auto h-4 w-4 shrink-0 text-pine-cone/55 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <div className="px-6 pb-5">
                <blockquote className="rounded-xl border-l-4 border-gator-green bg-gator-green/[0.04] px-5 py-3 font-body text-sm italic leading-relaxed text-pine-cone/60">
                  &ldquo;{tmpl.prompt}&rdquo;
                </blockquote>
                <p className="mt-3 font-body text-xs text-pine-cone/60">
                  <strong className="text-pine-cone/60">Tip:</strong> {tmpl.tip}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Acknowledging AI use */}
      <div className="mt-12 rounded-3xl border border-ever-green/[0.06] p-8 sm:p-10">
        <h2 className="font-heading text-xl font-bold text-pine-cone">
          How to Acknowledge AI Use
        </h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-pine-cone/70">
          Transparency builds trust. If you use AI to draft, summarize, or
          revise content, acknowledge it clearly&mdash;just like citing a
          collaborator.
        </p>
        <div className="mt-5 space-y-3">
          {data.acknowledgmentExamples?.map((ack) => (
            <div
              key={ack.context}
              className="rounded-xl border border-ever-green/[0.06] bg-white/60 px-5 py-3"
            >
              <p className="font-heading text-xs font-bold uppercase tracking-wider text-pine-cone/60">
                {ack.context}
              </p>
              <p className="mt-1 font-body text-sm italic text-pine-cone/60">
                &ldquo;{ack.example}&rdquo;
              </p>
            </div>
          ))}
        </div>
        <ul className="mt-5 space-y-1.5">
          {[
            "Models the ethical use of technology for students",
            "Builds trust with colleagues and students",
            "Helps normalize appropriate AI use in education",
            "Encourages others to learn about AI tools",
          ].map((reason) => (
            <li
              key={reason}
              className="flex items-center gap-2 font-body text-sm text-pine-cone/70"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gator-green" />
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* External prompt libraries */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          External Prompt Libraries
        </h2>
        <p className="mt-2 mb-6 font-body text-sm text-pine-cone/70">
          Explore these resources for more prompt ideas and templates.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.externalPromptLibraries?.map((lib) => (
            <a
              key={lib.name}
              href={lib.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-ever-green/[0.06] bg-white/40 p-5 transition-all hover:border-ever-green/20 hover:shadow-md"
            >
              <h3 className="font-heading text-base font-bold text-ever-green group-hover:text-grc-green">
                {lib.name}
                <span className="ml-1.5 inline-block text-xs text-pine-cone/60 transition-transform group-hover:translate-x-0.5">↗</span>
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                {lib.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function AssessmentDesignContent({ data }: { data: ToolkitEntry }) {
  return (
    <>
      {/* Framework intro */}
      <div className="mb-12 rounded-3xl border border-ever-green/[0.06] p-8 sm:p-10 card-accent-blue">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Welcome to the AI Assessment Toolkit
        </h2>
        <p className="mt-4 font-body text-base leading-relaxed text-pine-cone/70">
          This toolkit is designed to help faculty at Green River College
          integrate AI assessment strategies into their courses. Explore
          resources, examples, and guidance for creating effective assessments in
          the age of AI.
        </p>
        <div className="mt-6 rounded-2xl border border-sky-blue/10 bg-sky-blue/[0.04] p-5">
          <p className="font-body text-sm leading-relaxed text-pine-cone/70">
            <strong className="text-ever-green">About this framework:</strong>{" "}
            Green River College&apos;s AI assessment approach is adapted from the{" "}
            <strong>AI Assessment Scale (AIAS)</strong>, developed by Mike
            Perkins, Leon Furze, Jasper Roe, and Jason MacVaugh. First
            introduced in 2023 and updated in 2024, the AIAS has been adopted by
            hundreds of institutions worldwide. GRC&apos;s adaptation customizes
            the framework for its specific context.
          </p>
          <p className="mt-2 font-body text-xs text-pine-cone/60">
            <a href="https://aiassessmentscale.com" target="_blank" rel="noopener noreferrer" className="text-sky-blue underline hover:text-ever-green">aiassessmentscale.com</a> &bull; Licensed under CC BY-NC-SA 4.0
          </p>
        </div>
      </div>

      {/* Important note about Level 1 */}
      <div className="mb-8 rounded-2xl border border-sunrise-orange/20 bg-sunrise-orange/[0.04] px-6 py-4">
        <p className="font-heading text-sm font-bold text-sunrise-orange">
          Important: Understanding Level 1 Requirements
        </p>
        <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
          Level 1 (No AI) is only effective in controlled environments where you
          can reliably verify that students completed the work
          independently&mdash;such as in-class exams, proctored assessments,
          live presentations, or oral exams. For take-home assignments, recognize
          that students will have access to AI tools, and there is no reliable
          way to prevent or detect their use. Consider using Level 2 or higher.
        </p>
        <p className="mt-2 font-body text-xs italic text-pine-cone/60">
          &mdash; Guidance from Dr. Mike Perkins, AIAS co-creator
        </p>
      </div>

      {/* Toolkit contents overview */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          "Templates & Example Assignments",
          "Rubrics for Each Level",
          "Reflection Prompts & Tools",
          "Instructor Tools & Resources",
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-ever-green/[0.06] bg-white/40 px-5 py-4 text-center"
          >
            <p className="font-heading text-sm font-bold text-ever-green">{item}</p>
          </div>
        ))}
      </div>

      {/* Five levels */}
      <h2 className="font-heading text-2xl font-bold text-pine-cone">
        Understanding the Five Levels
      </h2>
      <p className="mt-3 mb-8 font-body text-base text-pine-cone/70">
        The AI Assessment Scale provides a framework for understanding how
        assessments can be designed to work effectively with AI tools.
      </p>

      <div className="space-y-6">
        {data.assessmentLevels?.map((lvl) => (
          <details
            key={lvl.level}
            className="group rounded-3xl border border-ever-green/[0.06] bg-white/40 transition-all open:shadow-lg"
          >
            <summary className="flex cursor-pointer items-center gap-4 px-8 py-6 font-heading text-lg font-bold text-ever-green transition-colors hover:text-gator-green">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-blue font-heading text-sm font-extrabold text-white">
                {lvl.level}
              </span>
              Level {lvl.level}: {lvl.title}
              <svg
                className="ml-auto h-5 w-5 shrink-0 text-pine-cone/55 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <div className="px-8 pb-8">
              <p className="font-body text-sm leading-relaxed text-pine-cone/60">
                {lvl.description}
              </p>

              <blockquote className="mt-5 rounded-2xl border-l-4 border-sky-blue bg-sky-blue/[0.04] px-6 py-4 font-body text-sm italic leading-relaxed text-pine-cone/70">
                &ldquo;{lvl.statement}&rdquo;
              </blockquote>

              {/* Best For & When to Use */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-pine-cone/60">
                    Best For
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {lvl.bestFor.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 font-body text-sm text-pine-cone/60"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-blue" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-pine-cone/60">
                    When to Use
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {lvl.whenToUse.map((w) => (
                      <li
                        key={w}
                        className="flex items-start gap-2 font-body text-sm text-pine-cone/60"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sunrise-orange" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Assignment Examples */}
              <div className="mt-5">
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-pine-cone/60">
                  Assignment Examples
                </h4>
                <ul className="mt-2 space-y-2">
                  {lvl.assignmentExamples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-start gap-2 font-body text-sm text-pine-cone/60"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gator-green" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="mt-5">
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-pine-cone/60">
                  Available Resources
                </h4>
                <ul className="mt-2 space-y-1">
                  {lvl.resources.map((r) => (
                    <li
                      key={r}
                      className="flex items-center gap-2 font-body text-sm text-pine-cone/60"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ever-green/40" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        ))}
      </div>

      {/* Popular resources */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Popular Resources from the Toolkit
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {[
            {
              title: "AI Use Logs",
              description: "Templates for students to document their AI interactions, tools used, prompts given, and how outputs were incorporated into their work.",
              url: "https://docs.google.com/document/d/1Tbx4rnowCMUuB7CpdkvwgyQs6P1CT5l2cPqQcHf9f2Q/edit?usp=sharing",
            },
            {
              title: "Guided Reflection Worksheet",
              description: "Structured reflection prompts to help students analyze their AI use, evaluate outputs, and articulate their own contributions.",
              url: "https://docs.google.com/document/d/1onIYqL0Q5NMLK6mcy-jfYHMMTpRkGIIj1esQbkiT6sM/edit?usp=sharing",
            },
            {
              title: "Group Reflection Template",
              description: "Collaborative reflection tool for group projects involving AI, documenting team decisions and individual contributions.",
              url: "https://docs.google.com/document/d/18lgMzgPWQZIMjThFiFRT3cM8PK326Nf_IcHNiyYVHo4/edit?tab=t.0",
            },
            {
              title: "Rubric Library",
              description: "Comprehensive rubrics for each assessment level including level-specific evaluation criteria, customizable templates, and Canvas-ready formats.",
              url: "https://docs.google.com/document/d/1Gz7J4LPLVFr1WzR00zwvWu_QrRT3hb7FePgqgHmtiRA/edit?usp=sharing",
            },
            {
              title: "Faculty Self-Check",
              description: "A self-assessment tool for faculty to evaluate their AI integration practices and identify areas for improvement.",
              url: "https://docs.google.com/document/d/120hb5EVO7u7Uo6yUdQPa61BpEEmd_5LLf0hK2uvlh1U/export?format=pdf",
            },
            {
              title: "Reflection Tools Collection",
              description: "Comprehensive set of reflection tools including pre-assignment planning, during-process documentation, and post-assignment analysis.",
              url: "https://docs.google.com/document/d/15AvT1jJPcz33CdGsdiAHXj-lvkBsxRiAfYxrSJhrrDg/edit?usp=sharing",
            },
          ].map((res) => (
            <a
              key={res.title}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-ever-green/[0.06] bg-white/40 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-bold text-ever-green">
                  {res.title}
                </h3>
                <svg className="h-4 w-4 text-pine-cone/30 transition-colors group-hover:text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                {res.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* UDL */}
      <div className="mt-12 rounded-3xl border border-ever-green/[0.06] bg-gradient-to-br from-sky-blue/[0.04] to-ever-green/[0.04] p-8 sm:p-10">
        <h2 className="font-heading text-xl font-bold text-pine-cone">
          UDL Add-ons for AI-Enhanced Assignments
        </h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-pine-cone/70">
          Universal Design for Learning principles can be integrated with AI
          assessment strategies to create more inclusive and accessible learning
          experiences.
        </p>
        <ul className="mt-4 space-y-1.5">
          {[
            "Multiple means of engagement with AI tools",
            "Flexible options for demonstrating knowledge",
            "Accessible AI-enhanced assessment strategies",
            "Scaffolded approaches to AI integration",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 font-body text-sm text-pine-cone/60"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-blue" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Full Toolkit CTA */}
      <div className="mt-12 rounded-3xl border border-sky-blue/10 bg-sky-blue/[0.04] p-8 text-center">
        <p className="font-heading text-lg font-bold text-ever-green">
          Access the Full Assessment Toolkit
        </p>
        <p className="mt-2 font-body text-sm text-pine-cone/70">
          Download the complete AI-Enhanced Assessment Design Toolkit with all
          templates, rubrics, reflection tools, and assignment examples in one
          comprehensive document.
        </p>
        <a
          href="https://docs.google.com/document/d/1KkPL3nzr0Z-kh66G6MwN3WdrRxk_h99NSZZP_3RE3nY/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-blue px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-ever-green"
        >
          Open Full Toolkit (Google Docs)
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>

      {/* Attribution */}
      <p className="mt-8 text-center font-body text-xs text-pine-cone/35">
        Created by Ari Wilber, English Faculty & AI Task Force Co-Lead at
        Green River College. Assessment framework based on the AI Assessment
        Scale (AIAS) by Perkins, Furze, Roe, & MacVaugh (2024). Licensed under
        CC BY-NC-SA 4.0.
      </p>
    </>
  );
}

function CustomGPTsContent({ data }: { data: ToolkitEntry }) {
  return (
    <>
      {/* Hero */}
      <div className="mb-12 rounded-3xl border border-ever-green/[0.06] p-8 sm:p-10 card-accent-orange">
        <h2 className="font-heading text-2xl font-bold text-pine-cone">
          Custom GPT Tools @ Green River College
        </h2>
        <p className="mt-4 font-body text-base leading-relaxed text-pine-cone/70">
          Green River College is committed to helping faculty and students
          navigate the evolving landscape of artificial intelligence in
          education. These custom GPT tools are designed specifically for the
          academic environment to promote ethical AI use, enhance teaching
          practices, and support student learning.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Faculty-Developed",
              text: "Created by educators who understand classroom needs and challenges",
            },
            {
              title: "Ethically Aligned",
              text: "Supports academic integrity and responsible AI integration",
            },
            {
              title: "Continuously Updated",
              text: "Evolving with emerging best practices in AI education",
            },
          ].map((feat) => (
            <div key={feat.title} className="rounded-xl bg-white/60 p-4 text-center">
              <p className="font-heading text-sm font-bold text-gator-green">
                {feat.title}
              </p>
              <p className="mt-1 font-body text-xs text-pine-cone/70">{feat.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      {data.heroStat && (
        <div className="mb-10 flex flex-wrap gap-6">
          <div className="rounded-2xl border border-ever-green/[0.08] bg-ever-green/[0.03] px-8 py-6 text-center">
            <p className="font-heading text-4xl font-extrabold text-gator-green">
              {data.heroStat.value}
            </p>
            <p className="mt-1 font-body text-sm text-pine-cone/70">
              {data.heroStat.label}
            </p>
          </div>
          <div className="rounded-2xl border border-ever-green/[0.08] bg-ever-green/[0.03] px-8 py-6 text-center">
            <p className="font-heading text-4xl font-extrabold text-gator-green">
              100%
            </p>
            <p className="mt-1 font-body text-sm text-pine-cone/70">Faculty Built</p>
          </div>
        </div>
      )}

      {/* GPT cards */}
      <h2 className="font-heading text-2xl font-bold text-pine-cone">
        Available GPT Tools
      </h2>
      <div className="mt-6 space-y-5">
        {data.customGPTs?.map((gpt, idx) => (
          <div
            key={gpt.name}
            className="rounded-3xl border border-ever-green/[0.06] bg-white/40 p-6 sm:p-8 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gator-green to-ever-green font-heading text-sm font-extrabold text-white">
                {idx + 1}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-lg font-bold text-ever-green">
                    {gpt.name}
                  </h3>
                  <span className="rounded-full bg-sunrise-orange/10 px-3 py-0.5 font-body text-xs font-medium text-sunrise-orange">
                    {gpt.audience}
                  </span>
                  {!gpt.url && (
                    <span className="rounded-full bg-sky-blue/10 px-2.5 py-0.5 font-body text-[11px] font-medium text-sky-blue">
                      Link Coming Soon
                    </span>
                  )}
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                  {gpt.description}
                </p>
                {gpt.url && (
                  <a
                    href={gpt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-gator-green/10 px-4 py-2 font-body text-sm font-semibold text-gator-green transition-colors hover:bg-gator-green/20"
                  >
                    Try this GPT
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mt-12 rounded-3xl border border-ever-green/[0.06] bg-ever-green/[0.03] p-8 text-center">
        <p className="font-body text-base italic leading-relaxed text-pine-cone/60">
          &ldquo;These tools represent our commitment to embracing AI as a
          partner in education while maintaining the highest standards of
          academic integrity and critical thinking.&rdquo;
        </p>
        <cite className="mt-3 block font-body text-sm not-italic text-pine-cone/60">
          &mdash; Green River College AI Initiative
        </cite>
      </blockquote>

      {/* CTA */}
      <div className="mt-10 rounded-3xl border border-ever-green/[0.06] bg-gradient-to-br from-ever-green/[0.04] to-sunrise-orange/[0.04] p-8 text-center">
        <p className="font-heading text-lg font-bold text-ever-green">
          Looking for even more?
        </p>
        <p className="mt-2 font-body text-sm text-pine-cone/70">
          Access the complete collection of AI teaching resources. These tools
          were created by faculty and staff at Green River College to support
          ethical and empowered AI use.
        </p>
        <Link
          href="/toolkits"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gator-green px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-ever-green"
        >
          Browse All Toolkits
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   Main Page Component
   ──────────────────────────────────────────────────────────────── */

function ToolkitContent({ slug, data }: { slug: string; data: ToolkitEntry }) {
  switch (slug) {
    case "syllabus":
      return <SyllabusContent data={data} />;
    case "student-language":
      return <StudentLanguageContent data={data} />;
    case "ethics-privacy":
      return <EthicsPrivacyContent data={data} />;
    case "prompting":
      return <PromptingContent data={data} />;
    case "assessment-design":
      return <AssessmentDesignContent data={data} />;
    case "custom-gpts":
      return <CustomGPTsContent data={data} />;
    default:
      return (
        <div className="rounded-3xl border border-ever-green/[0.06] p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-pine-cone">
            Toolkit Content
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-pine-cone/70">
            This toolkit is currently being developed. Check back soon for
            comprehensive resources and templates.
          </p>
        </div>
      );
  }
}

export default async function ToolkitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = toolkitData[slug];

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <Link
          href="/toolkits"
          className="mb-8 inline-flex items-center gap-2 font-body text-sm font-medium text-pine-cone/60 transition-colors hover:text-ever-green"
        >
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to Toolkits
        </Link>

        <div className="max-w-3xl">
          <h1 className="text-title font-heading font-extrabold text-pine-cone">
            {data?.name ?? slug.replace(/-/g, " ")}
          </h1>
          <p className="mt-5 text-subtitle font-body text-pine-cone/60">
            {data?.desc ?? "Toolkit details loading."}
          </p>
        </div>

        <div className="divider-glow mt-12" />

        <div className="mt-12">
          {data ? (
            <ToolkitContent slug={slug} data={data} />
          ) : (
            <div className="rounded-3xl border border-ever-green/[0.06] p-8 sm:p-10">
              <h2 className="font-heading text-2xl font-bold text-pine-cone">
                Toolkit Not Found
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-pine-cone/70">
                The requested toolkit could not be found. Please return to the
                toolkits page and select a valid toolkit.
              </p>
              <Link
                href="/toolkits"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gator-green px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-ever-green"
              >
                View All Toolkits
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
