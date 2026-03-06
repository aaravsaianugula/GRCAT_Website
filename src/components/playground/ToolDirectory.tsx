"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { Audience } from "@/contexts/AudienceContext";

/* ------------------------------------------------------------------ */
/*  Best-practice guidelines from the LibGuide                        */
/* ------------------------------------------------------------------ */
const guidelines = [
  {
    title: "Protect Personal Information",
    body: "Never input personally identifiable information (PII) into AI tools. This includes student records, Social Security numbers, financial data, and any information protected by FERPA. AI systems may store or train on your inputs.",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
    color: "card-accent-orange",
  },
  {
    title: "Verify AI-Generated Content",
    body: "Always fact-check AI outputs before using them. AI models can hallucinate — generating plausible-sounding but incorrect or fabricated information, citations, and statistics. Cross-reference every claim with reliable sources.",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    color: "card-accent-green",
  },
  {
    title: "Maintain Academic Integrity",
    body: "Follow your instructor's guidelines on AI use. Always disclose when and how AI was used in your work. Understand the AI Assessment Scale levels — from no AI allowed (Level 1) to full AI integration (Level 5).",
    icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342",
    color: "card-accent-blue",
  },
  {
    title: "Be Aware of Bias",
    body: "AI models can reflect and amplify societal biases present in their training data. Critically evaluate AI outputs for stereotypes, underrepresentation, and cultural assumptions. Use diverse sources to validate AI-generated perspectives.",
    icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z",
    color: "card-accent-orange",
  },
];

/* ------------------------------------------------------------------ */
/*  Generative AI tools — full detail cards                           */
/* ------------------------------------------------------------------ */
interface Tool {
  name: string;
  description: string;
  tags: string[];
  pricing: string;
  bestFor: string;
  url: string;
}

const generativeAITools: Tool[] = [
  {
    name: "ChatGPT",
    description: "OpenAI's conversational AI for brainstorming, drafting, coding, analysis, and creative tasks. Supports text, image, and file uploads.",
    tags: ["Brainstorming", "Writing", "Coding", "Analysis"],
    pricing: "Free / Plus $20/mo",
    bestFor: "General-purpose AI assistant",
    url: "https://chat.openai.com",
  },
  {
    name: "Claude",
    description: "Anthropic's AI assistant focused on safety and nuance. Excels at long-document analysis, careful reasoning, and following complex instructions.",
    tags: ["Research", "Writing", "Analysis", "Long Documents"],
    pricing: "Free / Pro $20/mo",
    bestFor: "Nuanced analysis & long documents",
    url: "https://claude.ai",
  },
  {
    name: "Gemini",
    description: "Google's multimodal AI integrated with Google Workspace. Strong at search-grounded answers, image understanding, and data analysis.",
    tags: ["Search", "Multimodal", "Google Integration"],
    pricing: "Free / Advanced $19.99/mo",
    bestFor: "Google ecosystem & multimodal tasks",
    url: "https://gemini.google.com",
  },
  {
    name: "Microsoft Copilot",
    description: "AI assistant integrated into Microsoft 365 apps. Summarize emails, generate documents, analyze spreadsheets, and create presentations.",
    tags: ["Productivity", "Microsoft 365", "Writing"],
    pricing: "Free / Pro $20/mo",
    bestFor: "Microsoft 365 integration",
    url: "https://copilot.microsoft.com",
  },
  {
    name: "Perplexity",
    description: "AI-powered search engine that provides sourced, cited answers. Combines web search with AI summarization for research-quality responses.",
    tags: ["Research", "Citations", "Search"],
    pricing: "Free / Pro $20/mo",
    bestFor: "Research with citations",
    url: "https://www.perplexity.ai",
  },
  {
    name: "Pi",
    description: "Inflection AI's personal assistant designed for natural, empathetic conversations. Great for brainstorming, learning, and casual exploration.",
    tags: ["Conversation", "Brainstorming", "Learning"],
    pricing: "Free",
    bestFor: "Conversational brainstorming",
    url: "https://pi.ai",
  },
  {
    name: "Mistral",
    description: "European open-weight AI models with strong multilingual capabilities. Offers Le Chat as a free conversational interface and API access.",
    tags: ["Multilingual", "Open Source", "Coding"],
    pricing: "Free / API pricing",
    bestFor: "Multilingual & open-source needs",
    url: "https://chat.mistral.ai",
  },
  {
    name: "Poe",
    description: "Quora's platform offering access to multiple AI models (GPT-4, Claude, Gemini, and more) in a single interface. Compare responses across models.",
    tags: ["Multi-Model", "Comparison", "Exploration"],
    pricing: "Free / $19.99/mo",
    bestFor: "Comparing multiple AI models",
    url: "https://poe.com",
  },
];

/* ------------------------------------------------------------------ */
/*  Category data                                                      */
/* ------------------------------------------------------------------ */
interface CategoryTool {
  name: string;
  url: string;
}

interface Category {
  name: string;
  tools: CategoryTool[];
  color: string;
  icon: string;
}

const categories: Category[] = [
  {
    name: "Writing & Content",
    tools: [
      { name: "GrammarlyGO", url: "https://www.grammarly.com/grammarlygo" },
      { name: "Wordtune", url: "https://www.wordtune.com" },
      { name: "Notion AI", url: "https://www.notion.so/product/ai" },
      { name: "Jasper", url: "https://www.jasper.ai" },
      { name: "ProWritingAid", url: "https://prowritingaid.com" },
      { name: "QuillBot", url: "https://quillbot.com" },
      { name: "SciSpace", url: "https://scispace.com" },
      { name: "Sudowrite", url: "https://www.sudowrite.com" },
      { name: "Trinka AI", url: "https://www.trinka.ai" },
      { name: "Scribbr", url: "https://www.scribbr.com/ai-tools" },
    ],
    color: "card-accent-green",
    icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125",
  },
  {
    name: "Teaching & Learning",
    tools: [
      { name: "MagicSchool", url: "https://www.magicschool.ai" },
      { name: "Diffit", url: "https://diffit.app" },
      { name: "Curipod", url: "https://curipod.com" },
      { name: "Eduaide", url: "https://eduaide.ai" },
      { name: "Conker", url: "https://conker.io" },
      { name: "Goblin.tools", url: "https://goblin.tools" },
      { name: "Snorkl", url: "https://snorkl.ai" },
      { name: "Mizou", url: "https://mizou.com" },
      { name: "Formative", url: "https://goformative.com" },
      { name: "Brisk", url: "https://brisk.education" },
    ],
    color: "card-accent-blue",
    icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342",
  },
  {
    name: "Research",
    tools: [
      { name: "NotebookLM", url: "https://notebooklm.google.com" },
      { name: "Perplexity", url: "https://www.perplexity.ai" },
      { name: "Consensus", url: "https://consensus.app" },
      { name: "ResearchRabbit", url: "https://researchrabbit.ai" },
      { name: "Scholarcy", url: "https://scholarcy.com" },
      { name: "Elicit", url: "https://elicit.org" },
      { name: "Zotero", url: "https://www.zotero.org" },
      { name: "Scite", url: "https://scite.ai" },
      { name: "Litmaps", url: "https://www.litmaps.com" },
      { name: "Connected Papers", url: "https://www.connectedpapers.com" },
    ],
    color: "card-accent-orange",
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  },
  {
    name: "Accessibility",
    tools: [
      { name: "Ally", url: "https://www.blackboard.com/teaching-learning/accessibility-universal-design/blackboard-ally" },
      { name: "EquatIO", url: "https://www.texthelp.com/products/equatio/" },
      { name: "ReachDeck", url: "https://www.reachdeck.com" },
      { name: "SensusAccess", url: "https://sensusaccess.com" },
      { name: "AudioEye", url: "https://www.audioeye.com" },
      { name: "ReadSpeaker", url: "https://www.readspeaker.com" },
      { name: "Otter.ai", url: "https://otter.ai" },
      { name: "Microsoft Immersive Reader", url: "https://education.microsoft.com/en-us/resource/9b010288" },
      { name: "GrackleDocs", url: "https://www.grackledocs.com" },
      { name: "WAVE", url: "https://wave.webaim.org" },
    ],
    color: "card-accent-green",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m10.116 0a9 9 0 10-10.116 0",
  },
  {
    name: "Productivity",
    tools: [
      { name: "Notion AI", url: "https://www.notion.so/product/ai" },
      { name: "ClickUp AI", url: "https://clickup.com/ai" },
      { name: "Goblin.tools Planner", url: "https://goblin.tools" },
      { name: "Motion AI", url: "https://www.usemotion.com" },
      { name: "Otter AI Notes", url: "https://otter.ai" },
      { name: "Todoist AI", url: "https://todoist.com" },
      { name: "Mem AI", url: "https://mem.ai" },
      { name: "Zapier AI", url: "https://zapier.com" },
    ],
    color: "card-accent-blue",
    icon: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    name: "Data & Surveys",
    tools: [
      { name: "Qualtrics", url: "https://www.qualtrics.com" },
      { name: "Google Forms", url: "https://docs.google.com/forms" },
      { name: "Microsoft Forms", url: "https://forms.office.com" },
      { name: "Poll Everywhere", url: "https://www.polleverywhere.com" },
      { name: "Slido", url: "https://www.slido.com" },
      { name: "SurveyMonkey", url: "https://www.surveymonkey.com" },
      { name: "Tableau", url: "https://www.tableau.com" },
      { name: "Typeform", url: "https://www.typeform.com" },
    ],
    color: "card-accent-orange",
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605",
  },
  {
    name: "Multimedia",
    tools: [
      { name: "Runway", url: "https://runwayml.com" },
      { name: "D-ID", url: "https://www.d-id.com" },
      { name: "ElevenLabs", url: "https://elevenlabs.io" },
      { name: "Murf.ai", url: "https://murf.ai" },
      { name: "Pictory", url: "https://pictory.ai" },
      { name: "Soundraw", url: "https://soundraw.io" },
      { name: "Canva Magic Media", url: "https://www.canva.com/magic-media/" },
      { name: "Leonardo AI", url: "https://leonardo.ai" },
      { name: "Synthesia", url: "https://www.synthesia.io" },
      { name: "DALL-E", url: "https://openai.com/dall-e-3" },
      { name: "Descript", url: "https://www.descript.com" },
      { name: "Midjourney", url: "https://www.midjourney.com" },
    ],
    color: "card-accent-green",
    icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6.75v12a2.25 2.25 0 002.25 2.25z",
  },
  {
    name: "Presentations",
    tools: [
      { name: "Curipod", url: "https://curipod.com" },
      { name: "Tome", url: "https://tome.app" },
      { name: "Gamma", url: "https://gamma.app" },
      { name: "SlidesAI", url: "https://www.slidesai.io" },
      { name: "Beautiful.ai", url: "https://www.beautiful.ai" },
      { name: "Canva Presentations", url: "https://www.canva.com/presentations/" },
      { name: "Decktopus", url: "https://www.decktopus.com" },
      { name: "PowerPoint + Copilot", url: "https://www.microsoft.com/en-us/microsoft-365/powerpoint" },
      { name: "Prezi", url: "https://prezi.com" },
      { name: "Slidesgo AI", url: "https://slidesgo.com/ai-presentations" },
    ],
    color: "card-accent-blue",
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
  },
];

/* ------------------------------------------------------------------ */
/*  Audience configuration                                            */
/* ------------------------------------------------------------------ */
interface AudienceConfig {
  tip: string;
  tipColor: string;
  tipBg: string;
  tipBorder: string;
  badgeLabel: string;
  badgeColor: string;
  badgeBg: string;
  recommendedGenerativeTools: string[];
  recommendedCategoryOrder: string[];
}

const audienceConfigs: Record<NonNullable<Audience>, AudienceConfig> = {
  student: {
    tip: "Always check your syllabus before using AI tools in your coursework.",
    tipColor: "text-sky-blue",
    tipBg: "bg-sky-blue/5",
    tipBorder: "border-sky-blue/20",
    badgeLabel: "Recommended for Students",
    badgeColor: "text-sky-blue",
    badgeBg: "bg-sky-blue/10",
    recommendedGenerativeTools: ["ChatGPT", "Gemini", "Perplexity", "Pi", "Poe", "Mistral"],
    recommendedCategoryOrder: ["Writing & Content", "Research", "Multimedia", "Presentations", "Productivity", "Accessibility", "Data & Surveys", "Teaching & Learning"],
  },
  faculty: {
    tip: "Use the AI Assessment Scale to determine appropriate AI use levels for your courses.",
    tipColor: "text-gator-green",
    tipBg: "bg-gator-green/5",
    tipBorder: "border-gator-green/20",
    badgeLabel: "Recommended for Faculty",
    badgeColor: "text-gator-green",
    badgeBg: "bg-gator-green/10",
    recommendedGenerativeTools: ["ChatGPT", "Claude", "Gemini", "Perplexity", "Microsoft Copilot"],
    recommendedCategoryOrder: ["Teaching & Learning", "Research", "Writing & Content", "Presentations", "Accessibility", "Multimedia", "Data & Surveys", "Productivity"],
  },
  staff: {
    tip: "Remember to follow FERPA guidelines when using AI with student data.",
    tipColor: "text-sunrise-orange",
    tipBg: "bg-sunrise-orange/5",
    tipBorder: "border-sunrise-orange/20",
    badgeLabel: "Recommended for Staff",
    badgeColor: "text-sunrise-orange",
    badgeBg: "bg-sunrise-orange/10",
    recommendedGenerativeTools: ["Microsoft Copilot", "ChatGPT", "Gemini", "Perplexity", "Claude"],
    recommendedCategoryOrder: ["Productivity", "Data & Surveys", "Writing & Content", "Accessibility", "Presentations", "Multimedia", "Research", "Teaching & Learning"],
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function reorderGenerativeTools(tools: Tool[], recommended: string[]): Tool[] {
  const recSet = new Set(recommended);
  const top = tools.filter((t) => recSet.has(t.name));
  const rest = tools.filter((t) => !recSet.has(t.name));
  top.sort((a, b) => recommended.indexOf(a.name) - recommended.indexOf(b.name));
  return [...top, ...rest];
}

function reorderCategories(cats: Category[], order: string[]): Category[] {
  const orderMap = new Map(order.map((name, i) => [name, i]));
  return [...cats].sort((a, b) => {
    const ai = orderMap.get(a.name) ?? 999;
    const bi = orderMap.get(b.name) ?? 999;
    return ai - bi;
  });
}

const totalTools = generativeAITools.length + categories.reduce((sum, cat) => sum + cat.tools.length, 0);

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const categoryPillColors: Record<string, string> = {
  "Writing & Content": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Teaching & Learning": "bg-blue-100 text-blue-700 border-blue-200",
  Research: "bg-orange-100 text-orange-700 border-orange-200",
  Accessibility: "bg-purple-100 text-purple-700 border-purple-200",
  Productivity: "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Data & Surveys": "bg-rose-100 text-rose-700 border-rose-200",
  Multimedia: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  Presentations: "bg-indigo-100 text-indigo-700 border-indigo-200",
};

/* ------------------------------------------------------------------ */
/*  Exported component                                                 */
/* ------------------------------------------------------------------ */
export function ToolDirectory({ audience }: { audience: Audience | null }) {
  const config = audience ? audienceConfigs[audience] : null;

  const orderedGenerativeTools = useMemo(() => {
    if (!config) return generativeAITools;
    return reorderGenerativeTools(generativeAITools, config.recommendedGenerativeTools);
  }, [config]);

  const orderedCategories = useMemo(() => {
    if (!config) return categories;
    return reorderCategories(categories, config.recommendedCategoryOrder);
  }, [config]);

  const isRecommendedGenTool = (name: string): boolean => {
    if (!config) return false;
    return config.recommendedGenerativeTools.includes(name);
  };

  return (
    <>
      {/* -- Audience Tip Banner ----------------------------------- */}
      {config && (
        <div className={`flex items-start gap-3 rounded-2xl border px-5 py-4 mb-10 ${config.tipBg} ${config.tipBorder}`}>
          <svg className={`mt-0.5 h-5 w-5 shrink-0 ${config.tipColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className={`font-body text-sm font-medium ${config.tipColor}`}>{config.tip}</p>
        </div>
      )}

      {/* -- Best Practices ---------------------------------------- */}
      <ScrollReveal>
        <section data-ai-id="playground-guidelines">
          <h2 className="font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">
            Best Practices for Ethical AI Use
          </h2>
          <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-pine-cone/70">
            Before exploring AI tools, review these essential guidelines for responsible use at Green River College.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {guidelines.map((g) => (
              <div key={g.title} className={`flex gap-5 rounded-3xl border border-ever-green/[0.06] p-7 ${g.color}`}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ever-green/[0.06]">
                  <svg className="h-6 w-6 text-ever-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={g.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-ever-green">{g.title}</h3>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-pine-cone/70">{g.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <div className="divider-glow my-16" />

      {/* -- Category Overview Grid -------------------------------- */}
      <ScrollReveal delay={0.1}>
        <section>
          <h2 className="font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">Tool Categories</h2>
          <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-pine-cone/70">
            {totalTools}+ AI tools organized across {categories.length + 1} categories. Scroll down to explore the full Generative AI directory and browse every category.
          </p>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Generative AI — featured card */}
            <motion.div variants={fadeInUp} custom={0} className="group relative flex flex-col rounded-3xl border-2 border-gator-green/20 bg-gradient-to-br from-gator-green/[0.04] to-transparent p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated sm:col-span-2 lg:col-span-1">
              <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-pill bg-gator-green/15 px-2.5 py-0.5 font-body text-xs font-bold uppercase tracking-wider text-gator-green">Featured</span>
              <h3 className="font-heading text-xl font-bold text-pine-cone">Generative AI</h3>
              <p className="mt-1 font-body text-sm text-pine-cone/70">{generativeAITools.length} tools — ChatGPT, Claude, Gemini &amp; more</p>
              <a href="#generative-ai" className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gator-green transition-colors hover:text-ever-green">
                View full directory
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </a>
            </motion.div>

            {orderedCategories.map((cat, i) => {
              const pillColor = categoryPillColors[cat.name] ?? "bg-gray-100 text-gray-700 border-gray-200";
              return (
                <motion.div key={cat.name} variants={fadeInUp} custom={i + 1} className={`group flex items-start gap-5 rounded-3xl border border-ever-green/[0.06] p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated ${cat.color}`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ever-green/[0.06]">
                    <svg className="h-5 w-5 text-ever-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ever-green">{cat.name}</h3>
                    <span className={`mt-1 inline-flex items-center gap-1 rounded-pill border px-2 py-0.5 font-body text-xs font-semibold ${pillColor}`}>{cat.tools.length} tools</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </ScrollReveal>

      <div className="divider-glow my-16" />

      {/* -- Generative AI — Full Tool Grid ------------------------ */}
      <section id="generative-ai" data-ai-id="playground-gen-ai">
        <div className="flex items-end justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-pill bg-gator-green/15 px-3 py-0.5 font-body text-xs font-bold uppercase tracking-wider text-gator-green">Generative AI</span>
            <h2 className="font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">AI Assistants &amp; Chatbots</h2>
            <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-pine-cone/70">
              General-purpose AI tools for brainstorming, writing, coding, research, and creative work.
            </p>
          </div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orderedGenerativeTools.map((tool, i) => {
            const recommended = isRecommendedGenTool(tool.name);
            return (
              <motion.div key={tool.name} variants={fadeInUp} custom={i} className="group flex flex-col rounded-3xl border border-ever-green/[0.06] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="mb-3 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex w-fit items-center rounded-pill bg-gator-green/10 px-2.5 py-0.5 font-body text-[11px] font-bold uppercase tracking-wider text-gator-green">Generative AI</span>
                  {recommended && config && (
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={`inline-flex items-center gap-1 rounded-pill px-2 py-0.5 font-body text-[11px] font-bold uppercase tracking-wider ${config.badgeBg} ${config.badgeColor}`}>
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                      </svg>
                      {config.badgeLabel}
                    </motion.span>
                  )}
                </div>
                <h3 className="font-heading text-lg font-bold text-ever-green">{tool.name}</h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">{tool.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="rounded-pill bg-ever-green/[0.05] px-2 py-0.5 font-body text-xs text-pine-cone/70">{tag}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-ever-green/[0.06] pt-3">
                  <p className="font-body text-xs text-pine-cone/60">{tool.pricing}</p>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-body text-xs font-semibold text-sky-blue transition-colors hover:text-ever-green">
                    Visit
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <div className="divider-glow my-16" />

      {/* -- Comparison Table — Generative AI ---------------------- */}
      <section>
        <h2 className="font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">Generative AI Comparison</h2>
        <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-pine-cone/70">
          {audience === "student"
            ? "A quick look at AI assistants and what each one is best for."
            : "Side-by-side comparison to help you choose the right AI assistant for your needs."}
        </p>

        <div className="mt-8 overflow-x-auto rounded-3xl border border-ever-green/[0.06] bg-white">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-ever-green/[0.08]">
                <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-ever-green">Tool</th>
                <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-ever-green">Best For</th>
                <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-ever-green">Pricing</th>
                {audience !== "student" && (
                  <th className="px-6 py-4 font-heading text-sm font-bold uppercase tracking-wider text-ever-green">Key Tags</th>
                )}
              </tr>
            </thead>
            <tbody>
              {orderedGenerativeTools.map((tool, i) => {
                const recommended = isRecommendedGenTool(tool.name);
                return (
                  <tr key={tool.name} className={i < orderedGenerativeTools.length - 1 ? "border-b border-ever-green/[0.04]" : ""}>
                    <td className="px-6 py-3.5 font-heading text-sm font-semibold text-ever-green">
                      <span className="flex items-center gap-2">
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="underline decoration-ever-green/30 underline-offset-2 hover:text-gator-green">{tool.name}</a>
                        {recommended && config && (
                          <span className={`inline-flex items-center rounded-pill px-1.5 py-0.5 text-[10px] font-bold uppercase ${config.badgeBg} ${config.badgeColor}`}>
                            <svg className="mr-0.5 h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                            </svg>
                            Top Pick
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-body text-sm text-pine-cone/60">{tool.bestFor}</td>
                    <td className="px-6 py-3.5 font-body text-sm text-pine-cone/70">{tool.pricing}</td>
                    {audience !== "student" && (
                      <td className="px-6 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {tool.tags.map((tag) => (
                            <span key={tag} className="rounded-pill bg-ever-green/[0.05] px-2 py-0.5 font-body text-xs text-pine-cone/60">{tag}</span>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="divider-glow my-16" />

      {/* -- All Other Categories — Summary Cards ------------------ */}
      <section data-ai-id="playground-tools">
        <h2 className="font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">Browse All Categories</h2>
        <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-pine-cone/70">
          Explore {totalTools - generativeAITools.length} additional tools across {categories.length} specialized categories.
        </p>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mt-10 grid gap-6 sm:grid-cols-2">
          {orderedCategories.map((cat, i) => {
            const pillColor = categoryPillColors[cat.name] ?? "bg-gray-100 text-gray-700 border-gray-200";
            return (
              <motion.div key={cat.name} variants={fadeInUp} custom={i} className={`rounded-3xl border border-ever-green/[0.06] p-8 ${cat.color}`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ever-green/[0.06]">
                    <svg className="h-5 w-5 text-ever-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-pine-cone">{cat.name}</h3>
                    <span className={`mt-1 inline-flex items-center gap-1 rounded-pill border px-2 py-0.5 font-body text-xs font-semibold ${pillColor}`}>{cat.tools.length} tools</span>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.tools.map((tool) => (
                    <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer" className="rounded-pill border border-ever-green/[0.08] bg-white/70 px-3 py-1 font-body text-sm text-pine-cone/60 transition-colors hover:border-gator-green/30 hover:text-gator-green">
                      {tool.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* -- Footer CTA -------------------------------------------- */}
      <div className="mt-20 rounded-3xl border border-ever-green/[0.06] bg-gradient-to-br from-gator-green/[0.04] to-transparent p-10 text-center sm:p-14">
        <h2 className="font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">Need Help Choosing a Tool?</h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-pine-cone/70">
          The AI Task Force is here to help. Reach out for personalized recommendations, training sessions, or to suggest a tool for the directory.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/feedback" className="inline-flex items-center gap-2 rounded-pill bg-grc-green px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-ever-green">
            Contact the Task Force
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link href="https://libguides.greenriver.edu/AITaskforce" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-pill border border-ever-green/10 bg-white px-6 py-3 font-body text-sm font-semibold text-ever-green transition-colors hover:bg-ever-green/[0.04]">
            View Full LibGuide
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
