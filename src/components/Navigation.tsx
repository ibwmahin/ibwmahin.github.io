import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Github, Linkedin, Mail } from "lucide-react";

const Navigation = ({ onSearchOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/ibwmahin", label: "GitHub", color: "hover:text-gray-900" },
    { icon: Linkedin, href: "https://linkedin.com/in/ibwmahin", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Mail, href: "mailto:ibwmahin@gmail.com", label: "Email", color: "hover:text-red-500" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4"
      >
        <div className="container mx-auto w-[70%]">
          <motion.div
            animate={{
              backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
              backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.6)",
              boxShadow: isScrolled
                ? "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)"
                : "0 4px 24px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative rounded-full border border-white/20 bg-black/60 backdrop-blur-xl shadow-lg"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />

            <div className="relative flex items-center justify-between px-6 py-3">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  Abdulla Al Mahin
                </span>
              </motion.div>

              <nav className="hidden md:flex items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSearchOpen}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/50 transition-all duration-200"
                >
                  <Search className="h-4 w-4" />
                  <span className="text-sm font-medium">Search</span>
                </motion.button>

                <div className="w-px h-6 bg-slate-300/50 mx-2" />

                <div className="flex items-center space-x-1">
                  {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                    <motion.button
                      key={item}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-white/50 transition-all duration-200 relative overflow-hidden"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
                      />
                      <span className="relative">{item}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="w-px h-6 bg-slate-300/50 mx-2" />

                <div className="flex items-center space-x-1">
                  {socialLinks.map(({ icon: Icon, href, label, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded-full text-slate-600 ${color} hover:bg-white/50 transition-all duration-200`}
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </nav>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
                <div
                  onClick={() => scrollToSection("contact")}
                  className="relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    animate={{ x: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                  <span className="relative">Connect</span>
                </div>
              </motion.div>

              <div
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-white/50"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5 text-slate-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5 text-slate-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
                <nav className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSearchOpen();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full p-3 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-white/50 transition-all duration-200"
                  >
                    <Search className="h-5 w-5" />
                    <span className="font-medium">Search</span>
                  </motion.button>

                  {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="flex items-center w-full p-3 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-white/50 transition-all duration-200 font-medium"
                    >
                      {item}
                    </motion.button>
                  ))}

                  <div className="h-px bg-slate-200 my-4" />

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500 px-3">Connect</p>
                    <div className="grid grid-cols-3 gap-2">
                      {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
                        <motion.a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-3 rounded-xl text-slate-600 ${color} hover:bg-white/50 transition-all duration-200 flex items-center justify-center`}
                          aria-label={label}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div
                      onClick={() => {
                        scrollToSection("contact");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                    >
                      Let's Connect
                    </div>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
