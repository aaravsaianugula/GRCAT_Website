"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Audience = "student" | "faculty" | "staff" | null;

interface AudienceContextValue {
  audience: Audience;
  setAudience: (audience: Audience) => void;
  hasChosen: boolean;
}

const AudienceContext = createContext<AudienceContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "grc-ai-audience";
const COOKIE_NAME = "grc-audience";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setCookie(value: string) {
  document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

function getCookie(): Audience {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
  );
  if (match) {
    const val = match[1];
    if (val === "student" || val === "faculty" || val === "staff") return val;
  }
  return null;
}

function getStoredAudience(): Audience {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "student" || stored === "faculty" || stored === "staff") {
    return stored;
  }
  return getCookie();
}

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setAudienceState(getStoredAudience());
    setMounted(true);
  }, []);

  const setAudience = useCallback((newAudience: Audience) => {
    setAudienceState(newAudience);
    if (newAudience) {
      localStorage.setItem(STORAGE_KEY, newAudience);
      setCookie(newAudience);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = `${COOKIE_NAME}=;path=/;max-age=0`;
    }
  }, []);

  return (
    <AudienceContext.Provider
      value={{
        audience: mounted ? audience : null,
        setAudience,
        hasChosen: mounted && audience !== null,
      }}
    >
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience(): AudienceContextValue {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error("useAudience must be used within AudienceProvider");
  }
  return context;
}
