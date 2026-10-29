import { createContext, useContext, type MouseEvent } from "react";

type ThemeContextValue = { isDark: boolean; toggleTheme: (event?: MouseEvent<HTMLButtonElement>) => void };
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
