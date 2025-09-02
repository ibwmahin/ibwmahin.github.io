import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // only the nav links box will blur/become opaque when scrolled
  const desktopNavBoxClass = `flex items-center space-x-6 px-4 py-2 border-2 shadow-sm rounded-lg transition-all duration-300 ${
    isScrolled
      ? "backdrop-blur-sm bg-slate-900/75 border-white/10"
      : "bg-black/20 border-white/6"
  }`;

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
          {/* Logo */}
          <div
            className={`transition-opacity duration-300 ${
              isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <button
              onClick={() => scrollToSection("#hero")}
              className="text-xl font-extrabold uppercase tracking-tighter flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              <span>{logoText}</span>
              <span
                className="w-2 h-2 rounded-full bg-cyan-500 inline-block"
                aria-hidden
              />
            </button>
          </div>

          {/* NAV LINKS BOX (only this area blurs on scroll) */}
          <div className={desktopNavBoxClass}>
            {links.map((link) =>
              link.href.startsWith("#") ? (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-bold uppercase text-white relative group px-1 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-bold uppercase text-white relative group px-1 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              ),
            )}
          </div>

          {/* Connect CTA (keeps its visibility; not blurred) */}
          <div
            className={`transition-opacity duration-300 ${
              isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <button
              onClick={onSignIn}
              className="inline-flex items-center gap-2 bg-cyan-500 text-black border-2 border-transparent text-sm font-semibold uppercase px-4 py-2 rounded-md shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
            >
              <a href="#contact" className="flex items-center gap-2">
                Connect{" "}
                <span className="text-xl" aria-hidden>
                  ☎
                </span>
              </a>
            </button>
          </div>
        </div>

        {/* Mobile slide-in menu (unchanged) */}
        <div
          aria-hidden={!isMenuOpen}
          className={`md:hidden fixed top-16 left-0 right-0 h-[calc(100vh-4rem)] bg-slate-900 text-white transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col items-center justify-center space-y-6 px-6`}
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
            }}
            className="bg-cyan-500 text-black border-2 border-transparent text-sm font-semibold uppercase px-4 py-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
          >
            Connect{" "}
            <span className="text-xl" aria-hidden>
              ☎
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
