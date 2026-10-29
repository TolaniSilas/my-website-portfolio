"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

import { ThemeContext } from "./theme";

const applyTheme = (isDark: boolean) => {
  document.documentElement.classList.toggle("dark", isDark);
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const transitioning = useRef(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const nextDark = savedTheme === "dark";
    setIsDark(nextDark);
    applyTheme(nextDark);
  }, []);

  const toggleTheme = useCallback((event?: MouseEvent<HTMLButtonElement>) => {
    if (transitioning.current) return;
    const root = document.documentElement;
    const nextDark = !root.classList.contains("dark");
    const update = () => {
      setIsDark(nextDark);
      applyTheme(nextDark);
      try { localStorage.setItem("theme", nextDark ? "dark" : "light"); } catch { /* Theme still works when storage is unavailable. */ }
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      update();
      return;
    }
    transitioning.current = true;
    if (!document.startViewTransition) {
      root.classList.add("theme-fading");
      update();
      window.setTimeout(() => {
        root.classList.remove("theme-fading");
        transitioning.current = false;
      }, 1000);
      return;
    }
    const bounds = event?.currentTarget.getBoundingClientRect();
    const x = bounds ? bounds.left + bounds.width / 2 : window.innerWidth / 2;
    const y = bounds ? bounds.top + bounds.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root.classList.add("theme-revealing");
    const transition = document.startViewTransition(() => flushSync(update));
    void transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 1000, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    }).catch(() => { /* A skipped transition still applies the selected theme. */ });
    void transition.finished.catch(() => {}).finally(() => {
      root.classList.remove("theme-revealing");
      transitioning.current = false;
    });
  }, []);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
