"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { springDefault } from "@/lib/animations/motion";
import { PageTransition } from "@/components/shared/PageTransition";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useAudience } from "@/contexts/AudienceContext";

const timeline = [
  {
    period: "Fall 2023",
    event: "Task Force Launches with initial planning and scope definition in response to rapid AI adoption across campus.",
    icon: "🚀",
  },
  {
    period: "Winter 2024",
    event: "Campus-wide Listening Sessions and AI Use Survey conducted across all departments to understand needs and concerns.",
    icon: "🎤",
  },
  {
    period: "Spring 2024",
    event: "Policy Drafting and Development of Custom GPTs for faculty use, alongside comprehensive AI guidelines.",
    icon: "📝",
  },
  {
    period: "Summer 2024",
    event: "AI Presentations and Initial Toolkit Launch for early adopters with department-specific workshops.",
    icon: "🛠️",
  },
  {
    period: "Fall 2024",
    event: "Faculty Pilots of the AI Assessment Scale across departments with comprehensive workshop series for early adopters.",
    icon: "🧪",
  },
  {
    period: "Winter/Spring 2025",
    event: "LibGuide Buildout with comprehensive resources, 80+ AI tools directory, and complete toolkit library.",
    icon: "📚",
  },
  {
    period: "Summer 2025",
    event: "Launch of 40-hour AI 101 Course for Faculty covering tools, ethics, pedagogy, and hands-on practice.",
    icon: "🎓",
  },
  {
    period: "Fall 2025",
    event: "AI 101 courses expand to Staff and Students. Ongoing workshops, updated toolkits, and continuous improvement.",
    icon: "🌟",
  },
];

const recommendations = [
  {
    title: "Syllabus Clarity & Sample Statements",
    desc: "Clear, adaptable language for AI policies in every course syllabus using the 5-level Assessment Scale.",
    accent: "card-accent-green",
    icon: (
      <svg className="h-8 w-8 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Assignment Design Templates",
    desc: "Ready-to-use templates for AI-integrated assignments across disciplines and difficulty levels.",
    accent: "card-accent-blue",
    icon: (
      <svg className="h-8 w-8 text-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Faculty & Staff Role-Based Guidance",
    desc: "Tailored best practices and training pathways based on your specific role and responsibilities.",
    accent: "card-accent-orange",
    icon: (
      <svg className="h-8 w-8 text-sunrise-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Ethical Use & Privacy Recommendations",
    desc: "FERPA-compliant guidelines, data privacy protocols, and ethical frameworks for AI use in education.",
    accent: "card-accent-green",
    icon: (
      <svg className="h-8 w-8 text-grc-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "80+", label: "AI Tools Catalogued" },
  { value: "6", label: "Comprehensive Toolkits" },
  { value: "5", label: "Assessment Scale Levels" },
  { value: "22", label: "Resource Pages" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: springDefault,
};

export default function AboutPage() {
  const { audience } = useAudience();

  const audienceIntro = audience === "student"
    ? "Learn how the AI Task Force is building resources to help you navigate AI in your coursework — ethically and effectively."
    : audience === "faculty"
    ? "Discover how the AI Task Force supports your teaching with tools, training, and policy frameworks for AI integration."
    : audience === "staff"
    ? "See how the AI Task Force is developing AI guidelines and productivity tools for institutional operations."
    : "Guiding Green River College through the AI revolution — responsibly, inclusively, and with purpose.";

  const audienceCTA = audience === "student"
    ? { text: "View Student Best Practices", href: "/best-practices/students" }
    : audience === "faculty"
    ? { text: "Explore Faculty Toolkits", href: "/toolkits" }
    : audience === "staff"
    ? { text: "View Staff Resources", href: "/best-practices/staff" }
    : { text: "Explore Our Resources", href: "/toolkits" };

  return (
    <PageTransition>
      {/* Hero with campus image */}
      <div className="relative overflow-hidden bg-ever-green">
        <Image
          src="/images/campus-entrance.jpg"
          alt="Green River College campus"
          width={1200}
          height={600}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ever-green via-ever-green/90 to-ever-green/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:py-36 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-pill bg-gator-green/20 px-3.5 py-1.5 font-body text-sm font-bold uppercase tracking-[0.12em] text-gator-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gator-green" />
              About Us
            </span>
            <h1 className="text-display font-heading font-extrabold text-white">
              AI Task Force
            </h1>
            <p className="mt-5 max-w-xl text-subtitle font-body text-white/80">
              {audienceIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={audienceCTA.href}
                className="inline-flex items-center gap-2 rounded-xl bg-gator-green px-6 py-3 font-body text-base font-semibold text-white transition-all hover:bg-gator-green/90 hover:shadow-lg"
              >
                {audienceCTA.text}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/assessment-scale"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-body text-base font-semibold text-white transition-all hover:bg-white/20"
              >
                View Assessment Scale
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-ever-green/10 bg-surface-dim">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="px-6 py-6 text-center"
              >
                <p className="font-heading text-3xl font-black text-ever-green">{stat.value}</p>
                <p className="mt-1 font-body text-sm font-medium text-pine-cone/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        {/* Mission + Photo grid */}
        <motion.div {...fadeUp} className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-pine-cone">
              Our Mission
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-pine-cone/80">
              The Green River College AI Taskforce is dedicated to providing
              faculty, staff, and students with resources, guidance, and best
              practices for effectively and ethically integrating artificial
              intelligence into teaching, learning, and administrative
              processes.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-pine-cone/80">
              We believe that AI is transforming education at an unprecedented pace. Rather than
              resisting this change, we embrace it with thoughtful guidelines that protect academic
              integrity while empowering our community to leverage these powerful tools.
            </p>
            <blockquote className="mt-6 rounded-2xl border-l-4 border-gator-green bg-gator-green/5 py-4 pl-5 pr-4">
              <p className="font-body text-base italic leading-relaxed text-pine-cone/80">
                &ldquo;We aim to harness the potential of AI to enhance
                education while maintaining academic integrity and preparing
                our community for an AI-integrated future.&rdquo;
              </p>
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gator-green/10">
                <span className="font-heading text-sm font-bold text-gator-green">AW</span>
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-ever-green">Ari Wilber</p>
                <p className="font-body text-xs text-pine-cone/70">English Faculty &amp; AI Task Force Co-Lead</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative flex-1 overflow-hidden rounded-3xl">
              <Image
                src="/images/tech-center.jpg"
                alt="GRC Tech Center study area"
                width={600}
                height={300}
                className="h-full min-h-[200px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ever-green/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-heading text-lg font-bold text-white">Tech Center</p>
                <p className="font-body text-sm text-white/70">Where innovation meets education</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/images/campus-garden.jpg"
                alt="GRC campus garden"
                width={600}
                height={200}
                className="h-40 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ever-green/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="font-heading text-sm font-bold text-white">Green River College Campus</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Audience-specific callout */}
        {audience && (
          <motion.div {...fadeUp} className="mt-8">
            <div className={`rounded-3xl p-8 sm:p-10 ${
              audience === "student" ? "card-accent-blue border border-sky-blue/10" :
              audience === "faculty" ? "card-accent-green border border-gator-green/10" :
              "card-accent-orange border border-sunrise-orange/10"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  audience === "student" ? "bg-sky-blue/15 text-sky-blue" :
                  audience === "faculty" ? "bg-gator-green/15 text-gator-green" :
                  "bg-sunrise-orange/15 text-sunrise-orange"
                }`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-ever-green">
                    {audience === "student" ? "For Students" : audience === "faculty" ? "For Faculty" : "For Staff"}
                  </h3>
                  <p className="mt-2 font-body text-base leading-relaxed text-pine-cone/80">
                    {audience === "student"
                      ? "The AI Task Force has created resources specifically for you — from understanding what AI tools you can use in your classes to tips for using them ethically. Always start by checking your course syllabus for your instructor's AI policy."
                      : audience === "faculty"
                      ? "We've built comprehensive toolkits to support your teaching with AI — including syllabus language templates, the 5-level Assessment Scale for setting AI use policies, assignment design frameworks, and a 40-hour AI 101 course."
                      : "The Task Force provides resources for integrating AI into institutional operations — including prompting toolkits, custom GPTs for common tasks, FERPA-compliant guidelines, and workflow automation tools."}
                  </p>
                  <Link
                    href={audienceCTA.href}
                    className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-ever-green transition-colors hover:text-gator-green"
                  >
                    {audienceCTA.text}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Approach card */}
        <motion.div {...fadeUp} className="mt-8 card-feature rounded-3xl p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Our Approach
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-white/80">
                Rather than banning AI, we embrace it with clear guidelines.
                Our 5-level Assessment Scale gives faculty the tools to set
                appropriate AI use policies per assignment, while empowering
                students to use AI ethically and effectively.
              </p>
              <p className="mt-3 font-body text-base leading-relaxed text-white/70">
                Each level — from &quot;No AI&quot; to &quot;Full AI Partnership&quot; — provides specific
                guidance on what&apos;s allowed, with syllabus language templates and assignment
                design tips to make implementation seamless.
              </p>
              <Link
                href="/assessment-scale"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-white/25"
              >
                View Assessment Scale
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            <div className="flex justify-center gap-3">
              {[
                { n: 1, label: "No AI", color: "from-red-500/20 to-red-500/5 border-red-500/20" },
                { n: 2, label: "AI Assist", color: "from-orange-500/20 to-orange-500/5 border-orange-500/20" },
                { n: 3, label: "AI Collab", color: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20" },
                { n: 4, label: "AI Led", color: "from-green-500/20 to-green-500/5 border-green-500/20" },
                { n: 5, label: "Full AI", color: "from-blue-500/20 to-blue-500/5 border-blue-500/20" },
              ].map((level) => (
                <Link
                  key={level.n}
                  href={`/assessment-scale/${level.n}`}
                  className={`flex flex-col items-center gap-2 rounded-2xl border bg-gradient-to-b p-4 transition-all hover:scale-105 ${level.color}`}
                >
                  <span className="font-heading text-3xl font-black text-white">{level.n}</span>
                  <span className="font-body text-xs font-medium text-white/70">{level.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="divider-glow mt-16" />

        {/* What We Recommend */}
        <ScrollReveal className="mt-16">
          <h2 className="text-title font-heading font-extrabold text-pine-cone">
            What We Recommend
          </h2>
          <p className="mt-3 max-w-2xl font-body text-base text-pine-cone/70">
            Our Task Force has developed comprehensive recommendations across four key areas to support responsible AI integration at GRC.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {recommendations.map((rec, i) => (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className={`${rec.accent} rounded-3xl p-8 transition-all hover:-translate-y-1 hover:shadow-elevated`}
              >
                <div className="mb-4">{rec.icon}</div>
                <h3 className="font-heading text-lg font-bold text-ever-green">{rec.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-pine-cone/70">{rec.desc}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <div className="divider-glow mt-16" />

        {/* Timeline */}
        <ScrollReveal delay={0.1} className="mt-16">
          <h2 className="text-title font-heading font-extrabold text-pine-cone">
            Our Journey
          </h2>
          <p className="mt-3 max-w-2xl font-body text-base text-pine-cone/70">
            From our founding in Fall 2023 to today — a timeline of how the AI Task Force has grown to serve the entire GRC community.
          </p>

          {/* Timeline visual */}
          <div className="relative mt-10">
            {/* Center line */}
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-gator-green via-ever-green/30 to-transparent sm:block" />

            <div className="space-y-4">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="group relative flex items-start gap-6 rounded-3xl border border-ever-green/[0.06] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-elevated sm:ml-14 sm:p-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-14 top-8 hidden sm:block">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ever-green text-sm">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex rounded-xl bg-gator-green/10 px-3 py-1 font-heading text-sm font-bold text-gator-green">
                        {item.period}
                      </span>
                      {i === timeline.length - 1 && (
                        <span className="inline-flex rounded-pill bg-leaf-green/20 px-2.5 py-0.5 font-body text-xs font-bold text-grc-green">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-3 font-body text-base leading-relaxed text-pine-cone/80">
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Campus photo strip */}
        <motion.div {...fadeUp} className="mt-16 grid grid-cols-3 gap-3 overflow-hidden rounded-3xl">
          <div className="relative overflow-hidden">
            <Image
              src="/images/campus-garden.jpg"
              alt="GRC campus garden"
              width={400}
              height={300}
              className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/images/campus-sculpture.jpg"
              alt="GRC campus sculpture"
              width={400}
              height={300}
              className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/images/graduation.jpg"
              alt="Graduation diplomas"
              width={400}
              height={300}
              className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
            />
          </div>
        </motion.div>

        {/* Key Documents */}
        <ScrollReveal delay={0.1} className="mt-16 rounded-3xl border border-ever-green/[0.06] bg-gradient-to-br from-ever-green/[0.03] to-sky-blue/[0.03] p-8 sm:p-10">
          <h2 className="font-heading text-xl font-bold text-pine-cone">Key Documents & Reports</h2>
          <p className="mt-2 font-body text-sm text-pine-cone/70">
            Reports, updates, and planning documents from the AI Task Force.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://docs.google.com/document/d/1F_QpZvSe__mhQEFCYuhv_clJr-6IHDbd/edit?usp=sharing&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-ever-green/[0.06] bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sunrise-orange/10">
                <svg className="h-5 w-5 text-sunrise-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-ever-green">Draft AI Report</p>
                <p className="font-body text-xs text-pine-cone/70">Task Force recommendations</p>
              </div>
            </a>
            <a
              href="https://drive.google.com/file/d/18LO7ZHP539hGVTb6chKakIwji-3ChihV/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-ever-green/[0.06] bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-blue/10">
                <svg className="h-5 w-5 text-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-ever-green">Spring 2024 Update</p>
                <p className="font-body text-xs text-pine-cone/70">Progress report</p>
              </div>
            </a>
            <a
              href="https://outlook.office.com/owa/calendar/AriWilberAppointments@greenriveredu.onmicrosoft.com/bookings/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-ever-green/[0.06] bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gator-green/10">
                <svg className="h-5 w-5 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-ever-green">Book a Consultation</p>
                <p className="font-body text-xs text-pine-cone/70">With Ari Wilber</p>
              </div>
            </a>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <motion.div {...fadeUp} className="mt-16 card-feature rounded-3xl p-10 text-center sm:p-14">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {audience === "student" ? "Have Questions About AI?" :
             audience === "faculty" ? "Ready to Integrate AI?" :
             audience === "staff" ? "Need AI Resources?" :
             "Get Involved"}
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base text-white/70">
            {audience === "student" ? "Check out our FAQs or reach out to the Task Force for guidance on using AI in your classes." :
             audience === "faculty" ? "Explore our toolkits, attend a workshop, or request a custom presentation for your department." :
             audience === "staff" ? "Browse our resources for workflow automation, or request a training session for your team." :
             "Whether you're a student, faculty member, or staff — we have resources for you."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/feedback"
              className="inline-flex items-center gap-2 rounded-xl bg-gator-green px-6 py-3.5 font-body text-base font-semibold text-white transition-all hover:bg-gator-green/90 hover:shadow-lg"
            >
              Get in Touch
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-body text-base font-semibold text-white transition-all hover:bg-white/20"
            >
              View FAQs
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
