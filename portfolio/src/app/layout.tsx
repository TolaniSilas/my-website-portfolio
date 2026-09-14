import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { ContentProvider, ContentStatus } from "../context/ContentContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://osunbasilasdev.vercel.app"),
  title: { default: "Silas Osunba | Machine Learning Engineer & Researcher", template: "%s | Silas Osunba" },
  description: "Silas Osunba — machine learning engineer and researcher building intelligent, energy-aware systems. Explore selected projects, research, and technical writing.",
  icons: { icon: "/images/identity-image.png" },
  openGraph: { type: "website", title: "Silas Osunba", description: "Building intelligent and energy-aware systems.", images: [{ url: "/images/identity-image.png", alt: "Silas Osunba" }] },
  twitter: { card: "summary_large_image", images: ["/images/identity-image.png"] },
};
export const viewport: Viewport = { themeColor: "#fbf6eb" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
        <ContentProvider>
          <div className="flex min-h-screen flex-col bg-canvas text-ink dark:bg-canvas-dark dark:text-ink-dark">
            <a href="#main-content" className="skip-link">Skip to content</a>
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow"><ContentStatus />{children}</main>
            <Footer />
          </div>
        </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
