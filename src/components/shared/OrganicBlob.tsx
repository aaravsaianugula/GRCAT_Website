"use client";

interface OrganicBlobProps {
  color: string;
  size?: "sm" | "md" | "lg";
  position?: string;
  className?: string;
}

const sizeMap = {
  sm: "h-[200px] w-[200px]",
  md: "h-[400px] w-[400px]",
  lg: "h-[600px] w-[600px]",
};

export function OrganicBlob({
  color,
  size = "md",
  position = "",
  className = "",
}: OrganicBlobProps) {
  return (
    <div
      className={`pointer-events-none absolute blob-shape ${sizeMap[size]} ${color} blur-[60px] opacity-[0.06] hidden sm:block ${position} ${className}`}
      aria-hidden="true"
    />
  );
}
