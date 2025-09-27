// src/components/Navigation.tsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faFolderOpen,
  faEnvelope,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "./ThemeProvider";
import { Link, useLocation } from "react-router-dom";

/**
 * Top-centered navigation bar (Apple-like/clean)
 */
export function Navigation(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // nav items definition (useMemo for stable identity)
  const navItems = useMemo(
    () => [
      { path: "/", icon: faHome, label: "Home" },
      { path: "/about", icon: faUser, label: "About" },
      { path: "/projects", icon: faFolderOpen, label: "Projects" },
      { path: "/contact", icon: faEnvelope, label: "Contact" },
    ],
    [],
  );

  // treat prefixes like /blog/:slug as active when checking /blog
  function isActive(path: string) {
    if (path === "/blog") {
      return (
        location.pathname === "/blog" || location.pathname.startsWith("/blog/")
      );
    }
    // exact match is OK for all other routes
    return location.pathname === path;
  }

  // nav entrance animation variants
  const navAnim = {
    hidden: { y: -28, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <div
      aria-hidden={false}
      className="fixed left-1/2 top-4 transform -translate-x-1/2 z-50 sm:top-4 md:top-6"
    >
      <motion.nav
        role="navigation"
        aria-label="Primary"
        initial="hidden"
        animate="enter"
        variants={navAnim}
        className="pointer-events-auto bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/6 dark:border-white/20 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3 min-w-[320px] md:min-w-[520px]"
      >
        {/* Left: nav items */}
        <ul
          className="flex items-center gap-2"
          role="menubar"
          aria-label="Main menu"
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            const safeId = `tooltip-${(item.path || "").replace(/[^a-zA-Z0-9]/g, "") || "home"}`;
            return (
              <li key={item.path} role="none" className="relative">
                <Link
                  to={item.path}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  aria-describedby={safeId}
                  title={item.label}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/40
                    ${active ? "bg-primary text-primary-foreground shadow-inner" : "hover:bg-white/10 dark:hover:bg-white/6"}`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                  <span className="sr-only">{item.label}</span>
                </Link>

                {/* Accessible tooltip (CSS based) */}
                <div
                  id={safeId}
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-1 text-xs font-medium bg-black/85 text-white shadow-md opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-150
                    dark:bg-white/12 dark:text-white"
                  // we want keyboard users to see tooltip when focused, so show it on focus within via CSS sibling rules is preferable.
                />
              </li>
            );
          })}
        </ul>

        {/* spacer */}
        <div className="flex-1" />

        {/* Theme toggle */}
        <div className="relative">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-describedby="tooltip-theme"
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 dark:hover:bg-white/6 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/40"
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              className="w-4 h-4"
            />
            <span className="sr-only">Toggle theme</span>
          </button>

          <div
            id="tooltip-theme"
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-1 text-xs font-medium bg-black/85 text-white shadow-md opacity-0 scale-95 translate-y-1 focus-within:opacity-100 focus-within:scale-100 focus-within:translate-y-0 transition-all duration-150 dark:bg-white/12 dark:text-white"
          >
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
          </div>
        </div>

        {/* LinkedIn CTA */}
        <motion.a
          href="https://www.linkedin.com/in/ibwmahin/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Start chat on LinkedIn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="hidden sm:inline-flex px-3 py-1.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/40"
          title="Start chat on LinkedIn"
        >
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
            <span className="relative">
              Chat
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-primary/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </div>
        </motion.a>
      </motion.nav>
    </div>
  );
}
