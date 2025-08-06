import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaMoon, FaSun } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme to <html>
  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      const isDark = savedTheme === "dark";
      setDarkMode(isDark);
      applyTheme(isDark);
    } else {
      // Fallback: system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      applyTheme(prefersDark);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newDark = !prev;
      applyTheme(newDark);
      localStorage.setItem("theme", newDark ? "dark" : "light");
      return newDark;
    });
  };

  // NavLink styling helper
  const navLinkClasses = ({ isActive }) =>
    `block py-2 px-3 rounded text-sm md:text-base transition
     ${
       isActive
         ? darkMode
           ? "text-blue-400 font-semibold"
           : "text-blue-600 font-semibold"
         : darkMode
         ? "text-white hover:text-blue-400"
         : "text-gray-700 hover:text-blue-600"
     }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`shadow-md px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300 
        ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"}
      `}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-3">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 sm:h-7 md:h-8"
              alt="Logo"
            />
            <span className="text-lg sm:text-xl font-bold">Osunba Silas</span>
          </NavLink>

          {/* Right side: social, theme toggle, hamburger */}
          <div className="flex items-center gap-3 sm:gap-4 lg:order-2 text-sm sm:text-base">
            {/* Social icons */}
            <a
              href="https://github.com/TolaniSilas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub
                className={`text-lg sm:text-xl transition-colors ${
                  darkMode
                    ? "text-white hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/osunbasilas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin
                className={`text-lg sm:text-xl transition-colors ${
                  darkMode
                    ? "text-white hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              />
            </a>
            <a
              href="https://x.com/thaguymaxx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <FaXTwitter
                className={`text-lg sm:text-xl transition-colors ${
                  darkMode
                    ? "text-white hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              />
            </a>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              ) : (
                <FaMoon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`inline-flex items-center p-2 rounded-md lg:hidden ${
                darkMode
                  ? "text-white hover:bg-gray-800"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Toggle menu</span>
              {menuOpen ? (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Nav links */}
          <div
            id="mobile-menu"
            className={`${
              menuOpen ? "flex" : "hidden"
            } flex-col w-full lg:flex lg:flex-row lg:space-x-6 lg:w-auto lg:order-1 items-center mt-3 lg:mt-0 text-sm sm:text-base`}
          >
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/projects" className={navLinkClasses}>
              Projects
            </NavLink>
            <NavLink to="/blog" className={navLinkClasses}>
              Blog
            </NavLink>
            <NavLink to="/research" className={navLinkClasses}>
              Research
            </NavLink>
            <NavLink
              to="/contact"
              className="mt-2 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 sm:py-2 sm:px-6 rounded shadow-md transition-all text-sm sm:text-base"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
