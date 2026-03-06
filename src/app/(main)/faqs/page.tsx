"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAudience, type Audience } from "@/contexts/AudienceContext";
import { PageTransition } from "@/components/shared/PageTransition";
import { Accordion } from "@/components/shared/Accordion";
import { springDefault } from "@/lib/animations/motion";

interface Faq {
  q: string;
  a: string;
}

const generalFaqs: Faq[] = [
  {
    q: "What is AI, and why does it matter in college settings?",
    a: "Artificial Intelligence (AI) refers to computer systems that can perform tasks that typically require human intelligence. In education, AI matters because it's transforming how we learn, teach, and prepare for careers. Students who understand AI will be better prepared for the modern workforce, while faculty can leverage AI to enhance teaching and provide personalized learning experiences.",
  },
  {
    q: "Is AI allowed at Green River College?",
    a: "Yes, AI tools are allowed at Green River College, but their use depends on your instructor and course requirements. Always check your course syllabus for specific AI policies, as they may vary between classes. When in doubt, ask your instructor directly about their expectations regarding AI use in assignments and coursework.",
  },
  {
    q: "Why is GRC focusing on AI now?",
    a: "Green River College is focusing on AI to ensure our community is future-ready. The college's AI Task Force is working to develop guidelines that promote digital literacy and responsible AI use. By addressing AI now, GRC is preparing students for a workforce where AI skills are increasingly valuable while helping faculty integrate these tools effectively into their teaching practices.",
  },
  {
    q: "What is the AI Assessment Scale?",
    a: "The AI Assessment Scale is a 5-level framework that helps faculty communicate how much AI use is permitted in each assignment. Level 1 means no AI use allowed, while Level 5 encourages creative AI exploration. Each level provides clear guidelines so students know exactly what's expected. Check your syllabus to see which levels apply to your coursework.",
  },
  {
    q: "What AI tools does GRC recommend?",
    a: "The AI Task Force curates a directory of 80+ AI tools across categories like writing, research, teaching, accessibility, and multimedia. Popular options include ChatGPT, Claude, Gemini, Grammarly, Perplexity, and NotebookLM. Visit the AI Playground page for the full directory with descriptions, pricing, and recommended use cases.",
  },
];

const studentFaqs: Faq[] = [
  {
    q: "Can I use AI for my assignments?",
    a: "It depends on your instructor's AI policy. Check your syllabus for the AI Assessment Scale level assigned to each activity. Level 1 means no AI at all, Level 2 allows AI for planning only, Level 3 permits AI collaboration on drafts, Level 4 allows extensive AI use, and Level 5 encourages creative AI exploration. Different assignments within the same course may have different levels.",
  },
  {
    q: "Do I need to cite AI tools?",
    a: "Yes. When AI use is permitted, you should always disclose which tools you used and how. Your instructor may have specific citation requirements. A good practice is to note the AI tool name, the date you used it, a summary of what you asked it to do, and how you modified or built upon its output.",
  },
  {
    q: "What can I use AI for ethically?",
    a: "When permitted by your instructor, you can use AI to brainstorm ideas, explain difficult concepts in simpler terms, polish grammar and sentence structure, create study materials like flashcards and practice questions, and get feedback on drafts. The key is to use AI as a learning supplement, not a replacement for your own thinking and effort.",
  },
  {
    q: "What should I NOT do with AI?",
    a: "Never copy AI-generated text and submit it as your own work (unless explicitly allowed), fabricate discussion posts or forum replies with AI, assume AI output is accurate without verifying it, or upload private information like student IDs or personal data into AI tools. Always check your syllabus and ask your instructor if you're unsure.",
  },
  {
    q: "Can AI detectors tell if I used AI?",
    a: "AI detection tools are unreliable and can produce false positives — flagging human-written text as AI-generated. GRC does not recommend relying solely on AI detectors. Instead, the focus is on transparency: if you used AI, disclose it. Being honest about your AI use is always the best approach.",
  },
];

const facultyFaqs: Faq[] = [
  {
    q: "How should I set AI policies for my courses?",
    a: "Use the AI Assessment Scale to set clear expectations for each assignment. Include AI policy language in your syllabus — the Syllabus Statement Toolkit provides ready-to-use templates for each level. You can set different levels for different assignments. The key is clarity: students should always know what's expected.",
  },
  {
    q: "What are the guiding principles for faculty AI use?",
    a: "Five principles guide faculty AI integration at GRC: (1) Student-Centered — prioritize learning outcomes in all AI decisions, (2) Academic Integrity — maintain high standards of honesty and fairness, (3) Transparency — clearly communicate how AI is used in course materials, (4) Equity & Inclusion — ensure AI supports all students and address biases, (5) Faculty Autonomy — respect faculty expertise in how AI is integrated into their courses.",
  },
  {
    q: "How can AI help with course design?",
    a: "AI can assist with generating weekly overviews, drafting measurable learning objectives, designing Canvas home pages, building course shells, creating rubrics, and developing assessment criteria. Use AI as a starting point and always review and customize the output to match your teaching style and course goals.",
  },
  {
    q: "Should I use AI detection tools on student work?",
    a: "GRC recommends against relying solely on AI detection tools, as they are unreliable and can falsely flag student work. Instead, focus on designing assessments that demonstrate authentic learning — such as process-based assignments, reflective components, in-class demonstrations, and portfolios that show growth over time.",
  },
  {
    q: "What privacy guidelines should I follow?",
    a: "Never input student names, IDs, or grades into public AI tools. Use institution-approved AI tools when working with student data. Inform students when AI is used to generate or evaluate course materials. Review AI-generated content for accuracy before sharing. Avoid requiring students to use AI tools that collect personal data without offering alternatives.",
  },
];

const policyFaqs: Faq[] = [
  {
    q: "Does GRC have an official AI policy?",
    a: "GRC's AI Task Force has developed a framework centered on the AI Assessment Scale, which gives faculty the flexibility to set course-specific AI policies. Rather than a blanket ban or blanket permission, this approach recognizes that appropriate AI use varies by discipline, assignment, and learning objective.",
  },
  {
    q: "Is using AI considered academic dishonesty?",
    a: "Not necessarily. AI use is only problematic when it violates the specific policy set by your instructor. If your syllabus states an assignment is Level 1 (No AI) and you use AI, that could be considered a violation of academic integrity. Always check your assignment's AI level and follow the stated guidelines.",
  },
  {
    q: "What are the ethical considerations for AI in education?",
    a: "Key ethical considerations include: acknowledging AI's limitations (bias, inaccuracy, hallucinations), ensuring AI supports rather than replaces human connection in teaching, considering equity implications for students with varying access to technology, modeling critical evaluation of AI outputs, and avoiding AI in high-stakes assessment without human oversight.",
  },
  {
    q: "How does FERPA apply to AI tool usage?",
    a: "FERPA protects student education records. When using AI tools, never input personally identifiable information (PII) such as student names, IDs, grades, or any FERPA-protected data. Use only institution-approved tools for student-data workflows. If a tool's data practices are unclear, do not use it with student information.",
  },
  {
    q: "What about AI bias and fairness?",
    a: "AI models can reflect and amplify societal biases present in their training data. Faculty should review AI-generated content for stereotypes, underrepresentation, and cultural assumptions. Use diverse sources to validate AI outputs. Ensure AI-generated materials reflect inclusive practices and do not disadvantage any student group.",
  },
];

const toolFaqs: Faq[] = [
  {
    q: "Which AI tools are free for students?",
    a: "Many AI tools offer free tiers: ChatGPT (free with GPT-4o mini), Claude (free tier), Gemini (free with Google account), Microsoft Copilot (free), Perplexity (free searches), Grammarly (free basic), and Canva AI (free with education account). The AI Playground page has full pricing details for 80+ tools.",
  },
  {
    q: "What is the AI Playground?",
    a: "The AI Playground is GRC's curated directory of 80+ AI tools organized across categories like Generative AI, Writing, Teaching, Research, Accessibility, Productivity, Multimedia, and Presentations. Each tool listing includes a description, recommended use cases, and pricing. It's your starting point for exploring AI tools.",
  },
  {
    q: "Does GRC have custom AI tools?",
    a: "Yes! The AI Task Force has developed custom GPTs purpose-built for GRC needs. These include tools for syllabus design, assignment rubric creation, and more. Visit the Custom GPTs & Tools toolkit to explore what's available and how to use them.",
  },
  {
    q: "How do I get started with AI tools?",
    a: "Start by exploring the AI Playground to find tools relevant to your needs. Read the best practices for your role (student, faculty, or staff). Try a free tool like ChatGPT or Claude for basic tasks. Remember to always verify AI outputs, protect your privacy, and follow your course's AI policy.",
  },
];

const staffFaqs: Faq[] = [
  {
    q: "Can staff use AI tools for administrative workflows?",
    a: "Yes, staff may use approved AI tools to streamline administrative tasks such as drafting communications, summarizing reports, and organizing data. Always follow institutional guidelines, avoid inputting sensitive or FERPA-protected data into public AI tools, and use institution-approved platforms when handling student or personnel records.",
  },
  {
    q: "What FERPA considerations apply to staff using AI?",
    a: "FERPA applies whenever you handle student education records. Never paste student names, IDs, grades, enrollment data, or disciplinary records into public AI tools like ChatGPT or Claude. Use only institution-approved, FERPA-compliant platforms for any workflow involving student information. When in doubt, consult your supervisor or the Registrar's office.",
  },
  {
    q: "How should staff handle AI-generated content in official communications?",
    a: "AI-generated content used in official college communications should always be reviewed for accuracy, tone, and alignment with institutional messaging. Staff should verify facts, check links, and ensure the content meets accessibility standards before publishing. Disclose AI use when appropriate, especially in public-facing materials.",
  },
  {
    q: "What AI tools are approved for institutional use?",
    a: "The AI Task Force maintains a list of reviewed and approved AI tools. For sensitive data workflows, use only tools that have been vetted by IT and comply with the college's data governance policies. The AI Playground page lists recommended tools, but always confirm with your department before using a new tool with institutional data.",
  },
];

interface FaqSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  faqs: Faq[];
  decorativeImage: string;
}

const allSections: FaqSection[] = [
  {
    id: "general",
    title: "General Questions",
    icon: "01",
    color: "bg-gator-green/10 text-gator-green",
    borderColor: "border-l-gator-green",
    bgGradient: "from-gator-green/5 to-transparent",
    faqs: generalFaqs,
    decorativeImage: "/images/campus-entrance.jpg",
  },
  {
    id: "student",
    title: "Student Questions",
    icon: "02",
    color: "bg-sky-blue/10 text-sky-blue",
    borderColor: "border-l-sky-blue",
    bgGradient: "from-sky-blue/5 to-transparent",
    faqs: studentFaqs,
    decorativeImage: "/images/graduation.jpg",
  },
  {
    id: "faculty",
    title: "Faculty & Teaching",
    icon: "03",
    color: "bg-ever-green/10 text-ever-green",
    borderColor: "border-l-ever-green",
    bgGradient: "from-ever-green/5 to-transparent",
    faqs: facultyFaqs,
    decorativeImage: "/images/tech-center.jpg",
  },
  {
    id: "policy",
    title: "Policy & Ethics",
    icon: "04",
    color: "bg-sunrise-orange/10 text-sunrise-orange",
    borderColor: "border-l-sunrise-orange",
    bgGradient: "from-sunrise-orange/5 to-transparent",
    faqs: policyFaqs,
    decorativeImage: "/images/campus-sculpture.jpg",
  },
  {
    id: "tools",
    title: "Tool Support",
    icon: "05",
    color: "bg-leaf-green/15 text-grc-green",
    borderColor: "border-l-grc-green",
    bgGradient: "from-leaf-green/5 to-transparent",
    faqs: toolFaqs,
    decorativeImage: "/images/campus-garden.jpg",
  },
  {
    id: "staff-ops",
    title: "Staff Operations",
    icon: "06",
    color: "bg-pine-cone/10 text-pine-cone",
    borderColor: "border-l-pine-cone",
    bgGradient: "from-pine-cone/5 to-transparent",
    faqs: staffFaqs,
    decorativeImage: "/images/campus-illustration.jpg",
  },
];

function getSectionsForAudience(audience: Audience): FaqSection[] {
  const byId = (id: string) => allSections.find((s) => s.id === id)!;

  switch (audience) {
    case "student":
      return [byId("student"), byId("general"), byId("tools")];
    case "faculty":
      return [
        byId("faculty"),
        byId("policy"),
        byId("general"),
        byId("tools"),
      ];
    case "staff":
      return [
        byId("general"),
        byId("policy"),
        byId("tools"),
        byId("staff-ops"),
      ];
    default:
      return allSections.filter((s) => s.id !== "staff-ops");
  }
}

function getBanner(audience: Audience): {
  text: string;
  badge: string;
  badgeColor: string;
  gradient: string;
} {
  switch (audience) {
    case "student":
      return {
        text: "Got a question about using AI in your classes? Start here.",
        badge: "For Students",
        badgeColor: "bg-sky-blue/10 text-sky-blue",
        gradient: "from-sky-blue/20 via-sky-blue/5 to-transparent",
      };
    case "faculty":
      return {
        text: "Find answers about AI policies, assessment, and teaching strategies.",
        badge: "For Faculty",
        badgeColor: "bg-gator-green/10 text-gator-green",
        gradient: "from-ever-green/20 via-ever-green/5 to-transparent",
      };
    case "staff":
      return {
        text: "Answers to common questions about AI tools, privacy, and institutional policies.",
        badge: "For Staff",
        badgeColor: "bg-sunrise-orange/10 text-sunrise-orange",
        gradient: "from-sunrise-orange/20 via-sunrise-orange/5 to-transparent",
      };
    default:
      return {
        text: "Your guide to understanding and using AI responsibly at Green River College.",
        badge: "Help",
        badgeColor: "bg-gator-green/10 text-gator-green",
        gradient: "from-gator-green/10 via-gator-green/5 to-transparent",
      };
  }
}

function getCtaContent(audience: Audience) {
  switch (audience) {
    case "student":
      return {
        heading: "Need more help with AI in your classes?",
        description:
          "Check out the AI Playground for tools, or reach out to your instructor.",
        links: [
          { href: "/playground", label: "AI Playground" },
          { href: "/feedback", label: "Ask a Question" },
        ],
      };
    case "faculty":
      return {
        heading: "Want to integrate AI into your teaching?",
        description:
          "Explore toolkits, syllabus templates, and the full AI directory.",
        links: [
          { href: "/toolkits", label: "Explore Toolkits" },
          { href: "/feedback", label: "Contact the Task Force" },
        ],
      };
    case "staff":
      return {
        heading: "Questions about institutional AI policies?",
        description:
          "Reach out to the AI Task Force or review the approved tools directory.",
        links: [
          { href: "/playground", label: "Approved Tools" },
          { href: "/feedback", label: "Contact Us" },
        ],
      };
    default:
      return {
        heading: "Still have questions?",
        description: "Reach out to the AI Task Force — we're here to help.",
        links: [
          { href: "/feedback", label: "Contact Us" },
          { href: "/playground", label: "AI Playground" },
        ],
      };
  }
}

export default function FaqsPage() {
  const { audience } = useAudience();
  const sections = useMemo(() => getSectionsForAudience(audience), [audience]);
  const banner = useMemo(() => getBanner(audience), [audience]);
  const cta = useMemo(() => getCtaContent(audience), [audience]);

  const faqSchema = useMemo(() => {
    const allFaqs = sections.flatMap((s) => s.faqs);
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    });
  }, [sections]);

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        {/* Hero / Banner */}
        <div className="relative overflow-hidden rounded-3xl mb-14">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${banner.gradient}`}
          />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gator-green/[0.03] blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-60 w-60 rounded-full bg-sky-blue/[0.04] blur-2xl" />
          <div className="relative flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:gap-12">
            <div className="flex-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`mb-4 inline-flex items-center gap-2 rounded-pill px-3.5 py-1 font-body text-sm font-bold uppercase tracking-[0.12em] ${banner.badgeColor}`}
              >
                {banner.badge}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-title font-heading font-extrabold text-pine-cone"
              >
                Frequently Asked Questions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 max-w-2xl text-subtitle font-body text-pine-cone/60"
              >
                {banner.text}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="relative hidden lg:block h-48 w-64 shrink-0 overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/campus-entrance.jpg"
                alt="Green River College campus"
                fill
                className="object-cover"
                sizes="256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ever-green/30 to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* Category Jump Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`inline-flex items-center rounded-pill px-4 py-2 font-body text-sm font-semibold transition-all hover:scale-105 ${section.color}`}
            >
              {section.title}
            </a>
          ))}
        </motion.div>

        {/* FAQ Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={audience ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {sections.map((section, sectionIdx) => (
              <motion.div
                key={section.id}
                id={section.id}
                className="mt-14 scroll-mt-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springDefault, delay: 0.1 * sectionIdx }}
              >
                {/* Section Header */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-heading text-5xl font-black text-ever-green/[0.06] leading-none select-none">
                    {section.icon}
                  </span>
                  <div className="flex flex-1 items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-xl px-3.5 py-1.5 font-body text-sm font-bold ${section.color}`}
                    >
                      {section.title}
                    </span>
                    <div className="h-px flex-1 bg-ever-green/[0.06]" />
                  </div>
                  <div className="relative hidden sm:block h-10 w-10 overflow-hidden rounded-lg opacity-40">
                    <Image
                      src={section.decorativeImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40px"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* FAQ Items */}
                <Accordion
                  items={section.faqs.map((f) => ({ question: f.q, answer: f.a }))}
                  defaultOpen={sectionIdx === 0 && audience ? 0 : undefined}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="divider-glow mt-16" />

        {/* Quick Tips */}
        <div className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-pine-cone">
            Quick Tips for AI Use
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="card-accent-green rounded-3xl p-8"
            >
              <span className="inline-flex items-center rounded-lg bg-gator-green/10 px-2.5 py-1 font-body text-xs font-bold uppercase tracking-wider text-gator-green">
                Do
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-ever-green">
                Ask Your Instructor
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                When in doubt about AI use, always check with your instructor
                first. Every course has its own AI policy.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-accent-orange rounded-3xl p-8"
            >
              <span className="inline-flex items-center rounded-lg bg-sunrise-orange/10 px-2.5 py-1 font-body text-xs font-bold uppercase tracking-wider text-sunrise-orange">
                Don&apos;t
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-ever-green">
                Complete Full Assignments
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                Never use AI to complete entire assignments unless explicitly
                allowed by your instructor at Level 4 or 5.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-accent-blue rounded-3xl p-8"
            >
              <span className="inline-flex items-center rounded-lg bg-sky-blue/10 px-2.5 py-1 font-body text-xs font-bold uppercase tracking-wider text-sky-blue">
                Do
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-ever-green">
                Use AI Ethically
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">
                Brainstorm, revise, or practice concepts with AI as a learning
                supplement. Always be transparent about your use.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA — audience-specific */}
        <div className="mt-14 card-feature rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-heading text-xl font-bold text-white">
                {cta.heading}
              </h3>
              <p className="mt-2 font-body text-base text-white/60">
                {cta.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {cta.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-white/20"
                >
                  {link.label}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
