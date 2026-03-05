"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { PageTransition } from "@/components/shared/PageTransition";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function FacultyDashboard() {
  return (
    <PageTransition>
      <HeroSection
        accent="Faculty Resources"
        accentColor="bg-gator-green/15 text-gator-green"
        title="Design AI-Informed Courses"
        subtitle="Set clear AI policies, explore assessment frameworks, and discover strategies for responsible AI integration in your teaching."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/assessment-scale"
            className="group flex items-center gap-2 rounded-xl bg-gator-green px-5 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-grc-green"
          >
            AI Assessment Scale
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
            href="/toolkits/syllabus"
            className="rounded-xl border border-white/10 px-5 py-2.5 font-body text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
          >
            Syllabus Statements
          </Link>
        </div>
      </HeroSection>

      {/* Mission Quote */}
      <div className="border-b border-gator-green/15 bg-gator-green/[0.04]">
        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <blockquote className="border-l-2 border-gator-green/30 pl-4 font-body text-base italic leading-relaxed text-pine-cone/80">
            &ldquo;We aim to harness the potential of AI to enhance education
            while maintaining academic integrity and preparing our community for
            an AI-integrated future.&rdquo;
            <span className="mt-1 block text-xs font-semibold not-italic uppercase tracking-wider text-gator-green">
              — GRC AI Taskforce Mission
            </span>
          </blockquote>
        </div>
      </div>

      {/* Bento Grid Section */}
      <section className="bg-surface-dim py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-title font-heading font-extrabold tracking-tight text-pine-cone">
              Teaching with AI
            </h2>
            <p className="mt-3 max-w-md font-body text-lg text-pine-cone/70">
              Frameworks, toolkits, and strategies for your courses.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Featured card — AI Assessment Scale */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <Link
                href="/assessment-scale"
                className="card-feature group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-all duration-400 hover:-translate-y-1 hover:shadow-elevated sm:p-10"
              >
                <div className="relative z-10 flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-pill bg-gator-green/25 px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-gator-green">
                      <span className="h-1.5 w-1.5 rounded-full bg-gator-green" />
                      Framework
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-white">
                      AI Assessment Scale
                    </h3>
                    <p className="mt-3 max-w-sm font-body text-base leading-relaxed text-white/70">
                      The 5-level framework for setting AI use expectations per
                      course and assignment. Define clear boundaries for your
                      students.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-gator-green">
                      Explore the framework
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
                  <div className="flex flex-col gap-1.5">
                    {[
                      { name: "No AI", color: "border-red-400/30 text-red-300" },
                      { name: "Planning", color: "border-orange-400/30 text-orange-300" },
                      { name: "Collaboration", color: "border-yellow-400/30 text-yellow-300" },
                      { name: "Integration", color: "border-sky-300/30 text-sky-300" },
                      { name: "Exploration", color: "border-green-400/30 text-green-300" },
                    ].map((level, i) => (
                      <div
                        key={level.name}
                        className={`flex items-center gap-2 rounded-lg border-2 bg-white/5 px-3 py-1.5 ${level.color}`}
                      >
                        <span className="font-heading text-sm font-black">
                          {i + 1}
                        </span>
                        <span className="font-body text-xs font-medium text-white/70">
                          {level.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Syllabus Statements */}
            <motion.div variants={fadeUp}>
              <Link
                href="/toolkits/syllabus"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-gator-green/15 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gator-green/30 hover:shadow-elevated"
              >
                <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-gator-green/10 to-gator-green/5">
                  <Image
                    src="/images/tech-center.jpg"
                    alt=""
                    fill
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-ever-green">
                    Syllabus Statements
                  </h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                    Ready-to-use AI policy language for every assessment level.
                    Copy, paste, and customize for your courses.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-gator-green">
                    View templates
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
                </div>
              </Link>
            </motion.div>

            {/* Assessment Design — wide card */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <Link
                href="/toolkits/assessment-design"
                className="group flex h-full overflow-hidden rounded-3xl border-2 border-sky-blue/15 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-sky-blue/30 hover:shadow-elevated"
              >
                <div className="flex flex-1 flex-col p-8">
                  <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-pill bg-sky-blue/10 px-2.5 py-0.5 font-body text-xs font-bold uppercase tracking-wider text-sky-blue">
                    Most Popular
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-pine-cone">
                    Assessment Design
                  </h3>
                  <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-pine-cone/70">
                    Rethink assignments for an AI world — from AI-proof to
                    AI-enhanced. Includes rubric templates and real-world
                    examples.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "Rubric Templates",
                      "AI-Proof Ideas",
                      "AI-Enhanced Tasks",
                      "Reflection Prompts",
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
                    src="/images/campus-garden.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                </div>
              </Link>
            </motion.div>

            {/* Faculty Best Practices */}
            <motion.div variants={fadeUp}>
              <Link
                href="/best-practices/faculty"
                className="group flex h-full flex-col rounded-3xl border-2 border-grc-green/15 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-grc-green/30 hover:shadow-elevated"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-grc-green/10">
                  <svg
                    className="h-5 w-5 text-grc-green"
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
                <h3 className="font-heading text-lg font-bold text-ever-green">
                  Faculty Best Practices
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                  Comprehensive guidelines for teaching with AI effectively —
                  from academic integrity to student engagement.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-grc-green">
                  View guidelines
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
                className="group flex h-full flex-col rounded-3xl border-2 border-leaf-green/20 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-leaf-green/40 hover:shadow-elevated"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-leaf-green/15">
                  <svg
                    className="h-5 w-5 text-grc-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-ever-green">
                  Prompting Toolkit
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                  Master AI prompting for creating assignments, grading rubrics,
                  and course design materials.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-grc-green">
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

            {/* AI Playground */}
            <motion.div variants={fadeUp}>
              <Link
                href="/playground"
                className="group flex h-full flex-col rounded-3xl border-2 border-sky-blue/15 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-blue/30 hover:shadow-elevated"
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
                      d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-ever-green">
                  AI Playground
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-pine-cone/70">
                  80+ AI tools categorized by teaching use case — writing,
                  assessment, and presentations.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-sky-blue">
                  Explore tools
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

      {/* Bottom CTA */}
      <section className="border-t border-ever-green/[0.06] bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-pine-cone">
            Questions about AI in your courses?
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-base text-pine-cone/70">
            Browse FAQs from fellow faculty or share your experience with the
            Task Force.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 rounded-xl bg-gator-green px-5 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-grc-green"
            >
              Faculty FAQs
            </Link>
            <Link
              href="/feedback"
              className="inline-flex items-center gap-2 rounded-xl border border-gator-green/15 px-5 py-2.5 font-body text-sm font-semibold text-gator-green transition-all hover:bg-gator-green/5"
            >
              Share Feedback
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
