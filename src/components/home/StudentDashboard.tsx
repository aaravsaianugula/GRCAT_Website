"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { PageTransition } from "@/components/shared/PageTransition";
import { stagger, fadeUp, springDefault } from "@/lib/animations/motion";
import { OrganicBlob } from "@/components/shared/OrganicBlob";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { TestimonialCarousel } from "@/components/shared/TestimonialCarousel";

export function StudentDashboard() {
  return (
    <PageTransition>
      <HeroSection
        accent="Student Resources"
        accentColor="bg-sky-blue/15 text-sky-blue"
        title="Navigate AI in Your Coursework"
        subtitle="Check your syllabus for your instructor's AI policy, then explore tools and best practices for using AI responsibly."
        audience="student"
        dataAiId="student-hero"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/assessment-scale"
            className="group flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 font-body text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15"
          >
            Check AI Assessment Scale
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
            href="/playground"
            className="rounded-xl border border-white/10 px-5 py-2.5 font-body text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
          >
            Explore AI Tools
          </Link>
        </div>
      </HeroSection>

      {/* Warning Banner */}
      <div className="border-b border-sunrise-orange/15 bg-sunrise-orange/[0.04]">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 lg:px-8">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sunrise-orange/15">
            <svg
              className="h-4 w-4 text-sunrise-orange"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <p className="font-body text-sm text-pine-cone/80">
            <strong className="font-semibold text-sunrise-orange">
              Always check your syllabus first.
            </strong>{" "}
            Each instructor sets their own AI policy using the{" "}
            <Link
              href="/assessment-scale"
              className="font-semibold text-sky-blue underline-offset-2 hover:underline"
            >
              AI Assessment Scale
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Bento Grid Section */}
      <section className="relative overflow-hidden bg-surface-dim py-16 sm:py-24">
        <OrganicBlob color="bg-sky-blue" size="lg" position="right-[-10%] top-[10%]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springDefault}
            className="mb-12"
          >
            <div className="mb-4 h-1 w-12 rounded-full bg-sky-blue" />
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-pine-cone sm:text-5xl">
              Your AI Toolkit
            </h2>
            <p className="mt-4 max-w-md font-body text-lg text-pine-cone/70">
              Resources curated for students to use AI responsibly.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            data-ai-id="student-tools"
          >
            {/* Featured card — AI Assessment Scale */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <Link
                href="/assessment-scale"
                className="card-feature group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-all duration-400 bento-card-hover hover:shadow-elevated sm:p-10"
              >
                <div className="relative z-10 flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-pill bg-gator-green/25 px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-gator-green">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gator-green opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-gator-green" />
                      </span>
                      Start Here
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-white">
                      AI Assessment Scale
                    </h3>
                    <p className="mt-3 max-w-sm font-body text-base leading-relaxed text-white/70">
                      Your instructor uses 5 levels to define how much AI you
                      can use. Level 1 means no AI; Level 5 means full AI
                      partnership. Always check your syllabus.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-gator-green">
                      Learn the levels
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {[
                      { n: 1, color: "border-red-400/30 text-red-300" },
                      { n: 2, color: "border-orange-400/30 text-orange-300" },
                      { n: 3, color: "border-yellow-400/30 text-yellow-300" },
                      { n: 4, color: "border-sky-300/30 text-sky-300" },
                      { n: 5, color: "border-green-400/30 text-green-300" },
                    ].map((level) => (
                      <div
                        key={level.n}
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 bg-white/5 font-heading text-lg font-black transition-all group-hover:bg-white/10 ${level.color}`}
                      >
                        {level.n}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Best Practices */}
            <motion.div variants={fadeUp}>
              <Link
                href="/best-practices/students"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-gator-green/15 bg-white transition-all duration-300 bento-card-hover hover:border-gator-green/30 hover:shadow-elevated"
              >
                <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-gator-green/10 to-gator-green/5">
                  <Image
                    src="/images/campus-garden.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gator-green/10">
                    <svg
                      className="h-5 w-5 text-gator-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-ever-green">
                    Student Best Practices
                  </h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                    Do&apos;s and don&apos;ts for ethical AI use — brainstorming,
                    drafting, citing, and submitting.
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* AI Playground */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <Link
                href="/playground"
                className="group flex h-full overflow-hidden rounded-3xl border-2 border-sky-blue/15 bg-white transition-all duration-300 bento-card-hover hover:border-sky-blue/30 hover:shadow-elevated"
              >
                <div className="flex flex-1 flex-col p-8">
                  <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-pill bg-sky-blue/10 px-2.5 py-0.5 font-body text-xs font-bold uppercase tracking-wider text-sky-blue">
                    80+ Tools
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-pine-cone">
                    AI Playground
                  </h3>
                  <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-pine-cone/70">
                    Explore AI tools for writing, research, studying, and
                    creative projects — including ChatGPT, Grammarly, Gemini,
                    Canva AI, and many more.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "ChatGPT",
                      "Grammarly",
                      "Gemini",
                      "Canva AI",
                      "Perplexity",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="rounded-lg border border-ever-green/10 bg-ever-green/[0.04] px-2.5 py-1 font-body text-xs font-medium text-ever-green/70"
                      >
                        {tool}
                      </span>
                    ))}
                    <span className="rounded-lg border border-sky-blue/15 bg-sky-blue/5 px-2.5 py-1 font-body text-xs font-bold text-sky-blue">
                      +75 more
                    </span>
                  </div>
                </div>
                <div className="relative hidden w-48 overflow-hidden sm:block">
                  <Image
                    src="/images/campus-illustration.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 0vw, 192px"
                    className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                </div>
              </Link>
            </motion.div>

            {/* FAQs */}
            <motion.div variants={fadeUp}>
              <Link
                href="/faqs"
                className="group flex h-full flex-col rounded-3xl border-2 border-sunrise-orange/15 bg-white p-6 transition-all duration-300 bento-card-hover hover:border-sunrise-orange/30 hover:shadow-elevated"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sunrise-orange/10">
                  <svg
                    className="h-5 w-5 text-sunrise-orange"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-ever-green">
                  Student FAQs
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                  Can I use AI for homework? How do I cite it? Common questions
                  answered.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-sunrise-orange">
                  Read FAQs
                  <svg
                    className="h-3.5 w-3.5"
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
                </span>
              </Link>
            </motion.div>

            {/* Ethics & Privacy */}
            <motion.div variants={fadeUp}>
              <Link
                href="/toolkits/ethics-privacy"
                className="group flex h-full flex-col rounded-3xl border-2 border-ever-green/15 bg-white p-6 transition-all duration-300 bento-card-hover hover:border-ever-green/30 hover:shadow-elevated"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ever-green/10">
                  <svg
                    className="h-5 w-5 text-ever-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-ever-green">
                  AI Ethics & Privacy
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                  Protect your data, understand bias, and use AI tools with
                  integrity.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-ever-green">
                  View toolkit
                  <svg
                    className="h-3.5 w-3.5"
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
                </span>
              </Link>
            </motion.div>

            {/* Prompting Toolkit */}
            <motion.div variants={fadeUp}>
              <Link
                href="/toolkits/prompting"
                className="group flex h-full flex-col rounded-3xl border-2 border-sky-blue/15 bg-white p-6 transition-all duration-300 bento-card-hover hover:border-sky-blue/30 hover:shadow-elevated"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-blue/10">
                  <svg
                    className="h-5 w-5 text-sky-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-ever-green">
                  Prompting Guide
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                  Write better prompts to get better AI results — templates and
                  before/after examples.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-sky-blue">
                  Learn prompting
                  <svg
                    className="h-3.5 w-3.5"
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
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Tools & Level Check */}
      <section className="border-t border-ever-green/[0.06] bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Top Free Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springDefault}
              className="rounded-3xl border border-ever-green/[0.06] bg-surface-dim p-8"
            >
              <h3 className="font-heading text-xl font-bold text-pine-cone">Top Free AI Tools</h3>
              <p className="mt-2 font-body text-sm text-pine-cone/70">Popular tools to get started — all have free tiers.</p>
              <div className="mt-6 space-y-3">
                {[
                  { name: "ChatGPT", tip: "Brainstorming & explanations", url: "https://chat.openai.com" },
                  { name: "Grammarly", tip: "Grammar & tone", url: "https://www.grammarly.com" },
                  { name: "Canva AI", tip: "Presentations & design", url: "https://www.canva.com" },
                  { name: "Quillbot", tip: "Paraphrasing & summarizing", url: "https://quillbot.com" },
                  { name: "Microsoft Copilot", tip: "Office documents", url: "https://copilot.microsoft.com" },
                ].map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-ever-green/[0.06] bg-white px-5 py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <div>
                      <span className="font-heading text-sm font-bold text-ever-green">{tool.name}</span>
                      <span className="ml-2 font-body text-xs text-pine-cone/70">{tool.tip}</span>
                    </div>
                    <svg className="h-4 w-4 shrink-0 text-pine-cone/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ))}
              </div>
              <Link
                href="/playground"
                className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-sky-blue transition-colors hover:text-ever-green"
              >
                Browse all 80+ tools
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>

            {/* What AI Level is My Assignment? */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springDefault, delay: 0.1 }}
              className="rounded-3xl border border-sky-blue/15 bg-sky-blue/5 p-8"
              data-ai-id="student-scale-ref"
            >
              <h3 className="font-heading text-xl font-bold text-pine-cone">What AI Level is My Assignment?</h3>
              <p className="mt-2 font-body text-sm text-pine-cone/70">Quick reference to understand what each level means for you.</p>
              <div className="mt-6 space-y-3">
                {[
                  { level: "1", name: "No AI", color: "bg-red-500/10 text-red-600 border-red-500/20", desc: "Do everything yourself — no AI at all" },
                  { level: "2", name: "Planning", color: "bg-orange-500/10 text-orange-600 border-orange-500/20", desc: "AI for brainstorming only, write it yourself" },
                  { level: "3", name: "Collaboration", color: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20", desc: "Use AI for drafts/feedback, but revise & improve" },
                  { level: "4", name: "Integration", color: "bg-sky-blue/10 text-sky-blue border-sky-blue/20", desc: "Use AI freely — show your prompt skills" },
                  { level: "5", name: "Exploration", color: "bg-gator-green/10 text-gator-green border-gator-green/20", desc: "Get creative — push AI to its limits" },
                ].map((item) => (
                  <Link
                    key={item.level}
                    href={`/assessment-scale/${item.level}`}
                    className="flex items-center gap-4 rounded-2xl border border-ever-green/[0.06] bg-white px-5 py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border font-heading text-sm font-black ${item.color}`}>
                      {item.level}
                    </span>
                    <div className="min-w-0">
                      <span className="font-heading text-sm font-bold text-ever-green">{item.name}</span>
                      <p className="font-body text-xs text-pine-cone/70">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/assessment-scale"
                className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-sky-blue transition-colors hover:text-ever-green"
              >
                Full Assessment Scale details
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="border-t border-ever-green/[0.06] bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Link
            href="/quiz"
            className="group flex items-center justify-between rounded-3xl border-2 border-sky-blue/15 bg-sky-blue/5 p-8 bento-card-hover sm:p-10"
          >
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-pill bg-sky-blue/10 px-2.5 py-0.5 font-body text-xs font-bold uppercase tracking-wider text-sky-blue">
                Interactive Quiz
              </span>
              <h3 className="font-heading text-2xl font-bold text-pine-cone">
                Take the Quiz
              </h3>
              <p className="mt-2 max-w-sm font-body text-sm text-pine-cone/70">
                6 quick questions to discover your AI comfort level and match it
                to the Assessment Scale.
              </p>
            </div>
            <svg className="h-8 w-8 shrink-0 text-sky-blue transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-ever-green/[0.06] bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-8 font-heading text-2xl font-bold text-pine-cone">
              What Students Are Saying
            </h2>
            <TestimonialCarousel audience="student" />
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-ever-green/[0.06] bg-surface-dim py-14">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-pine-cone">
            Need help or have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-base text-pine-cone/70">
            Check out our FAQs or send us feedback — we&apos;re here to help you
            succeed with AI.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 rounded-xl bg-ever-green px-5 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-grc-green"
            >
              View FAQs
            </Link>
            <Link
              href="/feedback"
              className="inline-flex items-center gap-2 rounded-xl border border-ever-green/15 px-5 py-2.5 font-body text-sm font-semibold text-ever-green transition-all hover:bg-ever-green/5"
            >
              Give Feedback
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
