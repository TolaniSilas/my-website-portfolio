"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFileAlt, FaGithub, FaLinkedin, FaMoon, FaSun } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from "../context/theme";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinkClasses = (href: string) =>
    `block rounded-full px-2 py-2 text-sm transition ${
      (pathname === href || (href === "/articles" && pathname === "/blog"))
        ? "text-accent font-semibold dark:text-gold"
        : "text-muted hover:text-ink dark:text-muted-dark dark:hover:text-ink-dark"
    }`;

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="border-b border-line/70 bg-canvas/80 px-4 backdrop-blur-xl transition-colors duration-300 sm:px-6 md:px-10 xl:px-6 dark:border-line-dark/70 dark:bg-canvas-dark/80">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-surface font-display text-sm font-semibold text-accent dark:bg-surface-dark dark:text-gold">
              SO
            </span>
            <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
              Silas Osunba
            </span>
          </Link>

          <div className="header-actions flex items-center gap-3 text-sm xl:order-2 sm:gap-4">
            <a
              href="https://github.com/TolaniSilas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition hover:text-accent dark:text-muted-dark dark:hover:text-gold"
            >
              <FaGithub className="text-lg sm:text-xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/osunbasilas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition hover:text-accent dark:text-muted-dark dark:hover:text-gold"
            >
              <FaLinkedin className="text-lg sm:text-xl" />
            </a>
            <a
              href="https://x.com/thaguymaxx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-muted transition hover:text-accent dark:text-muted-dark dark:hover:text-gold"
            >
              <FaXTwitter className="text-lg sm:text-xl" />
            </a>

            <button
              onClick={toggleTheme}
              className="rounded-full border border-line p-2 text-ink transition hover:border-gold dark:border-line-dark dark:text-ink-dark"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <FaSun className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              ) : (
                <FaMoon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex items-center rounded-md p-2 text-ink xl:hidden dark:text-ink-dark"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Toggle menu</span>
              {menuOpen ? (
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          <div
            id="mobile-menu"
            className={`${
              menuOpen ? "flex" : "hidden"
            } mt-3 w-full flex-col items-center xl:order-1 xl:mt-0 xl:flex xl:w-auto xl:flex-row xl:space-x-2 2xl:space-x-4`}
          >
            <a
              href="https://docs.google.com/document/d/12pPsc9r_XsGnkyR1deLyTiweF9qSkJoHtXVpVNV7PqM/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm text-muted hover:text-accent dark:text-muted-dark dark:hover:text-gold"
              onClick={() => setMenuOpen(false)}
            >
              <FaFileAlt aria-hidden="true" /> CV
            </a>
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/research", label: "Research" },
              { href: "/projects", label: "Projects" },
              { href: "/articles", label: "Articles" },
              { href: "/books", label: "Books" },
              { href: "/list66", label: "List66" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} aria-current={pathname === href || (href === "/articles" && pathname === "/blog") ? "page" : undefined} className={navLinkClasses(href)} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-2 px-5 py-2 xl:mt-0"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
