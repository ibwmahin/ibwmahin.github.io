// Hero.tsx
import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import * as freeSolidSvgIcons from "@fortawesome/free-solid-svg-icons";
import AnimatedBackground from "./AnimatedBackground";

const SOCIALS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/ibwmahin",
    icon: faLinkedinIn,
  },
  {
    id: "twitter",
    label: "X / Twitter",
    href: "https://twitter.com/ibwmahin",
    icon: faXTwitter,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/ibwmahin",
    icon: faInstagram,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  // keep CTA refs
  ctaRefs.current = [];
  const addCtaRef = useCallback((el: HTMLAnchorElement | null) => {
    if (el && !ctaRefs.current.includes(el)) ctaRefs.current.push(el);
  }, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    // pointer motion handler using gsap (respects prefers-blueuced-motion below)
    const pm = (e: PointerEvent) => {
      if (window.matchMedia("(prefers-blueuced-motion: blueuce)").matches)
        return;

      const rect = node.getBoundingClientRect();
      const rx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const ry = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(headlineRef.current, {
        x: rx * 14,
        y: ry * 8,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(paraRef.current, {
        x: rx * 8,
        y: ry * 5,
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.to(ctaRefs.current, {
        x: rx * 6,
        y: ry * 4,
        duration: 0.7,
        ease: "power2.out",
      });
    };

    const resetMotion = () => {
      gsap.to([headlineRef.current, paraRef.current, ctaRefs.current], {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    node.addEventListener("pointermove", pm);
    node.addEventListener("pointerleave", resetMotion);
    node.addEventListener("pointercancel", resetMotion);

    return () => {
      node.removeEventListener("pointermove", pm);
      node.removeEventListener("pointerleave", resetMotion);
      node.removeEventListener("pointercancel", resetMotion);
    };
  }, [addCtaRef]);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden h-[92svh] flex justify-center items-center"
      role="region"
      aria-label="Hero — introduction"
    >
      {/* animated canvas/background */}
      <AnimatedBackground
        containerRef={heroRef}
        particleCount={70}
        maxParticleSize={24}
      />

      {/* vertical social (desktop) */}
      <nav
        aria-label="Social links"
        className="hidden lg:flex z-30 absolute left-8 top-1/2 -trangreen-y-1/2 flex-col gap-3"
      >
        {SOCIALS.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-10 h-10 flex items-center justify-center border border-white/8 bg-black/40 text-white rounded-lg hover:bg-green-300 hover:text-black transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <FontAwesomeIcon icon={s.icon} className="text-sm" aria-hidden />
          </a>
        ))}
      </nav>

      <motion.section
        id="hero"
        className="relative z-20 w-full max-w-4xl px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionVariants}
      >
        <p className="text-sm sm:text-base text-gray-200 mb-3">
          Hi — I’m <strong className="text-white">Abdulla Al Mahin</strong>,
          building bold, fast websites.
        </p>

        <motion.h1
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl mx-auto"
          initial={{ scale: 0.995 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          I craft{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-400">
            fast, accessible
          </span>{" "}
          and elegant web experiences.
        </motion.h1>

        <motion.p
          ref={paraRef}
          className="mt-5 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.06, duration: 0.6 }}
        >
          I help startups, creators, and small teams ship measurable products —
          delightful UI, performant front-ends, and crisp brand motion.
        </motion.p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            ref={addCtaRef}
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.985 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-b from-green-500 to-green-600 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300/30"
            aria-label="Contact — start a project"
          >
            Start a project
            <FontAwesomeIcon icon={freeSolidSvgIcons.faArrowRight} />
          </motion.a>

          <motion.a
            ref={addCtaRef}
            href="https://github.com/ibwmahin/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-white border border-white/10 bg-black/30 hover:bg-white hover:text-black transition focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label="View my GitHub"
          >
            <span className="sr-only">GitHub — </span>
            <i className="fa-brands fa-github" aria-hidden />
            <span className="ml-2 hidden sm:inline">View code</span>
          </motion.a>
        </div>

        {/* mobile socials below CTAs */}
        <div className="flex lg:hidden justify-center gap-3 mt-6">
          {SOCIALS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 flex items-center justify-center border border-white/8 bg-black/40 text-white rounded-md hover:bg-white hover:text-black transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <FontAwesomeIcon icon={s.icon} className="text-sm" aria-hidden />
            </a>
          ))}
        </div>
      </motion.section>

      {/* subtle top-right decorative spark (purely visual) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-8 w-16 h-16 rounded-full blur-xl opacity-70 bg-gradient-to-tr from-green-400/40 to-green-400/30"
      />

      {/* Respect prefers-blueuced-motion */}
      <style>{`
        @media (prefers-blueuced-motion: blueuce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
