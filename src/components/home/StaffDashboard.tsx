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

export function StaffDashboard() {
  return (
    <PageTransition>
      <HeroSection
        accent="Staff & Administration"
        accentColor="bg-sunrise-orange/15 text-sunrise-orange"
        title="AI for Operations"
        subtitle="Streamline workflows, improve communications, and adopt AI responsibly with resources designed for GRC staff."
        audience="staff"
        dataAiId="staff-hero"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/best-practices/staff"
            className="group flex items-center gap-2 rounded-xl bg-sunrise-orange px-5 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-sunrise-orange/90"
          >
            Staff Best Practices
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link
            href="/toolkits/prompting"
            className="rounded-xl border border-white/10 px-5 py-2.5 font-body text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
          >
            Prompting Toolkit
          </Link>
        </div>
      </HeroSection>

      {/* FERPA Banner */}
      <div className="border-b border-sky-blue/15 bg-sky-blue/[0.04]">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 lg:px-8">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-blue/15">
            <svg
              className="h-4 w-4 text-sky-blue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
          <p className="font-body text-sm text-pine-cone/80">
            <strong className="font-semibold text-sky-blue">
              FERPA & Data Privacy:
            </strong>{" "}
            Never enter student records or PII into AI tools. Review our{" "}
            <Link
              href="/toolkits/ethics-privacy"
              className="font-semibold text-sky-blue underline-offset-2 hover:underline"
            >
              Ethics & Privacy Toolkit
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Bento Grid Section */}
      <section className="relative overflow-hidden bg-surface-dim py-16 sm:py-24">
        <OrganicBlob color="bg-sunrise-orange" size="lg" position="right-[-10%] top-[15%]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springDefault}
            className="mb-12"
          >
            <div className="mb-4 h-1 w-12 rounded-full bg-sunrise-orange" />
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-pine-cone sm:text-5xl">
              AI for Your Work
            </h2>
            <p className="mt-4 max-w-md font-body text-lg text-pine-cone/70">
              Practical resources for administrative and operational workflows.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            data-ai-id="staff-tools"
          >
            {/* Featured card — Staff Best Practices */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <Link
                href="/best-practices/staff"
                className="card-feature group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-all duration-400 bento-card-hover hover:shadow-elevated sm:p-10"
              >
                <div className="relative z-10 flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-pill bg-sunrise-orange/25 px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-sunrise-orange">
                      <span className="h-1.5 w-1.5 rounded-full bg-sunrise-orange" />
                      Start Here
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-white">
                      Staff Best Practices
                    </h3>
                    <p className="mt-3 max-w-sm font-body text-base leading-relaxed text-white/70">
                      Guidelines for using AI responsibly in administrative
                      workflows, institutional communications, and daily
                      operations.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-sunrise-orange">
                      Get started
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      "Email Drafting",
                      "Report Writing",
                      "Data Analysis",
                      "Scheduling",
                    ].map((use) => (
                      <div
                        key={use}
                        className="flex items-center gap-2 rounded-lg border-2 border-white/15 bg-white/5 px-3 py-1.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-sunrise-orange/70" />
                        <span className="font-body text-xs font-medium text-white/70">
                          {use}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Prompting Toolkit */}
            <motion.div variants={fadeUp}>
              <Link
                href="/toolkits/prompting"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-sunrise-orange/15 bg-white transition-all duration-300 bento-card-hover hover:border-sunrise-orange/30 hover:shadow-elevated"
              >
                <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-sunrise-orange/10 to-sunrise-orange/5">
                  <Image
                    src="/images/graduation.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-pill bg-sunrise-orange/10 px-2.5 py-0.5 font-body text-xs font-bold uppercase tracking-wider text-sunrise-orange">
                    Recommended
                  </span>
                  <h3 className="font-heading text-xl font-bold text-ever-green">
                    Prompting Toolkit
                  </h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                    Effective prompts for emails, reports, and operational tasks.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-sunrise-orange">
                    View toolkit
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Ethics & Privacy — wide card */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <Link
                href="/toolkits/ethics-privacy"
                className="group flex h-full overflow-hidden rounded-3xl border-2 border-sky-blue/15 bg-white transition-all duration-300 bento-card-hover hover:border-sky-blue/30 hover:shadow-elevated"
              >
                <div className="flex flex-1 flex-col p-8">
                  <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-pill bg-sky-blue/10 px-2.5 py-0.5 font-body text-xs font-bold uppercase tracking-wider text-sky-blue">
                    FERPA Compliance
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-pine-cone">
                    AI Ethics & Privacy
                  </h3>
                  <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-pine-cone/70">
                    FERPA compliance, data handling, and ethical AI use in
                    operations. Understand what data you can and cannot share
                    with AI tools.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "FERPA Guide",
                      "Data Handling",
                      "Vendor Review",
                      "Risk Assessment",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-ever-green/10 bg-ever-green/[0.04] px-2.5 py-1 font-body text-xs font-medium text-ever-green/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative hidden w-48 overflow-hidden sm:block">
                  <Image
                    src="/images/campus-entrance.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 0vw, 192px"
                    className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                </div>
              </Link>
            </motion.div>

            {/* AI Playground */}
            <motion.div variants={fadeUp}>
              <Link
                href="/playground"
                className="group flex h-full flex-col rounded-3xl border-2 border-gator-green/15 bg-white p-6 transition-all duration-300 bento-card-hover hover:border-gator-green/30 hover:shadow-elevated"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gator-green/10">
                  <svg
                    className="h-5 w-5 text-gator-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-ever-green">
                  AI Playground
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                  Discover productivity and collaboration AI tools for daily
                  operations.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-gator-green">
                  Browse tools
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
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

            {/* Custom GPTs */}
            <motion.div variants={fadeUp}>
              <Link
                href="/toolkits/custom-gpts"
                className="group flex h-full flex-col rounded-3xl border-2 border-ever-green/15 bg-white p-6 transition-all duration-300 bento-card-hover hover:border-ever-green/30 hover:shadow-elevated"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ever-green/10">
                  <svg
                    className="h-5 w-5 text-ever-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-ever-green">
                  GRC Custom GPTs
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                  AI tools purpose-built for GRC operational needs — meeting
                  summaries, drafting, and more.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-ever-green">
                  View GPTs
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
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
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-ever-green">
                  Staff FAQs
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                  Common questions about using AI in daily operations and
                  institutional workflows.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-sunrise-orange">
                  Read FAQs
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
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

      {/* Workflow Examples + FERPA Quick Reference */}
      <section className="border-t border-ever-green/[0.06] bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Workflow Automation Examples */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springDefault}
              className="rounded-3xl border border-ever-green/[0.06] bg-surface-dim p-8"
            >
              <h3 className="font-heading text-xl font-bold text-pine-cone">AI Workflow Ideas</h3>
              <p className="mt-2 font-body text-sm text-pine-cone/70">Common ways staff use AI to save time.</p>
              <div className="mt-6 space-y-3">
                {[
                  { task: "Meeting Summaries", desc: "Summarize meeting notes into action items and key decisions" },
                  { task: "Email Drafting", desc: "Draft professional communications with the right tone" },
                  { task: "Report Generation", desc: "Compile data into structured reports and presentations" },
                  { task: "Process Documentation", desc: "Create and update standard operating procedures" },
                  { task: "Data Analysis", desc: "Identify trends and insights from institutional data" },
                ].map((item) => (
                  <div key={item.task} className="rounded-2xl border border-ever-green/[0.06] bg-white px-5 py-4">
                    <span className="font-heading text-sm font-bold text-ever-green">{item.task}</span>
                    <p className="mt-1 font-body text-xs text-pine-cone/70">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/toolkits/prompting"
                className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-sunrise-orange transition-colors hover:text-ever-green"
              >
                Get prompt templates
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>

            {/* FERPA Quick Reference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springDefault, delay: 0.1 }}
              className="rounded-3xl border border-sky-blue/15 bg-sky-blue/5 p-8"
            >
              <h3 className="font-heading text-xl font-bold text-pine-cone">FERPA Quick Reference</h3>
              <p className="mt-2 font-body text-sm text-pine-cone/70">Protect student privacy when using AI tools.</p>
              <div className="mt-6 space-y-3">
                {[
                  { rule: "Never input student names, IDs, or grades", icon: "text-red-500", type: "dont" as const },
                  { rule: "Do not upload student work or transcripts", icon: "text-red-500", type: "dont" as const },
                  { rule: "Use only college-approved AI platforms", icon: "text-sky-blue", type: "do" as const },
                  { rule: "Anonymize all case examples before processing", icon: "text-sky-blue", type: "do" as const },
                  { rule: "Consult Registrar for questions about data sharing", icon: "text-sky-blue", type: "do" as const },
                ].map((item) => (
                  <div key={item.rule} className="flex items-start gap-3 rounded-2xl border border-ever-green/[0.06] bg-white px-5 py-3.5">
                    {item.type === "dont" ? (
                      <svg className={`mt-0.5 h-5 w-5 shrink-0 ${item.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    ) : (
                      <svg className={`mt-0.5 h-5 w-5 shrink-0 ${item.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                    )}
                    <span className="font-body text-sm text-pine-cone/80">{item.rule}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/toolkits/ethics-privacy"
                className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-sky-blue transition-colors hover:text-ever-green"
              >
                Full Ethics & Privacy Toolkit
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
            className="group flex items-center justify-between rounded-3xl border-2 border-sunrise-orange/15 bg-sunrise-orange/5 p-8 bento-card-hover sm:p-10"
          >
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-pill bg-sunrise-orange/10 px-2.5 py-0.5 font-body text-xs font-bold uppercase tracking-wider text-sunrise-orange">
                Self-Assessment
              </span>
              <h3 className="font-heading text-2xl font-bold text-pine-cone">
                Discover Your AI Readiness
              </h3>
              <p className="mt-2 max-w-sm font-body text-sm text-pine-cone/70">
                Take a quick quiz to see where you stand on the AI comfort spectrum
                and find resources matched to your level.
              </p>
            </div>
            <svg className="h-8 w-8 shrink-0 text-sunrise-orange transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
              Staff Perspectives
            </h2>
            <TestimonialCarousel audience="staff" />
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-ever-green/[0.06] bg-surface-dim py-14">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-pine-cone">
            Have questions or suggestions?
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-base text-pine-cone/70">
            We want to hear from you — share your experience or ask the Task
            Force directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 rounded-xl bg-sunrise-orange px-5 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-sunrise-orange/90"
            >
              View FAQs
            </Link>
            <Link
              href="/feedback"
              className="inline-flex items-center gap-2 rounded-xl border border-sunrise-orange/15 px-5 py-2.5 font-body text-sm font-semibold text-sunrise-orange transition-all hover:bg-sunrise-orange/5"
            >
              Give Feedback
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
