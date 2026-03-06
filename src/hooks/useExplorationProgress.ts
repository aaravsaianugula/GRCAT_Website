"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "grc-exploration-progress";

interface ProgressData {
  pagesVisited: string[];
  quizCompleted: boolean;
  toolkitsViewed: string[];
}

const defaultData: ProgressData = {
  pagesVisited: [],
  quizCompleted: false,
  toolkitsViewed: [],
};

function loadProgress(): ProgressData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  } catch {
    return defaultData;
  }
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useExplorationProgress() {
  const [data, setData] = useState<ProgressData>(defaultData);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setData(loadProgress());
    setMounted(true);
  }, []);

  const trackPageVisit = useCallback((path: string) => {
    setData((prev) => {
      if (prev.pagesVisited.includes(path)) return prev;
      const next = { ...prev, pagesVisited: [...prev.pagesVisited, path] };
      saveProgress(next);
      return next;
    });
  }, []);

  const trackToolkitView = useCallback((slug: string) => {
    setData((prev) => {
      if (prev.toolkitsViewed.includes(slug)) return prev;
      const next = { ...prev, toolkitsViewed: [...prev.toolkitsViewed, slug] };
      saveProgress(next);
      return next;
    });
  }, []);

  const markQuizCompleted = useCallback(() => {
    setData((prev) => {
      const next = { ...prev, quizCompleted: true };
      saveProgress(next);
      return next;
    });
  }, []);

  // Total trackable items: ~12 main pages + quiz + ~6 toolkits = ~19
  const totalItems = 19;
  const completedItems =
    data.pagesVisited.length + (data.quizCompleted ? 1 : 0) + data.toolkitsViewed.length;
  const percentage = mounted ? Math.min(Math.round((completedItems / totalItems) * 100), 100) : 0;

  return {
    data,
    percentage,
    mounted,
    trackPageVisit,
    trackToolkitView,
    markQuizCompleted,
    categories: {
      pages: { count: data.pagesVisited.length, label: "Pages Visited" },
      quiz: { done: data.quizCompleted, label: "Quiz" },
      toolkits: { count: data.toolkitsViewed.length, label: "Toolkits Viewed" },
    },
  };
}
