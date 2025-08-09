import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setIsDarkMode(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className={`rounded-lg shadow-sm m-2 sm:m-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div
        className={`w-full max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-center rounded-md transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <p
          className={`text-xs sm:text-sm text-center transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          © 2025 Developed with Love by{" "}
          <a
            href="/"
            className={`hover:underline transition-colors duration-200 ${
              isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
            }`}
          >
            Osunba Silas™
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
