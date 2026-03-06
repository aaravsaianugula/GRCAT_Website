"use client";

import { useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { detectPageMentions, SITE_CONTENT, type PageContent } from "@/lib/data/site-content";

/* ------------------------------------------------------------------ */
/*  Intent detection — all navigation logic lives here, not in LLM    */
/* ------------------------------------------------------------------ */

const WALK_INTENTS = [
  "walk me through", "walk through", "guide me", "tour",
  "show me around", "explain each", "step by step",
];

const NAV_INTENTS = [
  "show me", "take me to", "go to", "navigate to",
  "open", "bring up", "pull up", "let me see", "where is",
  "find the", "explore the",
];

const TOPIC_INTENTS = [
  "what is", "what are", "tell me about", "how does", "how do",
  "explain", "describe", "help me with", "learn about",
  "understand", "more about", "info on", "information about",
];

interface DetectedIntent {
  page: PageContent;
  walkThrough: boolean;
}

function detectIntent(userMessage: string, aiResponse?: string): DetectedIntent | null {
  const lower = userMessage.toLowerCase();
  const aiLower = aiResponse?.toLowerCase() ?? "";

  const isWalkThrough = WALK_INTENTS.some((p) => lower.includes(p));
  const hasNavIntent = NAV_INTENTS.some((p) => lower.includes(p));
  const hasTopicIntent = TOPIC_INTENTS.some((p) => lower.includes(p));

  let best: { page: PageContent; score: number } | null = null;
  for (const page of Object.values(SITE_CONTENT)) {
    let score = 0;
    for (const kw of page.keywords) {
      if (lower.includes(kw)) score += 3;
    }
    if (lower.includes(page.title.toLowerCase())) score += 15;
    if (aiLower) {
      for (const kw of page.keywords) {
        if (aiLower.includes(kw)) score += 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { page, score };
    }
  }

  if (!best) return null;
  if (!isWalkThrough && !hasNavIntent && !hasTopicIntent && best.score < 15) return null;

  return { page: best.page, walkThrough: isWalkThrough };
}

/* ------------------------------------------------------------------ */
/*  Slash-command parsing — lightweight tool calls for small LLMs      */
/* ------------------------------------------------------------------ */

export interface SlashCommand {
  command: "nav" | "show" | "walk";
  args: Record<string, string>;
}

/**
 * Parse `/nav page=X`, `/show id=Y`, `/walk page=Z` from LLM response.
 * Small models handle this format reliably (trained on CLI + Discord patterns).
 */
export function parseSlashCommands(text: string): SlashCommand[] {
  const commands: SlashCommand[] = [];
  for (const match of text.matchAll(/\/(nav|show|walk)(?:\s+((?:[\w-]+=[\w-]+\s*)*))?/g)) {
    const args: Record<string, string> = {};
    if (match[2]) {
      for (const pair of match[2].trim().split(/\s+/)) {
        const eqIdx = pair.indexOf("=");
        if (eqIdx > 0) {
          args[pair.slice(0, eqIdx)] = pair.slice(eqIdx + 1);
        }
      }
    }
    commands.push({ command: match[1] as SlashCommand["command"], args });
  }
  return commands;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */
export function useAIActions() {
  const router = useRouter();
  const pathname = usePathname();
  const highlightTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearHighlights = useCallback(() => {
    for (const t of highlightTimers.current) clearTimeout(t);
    highlightTimers.current = [];
    document.querySelectorAll(".ai-highlight").forEach((el) => el.classList.remove("ai-highlight"));
  }, []);

  const highlightElement = useCallback((aiId: string, delay: number) => {
    const timer = setTimeout(() => {
      const el = document.querySelector(`[data-ai-id="${aiId}"]`);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ai-highlight");
      const removeTimer = setTimeout(() => el.classList.remove("ai-highlight"), 3500);
      highlightTimers.current.push(removeTimer);
    }, delay);
    highlightTimers.current.push(timer);
  }, []);

  const highlightSequence = useCallback((aiIds: string[], baseDelay: number) => {
    clearHighlights();
    aiIds.forEach((id, i) => {
      highlightElement(id, baseDelay + i * 2000);
    });
  }, [clearHighlights, highlightElement]);

  /** Strip LLM markers + slash commands from response text. */
  const cleanResponse = useCallback((raw: string): string => {
    return raw
      .replace(/\[(NAV|SHOW|LINK):[^\]]*\]/g, "")
      .replace(/\/(nav|show|walk)(?:\s+[\w-]+=[\w-]+)*/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }, []);

  /** Detect page mentions in AI response for clickable link pills. */
  const getPageLinks = useCallback((text: string) => {
    return detectPageMentions(text);
  }, []);

  /** Client-side navigation engine — reads user intent + AI response. */
  const executeSmartNav = useCallback((userMessage: string, aiResponse: string) => {
    const intent = detectIntent(userMessage, aiResponse);
    if (!intent) return;

    const needsNav = intent.page.route !== pathname;
    if (needsNav) {
      router.push(intent.page.route);
    }

    if (intent.page.aiIds.length > 0) {
      const baseDelay = needsNav ? 1000 : 200;
      if (intent.walkThrough) {
        highlightSequence(intent.page.aiIds.slice(0, 5), baseDelay);
      } else {
        highlightElement(intent.page.aiIds[0], baseDelay);
      }
    }
  }, [router, pathname, highlightElement, highlightSequence]);

  /** Execute first valid slash command from LLM response (small models sometimes spam). */
  const executeCommands = useCallback((commands: SlashCommand[]) => {
    const cmd = commands[0];
    if (!cmd) return;
    switch (cmd.command) {
        case "nav": {
          if (!cmd.args.page) break;
          const route = `/${cmd.args.page}`;
          const page = Object.values(SITE_CONTENT).find((p) => p.route === route);
          if (page && route !== pathname) {
            router.push(route);
          }
          if (page && page.aiIds.length > 0) {
            highlightElement(page.aiIds[0], route !== pathname ? 1000 : 200);
          }
          break;
        }
        case "show": {
          if (!cmd.args.id) break;
          const aiId = cmd.args.id;
          // Look up which page owns this ID
          const ownerPage = Object.values(SITE_CONTENT).find((p) => p.aiIds.includes(aiId));
          if (ownerPage && ownerPage.route !== pathname) {
            router.push(ownerPage.route);
          }
          highlightElement(aiId, ownerPage && ownerPage.route !== pathname ? 1000 : 200);
          break;
        }
        case "walk": {
          if (!cmd.args.page) break;
          const route = `/${cmd.args.page}`;
          const page = Object.values(SITE_CONTENT).find((p) => p.route === route);
          if (page) {
            const needsNav = route !== pathname;
            if (needsNav) router.push(route);
            highlightSequence(page.aiIds.slice(0, 5), needsNav ? 1000 : 200);
          }
          break;
        }
    }
  }, [router, pathname, highlightElement, highlightSequence]);

  return { cleanResponse, getPageLinks, executeSmartNav, executeCommands, currentPage: pathname };
}
