"use client";

import { useAudience } from "@/contexts/AudienceContext";
import { PageTransition } from "@/components/shared/PageTransition";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { motion } from "framer-motion";

const events = [
  {
    date: "Spring 2026",
    title: "Canvas Nuts & Bolts: AI-Enhanced Course Design",
    type: "Workshop",
    desc: "Hands-on workshop integrating AI tools into Canvas course design — from AI-generated module overviews to accessible content creation.",
    upcoming: true,
    highlight: { student: false, faculty: true, staff: false },
  },
  {
    date: "Spring 2026",
    title: "AI Book Club: Co-Intelligence by Ethan Mollick",
    type: "Course",
    desc: "Faculty reading group exploring Co-Intelligence: Living and Working with AI. Weekly discussions on applying AI frameworks to teaching.",
    upcoming: true,
    highlight: { student: false, faculty: true, staff: false },
  },
  {
    date: "Winter 2026",
    title: "AI 101 for All: Campus-Wide AI Literacy",
    type: "Course",
    desc: "Expanded AI literacy program now open to all campus roles — students, faculty, staff, and administrators. Self-paced modules with live Q&A sessions.",
    upcoming: true,
    highlight: { student: true, faculty: true, staff: true },
  },
  {
    date: "Fall 2025",
    title: "AI 101 for Staff & Students Courses Launch",
    type: "Course",
    desc: "New AI literacy courses launched for staff and students, building on the successful faculty AI 101 course.",
    upcoming: false,
    highlight: { student: true, faculty: false, staff: false },
  },
  {
    date: "Summer 2025",
    title: "AI 101 Course for Faculty",
    type: "Course",
    desc: "40-hour comprehensive AI course designed for educators covering tools, ethics, pedagogy, and hands-on practice.",
    upcoming: false,
    highlight: { student: false, faculty: true, staff: false },
  },
  {
    date: "Spring 2025",
    title: "AI in the Classroom Workshop Series",
    type: "Workshop",
    desc: "Hands-on workshops for faculty on integrating AI tools into teaching, assessment design, and student engagement.",
    upcoming: false,
    highlight: { student: true, faculty: true, staff: false },
  },
  {
    date: "Winter 2025",
    title: "LibGuide Launch & Toolkit Rollout",
    type: "Launch",
    desc: "Comprehensive AI resource hub launched with toolkits, best practices, and the AI Playground featuring 80+ tools.",
    upcoming: false,
    highlight: { student: true, faculty: true, staff: true },
  },
  {
    date: "Fall 2024",
    title: "Faculty Pilots & Workshop Series",
    type: "Training",
    desc: "Faculty piloted the AI Assessment Scale across departments with comprehensive workshop series for early adopters.",
    upcoming: false,
    highlight: { student: false, faculty: true, staff: false },
  },
  {
    date: "Summer 2024",
    title: "AI Presentations & Toolkit Launch",
    type: "Presentation",
    desc: "Initial toolkit launch for early adopters with presentations on AI policy frameworks and assessment strategies.",
    upcoming: false,
    highlight: { student: false, faculty: true, staff: true },
  },
  {
    date: "Spring 2024",
    title: "Custom GPTs Development & Policy Drafting",
    type: "Development",
    desc: "Development of custom GPTs for faculty use alongside comprehensive AI policy drafting for the institution.",
    upcoming: false,
    highlight: { student: false, faculty: true, staff: true },
  },
  {
    date: "Winter 2024",
    title: "Listening Sessions & AI Use Survey",
    type: "Forum",
    desc: "Campus-wide listening sessions and AI use survey conducted across all departments to understand needs and concerns.",
    upcoming: false,
    highlight: { student: true, faculty: true, staff: true },
  },
  {
    date: "Fall 2023",
    title: "AI Task Force Launch",
    type: "Milestone",
    desc: "The GRC AI Task Force was formed with initial planning and scope definition in response to rapid AI adoption across campus.",
    upcoming: false,
    highlight: { student: false, faculty: false, staff: true },
  },
];

const typeColors: Record<string, string> = {
  Course: "bg-gator-green/10 text-gator-green border-gator-green/20",
  Workshop: "bg-sky-blue/10 text-sky-blue border-sky-blue/20",
  Launch: "bg-leaf-green/15 text-grc-green border-leaf-green/20",
  Training: "bg-sunrise-orange/10 text-sunrise-orange border-sunrise-orange/20",
  Presentation: "bg-sky-blue/10 text-sky-blue border-sky-blue/20",
  Development: "bg-gator-green/10 text-gator-green border-gator-green/20",
  Forum: "bg-sunrise-orange/10 text-sunrise-orange border-sunrise-orange/20",
  Milestone: "bg-ever-green/10 text-ever-green border-ever-green/20",
};

const dotColors: Record<string, string> = {
  Course: "bg-gator-green",
  Workshop: "bg-sky-blue",
  Launch: "bg-leaf-green",
  Training: "bg-sunrise-orange",
  Presentation: "bg-sky-blue",
  Development: "bg-gator-green",
  Forum: "bg-sunrise-orange",
  Milestone: "bg-ever-green",
};

const audienceBanners = {
  student: {
    label: "For Students",
    text: "Want to learn about AI? Check out upcoming workshops and courses.",
    color: "bg-sky-blue/10 border-sky-blue/20 text-sky-blue",
    icon: (
      <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  faculty: {
    label: "For Faculty",
    text: "Professional development opportunities in AI for teaching.",
    color: "bg-gator-green/10 border-gator-green/20 text-gator-green",
    icon: (
      <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  staff: {
    label: "For Staff",
    text: "AI training and development for institutional operations.",
    color: "bg-sunrise-orange/10 border-sunrise-orange/20 text-sunrise-orange",
    icon: (
      <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    ),
  },
};

const audienceCallouts = {
  student: {
    title: "Why Attend?",
    text: "Build practical AI skills that give you an edge in coursework and your future career. Learn ethical AI use, discover free tools, and connect with peers exploring the same technology.",
    color: "bg-gradient-to-br from-sky-blue/5 to-sky-blue/10 border-sky-blue/15",
    textColor: "text-sky-blue",
  },
  faculty: {
    title: "Earn PD Credit",
    text: "All AI Task Force workshops and courses qualify for professional development credit. The AI 101 Course for Faculty is a 40-hour comprehensive program recognized by the college for PD advancement.",
    color: "bg-gradient-to-br from-gator-green/5 to-gator-green/10 border-gator-green/15",
    textColor: "text-gator-green",
  },
  staff: {
    title: "Operational AI Training",
    text: "Stay informed on institutional AI policy, explore tools that streamline workflows, and contribute to campus-wide AI governance through forums and listening sessions.",
    color: "bg-gradient-to-br from-sunrise-orange/5 to-sunrise-orange/10 border-sunrise-orange/15",
    textColor: "text-sunrise-orange",
  },
};

export default function EventsPage() {
  const { audience } = useAudience();

  const banner = audience ? audienceBanners[audience] : null;
  const callout = audience ? audienceCallouts[audience] : null;

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill bg-sunrise-orange/10 px-3.5 py-1 font-body text-sm font-bold uppercase tracking-[0.12em] text-sunrise-orange">
            Events
          </span>
          <h1 className="text-title font-heading font-extrabold text-pine-cone">
            Presentations &amp; Events
          </h1>
          <p className="mt-5 text-subtitle font-body text-pine-cone/70">
            Workshops, trainings, courses, and presentations by the AI Task Force — from our founding in Fall 2023 through today.
          </p>
        </div>

        {/* Audience Banner */}
        {banner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`mt-8 flex items-center gap-4 rounded-2xl border px-6 py-4 ${banner.color}`}
          >
            {banner.icon}
            <div>
              <span className="font-heading text-sm font-bold uppercase tracking-wide">{banner.label}</span>
              <p className="mt-0.5 font-body text-sm opacity-80">{banner.text}</p>
            </div>
          </motion.div>
        )}

        <div className="divider-glow mt-12" />

        {/* Audience Callout */}
        {callout && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`mt-10 rounded-3xl border p-8 sm:p-10 ${callout.color}`}
          >
            <h3 className={`font-heading text-xl font-bold ${callout.textColor}`}>{callout.title}</h3>
            <p className="mt-3 font-body text-base leading-relaxed text-pine-cone/70">{callout.text}</p>
          </motion.div>
        )}

        {/* Presentations */}
        <ScrollReveal>
        <div className="mt-14">
          <h2 className="text-title font-heading font-extrabold text-pine-cone">Presentations</h2>
          <p className="mt-3 font-body text-base text-pine-cone/70">
            Workshop slides and resources from AI Task Force presentations. Available for departments, in-service days, and faculty meetings.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "AI at Green River College", tag: "Overview", desc: "Overview of how AI is shaping learning, policy, and faculty approaches.", url: "https://www.canva.com/design/DAF1a-HNyQk/Lw6u4R2Fs_Zcvp6mdY2VOA/view" },
              { title: "AI 101 for Educators", tag: "Foundations", desc: "Introduces foundational tools, policies, and pedagogical strategies using AI.", url: "https://www.canva.com/design/DAGWe0JVVNo/adlPp9SNT7gj_2ppkmEorw/view" },
              { title: "Reimagining Assessment in an AI-Enabled Classroom", tag: "Pedagogy", desc: "Innovative, AI-integrated assignments and pedagogy.", url: "https://www.canva.com/design/DAGleK-4hTo/3iTV_nWkKI88btSEJ0Z0LQ/view" },
              { title: "Using AI for Accessibility", tag: "Accessibility", desc: "Real examples of how to improve digital accessibility using AI tools.", url: "https://www.canva.com/design/DAGleK-4hTo/3iTV_nWkKI88btSEJ0Z0LQ/view" },
              { title: "AI for Instructor Workload", tag: "Efficiency", desc: "Strategies for using AI to manage instructor workload effectively.", url: "https://www.canva.com/design/DAFlE-xsccs/O41J9wIvo19klZ1k388Hew/view" },
              { title: "Crafting Clear Policies for Today's Classroom", tag: "Policy", desc: "Guidelines for creating effective AI policies for today's classroom.", url: "https://www.canva.com/design/DAGhuZJDOJM/azop-_EOA_EMqzr-9WVJug/view" },
              { title: "Prompting for the Classroom", tag: "Practical", desc: "Effective prompting techniques for educational contexts.", url: "https://www.canva.com/design/DAGhuZJDOJM/eeIAsfBMur1BQlefPdwU-A/view" },
            ].map((pres, i) => (
              <motion.div
                key={pres.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-3xl border border-ever-green/[0.06] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <span className="inline-flex rounded-xl bg-gator-green/10 px-3 py-1 font-body text-xs font-bold text-gator-green">{pres.tag}</span>
                <h3 className="mt-3 font-heading text-lg font-bold text-ever-green">{pres.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-pine-cone/70">{pres.desc}</p>
                {pres.url ? (
                  <a
                    href={pres.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-sky-blue transition-colors hover:text-ever-green"
                  >
                    View Slides
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ) : (
                  <span className="mt-4 inline-flex items-center gap-1.5 font-body text-xs text-pine-cone/70">
                    Slides coming soon
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Request CTA */}
          <div className="mt-8 rounded-3xl card-feature p-8 sm:p-10">
            <h3 className="font-heading text-xl font-bold text-white">Request a Presentation</h3>
            <p className="mt-3 font-body text-base leading-relaxed text-white/60">
              We offer customized workshops with engaging visuals and interactive elements for departments, in-service days, and faculty meetings. Choose any topic above or let us tailor content to your department's needs.
            </p>
            <a
              href="mailto:elearning@greenriver.edu?subject=Request%20AI%20Presentation"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
              Send Request
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
        </ScrollReveal>

        <div className="divider-glow mt-16" />

        {/* Timeline */}
        <ScrollReveal delay={0.1}>
        <div data-ai-id="events-list" className="relative mt-14">
          <h2 className="mb-10 text-center font-heading text-2xl font-extrabold text-pine-cone sm:text-3xl">Timeline</h2>

          {/* Vertical center line */}
          <div className="absolute left-4 top-20 hidden h-[calc(100%-5rem)] w-0.5 bg-gradient-to-b from-gator-green/40 via-ever-green/20 to-transparent sm:left-1/2 sm:-translate-x-px sm:block" />

          <div className="space-y-6 sm:space-y-10">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              const isHighlighted = audience && event.highlight[audience];

              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  className={`relative flex flex-col sm:flex-row ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"} sm:items-start`}
                >
                  {/* Timeline dot (center on desktop) */}
                  <div className="absolute left-4 top-8 z-10 hidden sm:left-1/2 sm:-translate-x-1/2 sm:block">
                    <div className={`h-4 w-4 rounded-full border-[3px] border-white shadow-md ${dotColors[event.type] ?? "bg-ever-green"} ${isHighlighted ? "ring-4 ring-gator-green/20" : ""}`} />
                  </div>

                  {/* Spacer half */}
                  <div className="hidden w-1/2 sm:block" />

                  {/* Card */}
                  <div
                    className={`group relative w-full rounded-3xl border-2 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated sm:w-1/2 ${
                      isLeft ? "sm:mr-8" : "sm:ml-8"
                    } ${
                      isHighlighted
                        ? "border-gator-green/20 shadow-lg shadow-gator-green/5"
                        : "border-ever-green/[0.06]"
                    }`}
                  >
                    {/* Highlighted badge */}
                    {isHighlighted && (
                      <span className="absolute -top-3 right-6 inline-flex rounded-pill bg-gator-green px-3 py-1 font-body text-xs font-bold text-white shadow-sm">
                        Recommended for You
                      </span>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`inline-flex rounded-xl border px-3.5 py-1.5 font-heading text-xs font-bold ${typeColors[event.type] ?? "bg-ever-green/10 text-ever-green border-ever-green/20"}`}>
                        {event.type}
                      </span>
                      <span className="font-body text-sm font-semibold text-pine-cone/70">{event.date}</span>
                      {event.upcoming && (
                        <span className="inline-flex items-center gap-1.5 rounded-pill bg-leaf-green/20 px-3 py-1 font-body text-xs font-bold text-grc-green">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-grc-green" />
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 font-heading text-xl font-bold leading-tight text-ever-green sm:text-2xl">
                      {event.title}
                    </h3>
                    <p className="mt-3 font-body text-base leading-relaxed text-pine-cone/70">
                      {event.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
