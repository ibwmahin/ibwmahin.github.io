import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/**
 * Self-contained CTA section that includes:
 * - CTA markup
 * - clipboard copy logic
 * - copy confirmation popup (AnimatePresence)
 *
 * This component keeps everything related to the CTA inside itself,
 * so you can drop <CTASection /> anywhere and it will work.
 */
export function CTASection(): JSX.Element {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyEmail = () => {
    // write to clipboard and show popup
    navigator.clipboard.writeText("ibwmahin@gmail.com").then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const popupVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: { duration: 0.15 },
    },
  };

  return (
    <>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-6 pt-8"
      >
        <h3 className="text-2xl font-bold text-foreground">
          Let's work together.
        </h3>
        <p className="text-muted-foreground">
          Creating user experience and visual appealing design
        </p>

        <div className="flex gap-3 justify-center">
          <Link to="/contact">
            <motion.button
              className="hire-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.button>
          </Link>

          <motion.button
            className="copy-button flex items-center gap-2"
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
            Copy Email
          </motion.button>
        </div>
      </motion.div>

      {/* Copied Popup */}
      <AnimatePresence>
        {showCopied && (
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-2 right-2 transform -translate-x-1/3 -translate-y-1/3 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-medium backdrop-blur-sm border border-green-400/30">
              <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
              Email copied to clipboard! 📧
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
