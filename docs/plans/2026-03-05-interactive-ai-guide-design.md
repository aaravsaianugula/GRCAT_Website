# Interactive AI Guide — Floating Window with Site Navigation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the AI chatbot from a static playground widget into a floating, site-aware guide that navigates users to pages, highlights elements, and walks them through the website in real time.

**Architecture:** Global floating chat widget (bubble to draggable panel) mounted in the main layout. AI responses contain action markers that the client parses and executes. A lightweight content registry provides page-specific context to the API without bloating the system prompt. Smart round-robin model rotation avoids rate limits across 3 free OpenRouter models.

**Tech Stack:** Next.js 16 (App Router), React 19, Framer Motion, OpenRouter (free Gemma/Liquid models), Tailwind CSS 4

---

## Tasks

1. Create site content registry (src/lib/data/site-content.ts)
2. Rewrite API route with smart model rotation + page context + action markers
3. Create AI actions hook (src/hooks/useAIActions.ts)
4. Rewrite AIChat for floating mode + action support
5. Create FloatingAIGuide widget (src/components/ai-guide/FloatingAIGuide.tsx)
6. Mount in layout + add highlight CSS
7. Update playground page (remove embedded chat)
8. Add data-ai-id attributes to key page sections
9. Verify and test live

See implementation details in the session that created this plan.
