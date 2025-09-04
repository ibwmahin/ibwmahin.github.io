import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faFile } from "@fortawesome/free-solid-svg-icons";

const SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/ibwmahin",
    icon: faGithub,
  },
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
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  // reset and push refs helpers
  ctaRefs.current = [];
  const addCtaRef = (el: HTMLAnchorElement | null) => {
    if (el && !ctaRefs.current.includes(el)) ctaRefs.current.push(el);
  };

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const headline = headlineRef.current;
      const para = paraRef.current;
      const ctas = ctaRefs.current.filter(Boolean) as HTMLAnchorElement[];
      let pm: (e: PointerEvent) => void;

      pm = (e: PointerEvent) => {
        const rect = heroRef.current!.getBoundingClientRect();
        const rx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
        const ry = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(headline, {
          x: rx * 14,
          y: ry * 8,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(para, {
          x: rx * 8,
          y: ry * 5,
          duration: 0.7,
          ease: "power2.out",
        });
        gsap.to(ctas, {
          x: rx * 6,
          y: ry * 4,
          duration: 0.7,
          ease: "power2.out",
        });
      };

      const resetMotion = () => {
        gsap.to([headline, para, ctas], {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      };

      heroRef.current!.addEventListener("pointermove", pm);
      heroRef.current!.addEventListener("pointerleave", resetMotion);
      heroRef.current!.addEventListener("pointercancel", resetMotion);

      return () => {
        heroRef.current?.removeEventListener("pointermove", pm);
        heroRef.current?.removeEventListener("pointerleave", resetMotion);
        heroRef.current?.removeEventListener("pointercancel", resetMotion);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden h-[90svh] flex justify-center items-center "
    >
      {/* Desktop socials: absolute center-bottom */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 gap-3">
        {SOCIALS.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-10 h-10 flex items-center justify-center border-2 border-white/10 bg-black text-white rounded-md hover:bg-white hover:text-black transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <FontAwesomeIcon icon={s.icon} className="text-sm" aria-hidden />
          </a>
        ))}
      </div>

      <motion.section
        id="hero"
        className="text-center px-4 h-[60vh] flex flex-col justify-center relative z-10 max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionVariants}
      >
        <p className="text-lg sm:text-xl mb-3 text-white">
          Hi! I'm Abdulla Al Mahin 👋
        </p>

        <motion.h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl font-bold mb-6 text-white leading-tight"
          initial={{ scale: 0.995 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Creative <div className="text-indigo-400">Web Developer</div> &
          Designer
        </motion.h1>

        <motion.p
          ref={paraRef}
          className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.6 }}
        >
          I help small businesses, creators, and startups grow their online
          presence with modern, fast, and beautifully designed websites,
          intuitive UI, and engaging video content.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <motion.a
            ref={addCtaRef}
            href="#contact"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-indigo-500 text-black border-2 border-transparent text-sm font-bold uppercase px-5 py-3 hover:bg-indigo-600 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            CONNECT WITH ME{" "}
            <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
          </motion.a>

          <motion.a
            ref={addCtaRef}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-transparent text-white border-2 border-white/10 text-sm font-bold uppercase px-5 py-3 hover:bg-white hover:text-black transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            MY RESUME <FontAwesomeIcon icon={faFile} className="ml-1" />
          </motion.a>
        </div>

        {/* mobile socials: below CTAs */}
        <div className="flex sm:hidden justify-center gap-3 mt-5">
          {SOCIALS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 flex items-center justify-center border-2 border-white/10 bg-black text-white rounded-md hover:bg-white hover:text-black transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <FontAwesomeIcon icon={s.icon} className="text-sm" aria-hidden />
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Hero;
