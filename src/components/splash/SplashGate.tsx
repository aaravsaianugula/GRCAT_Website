"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAudience, type Audience } from "@/contexts/AudienceContext";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import Image from "next/image";
import Link from "next/link";

const audiences = [
  {
    value: "student" as Audience,
    title: "Student",
    subtitle: "Learn & Create",
    description:
      "AI tools, ethical guidelines, and study resources tailored for your coursework. Start with your syllabus — we'll show you the rest.",
    color: "#418FDE",
    bg: "from-sky-blue/25 via-sky-blue/10 to-transparent",
    ring: "ring-sky-blue/40",
    iconBg: "bg-sky-blue/20",
    textAccent: "text-sky-blue",
    btnBg: "bg-sky-blue hover:bg-sky-blue/90",
    stats: "80+ AI Tools",
    image: "/images/campus-entrance.jpg",
    features: ["AI Playground", "Ethics Guide", "Study Tools"],
  },
  {
    value: "faculty" as Audience,
    title: "Faculty",
    subtitle: "Teach & Design",
    description:
      "Assessment frameworks, syllabus templates, and a 5-level AI scale to integrate AI into your courses with confidence.",
    color: "#6CB443",
    bg: "from-gator-green/25 via-gator-green/10 to-transparent",
    ring: "ring-gator-green/40",
    iconBg: "bg-gator-green/20",
    textAccent: "text-gator-green",
    btnBg: "bg-gator-green hover:bg-gator-green/90",
    stats: "5-Level Scale",
    image: "/images/tech-center.jpg",
    features: ["Assessment Scale", "6 Toolkits", "AI 101 Course"],
  },
  {
    value: "staff" as Audience,
    title: "Staff",
    subtitle: "Optimize & Manage",
    description:
      "Workflow automation, FERPA-compliant AI use, and operational best practices to transform how you work.",
    color: "#D14900",
    bg: "from-sunrise-orange/25 via-sunrise-orange/10 to-transparent",
    ring: "ring-sunrise-orange/40",
    iconBg: "bg-sunrise-orange/20",
    textAccent: "text-sunrise-orange",
    btnBg: "bg-sunrise-orange hover:bg-sunrise-orange/90",
    stats: "6 Toolkits",
    image: "/images/graduation.jpg",
    features: ["Custom GPTs", "Prompting", "FERPA Guide"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.6 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SplashGate() {
  const router = useRouter();
  const { audience, setAudience, hasChosen } = useAudience();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    if (hasChosen && audience) {
      router.replace(`/${audience}`);
    }
  }, [hasChosen, audience, router]);

  function handleSelect(value: Audience) {
    setAudience(value);
    if (value) router.push(`/${value}`);
  }

  if (hasChosen) {
    return (
      <div className="gradient-mesh flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
          role="status"
          aria-label="Loading"
        >
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gator-green/30 border-t-gator-green" />
          <p className="mt-4 font-body text-sm text-white/60">
            Loading your experience...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="noise relative flex min-h-screen flex-col items-center overflow-hidden gradient-mesh">
      <ParticleBackground fullViewport />

      {/* Ambient glow orbs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-gator-green/8 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-sky-blue/6 blur-[120px]"
        aria-hidden="true"
      />

      {/* GRC Logo + Branding */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mt-8 flex items-center gap-3 sm:mt-12"
      >
        <Image
          src="/images/grc-logo-white.png"
          alt="Green River College"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <div className="h-6 w-px bg-white/20" />
        <span className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-white/70">
          AI Task Force
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-10">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center"
        >
          <h1 className="font-heading text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl">
            <span className="text-gradient-white">AI</span>
            <span className="text-gradient-green"> Taskforce</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg font-body text-lg leading-relaxed text-white/70 sm:text-xl">
            Empowering Green River College through
            <span className="font-semibold text-gator-green">
              {" "}
              responsible AI integration
            </span>
            .
          </p>

          <p className="mt-3 font-body text-base text-white/60">
            Choose your role to get a personalized experience.
          </p>
        </motion.div>

        {/* Audience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-14 grid w-full gap-5 sm:grid-cols-3"
        >
          {audiences.map((a) => {
            const isHovered = hoveredCard === a.value;
            return (
              <motion.button
                key={a.value}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setHoveredCard(a.value)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => handleSelect(a.value)}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border text-left transition-all duration-500 focus-visible:ring-2 focus-visible:ring-sky-blue ${
                  isHovered
                    ? `border-white/20 ring-2 ${a.ring}`
                    : "border-white/[0.08]"
                }`}
              >
                {/* Background image */}
                <div className="relative h-36 w-full overflow-hidden sm:h-44">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#050D08]" />

                  {/* Stats badge */}
                  <div className="absolute right-4 top-4">
                    <span
                      className="rounded-pill bg-black/40 px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm"
                    >
                      {a.stats}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-4 left-5">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${a.iconBg} backdrop-blur-sm transition-transform duration-300 group-hover:scale-110`}
                    >
                      <svg
                        className={`h-6 w-6 ${a.textAccent}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        {a.value === "student" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                          />
                        )}
                        {a.value === "faculty" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                          />
                        )}
                        {a.value === "staff" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                          />
                        )}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div
                  className={`flex flex-1 flex-col bg-gradient-to-b ${a.bg} p-6 sm:p-7`}
                  style={{
                    backgroundColor: "rgba(5, 13, 8, 0.9)",
                  }}
                >
                  <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                    {a.title}
                  </h2>
                  <p
                    className={`mt-1 font-body text-xs font-bold uppercase tracking-[0.12em] ${a.textAccent}`}
                  >
                    {a.subtitle}
                  </p>

                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-white/65">
                    {a.description}
                  </p>

                  {/* Feature tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {a.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 font-body text-xs font-medium text-white/60"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* CTA button */}
                  <div className="mt-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-xl ${a.btnBg} px-5 py-2.5 font-body text-sm font-semibold text-white transition-all`}
                    >
                      Enter as {a.title}
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 font-body text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80"
          >
            Or explore without choosing a role
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
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
        </motion.div>
      </div>
    </div>
  );
}
