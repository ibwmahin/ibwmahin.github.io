import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { Search, Menu, X, Github, Linkedin, Mail } from "lucide-react";

const Navigation = ({ onSearchOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, toggleMobileMenu] = useCycle(false, true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    toggleMobileMenu();
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/ibwmahin", label: "GitHub", color: "hover:text-gray-900" },
    { icon: Linkedin, href: "https://linkedin.com/in/ibwmahin", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Mail, href: "mailto:ibwmahin@gmail.com", label: "Email", color: "hover:text-red-500" },
  ];

  // Variants for header animation
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Variants for nav items
  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Variants for mobile menu
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
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
                variants={navItemVariants}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  Abdulla Al Mahin
                </span>
              </motion.div>

              <nav className="hidden md:flex items-center">
                <motion.button
                  variants={navItemVariants}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSearchOpen}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/50 transition-all duration-200"
                >
                  <motion.div whileHover={{ rotate: 360, transition: { duration: 0.3 } }}>
                    <Search className="h-4 w-4" />
                  </motion.div>
                  <span className="text-sm font-medium">Search</span>
                </motion.button>

                <motion.div variants={navItemVariants} className="w-px h-6 bg-slate-300/50 mx-2" />

                <motion.div className="flex items-center space-x-1" variants={headerVariants}>
                  {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                    <motion.button
                      key={item}
                      variants={navItemVariants}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        backgroundColor: "rgba(255,255,255,0.5)",
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:text-slate-900 transition-all duration-200 relative overflow-hidden"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
                      />
                      <span className="relative">{item}</span>
                    </motion.button>
                  ))}
                </motion.div>

                <motion.div variants={navItemVariants} className="w-px h-6 bg-slate-300/50 mx-2" />

                <motion.div className="flex items-center space-x-1" variants={headerVariants}>
                  {socialLinks.map(({ icon: Icon, href, label, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={navItemVariants}
                      whileHover={{ 
                        scale: 1.2, 
                        y: -3,
                        rotate: 5,
                        transition: { type: "spring", stiffness: 200 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded-full text-slate-600 ${color} hover:bg-white/50 transition-all duration-200`}
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </motion.div>
              </nav>

              <motion.div 
                variants={navItemVariants}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="hidden md:block"
              >
                <div
                  onClick={() => scrollToSection("contact")}
                  className="relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                  <span className="relative">Connect</span>
                </div>
              </motion.div>

              <motion.div 
                whileTap={{ scale: 0.95 }} 
                onClick={toggleMobileMenu}
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={toggleMobileMenu}
            />

            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-20 left-4 right-4 z-50 md:hidden"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
                <nav className="space-y-4">
                  <motion.button
                    variants={navItemVariants}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSearchOpen();
                      toggleMobileMenu();
                    }}
                    className="flex items-center space-x-3 w-full p-3 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-white/50 transition-all duration-200"
                  >
                    <motion.div whileHover={{ rotate: 360, transition: { duration: 0.3 } }}>
                      <Search className="h-5 w-5" />
                    </motion.div>
                    <span className="font-medium">Search</span>
                  </motion.button>

                  {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
                    <motion.button
                      key={item}
                      variants={navItemVariants}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="flex items-center w-full p-3 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-white/50 transition-all duration-200 font-medium"
                    >
                      {item}
                    </motion.button>
                  ))}

                  <motion.div variants={navItemVariants} className="h-px bg-slate-200 my-4" />

                  <motion.div variants={mobileMenuVariants} className="space-y-2">
                    <p className="text-sm font-medium text-slate-500 px-3">Connect</p>
                    <motion.div className="grid grid-cols-3 gap-2" variants={headerVariants}>
                      {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
                        <motion.a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          variants={navItemVariants}
                          whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-3 rounded-xl text-slate-600 ${color} hover:bg-white/50 transition-all duration-200 flex items-center justify-center`}
                          aria-label={label}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.a>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={navItemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      onClick={() => {
                        scrollToSection("contact");
                        toggleMobileMenu();
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        Let's Connect
                      </motion.span>
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
