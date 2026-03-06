import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 font-body text-sm text-pine-cone/80">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-ever-green"
          >
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5 shrink-0 text-pine-cone/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="transition-colors hover:text-ever-green"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-pine-cone" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
