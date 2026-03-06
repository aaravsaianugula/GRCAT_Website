"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAudience, type Audience } from "@/contexts/AudienceContext";
import { PageTransition } from "@/components/shared/PageTransition";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* ─── Toolkit Data ─── */

interface ToolkitHighlight {
  label: string;
  icon: string; // emoji
}

interface Toolkit {
  slug: string;
  name: string;
  shortName: string;
  desc: string;
  color: string;
  borderColor: string;
  accentBg: string;
  badgeColor: string;
  icon: string;
  image: string;
  resourceCount: number;
  highlights: ToolkitHighlight[];
  /** Per-audience "why this matters" blurb */
  audienceBlurbs: Record<string, string>;
  /** Key items preview */
  previewItems: string[];
}

const toolkits: Record<string, Toolkit> = {
  syllabus: {
    slug: "syllabus",
    name: "Syllabus Statement Toolkit",
    shortName: "Syllabus Statements",
    desc: "Ready-to-use AI policy language for every assessment level. Copy, customize, and add to your syllabus in minutes.",
    color: "text-gator-green",
    borderColor: "border-gator-green/15",
    accentBg: "bg-gator-green/5",
    badgeColor: "bg-gator-green/10 text-gator-green border-gator-green/20",
    icon: "📜",
    image: "/images/tech-center.jpg",
    resourceCount: 8,
    highlights: [
      { label: "5 Level Templates", icon: "📝" },
      { label: "Copy-Ready Language", icon: "📋" },
      { label: "Design Tips", icon: "💡" },
    ],
    audienceBlurbs: {
      student: "See the kind of AI policy language your instructors use — understanding these levels helps you know what's expected.",
      faculty: "Save hours drafting AI policies. Pick your assessment level, copy the statement, and customize it for your course.",
      staff: "Reference resource for understanding how faculty communicate AI policies across the institution.",
    },
    previewItems: [
      "Level 1: No AI — \"Complete all work without AI tools\"",
      "Level 3: Collaborative — \"You may use AI for support with attribution\"",
      "Level 5: Exploration — \"Use AI creatively to solve the task\"",
    ],
  },
  "student-language": {
    slug: "student-language",
    name: "Student-Facing Language Toolkit",
    shortName: "Student-Facing Language",
    desc: "Clear, accessible templates for communicating AI expectations directly to students — from syllabus add-ons to misuse conversation scripts.",
    color: "text-sky-blue",
    borderColor: "border-sky-blue/15",
    accentBg: "bg-sky-blue/5",
    badgeColor: "bg-sky-blue/10 text-sky-blue border-sky-blue/20",
    icon: "💬",
    image: "/images/campus-entrance.jpg",
    resourceCount: 6,
    highlights: [
      { label: "Syllabus Add-ons", icon: "📄" },
      { label: "Reflection Prompts", icon: "🪞" },
      { label: "Conversation Scripts", icon: "🗣" },
    ],
    audienceBlurbs: {
      student: "See how instructors frame AI expectations — these templates help you understand what's being asked of you.",
      faculty: "Save time explaining your AI policies. Get ready-made templates for Canvas, handouts, emails, and difficult conversations.",
      staff: "Useful reference for advising students or supporting faculty with AI policy communication.",
    },
    previewItems: [
      "Quick syllabus one-liners for each AI level",
      "Assignment-specific language templates for Canvas",
      "Misuse conversation starters with empathetic scripts",
    ],
  },
  "ethics-privacy": {
    slug: "ethics-privacy",
    name: "AI Ethics & Privacy Toolkit",
    shortName: "Ethics & Privacy",
    desc: "FERPA compliance guidelines, data handling best practices, bias awareness frameworks, and ethical decision-making tools.",
    color: "text-sunrise-orange",
    borderColor: "border-sunrise-orange/15",
    accentBg: "bg-sunrise-orange/5",
    badgeColor: "bg-sunrise-orange/10 text-sunrise-orange border-sunrise-orange/20",
    icon: "🛡",
    image: "/images/graduation.jpg",
    resourceCount: 12,
    highlights: [
      { label: "FERPA Guide", icon: "🔒" },
      { label: "Bias Frameworks", icon: "⚖" },
      { label: "Decision Journals", icon: "📓" },
    ],
    audienceBlurbs: {
      student: "Learn to protect your personal information and use AI ethically. Essential reading before using any AI tool.",
      faculty: "Ensure your AI integration meets FERPA requirements. Includes decision frameworks, attribution guidelines, and scenario walkthroughs.",
      staff: "Critical resource for FERPA-compliant AI use in operations. Covers data handling, vendor assessment, and ethics audit tools.",
    },
    previewItems: [
      "Bias & Fairness — identify and mitigate AI bias",
      "Attribution Guidelines — properly cite AI-generated content",
      "Data Privacy — protect personal and institutional data",
    ],
  },
  prompting: {
    slug: "prompting",
    name: "Prompting Toolkit",
    shortName: "Prompting",
    desc: "Master effective AI prompting — from lesson planning to email drafting. Includes templates, before/after makeovers, and external prompt libraries.",
    color: "text-gator-green",
    borderColor: "border-gator-green/15",
    accentBg: "bg-gator-green/5",
    badgeColor: "bg-gator-green/10 text-gator-green border-gator-green/20",
    icon: "✨",
    image: "/images/tech-center.jpg",
    resourceCount: 15,
    highlights: [
      { label: "5 Templates", icon: "📝" },
      { label: "4 Makeovers", icon: "🔄" },
      { label: "5 Prompt Libraries", icon: "📚" },
    ],
    audienceBlurbs: {
      student: "Learn to write better prompts for research, studying, and creative projects. See before/after examples that dramatically improve AI output.",
      faculty: "Ready-to-use prompt templates for lesson planning, assignment design, grading, and student engagement. Plus before/after makeovers.",
      staff: "Prompt templates for email drafting, report writing, data analysis, and operational tasks. Save hours on routine communications.",
    },
    previewItems: [
      "Lesson Planning — create 50-minute lesson plans",
      "Grading & Feedback — generate rubrics instantly",
      "Before/After Makeovers — see bad vs. good prompts",
    ],
  },
  "assessment-design": {
    slug: "assessment-design",
    name: "AI-Enhanced Assessment Toolkit",
    shortName: "Assessment Design",
    desc: "Redesign assignments for an AI world — from AI-proof exams to AI-enhanced capstones. Includes templates, rubrics, and real assignment examples.",
    color: "text-sky-blue",
    borderColor: "border-sky-blue/15",
    accentBg: "bg-sky-blue/5",
    badgeColor: "bg-sky-blue/10 text-sky-blue border-sky-blue/20",
    icon: "🎯",
    image: "/images/campus-entrance.jpg",
    resourceCount: 10,
    highlights: [
      { label: "Assignment Examples", icon: "📄" },
      { label: "Rubric Templates", icon: "📊" },
      { label: "Reflection Prompts", icon: "🪞" },
    ],
    audienceBlurbs: {
      student: "Understand how instructors design AI-integrated assignments — and what they're looking for in your work.",
      faculty: "Complete toolkit for designing assignments at every AI level. Real examples across disciplines, rubric templates, and reflection activities.",
      staff: "Reference for understanding how faculty are redesigning assessment in an AI-integrated curriculum.",
    },
    previewItems: [
      "Level 1: Reflective essays, oral exams, live presentations",
      "Level 3: Research proposals, lab reports with AI review",
      "Level 5: AI remix projects, speculative fiction, tool comparisons",
    ],
  },
  "custom-gpts": {
    slug: "custom-gpts",
    name: "GRC Custom GPTs & Tools",
    shortName: "Custom GPTs",
    desc: "Purpose-built AI tools created by the Task Force for specific GRC needs — from syllabus policy assistants to accessibility checkers.",
    color: "text-sunrise-orange",
    borderColor: "border-sunrise-orange/15",
    accentBg: "bg-sunrise-orange/5",
    badgeColor: "bg-sunrise-orange/10 text-sunrise-orange border-sunrise-orange/20",
    icon: "🤖",
    image: "/images/graduation.jpg",
    resourceCount: 5,
    highlights: [
      { label: "5 Custom GPTs", icon: "🤖" },
      { label: "Built for GRC", icon: "🏫" },
      { label: "Free to Use", icon: "✅" },
    ],
    audienceBlurbs: {
      student: "Try GRC's own AI tools — the Student Reflection Prompt Generator and Classroom Scenarios Generator were made for you.",
      faculty: "AI Policy Assistant builds syllabus language. Assignment Designer GPT aligns activities with AI levels. All free and GRC-specific.",
      staff: "Accessibility Checker GPT helps ensure FERPA-compliant, accessible content across institutional communications.",
    },
    previewItems: [
      "AI Policy Assistant — generate syllabus AI policies",
      "Assignment Designer GPT — align with AI assessment levels",
      "Accessibility Checker GPT — audit content for compliance",
    ],
  },
};

/* ─── Audience Configurations ─── */

interface AudienceConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroDesc: string;
  heroBadge: string;
  heroBadgeColor: string;
  /** Slug of the featured toolkit shown as a large card */
  featured: string;
  /** Slugs for the "Quick Start" flow */
  quickStart: { step: string; label: string; slug: string }[];
  /** Ordered toolkit slugs */
  order: string[];
  /** Badges to apply */
  badges: Record<string, { label: string; color: string }>;
  /** Bottom CTA */
  cta: { heading: string; desc: string; primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string };
}

const audienceConfigs: Record<NonNullable<Audience>, AudienceConfig> = {
  student: {
    heroTitle: "Your AI Toolkit",
    heroSubtitle: "Understand the Rules. Use AI Responsibly.",
    heroDesc: "Before you start using AI tools, understand what's allowed and how to use them ethically. These resources were curated by the Task Force to help you succeed.",
    heroBadge: "Student Resources",
    heroBadgeColor: "bg-sky-blue/10 text-sky-blue",
    featured: "ethics-privacy",
    quickStart: [
      { step: "1", label: "Check your syllabus AI level", slug: "syllabus" },
      { step: "2", label: "Learn ethical AI use", slug: "ethics-privacy" },
      { step: "3", label: "Master prompting", slug: "prompting" },
    ],
    order: ["ethics-privacy", "prompting", "custom-gpts", "student-language", "syllabus", "assessment-design"],
    badges: {
      syllabus: { label: "For Your Instructors", color: "bg-pine-cone/10 text-pine-cone/60 border-pine-cone/15" },
      "assessment-design": { label: "For Your Instructors", color: "bg-pine-cone/10 text-pine-cone/60 border-pine-cone/15" },
      "student-language": { label: "Understand Expectations", color: "bg-sky-blue/10 text-sky-blue border-sky-blue/20" },
    },
    cta: {
      heading: "Not sure which AI level your course uses?",
      desc: "Check your syllabus first, then explore the Assessment Scale to understand what each level means for your assignments.",
      primaryLabel: "View Assessment Scale",
      primaryHref: "/assessment-scale",
      secondaryLabel: "Student Best Practices",
      secondaryHref: "/best-practices/students",
    },
  },
  faculty: {
    heroTitle: "Faculty Toolkit Library",
    heroSubtitle: "Everything You Need to Integrate AI into Your Teaching",
    heroDesc: "From syllabus language to assignment design — comprehensive, copy-ready resources developed by the AI Task Force. Pick your level, grab your templates, and start integrating.",
    heroBadge: "Faculty Resources",
    heroBadgeColor: "bg-gator-green/10 text-gator-green",
    featured: "syllabus",
    quickStart: [
      { step: "1", label: "Choose your AI assessment level", slug: "syllabus" },
      { step: "2", label: "Design AI-ready assignments", slug: "assessment-design" },
      { step: "3", label: "Communicate to students", slug: "student-language" },
    ],
    order: ["syllabus", "assessment-design", "student-language", "prompting", "ethics-privacy", "custom-gpts"],
    badges: {
      syllabus: { label: "Start Here", color: "bg-gator-green/15 text-gator-green border-gator-green/25" },
      "assessment-design": { label: "Most Popular", color: "bg-gator-green/15 text-gator-green border-gator-green/25" },
      prompting: { label: "Save Hours", color: "bg-sky-blue/10 text-sky-blue border-sky-blue/20" },
    },
    cta: {
      heading: "Ready to set your AI assessment level?",
      desc: "The 5-Level Assessment Scale is the foundation for all these toolkits. Choose your level first, then grab the matching templates.",
      primaryLabel: "View Assessment Scale",
      primaryHref: "/assessment-scale",
      secondaryLabel: "Faculty Best Practices",
      secondaryHref: "/best-practices/faculty",
    },
  },
  staff: {
    heroTitle: "Staff AI Toolkit",
    heroSubtitle: "AI Tools for Operations & Efficiency",
    heroDesc: "Practical resources for using AI in daily operations — from email drafting to FERPA compliance. Everything vetted by the Task Force for institutional use.",
    heroBadge: "Staff Resources",
    heroBadgeColor: "bg-sunrise-orange/10 text-sunrise-orange",
    featured: "prompting",
    quickStart: [
      { step: "1", label: "Learn effective prompting", slug: "prompting" },
      { step: "2", label: "Ensure FERPA compliance", slug: "ethics-privacy" },
      { step: "3", label: "Try GRC's custom GPTs", slug: "custom-gpts" },
    ],
    order: ["prompting", "ethics-privacy", "custom-gpts", "syllabus", "student-language", "assessment-design"],
    badges: {
      prompting: { label: "Start Here", color: "bg-sunrise-orange/15 text-sunrise-orange border-sunrise-orange/25" },
      "ethics-privacy": { label: "FERPA Essential", color: "bg-sunrise-orange/15 text-sunrise-orange border-sunrise-orange/25" },
      syllabus: { label: "Academic Resource", color: "bg-pine-cone/10 text-pine-cone/60 border-pine-cone/15" },
      "student-language": { label: "Academic Resource", color: "bg-pine-cone/10 text-pine-cone/60 border-pine-cone/15" },
      "assessment-design": { label: "Academic Resource", color: "bg-pine-cone/10 text-pine-cone/60 border-pine-cone/15" },
    },
    cta: {
      heading: "Questions about AI in your department?",
      desc: "The Task Force is here to help with implementation guidance, training sessions, and FERPA compliance questions.",
      primaryLabel: "Contact the Task Force",
      primaryHref: "/feedback",
      secondaryLabel: "Staff Best Practices",
      secondaryHref: "/best-practices/staff",
    },
  },
};

const defaultConfig: AudienceConfig = {
  heroTitle: "Toolkit Library",
  heroSubtitle: "Practical Resources for Responsible AI Integration",
  heroDesc: "Comprehensive guides, templates, and frameworks developed by the AI Task Force. Choose your role above for personalized recommendations.",
  heroBadge: "Resources",
  heroBadgeColor: "bg-gator-green/10 text-gator-green",
  featured: "syllabus",
  quickStart: [
    { step: "1", label: "Explore syllabus templates", slug: "syllabus" },
    { step: "2", label: "Learn ethical AI use", slug: "ethics-privacy" },
    { step: "3", label: "Master prompting", slug: "prompting" },
  ],
  order: ["syllabus", "student-language", "ethics-privacy", "prompting", "assessment-design", "custom-gpts"],
  badges: {},
  cta: {
    heading: "Want personalized recommendations?",
    desc: "Choose your role using the audience selector in the header to get toolkit recommendations tailored to your needs.",
    primaryLabel: "View Assessment Scale",
    primaryHref: "/assessment-scale",
    secondaryLabel: "About the Task Force",
    secondaryHref: "/about",
  },
};

/* ─── Animation Variants ─── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

/* ─── Page Component ─── */

export default function ToolkitsPage() {
  const { audience } = useAudience();
  const config = audience ? audienceConfigs[audience] : defaultConfig;

  const featuredToolkit = toolkits[config.featured];
  const orderedToolkits = useMemo(
    () => config.order.filter((s) => s !== config.featured).map((s) => toolkits[s]),
    [config.order, config.featured],
  );

  return (
    <PageTransition>
      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-ever-green via-ever-green to-[#004d1a]">
        {/* Decorative campus photo overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/campus-entrance.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-15 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ever-green/80 via-ever-green/90 to-ever-green" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:px-8">
          <motion.div {...fadeUp}>
            <span className={`inline-flex items-center gap-2 rounded-pill px-3.5 py-1 font-body text-xs font-bold uppercase tracking-[0.12em] ${config.heroBadgeColor}`}>
              {config.heroBadge}
            </span>
            <h1 className="mt-5 font-heading text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              {config.heroTitle}
            </h1>
            <p className="mt-2 font-heading text-lg font-semibold text-white/70 sm:text-xl">
              {config.heroSubtitle}
            </p>
            <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-white/55 sm:text-lg">
              {config.heroDesc}
            </p>
          </motion.div>

          {/* Quick Start Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0"
          >
            {config.quickStart.map((qs, i) => (
              <div key={qs.slug} className="flex items-center gap-0">
                <Link
                  href={`/toolkits/${qs.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3.5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.12]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 font-heading text-sm font-extrabold text-white">
                    {qs.step}
                  </span>
                  <span className="font-body text-sm font-medium text-white/80 group-hover:text-white">
                    {qs.label}
                  </span>
                  <svg className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                {i < config.quickStart.length - 1 && (
                  <div className="mx-3 hidden h-px w-8 bg-white/20 sm:block" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-6"
          >
            {[
              { value: "6", label: "Toolkits" },
              { value: "56+", label: "Resources" },
              { value: "5", label: "AI Levels Covered" },
              { value: "5", label: "Custom GPTs" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-2xl font-extrabold text-white">{s.value}</p>
                <p className="font-body text-xs font-medium text-white/60">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Featured Toolkit (Large Card) ── */}
      <div className="bg-surface-dim">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="mb-6 font-body text-xs font-bold uppercase tracking-[0.15em] text-pine-cone/60">
              {audience ? `Recommended for ${audience === "faculty" ? "Faculty" : audience === "staff" ? "Staff" : "Students"}` : "Featured Toolkit"}
            </p>

            <Link
              href={`/toolkits/${featuredToolkit.slug}`}
              className="group block overflow-hidden rounded-3xl border-2 border-pine-cone/8 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image side */}
                <div className="relative h-56 w-full overflow-hidden lg:h-auto lg:w-2/5">
                  <Image
                    src={featuredToolkit.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white" />
                  {/* Floating badge */}
                  <div className="absolute left-5 top-5">
                    <span className="rounded-pill border bg-white/90 px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-pine-cone/70 backdrop-blur-sm">
                      {featuredToolkit.resourceCount} Resources
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div className="flex flex-1 flex-col p-8 sm:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-3xl">{featuredToolkit.icon}</span>
                    {config.badges[featuredToolkit.slug] && (
                      <span className={`rounded-pill border px-3 py-0.5 font-body text-xs font-bold uppercase tracking-wider ${config.badges[featuredToolkit.slug].color}`}>
                        {config.badges[featuredToolkit.slug].label}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-4 font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">
                    {featuredToolkit.name}
                  </h2>

                  <p className="mt-3 font-body text-base leading-relaxed text-pine-cone/60">
                    {audience ? featuredToolkit.audienceBlurbs[audience] : featuredToolkit.desc}
                  </p>

                  {/* Highlights */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredToolkit.highlights.map((h) => (
                      <span
                        key={h.label}
                        className={`rounded-lg border ${featuredToolkit.borderColor} ${featuredToolkit.accentBg} px-3 py-1.5 font-body text-xs font-semibold text-pine-cone/70`}
                      >
                        {h.icon} {h.label}
                      </span>
                    ))}
                  </div>

                  {/* Preview items */}
                  <div className="mt-5 space-y-2">
                    {featuredToolkit.previewItems.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gator-green" />
                        <span className="font-body text-sm text-pine-cone/70">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-ever-green px-5 py-2.5 font-body text-sm font-semibold text-white transition-all group-hover:bg-gator-green">
                      Explore This Toolkit
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── Toolkit Grid ── */}
          <ScrollReveal>
          <motion.div
            data-ai-id="toolkit-grid"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {orderedToolkits.map((tk) => {
              const badge = config.badges[tk.slug];
              const isAcademic = badge && (badge.label === "Academic Resource" || badge.label === "For Your Instructors");

              return (
                <motion.div key={tk.slug} variants={cardAnim} data-ai-id={`toolkit-${tk.slug}`}>
                  <Link
                    href={`/toolkits/${tk.slug}`}
                    className={`group flex h-full flex-col overflow-hidden rounded-3xl border-2 bg-white transition-all hover:-translate-y-1.5 hover:shadow-elevated ${
                      isAcademic ? "border-pine-cone/8 opacity-80 hover:opacity-100" : tk.borderColor
                    }`}
                  >
                    {/* Card header with image */}
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image
                        src={tk.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

                      {/* Icon + badges overlay */}
                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl drop-shadow-lg">{tk.icon}</span>
                          <span className="font-heading text-lg font-extrabold text-white drop-shadow-lg">
                            {tk.shortName}
                          </span>
                        </div>
                        {badge && (
                          <span className={`rounded-pill border px-2.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${badge.color}`}>
                            {badge.label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-body text-sm leading-relaxed text-pine-cone/60">
                        {audience ? tk.audienceBlurbs[audience] : tk.desc}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {tk.highlights.map((h) => (
                          <span
                            key={h.label}
                            className={`rounded-md border ${tk.borderColor} ${tk.accentBg} px-2 py-0.5 font-body text-[11px] font-semibold text-pine-cone/60`}
                          >
                            {h.icon} {h.label}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="mt-auto flex items-center justify-between pt-5">
                        <span className="font-body text-xs font-medium text-pine-cone/60">
                          {tk.resourceCount} resources
                        </span>
                        <span className={`inline-flex items-center gap-1.5 font-body text-sm font-semibold ${tk.color} transition-all group-hover:gap-2.5`}>
                          Explore
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
          </ScrollReveal>

          {/* ── Bottom CTA ── */}
          <ScrollReveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 rounded-3xl border-2 border-pine-cone/8 bg-white p-8 text-center sm:p-12"
          >
            <h2 className="font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">
              {config.cta.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-base text-pine-cone/70">
              {config.cta.desc}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={config.cta.primaryHref}
                className="inline-flex items-center gap-2 rounded-xl bg-ever-green px-6 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-gator-green"
              >
                {config.cta.primaryLabel}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href={config.cta.secondaryHref}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-pine-cone/10 px-6 py-3 font-body text-sm font-semibold text-pine-cone/60 transition-all hover:border-pine-cone/20 hover:text-pine-cone"
              >
                {config.cta.secondaryLabel}
              </Link>
            </div>
          </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
