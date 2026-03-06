"use client";

import { useState, useId, useCallback, useRef, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springDefault } from "@/lib/animations/motion";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
}

function AccordionEntry({
  item,
  isOpen,
  onToggle,
  triggerRef,
  onKeyDown,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
  onKeyDown: (e: ReactKeyboardEvent<HTMLButtonElement>) => void;
}) {
  const id = useId();
  const buttonId = `${id}-btn`;
  const panelId = `${id}-panel`;

  return (
    <div className="overflow-hidden rounded-3xl border border-ever-green/[0.06] bg-white">
      <button
        ref={triggerRef}
        id={buttonId}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between p-6 text-left font-heading text-lg font-bold text-ever-green sm:p-8"
      >
        <span className="pr-4">{item.question}</span>
        <motion.svg
          className="h-5 w-5 shrink-0 text-pine-cone/55"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={springDefault}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springDefault}
          >
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="px-6 pb-6 sm:px-8 sm:pb-8"
            >
              <p className="font-body text-base leading-relaxed text-pine-cone/70">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items, defaultOpen }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleKeyDown = useCallback(
    (index: number, e: ReactKeyboardEvent<HTMLButtonElement>) => {
      const count = items.length;
      let targetIndex: number | null = null;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          targetIndex = (index + 1) % count;
          break;
        case "ArrowUp":
          e.preventDefault();
          targetIndex = (index - 1 + count) % count;
          break;
        case "Home":
          e.preventDefault();
          targetIndex = 0;
          break;
        case "End":
          e.preventDefault();
          targetIndex = count - 1;
          break;
        default:
          return;
      }

      triggerRefs.current[targetIndex]?.focus();
    },
    [items.length]
  );

  return (
    <div className="space-y-3" role="list">
      {items.map((item, i) => (
        <AccordionEntry
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => handleToggle(i)}
          triggerRef={(el) => {
            triggerRefs.current[i] = el;
          }}
          onKeyDown={(e) => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}
