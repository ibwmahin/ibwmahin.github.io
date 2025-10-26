// src/pages/Home.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { Footer } from "../components/Footer";
import pfp from "../assets/prof.png";
import { CTASection } from "@/components/ui/CTASection";
import GalShow from "@/components/subcomponents/GalShow";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Skills from "@/components/subcomponents/Skills";

export function Home(): JSX.Element {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);

  // Profile tilt (only uses mouse events)
  useEffect(() => {
    const el = profileRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const ry = (x / (rect.width / 2)) * 3;
      const rx = -(y / (rect.height / 2)) * 3;
      el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }

    function onLeave() {
      if (!el) return;
      el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Back-to-top visibility (run only on client)
  useEffect(() => {
    function onScroll() {
      setShowTop((prev) => {
        if (typeof window === "undefined") return prev;
        return window.scrollY > 320;
      });
    }
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Copy email safely
  const copyEmail = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText("ibwmahin@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } else {
        const tmp = document.createElement("input");
        tmp.value = "ibwmahin@gmail.com";
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand?.("copy");
        document.body.removeChild(tmp);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch (err) {
      console.warn("copy failed", err);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <div className="space-y-10">
          <div className="hidden sm:block">
            <StatusBadge status="Front-End Developer" />
          </div>

          {/* Hero */}
          <section className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-7 space-y-4">
              <div className="flex items-center">
                <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-600 dark:from-white dark:to-indigo-300  inline-block">
                  I'm Mahin
                </h1>
                <div className="ml-2 inline-block text-4xl" aria-hidden>
                  👋
                </div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300 font-medium italic">
                HE/HIM
              </div>

              <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mt-1 max-w-prose">
                Web developer from Bangladesh. Creating elegant, fast, and
                accessible digital experiences with a focus on sustainability
                and clarity.
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <Link to="/about">
                  <button className="inline-flex items-center px-5 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-medium shadow-md hover:brightness-95 transition duration-75">
                    Know me
                  </button>
                </Link>

                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm transition-colors duration-75"
                  aria-label="Copy email"
                  type="button"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M8 7h8v10H8z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 7h2a2 2 0 0 1 2 2v8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{copied ? "Copied" : "Copy email"}</span>
                </button>
              </div>

              <div className="flex items-center gap-3 mt-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-red-500/60 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>
                <a
                  href="mailto:ibwmahin@gmail.com"
                  className="text-slate-600 dark:text-slate-300 hover:underline transition-colors duration-75"
                >
                  ibwmahin@gmail.com
                </a>
              </div>
            </div>

            <div className="sm:col-span-5 flex justify-center sm:justify-end">
              <div
                ref={profileRef}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full ring-4 ring-slate-100 dark:ring-slate-800 overflow-hidden shadow-lg transition-all duration-75"
                aria-hidden
              >
                <img
                  src={String(pfp)}
                  alt="Mahin"
                  className="w-full h-full object-cover"
                />

                <div
                  className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-md text-sm font-medium shadow-sm bg-white/90 dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all duration-75 ${
                    hovering
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  Hello there!
                </div>
              </div>
            </div>
          </section>

          <section className="py-4">
            <GalShow />
          </section>

          <section className="py-4">
            <Skills />
          </section>

          <section className="py-4">
            <TestimonialsSection speed={35} />
          </section>

          <section className="py-4 space-y-6">
            <FAQSection />
            <CTASection />
          </section>
        </div>
      </div>

      <Footer />

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed right-6 bottom-6 z-50 rounded-full p-3 shadow-xl transition-all duration-75 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0 pointer-events-none"
        } bg-indigo-600 text-white`}
        type="button"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 15l7-7 7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

// also provide default export so either import style works
export default Home;
