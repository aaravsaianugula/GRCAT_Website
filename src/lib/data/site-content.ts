export interface PageContent {
  route: string;
  title: string;
  summary: string;
  facts: string[];
  aiIds: string[];
  keywords: string[];
}

export const SITE_CONTENT: Record<string, PageContent> = {
  "/assessment-scale": {
    route: "/assessment-scale",
    title: "AI Assessment Scale",
    summary: "5-level framework for AI use in assignments",
    facts: [
      "Level 1 No AI: AI prohibited entirely, like a closed-book exam",
      "Level 2 AI Planning: AI for brainstorming/outlining only, final work must be human-written",
      "Level 3 AI Collaboration: AI assists throughout but student drives and edits all output",
      "Level 4 Full AI: AI does heavy lifting, student curates/evaluates/refines",
      "Level 5 AI Exploration: Full AI integration, focus on critical evaluation of AI capabilities",
      "Each level has syllabus language templates faculty can copy into their syllabus",
      "Instructors set the level per-assignment, not per-course",
    ],
    aiIds: ["scale-overview", "level-1", "level-2", "level-3", "level-4", "level-5"],
    keywords: ["assessment", "scale", "level", "assignment", "syllabus", "policy", "allowed", "prohibited"],
  },
  "/toolkits": {
    route: "/toolkits",
    title: "Toolkits",
    summary: "6 downloadable resource collections for faculty, staff, and students",
    facts: [
      "Syllabus Statements: 5 level templates with copy-ready language",
      "Student-Facing Language: add-ons, reflection prompts, conversation scripts",
      "Ethics & Privacy: FERPA guide, bias frameworks, decision journals",
      "Prompting: 5 templates, prompt makeovers, prompt libraries",
      "Assessment Design: assignment examples, rubric templates",
      "Custom GPTs: 5 GRC-built GPTs including AI Policy Assistant and Assignment Designer",
    ],
    aiIds: ["toolkit-grid", "toolkit-syllabus", "toolkit-ethics-privacy", "toolkit-prompting", "toolkit-assessment-design", "toolkit-custom-gpts", "toolkit-student-language"],
    keywords: ["toolkit", "syllabus", "template", "resource", "download", "prompting", "ethics", "rubric", "gpt"],
  },
  "/playground": {
    route: "/playground",
    title: "AI Playground",
    summary: "Directory of 80+ AI tools with best-practice guidelines",
    facts: [
      "8 featured generative AI tools: ChatGPT, Claude, Gemini, Copilot, Perplexity, Pi, Mistral, Poe",
      "Categories: Writing, Research, Teaching, Accessibility, Video, Image, Audio, Presentations, Coding, Productivity",
      "Each tool lists pricing, best use case, and tags",
      "4 best-practice guidelines: Protect PII, Verify Content, Maintain Integrity, Bias Awareness",
    ],
    aiIds: ["playground-guidelines", "playground-gen-ai", "playground-tools"],
    keywords: ["tool", "tools", "chatgpt", "claude", "gemini", "copilot", "perplexity", "writing", "research", "free", "playground"],
  },
  "/best-practices": {
    route: "/best-practices",
    title: "Best Practices",
    summary: "Role-specific guidelines for responsible AI use",
    facts: [
      "Student: check syllabus first, cite AI use, never input PII, verify all outputs",
      "Faculty: set clear AI policies per assignment, use Assessment Scale, design AI-resistant assessments when needed",
      "Staff: focus on workflow improvements, FERPA compliance, never input student records into AI",
    ],
    aiIds: ["best-practices-hero", "best-practices-cards"],
    keywords: ["best practice", "responsible", "ethical", "guidelines", "tips", "dos", "donts"],
  },
  "/faqs": {
    route: "/faqs",
    title: "FAQs",
    summary: "25+ frequently asked questions across 6 categories",
    facts: [
      "General: what is AI, why GRC focuses on it, assessment scale basics, recommended tools",
      "Students: can I use AI, citation requirements, ethical use, cheating concerns",
      "Faculty: setting policies, guiding principles, course design, plagiarism detection",
      "Policy: official policy, academic dishonesty, FERPA, bias",
      "Tools: free tools, AI Playground, custom GPTs, getting started",
      "Staff: admin AI use, FERPA compliance, communications, approved tools",
    ],
    aiIds: ["faq-general", "faq-student", "faq-faculty", "faq-policy", "faq-tools", "faq-staff"],
    keywords: ["faq", "question", "answer", "help", "how", "what", "why", "can"],
  },
  "/about": {
    route: "/about",
    title: "About the Taskforce",
    summary: "Mission, timeline, and team behind the AI Taskforce",
    facts: [
      "Launched Fall 2023, co-led by Ari Wilber (English Faculty)",
      "Mission: responsible AI use guidance for all campus roles",
      "Timeline: 8 milestones from Fall 2023 to Fall 2025",
      "Key docs: toolkits, syllabi templates, 40-hour AI 101 course",
    ],
    aiIds: ["about-hero", "about-mission", "about-timeline", "about-recommendations"],
    keywords: ["about", "taskforce", "mission", "team", "history", "timeline", "who"],
  },
  "/quiz": {
    route: "/quiz",
    title: "AI Level Quiz",
    summary: "6-question quiz to discover your AI comfort level (maps to Assessment Scale)",
    facts: [
      "6 questions about AI comfort, approach, and ethics",
      "Results map to one of 5 Assessment Scale levels",
      "Shows confidence percentage and links to detailed level page",
    ],
    aiIds: ["quiz-container"],
    keywords: ["quiz", "test", "assessment", "level", "discover", "find", "comfort"],
  },
  "/events": {
    route: "/events",
    title: "Events & Workshops",
    summary: "Upcoming AI training sessions and workshops",
    facts: [
      "Workshops for faculty and staff on AI integration",
      "40-hour AI 101 course available",
      "Regular training sessions each quarter",
    ],
    aiIds: ["events-list"],
    keywords: ["event", "workshop", "training", "course", "session", "calendar"],
  },
  "/feedback": {
    route: "/feedback",
    title: "Feedback",
    summary: "Contact form for suggestions and feedback",
    facts: ["Submit questions, suggestions, or feedback to the Taskforce"],
    aiIds: ["feedback-form"],
    keywords: ["feedback", "contact", "suggestion", "question", "reach", "email"],
  },
  "/student": {
    route: "/student",
    title: "Student Dashboard",
    summary: "Student home with quick access to tools, scale, quiz, and best practices",
    facts: [
      "Quick tools: ChatGPT, Grammarly, Canva AI, Quillbot, Copilot",
      "Assessment Scale quick reference",
      "Links to best practices, playground, FAQs",
    ],
    aiIds: ["student-hero", "student-tools", "student-scale-ref"],
    keywords: ["student", "dashboard", "home"],
  },
  "/faculty": {
    route: "/faculty",
    title: "Faculty Dashboard",
    summary: "Faculty home with syllabus tools, assessment design, and training",
    facts: [
      "Syllabus statement toolkit",
      "Assessment design resources",
      "Stats: 73% students want clear AI policies, 68% faculty want guidance, 85% want training",
    ],
    aiIds: ["faculty-hero", "faculty-tools", "faculty-stats"],
    keywords: ["faculty", "dashboard", "home", "teaching"],
  },
  "/staff": {
    route: "/staff",
    title: "Staff Dashboard",
    summary: "Staff home with workflow tools and FERPA guidance",
    facts: [
      "Workflow automation tools",
      "FERPA compliance emphasis",
      "Custom GPTs for staff tasks",
    ],
    aiIds: ["staff-hero", "staff-tools"],
    keywords: ["staff", "dashboard", "home", "workflow"],
  },
};

/**
 * Given a user message, find the most relevant page(s) to inject as context.
 * Returns at most 2 pages to keep token usage low.
 */
export function findRelevantPages(userMessage: string): PageContent[] {
  const lower = userMessage.toLowerCase();
  const scored: { page: PageContent; score: number }[] = [];

  for (const page of Object.values(SITE_CONTENT)) {
    let score = 0;
    for (const kw of page.keywords) {
      if (lower.includes(kw)) score += 2;
    }
    if (lower.includes(page.title.toLowerCase())) score += 5;
    if (score > 0) scored.push({ page, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((s) => s.page);
}

/**
 * Build a compact context string for the matched pages.
 */
export function buildPageContext(pages: PageContent[]): string {
  if (pages.length === 0) return "";
  return pages
    .map((p) => `[${p.title}](${p.route}): ${p.facts.join(". ")}`)
    .join("\n");
}

/**
 * Given AI response text, detect page mentions and return navigation suggestions
 * as a fallback when the model doesn't use action markers.
 */
export function detectPageMentions(text: string): { label: string; route: string }[] {
  const lower = text.toLowerCase();
  const mentions: { label: string; route: string }[] = [];

  const patterns: { match: string[]; label: string; route: string }[] = [
    { match: ["assessment scale", "ai scale", "5 levels", "five levels", "level 1", "level 2", "level 3", "level 4", "level 5"], label: "Assessment Scale", route: "/assessment-scale" },
    { match: ["toolkit", "toolkits", "syllabus statement", "syllabus template"], label: "Toolkits", route: "/toolkits" },
    { match: ["playground", "ai tools", "80+ tools", "tool directory"], label: "AI Playground", route: "/playground" },
    { match: ["best practice", "responsible use", "ethical use"], label: "Best Practices", route: "/best-practices" },
    { match: ["faq", "frequently asked", "common question"], label: "FAQs", route: "/faqs" },
    { match: ["quiz", "find your level", "discover your level", "take the quiz"], label: "AI Level Quiz", route: "/quiz" },
    { match: ["about the taskforce", "task force", "mission", "ari wilber"], label: "About", route: "/about" },
    { match: ["event", "workshop", "training session"], label: "Events", route: "/events" },
    { match: ["feedback", "contact", "suggestion"], label: "Feedback", route: "/feedback" },
  ];

  for (const p of patterns) {
    if (p.match.some((m) => lower.includes(m))) {
      mentions.push({ label: p.label, route: p.route });
    }
  }

  return mentions;
}
