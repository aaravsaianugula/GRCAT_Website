/* ------------------------------------------------------------------ */
/*  Reusable skeleton loader — card, text, and avatar variants         */
/* ------------------------------------------------------------------ */

interface SkeletonProps {
  variant?: "text" | "card" | "avatar";
  className?: string;
  /** Number of text lines (only for variant="text") */
  lines?: number;
}

export function Skeleton({ variant = "text", className = "", lines = 3 }: SkeletonProps) {
  if (variant === "avatar") {
    return <div className={`skeleton h-10 w-10 rounded-full ${className}`} />;
  }

  if (variant === "card") {
    return (
      <div className={`rounded-2xl border border-ever-green/[0.06] bg-white p-6 ${className}`}>
        <div className="skeleton mb-4 h-10 w-10 rounded-xl" />
        <div className="skeleton mb-3 h-5 w-3/4 rounded-md" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-full rounded-md" />
          <div className="skeleton h-3 w-5/6 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-3.5 rounded-md"
          style={{ width: i === lines - 1 ? "60%" : i % 2 === 0 ? "100%" : "85%" }}
        />
      ))}
    </div>
  );
}
