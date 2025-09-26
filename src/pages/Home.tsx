import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { Footer } from "../components/Footer";
import pfp from "../assets/prof.png";
import { CTASection } from "@/components/ui/CTASection";
import GalShow from "@/components/subcomponents/GalShow";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ClientLogosSection from "@/components/ClientLogosSection";

export function Home(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [isHovered, setIsHovered] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef({ rx: 0, ry: 0 });

  // subtle profile tilt based on mouse position inside the profile container
  useEffect(() => {
    const el = profileRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2; // -w/2 .. w/2
      const y = e.clientY - rect.top - rect.height / 2; // -h/2 .. h/2
      const ry = (x / (rect.width / 2)) * 6; // rotateY up to ~6deg
      const rx = -(y / (rect.height / 2)) * 6; // rotateX up to ~6deg
      tiltRef.current = { rx, ry };
      el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }

    function onLeave() {
      tiltRef.current = { rx: 0, ry: 0 };
      el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // show back-to-top button after scrolling a bit
  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 320);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background mt-5 sm:mt-20 relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="hidden sm:inline-block"
          >
            <StatusBadge status="Web Developer" />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex sm:text-left  justify-between flex-col-reverse sm:flex-row gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground flex gap-2 items-center">
                  <span>I'm Mahin</span>
                  <motion.div
                    animate={{ rotate: [0, 20, -10, 20, 0] }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ display: "inline-block", fontSize: "2.2rem" }}
                    title="wave"
                    aria-hidden
                  >
                    👋
                  </motion.div>
                </h1>

                <div className="text-xs text-gray-400 font-bold italic">
                  HE/HIM
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Web Developer from Bangladesh.
                  <br />
                  Creating amazing digital experiences.
                </p>

                <div className="flex gap-3 pt-2 items-center">
                  <Link to="/about" className="group inline-block">
                    <motion.button
                      className="hire-button px-4 py-2 rounded-md bg-foreground text-background font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center gap-2">
                        Know Me!
                        <motion.span
                          initial={{ x: -4, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="text-sm opacity-70"
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.button>
                  </Link>

                  <motion.button
                    className="copy-button flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background/60"
                    onClick={() =>
                      navigator.clipboard.writeText("ibwmahin@gmail.com")
                    }
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Copy email"
                  >
                    <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                    <span className="text-sm">Copy Email</span>
                  </motion.button>
                </div>

                <div className="flex items-center gap-3 mt-3 text-sm">
                  <div className="bg-red-700/30 h-4 w-4 rounded-full flex justify-center items-center">
                    <div className="bg-red-500 h-2 w-2 rounded-full" />
                  </div>
                  <a
                    href="mailto:ibwmahin@gmail.com"
                    className="text-gray-500 hover:text-black dark:text-white/50 dark:hover:text-white transition"
                  >
                    ibwmahin@gmail.com
                  </a>
                </div>
              </div>
              <motion.div
                ref={profileRef}
                className="flex-shrink-0 relative"
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 300 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                aria-hidden
              >
                <img
                  src={pfp}
                  alt="Abdulla Al Mahin - Web Developer"
                  className="w-24 h-24 md:w-44 md:h-44 rounded-full object-cover ring-4 ring-border shadow-lg"
                />

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.12, type: "spring" }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background text-foreground px-3 py-1 rounded-md text-sm font-medium shadow-lg border border-border whitespace-nowrap z-10"
                    >
                      Whasup mate?
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="py-1 sm:p-3">
            <ClientLogosSection speed={31} />
          </motion.div>

          <motion.div variants={itemVariants} className="py-1  sm:p-3">
            <GalShow />
          </motion.div>

          <motion.div variants={itemVariants} className="py-6  sm:p-3">
            <TestimonialsSection speed={35} />
          </motion.div>

          <motion.div variants={itemVariants} className="py-6  sm:p-3">
            <FAQSection />

            <motion.div
              variants={itemVariants}
              className=" mt-12 py-6   sm:p-3"
            >
              <CTASection />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed right-6 bottom-8 z-50 rounded-full bg-foreground text-background p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
