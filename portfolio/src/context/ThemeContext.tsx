"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ThemeContext } from "./theme";

const applyTheme = (isDark: boolean) => {
  document.documentElement.classList.toggle("dark", isDark);
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const nextDark = savedTheme === "dark";
    setIsDark(nextDark);
    applyTheme(nextDark);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const nextDark = !prev;
      applyTheme(nextDark);
      localStorage.setItem("theme", nextDark ? "dark" : "light");
      return nextDark;
    });
  }, []);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
