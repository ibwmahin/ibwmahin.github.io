/**
 * Theme Provider Component
 *
 * Manages the application's theme state (light/dark mode) using React Context.
 * Provides theme toggle functionality and persists theme preference in localStorage.
 * Respects system preference on initial load if no user preference is stored.
 */

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeProviderContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeProviderContext = createContext<
  ThemeProviderContextType | undefined
>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * ThemeProvider component that wraps the app and provides theme context
 */
export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "portfolio-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    const systemTheme = mediaQuery.matches ? "dark" : "light";
    const initialTheme = (storedTheme || systemTheme) as Theme;

    // Apply initial theme to avoid flash
    root.classList.remove("light", "dark");
    root.classList.add(initialTheme);

    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme, isInitialized]);

  // Optional: Listen to system theme changes (only if no user preference stored)
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;

    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme) return; // Don't follow system if user has set a preference

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
      window.localStorage.setItem(storageKey, newTheme); // Persist as user preference now
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isInitialized, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, newTheme);
      }
      setTheme(newTheme);
    },
    toggleTheme: () => {
      const newTheme = theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, newTheme);
      }
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Hook to access theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
