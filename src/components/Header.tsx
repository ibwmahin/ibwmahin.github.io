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
    { label: "Home", href: "/" },
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <nav
        aria-label="Primary"
        className="container flex items-center justify-center h-16 px-4"
      >
        {/* Hamburger Button (visible on small screens) */}
        <button
          className="md:hidden absolute right-4 text-[hsl(var(--dark))] text-2xl font-bold focus:outline-none border-2 border-[hsl(var(--dark))] px-2 py-1"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        {/* Desktop Layout: Logo, Nav Links, Connect Button */}
        <div className="hidden md:flex md:items-center md:justify-between md:w-full gap-12">
          {/* Logo */}
          <div
            className={`transition-opacity duration-300 ${
              isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <button
              onClick={() => scrollToSection("#hero")}
              className="text-xl font-extrabold uppercase tracking-tighter text-[hsl(var(--dark))] hover:[text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]"
            >
              {logoText}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`flex items-center space-x-6 px-4 py-2 border-2 border-[hsl(var(--dark))] bg-[hsl(var(--background))] [filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] transition-all duration-300`}
          >
            {links.map((link) =>
              link.href.startsWith("#") ? (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-bold uppercase text-[hsl(var(--dark))] hover:animate-glitch relative group"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[hsl(var(--dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-bold uppercase text-[hsl(var(--dark))] hover:animate-glitch relative group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[hsl(var(--dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              ),
            )}
          </div>

          {/* Connect Button */}
          <div
            className={`transition-opacity duration-300 ${
              isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <button
              onClick={onSignIn}
              className="bg-[hsl(var(--background))] text-[hsl(var(--dark))] border-2 border-[hsl(var(--dark))] text-sm font-bold uppercase px-4 py-2 hover:[filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] hover:animate-glitch transition-all duration-300"
            >
              <a href="#">
                Connect <span className="text-xl">☎</span>
              </a>{" "}
            </button>
          </div>
        </div>

        {/* Mobile Menu: Contains Logo, Nav Links, and Connect Button */}
        <div
          className={`md:hidden fixed top-16 left-0 right-0 h-[calc(100vh-4rem)] bg-[hsl(var(--background))] [filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] transition-all duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col items-center justify-center space-y-6`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="text-xl font-extrabold uppercase tracking-tighter text-[hsl(var(--dark))] hover:[text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]"
          >
            {logoText}
          </button>

          {/* Navigation Links */}
          {links.map((link) =>
            link.href.startsWith("#") ? (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-bold uppercase text-[hsl(var(--dark))] hover:animate-glitch relative group"
              >
                {link.label}
                <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[hsl(var(--dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-bold uppercase text-[hsl(var(--dark))] hover:animate-glitch relative group"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[hsl(var(--dark))] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            ),
          )}

          {/* Connect Button */}
          <button
            onClick={() => {
              onSignIn();
              setIsMenuOpen(false);
            }}
            className="bg-[hsl(var(--background))] text-[hsl(var(--dark))] border-2 border-[hsl(var(--dark))] text-sm font-bold uppercase px-4 py-2 hover:[filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] hover:animate-glitch transition-all duration-300"
          >
            Connect <span className="text-xl">☎</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
