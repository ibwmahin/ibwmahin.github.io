import { useEffect, useRef, useState } from "react";
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
import Skills from "@/components/subcomponents/Skills";

export function Home(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [isHovered, setIsHovered] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // subtle profile tilt on hover
  useEffect(() => {
    const el = profileRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const ry = (x / (rect.width / 2)) * 3; // subtle tilt
      const rx = -(y / (rect.height / 2)) * 3;
      el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }

    function onLeave() {
      el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // back-to-top button
  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      <div className="max-w-3xl mx-auto px-6 pt-36 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="hidden sm:block">
            <StatusBadge status="Front-End Developer" />
          </motion.div>

          {/* Hero Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center sm:justify-start gap-2">
                  <span>I'm Mahin</span>
                  <motion.span
                    animate={{ rotate: [0, 20, -10, 20, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ display: "inline-block", fontSize: "2rem" }}
                    title="wave"
                    aria-hidden
                  >
                    👋
                  </motion.span>
                </h1>

                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium italic">
                  HE/HIM
                </div>

                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-2 text-balance w-[80%] mx-auto sm:w-full">
                  Web Developer from Bangladesh.
                  <br />
                  Creating elegant and high-performing digital experiences.
                </p>

                <div className="flex flex-row sm:flex-row gap-3 mt-4 justify-center sm:justify-start items-center">
                  <Link to="/about">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-5 py-2 rounded-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium transition-colors duration-200"
                    >
                      Know Me!
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm transition-colors"
                    onClick={() =>
                      navigator.clipboard.writeText("ibwmahin@gmail.com")
                    }
                    aria-label="Copy email"
                  >
                    <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                    Copy Email
                  </motion.button>
                </div>

                <div className="flex items-center gap-2 mt-3 text-sm justify-center sm:justify-start">
                  <div className="bg-red-500/30 h-3 w-3 rounded-full flex justify-center items-center">
                    <div className="bg-red-500 h-1.5 w-1.5 rounded-full" />
                  </div>
                  <a
                    href="mailto:ibwmahin@gmail.com"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
                  >
                    ibwmahin@gmail.com
                  </a>
                </div>
              </div>

              <motion.div
                ref={profileRef}
                className="flex-shrink-0 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                aria-hidden
              >
                <img
                  src={pfp}
                  alt="Mahin - Web Developer"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-gray-200 dark:ring-gray-700 shadow-md"
                />
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.12, type: "spring" }}
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-md text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      Hello there!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Gallery */}
          <motion.div variants={itemVariants} className="py-4">
            <GalShow />
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="py-4">
            <Skills />
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={itemVariants} className="py-4">
            <TestimonialsSection speed={35} />
          </motion.div>

          {/* FAQ + CTA */}
          <motion.div variants={itemVariants} className="py-4 space-y-6">
            <FAQSection />
            <CTASection />
          </motion.div>
        </motion.div>
      </div>

      <Footer />

      {/* Back-to-top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed right-6 bottom-6 z-50 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
