import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 py-2.5 sm:px-8 sm:py-3 md:px-12 md:py-4 lg:px-16 lg:py-5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo and Branding */}
          <a href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Osunba Silas
            </span>
          </a>

          {/* Socials, Dark Mode, Hamburger */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 lg:order-2">
            {/* Social Icons */}
            <a href="https://github.com/TolaniSilas" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width="20" height="20" />
            </a>
            <a href="https://www.linkedin.com/in/osunbasilas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" width="20" height="20" />
            </a>
            <a href="https://x.com/thaguymaxx" target="_blank" rel="noopener noreferrer" aria-label="X">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" alt="X" width="20" height="20" />
            </a>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                // Sun icon for light mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.24 4.24l-.71-.71M6.34 6.34l-.71-.71" />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>
            {/* Hamburger button */}
            <button
              type="button"
              className="inline-flex items-center p-2 ml-4 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${menuOpen ? "hidden" : "block"} w-6 h-6`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${menuOpen ? "block" : "hidden"} w-6 h-6`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Menu */}
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } w-full justify-center lg:justify-between items-center lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu"
          >
            <ul className="flex flex-col items-center mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="/"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/Projects"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="Blog"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="Research"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Research
                </a>
              </li>
              <li>
                <a href="#" className="block w-full lg:w-auto">
                  <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-colors duration-200">
                    Contact
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;