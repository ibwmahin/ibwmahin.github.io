import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  links?: NavLink[];
  logoText?: string;
  onSignIn?: () => void;
}

const Header = ({
  links = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ],
  logoText = "ibwmahin",
  onSignIn = () => console.log("Connect clicked"),
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // rAF-throttled scroll listener to set "isScrolled"
  const updateScrollState = useCallback(() => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    setIsScrolled((prev) => {
      const next = y > 20;
      return prev === next ? prev : next;
    });
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };
    updateScrollState(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateScrollState]);

  // Close mobile menu with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollToSection = (href: string) => {
    if (!href.startsWith("#")) return;
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((s) => !s);

  // Only the nav links box blurs on scroll
  const desktopNavBoxClass = `flex items-center space-x-6 px-4 py-2 border-2 shadow-sm rounded-lg transition-all duration-300 ${
    isScrolled
      ? "backdrop-blur-sm bg-slate-900/75 border-white/10"
      : "bg-black/20 border-white/6"
  }`;

  // motion variants (super minimal)
  const navContainerVariants: Variants = reduceMotion
    ? {}
    : {
        animate: {
          transition: { staggerChildren: 0.035, delayChildren: 0.08 },
        },
      };

  const navItemVariants: Variants = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 6 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.28, ease: "easeOut" },
        },
      };

  const mobileMenuVariants: Variants = reduceMotion
    ? {}
    : {
        closed: {
          x: "100%",
          opacity: 0,
          transition: { duration: 0.28, ease: "easeInOut" },
        },
        open: {
          x: "0%",
          opacity: 1,
          transition: { duration: 0.32, ease: "easeInOut" },
        },
      };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <nav
        aria-label="Primary"
        className="container mx-auto max-w-6xl flex items-center justify-center h-16 px-4"
        role="navigation"
      >
        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
          className="md:hidden absolute right-4 top-3 z-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="currentColor"
                d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0 0-1.4z"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="currentColor"
                d="M4 6h16a1 1 0 1 0 0-2H4a1 1 0 1 0 0 2zm16 7H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2zM4 20h16a1 1 0 1 0 0-2H4a1 1 0 1 0 0 2z"
              />
            </svg>
          )}
        </button>

        {/* Desktop layout */}
        <div className="hidden md:flex md:items-center md:justify-between md:w-full gap-12">
          {/* Logo (hides on scroll) */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -6 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={isScrolled ? "pointer-events-none" : ""}
          >
            <button
              onClick={() => scrollToSection("#hero")}
              className="text-xl font-extrabold uppercase tracking-tighter flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              <span className="text-white">{logoText}</span>
              <span
                className="w-2 h-2 rounded-full bg-cyan-500 inline-block"
                aria-hidden
              />
            </button>
          </motion.div>

          {/* NAV LINKS BOX (only this area blurs on scroll) */}
          <motion.div
            className={desktopNavBoxClass}
            initial={reduceMotion ? undefined : "initial"}
            animate="animate"
            variants={navContainerVariants}
          >
            {links.map((link) =>
              link.href.startsWith("#") ? (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  variants={navItemVariants}
                  className="text-sm font-bold uppercase text-white relative group px-1 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.button>
              ) : (
                <motion.div key={link.href} variants={navItemVariants}>
                  <Link
                    to={link.href}
                    className="text-sm font-bold uppercase text-white relative group px-1 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                    <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </motion.div>
              ),
            )}
          </motion.div>

          {/* Connect CTA (hides on scroll) */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -6 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={isScrolled ? "pointer-events-none" : ""}
          >
            <motion.button
              onClick={() => {
                onSignIn();
                scrollToSection("#contact");
              }}
              whileHover={reduceMotion ? {} : { scale: 1.03 }}
              className="inline-flex items-center gap-2 bg-cyan-500 text-black border-2 border-transparent text-sm font-semibold uppercase px-4 py-2 rounded-md shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
            >
              Connect{" "}
              <span className="text-xl" aria-hidden>
                ☎
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile slide-in menu */}
        <motion.div
          aria-hidden={!isMenuOpen}
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
          className="md:hidden fixed top-16 left-0 right-0 h-[calc(100vh-4rem)] bg-slate-900 text-white transform flex flex-col items-center justify-center space-y-6 px-6"
        >
          <button
            onClick={() => scrollToSection("#hero")}
            className="text-xl font-extrabold uppercase tracking-tighter text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            {logoText}
          </button>

          <nav className="flex flex-col items-center gap-4 w-full max-w-md">
            {links.map((link) =>
              link.href.startsWith("#") ? (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="w-full text-center text-sm font-bold uppercase text-white relative group py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  {link.label}
                  <span className="absolute left-6 bottom-3 w-6 h-[2px] bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center text-sm font-bold uppercase text-white relative group py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <button
            onClick={() => {
              onSignIn();
              setIsMenuOpen(false);
              scrollToSection("#contact");
            }}
            className="bg-cyan-500 text-black border-2 border-transparent text-sm font-semibold uppercase px-4 py-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
          >
            Connect{" "}
            <span className="text-xl" aria-hidden>
              ☎
            </span>
          </button>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
