import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

const pages = [
  { id: 'home', component: Home, title: 'Home' },
  { id: 'about', component: About, title: 'About' },
  { id: 'projects', component: Projects, title: 'Projects' },
  { id: 'contact', component: Contact, title: 'Contact' },
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const goToPage = (index: number) => {
    setCurrentPage(index);
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    in: {
      x: 0,
      opacity: 1,
    },
    out: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const CurrentPageComponent = pages[currentPage].component;

  return (
    <div className="min-h-screen bg-latte-base dark:bg-mocha-base text-latte-text dark:text-mocha-text transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-latte-base/80 dark:bg-mocha-base/80 backdrop-blur-md border-b border-latte-surface0 dark:border-mocha-surface0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-latte-blue to-latte-mauve dark:from-mocha-blue dark:to-mocha-mauve bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Portfolio
          </motion.h1>

          {/* Desktop Navigation */}
          <Navigation 
            pages={pages}
            currentPage={currentPage}
            onPageChange={goToPage}
            isDark={isDark}
            className="hidden md:flex"
          />

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-latte-surface0 dark:bg-mocha-surface0 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-latte-surface0 dark:bg-mocha-surface0 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-latte-surface0 dark:border-mocha-surface0 bg-latte-base/95 dark:bg-mocha-base/95 backdrop-blur-md"
            >
              <Navigation 
                pages={pages}
                currentPage={currentPage}
                onPageChange={goToPage}
                isDark={isDark}
                className="flex flex-col p-4 space-y-2"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page Content */}
      <main className="pt-20 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            custom={1}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="min-h-screen"
          >
            <CurrentPageComponent 
              nextPage={nextPage} 
              prevPage={prevPage}
              currentPage={currentPage}
              totalPages={pages.length}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Page Indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-2">
        {pages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-3 h-3 rounded-full border-2 transition-colors ${
              index === currentPage
                ? 'bg-latte-blue dark:bg-mocha-blue border-latte-blue dark:border-mocha-blue'
                : 'bg-transparent border-latte-overlay0 dark:border-mocha-overlay0 hover:border-latte-blue dark:hover:border-mocha-blue'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>

    </div>
  );
}

export default App;