import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SpotlightSearch from "./components/SpotlightSearch";
import { useKeyboardShortcut } from "./hooks/useKeyboardShortcut";

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Keyboard shortcut for spotlight search
  useKeyboardShortcut(["mod", "k"], () => {
    setIsSearchOpen(true);
  });

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-tl from-black via-gray-950 to-black flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl font-bold bg-gradient-to-tl from-gray-600 via-gray-400 to-gray-600 bg-clip-text text-transparent tracking-tight mb-2"
          >
            Abdulla Developer{" "}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 flex items-center justify-center"
          >
            Loading portfolio...
          </motion.p>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-blue-200 border-t-gray-600 rounded-full mx-auto mt-8 "
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation onSearchOpen={() => setIsSearchOpen(true)} />

      {/* Page Sections */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </motion.main>

      {/* Footer */}
      <Footer />

      {/* Spotlight Search */}
      <SpotlightSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 transform-gpu z-50"
        style={{
          scaleX: 0,
          transformOrigin: "0%",
        }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0 }}
      />

      {/* Floating Action Button for Search */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSearchOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 md:hidden"
        aria-label="Open search"
      >
        <span className="text-xs font-mono">⌘K</span>
      </motion.button>
    </div>
  );
}

export default App;
