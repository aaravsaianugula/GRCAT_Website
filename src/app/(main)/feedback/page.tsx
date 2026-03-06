"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useAudience } from "@/contexts/AudienceContext";
import { PageTransition } from "@/components/shared/PageTransition";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const audienceIntro = {
  student: "Share your experience with AI tools and resources at GRC.",
  faculty: "Help us improve AI resources, toolkits, and training for educators.",
  staff: "Share feedback on AI tools, policies, and operational resources.",
};

const audienceTopics = {
  student: ["AI tool recommendations", "Course resources", "Ethical concerns"],
  faculty: ["Assessment design", "Toolkit feedback", "Training requests", "Policy suggestions"],
  staff: ["Workflow tools", "Privacy concerns", "Training needs"],
};

const roleMap: Record<string, string> = {
  student: "student",
  faculty: "faculty",
  staff: "staff",
};

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function FeedbackPage() {
  const { audience } = useAudience();
  const [selectedRole, setSelectedRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (audience) {
      setSelectedRole(roleMap[audience]);
    }
  }, [audience]);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!message.trim()) errs.message = "Message is required.";
    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role: audience, message }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setIsSubmitted(true);
    } catch {
      setErrors({ message: "Failed to submit. Please try again." });
    }
    setIsSubmitting(false);
  }

  const intro = audience
    ? audienceIntro[audience]
    : "Help us improve. Share your thoughts on AI resources, policies, or this website.";

  const topics = audience ? audienceTopics[audience] : null;

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill bg-gator-green/10 px-3.5 py-1 font-body text-sm font-bold uppercase tracking-[0.12em] text-gator-green">
            Contact
          </span>
          <h1 className="text-title font-heading font-extrabold text-pine-cone">
            Give Us Feedback
          </h1>
          <motion.p
            key={audience ?? "default"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 text-subtitle font-body text-pine-cone/60"
          >
            {intro}
          </motion.p>
        </div>

        {/* Suggested Topics */}
        {topics && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <p className="text-center font-body text-sm font-semibold text-pine-cone/70">
              Suggested topics for you:
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex rounded-pill border border-ever-green/[0.08] bg-white px-3.5 py-1.5 font-body text-sm text-pine-cone/70 shadow-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Primary Contact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mx-auto mt-10 max-w-xl rounded-3xl border border-ever-green/[0.06] bg-white p-6 sm:p-8"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gator-green/10">
              <svg className="h-7 w-7 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h2 className="mt-4 font-heading text-lg font-bold text-pine-cone">
              Ari Wilber{" "}
              <span className="font-body text-sm font-normal text-pine-cone/70">(she/her)</span>
            </h2>
            <p className="mt-1 font-body text-sm font-semibold text-pine-cone/70">
              English Faculty &middot; eLearning &middot; AI &amp; Course Design
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:awilber@greenriver.edu"
                className="inline-flex items-center gap-2 rounded-xl border border-ever-green/[0.06] bg-surface-dim/50 px-4 py-2 font-body text-sm text-pine-cone/70 transition-colors hover:bg-gator-green/5"
              >
                <svg className="h-4 w-4 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                awilber@greenriver.edu
              </a>
              <span className="inline-flex items-center gap-2 rounded-xl border border-ever-green/[0.06] bg-surface-dim/50 px-4 py-2 font-body text-sm text-pine-cone/70">
                <svg className="h-4 w-4 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Ext. 2090
              </span>
            </div>
          </div>
        </motion.div>

        {/* Contact info */}
        <div className="mx-auto mt-4 flex max-w-xl flex-wrap justify-center gap-6">
          <a
            href="mailto:aitaskforce@greenriver.edu"
            className="flex items-center gap-3 rounded-2xl border border-ever-green/[0.06] bg-white px-5 py-3 transition-colors hover:bg-gator-green/5"
          >
            <svg className="h-5 w-5 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="font-body text-sm text-pine-cone/70">aitaskforce@greenriver.edu</span>
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-ever-green/[0.06] bg-white px-5 py-3">
            <svg className="h-5 w-5 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
            </svg>
            <span className="font-body text-sm text-pine-cone/70">12401 SE 320th St, Auburn, WA 98092</span>
          </div>
        </div>

        <ScrollReveal>
        <div data-ai-id="feedback-form" className="mx-auto mt-10 max-w-xl rounded-3xl border border-ever-green/[0.06] bg-white p-8 sm:p-10">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gator-green/10">
                  <svg className="h-8 w-8 text-gator-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="mt-6 font-heading text-2xl font-bold text-pine-cone">
                  Thank you for your feedback!
                </h2>
                <p className="mt-3 max-w-sm font-body text-base text-pine-cone/60">
                  Your message has been received. The AI Task Force team will review it and follow up if needed.
                </p>
                <p className="mt-3 rounded-lg bg-sunrise-orange/10 px-4 py-2 font-body text-sm text-sunrise-orange">
                  This is a demo — no data is sent.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                    setSelectedRole(audience ? roleMap[audience] : "");
                    setErrors({});
                  }}
                  className="mt-8 rounded-xl border border-ever-green/10 px-6 py-2.5 font-body text-sm font-semibold text-pine-cone/70 transition-colors hover:bg-surface-dim/50"
                >
                  Submit another response
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <label htmlFor="name" className="block font-body text-sm font-semibold text-pine-cone/70">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 font-body text-base text-pine-cone outline-none transition-colors focus:border-gator-green/30 focus:ring-2 focus:ring-gator-green/10 ${errors.name ? "border-red-400 bg-red-50/50" : "border-ever-green/10 bg-surface-dim/50"}`}
                    placeholder="Your name"
                  />
                  {errors.name && <p id="name-error" role="alert" className="mt-1.5 font-body text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-sm font-semibold text-pine-cone/70">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 font-body text-base text-pine-cone outline-none transition-colors focus:border-gator-green/30 focus:ring-2 focus:ring-gator-green/10 ${errors.email ? "border-red-400 bg-red-50/50" : "border-ever-green/10 bg-surface-dim/50"}`}
                    placeholder="you@greenriver.edu"
                  />
                  {errors.email && <p id="email-error" role="alert" className="mt-1.5 font-body text-sm text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="role" className="block font-body text-sm font-semibold text-pine-cone/70">Role</label>
                  <select
                    id="role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-ever-green/10 bg-surface-dim/50 px-4 py-3 font-body text-base text-pine-cone outline-none transition-colors focus:border-gator-green/30 focus:ring-2 focus:ring-gator-green/10"
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block font-body text-sm font-semibold text-pine-cone/70">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`mt-1.5 w-full resize-none rounded-xl border px-4 py-3 font-body text-base text-pine-cone outline-none transition-colors focus:border-gator-green/30 focus:ring-2 focus:ring-gator-green/10 ${errors.message ? "border-red-400 bg-red-50/50" : "border-ever-green/10 bg-surface-dim/50"}`}
                    placeholder="Your feedback..."
                  />
                  {errors.message && <p id="message-error" role="alert" className="mt-1.5 font-body text-sm text-red-500">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-ever-green px-6 py-3.5 font-body text-base font-semibold text-white transition-all hover:bg-grc-green disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Feedback"
                  )}
                </button>
                <p className="mt-3 text-center font-body text-xs text-pine-cone/80">
                  This is a demo — no data is sent.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
