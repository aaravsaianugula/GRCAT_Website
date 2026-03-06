"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAudience } from "@/contexts/AudienceContext";
import { PageTransition } from "@/components/shared/PageTransition";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import Link from "next/link";

export default function BestPracticesRedirect() {
  const { audience, hasChosen } = useAudience();
  const router = useRouter();

  useEffect(() => {
    if (hasChosen && audience) {
      const map = { student: "students", faculty: "faculty", staff: "staff" };
      router.replace(`/best-practices/${map[audience]}`);
    }
  }, [audience, hasChosen, router]);

  // If no audience chosen, show a selector
  if (!hasChosen || !audience) {
    return (
      <PageTransition>
        <div data-ai-id="best-practices-hero" className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
          <h1 className="text-title font-heading font-extrabold text-pine-cone">
            Best Practices
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg text-pine-cone/70">
            Choose your role to see AI best practices tailored for you.
          </p>
          <ScrollReveal>
          <div data-ai-id="best-practices-cards" className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Students", href: "/best-practices/students", color: "card-accent-blue", desc: "Ethical AI use, study tips, and academic integrity guidelines." },
              { label: "Faculty", href: "/best-practices/faculty", color: "card-accent-green", desc: "Teaching with AI, assessment design, and syllabus policies." },
              { label: "Staff", href: "/best-practices/staff", color: "card-accent-orange", desc: "AI for operations, FERPA compliance, and workflow tools." },
            ].map((role) => (
              <Link
                key={role.label}
                href={role.href}
                className={`${role.color} rounded-3xl p-8 transition-all hover:-translate-y-1 hover:shadow-elevated`}
              >
                <h2 className="font-heading text-xl font-bold text-pine-cone">{role.label}</h2>
                <p className="mt-3 font-body text-sm text-pine-cone/70">{role.desc}</p>
              </Link>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </PageTransition>
    );
  }

  // Loading state while redirecting
  return (
    <PageTransition>
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="font-body text-base text-pine-cone/60">Loading best practices...</p>
      </div>
    </PageTransition>
  );
}
