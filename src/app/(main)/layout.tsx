import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingCTA } from "@/components/shared/FloatingCTA";
import { WhatsNewBanner } from "@/components/shared/WhatsNewBanner";
import { ProgressIndicator } from "@/components/shared/ProgressIndicator";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ever-green focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <WhatsNewBanner
        message="AI Assessment Scale updates for Spring 2026"
        link="/assessment-scale"
        linkLabel="See what changed"
      />
      <main id="main-content" className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      <SiteFooter />
      <FloatingCTA />
      <ProgressIndicator />
    </>
  );
}
