import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { AudienceProvider } from "@/contexts/AudienceContext";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GRC AI Taskforce",
    template: "%s | GRC AI Taskforce",
  },
  description:
    "Green River College AI Taskforce — guiding responsible AI use for students, faculty, and staff.",
  keywords: [
    "Green River College",
    "AI",
    "artificial intelligence",
    "assessment scale",
    "education",
    "GenAI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Green River College AI Task Force",
                  url: "https://greenriver.edu",
                  description:
                    "Guiding responsible AI integration for students, faculty, and staff at Green River College.",
                },
                {
                  "@type": "WebSite",
                  name: "GRC AI Taskforce",
                  url: "https://greenriver.edu/ai-taskforce",
                  description:
                    "Find your instructor's AI policy level, explore 80+ tools, and learn to use AI ethically.",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <AudienceProvider>{children}</AudienceProvider>
      </body>
    </html>
  );
}
