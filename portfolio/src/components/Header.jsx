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
    `block py-2 pr-4 pl-3 rounded lg:p-0 
     ${isActive
       ? "text-blue-700 font-semibold dark:text-white"
       : "text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-white"}
    `;

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="bg-white dark:bg-black shadow-md px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-3">
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Logo"
            />
            <span className="text-xl font-bold dark:text-gray">Osunba Silas</span>
          </NavLink>

          {/* Right side: social, theme toggle, hamburger */}
          <div className="flex items-center gap-4 lg:order-2">
            {/* Social icons */}
            <a href="https://github.com/TolaniSilas" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="text-xl text-gray-700 dark:text-gray-300 hover:text-blue-600" />
            </a>
            <a href="https://www.linkedin.com/in/osunbasilas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="text-xl text-gray-700 dark:text-gray-300 hover:text-blue-600" />
            </a>
            <a href="https://x.com/thaguymaxx" target="_blank" rel="noopener noreferrer" aria-label="X">
              <FaXTwitter className="text-xl text-gray-700 dark:text-gray-300 hover:text-blue-600" />
            </a>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="h-5 w-5" aria-hidden="true" /> : <FaMoon className="h-5 w-5" aria-hidden="true" />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex items-center p-2 text-gray-500 rounded-md lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Toggle menu</span>
              {menuOpen ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 5h14M3 10h14M3 15h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Nav links */}
          <div
            id="mobile-menu"
            className={`${menuOpen ? "flex" : "hidden"} flex-col w-full lg:flex lg:flex-row lg:space-x-8 lg:w-auto lg:order-1 items-center mt-4 lg:mt-0`}
          >
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/projects" className={navLinkClasses}>Projects</NavLink>
            <NavLink to="/blog" className={navLinkClasses}>Blog</NavLink>
            <NavLink to="/research" className={navLinkClasses}>Research</NavLink>
            <NavLink
              to="/contact"
              className="mt-2 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
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
