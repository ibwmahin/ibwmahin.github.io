/**
 * Home Page Component (CTA/popup moved to components/ui/CTASection.tsx)
 
 * The main landing page featuring hero section, project preview, and products showcase.
 * Includes animated elements using Framer Motion and responsive design.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { Footer } from "../components/Footer";
import pfp from "../assets/prof.png";
import { CTASection } from "@/components/ui/CTASection";
import GalShow from "@/components/subcomponents/GalShow";
import TechMarquee from "@/components/subcomponents/TechMarquee";

/**
 * Main home page with hero section and project previews
 */
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

  return (
    <div className="min-h-screen bg-background mt-20">
      <div className="max-w-2xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants}>
            <StatusBadge status="Web Developer" />
          </motion.div>

          {/* Hero Section */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground flex gap-2">
                  I'm Mahin
                  <motion.div
                    animate={{
                      rotate: [0, 20, -10, 20, 0], // wave motion
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ display: "inline-block", fontSize: "3rem" }}
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

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Link to="/about">
                    <motion.button
                      className="hire-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Know More!{" "}
                    </motion.button>
                  </Link>
                  {/* Hero copy button: still copies email but does NOT show popup (popup now lives in CTASection) */}
                  <motion.button
                    className="copy-button flex items-center gap-2"
                    onClick={() =>
                      navigator.clipboard.writeText("ibwmahin@gmail.com")
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                    Copy Email
                  </motion.button>
                </div>

                {/* //mail  */}
                <div className="flex items-center gap-3">
                  <div className="bg-red-700/30 h-4 w-4 rounded-full flex justify-center items-center">
                    <div className="bg-red-500 h-2 w-2 rounded-full"></div>
                  </div>
                  <a
                    href="mailto:ibwmahin@gmail.com"
                    className="text-gray-500 hover:text-black dark:text-white/50 dark:hover:text-white"
                  >
                    ibwmahin@gmail.com
                  </a>
                </div>
              </div>

              {/* Profile Photo */}
              <motion.div
                className="flex-shrink-0 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <img
                  src={pfp}
                  alt="Abdulla Al Mahin - Web Developer"
                  className="w-24 h-24 md:w-44 md:h-44 rounded-full object-cover ring-4 ring-border"
                />
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15, type: "spring" }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background text-foreground px-3 py-1 rounded-md text-sm font-medium shadow-lg border border-border whitespace-nowrap z-10"
                    >
                      Whasup mate?
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          <motion.div>
            <TechMarquee />
          </motion.div>

          <motion.div className="">
            <GalShow />
          </motion.div>

          {/* CTA section added */}
          <CTASection />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
