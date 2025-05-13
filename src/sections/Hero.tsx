import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedText from "../components/AnimatedText";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('/src/assets/grid-pattern.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Hi, I'm <span className="text-accent">AbdulLa</span>
        </motion.h2>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          WebDev & Designer
        </motion.h1>

        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-10 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <AnimatedText
            text="Helping Brands Stand Out with Clean, Modern & Responsive Websites | Front-End Web Developer | Freelancer | Let's Build Together!"
            className="inline-block"
          />
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <a
            href="#contact"
            className="btn-primary bg-teal-300 text-black min-w-[140px] hover:bg-teal-600 hover:text"
          >
            Hire Me Now
          </a>
          <a href="#projects" className="btn-outline min-w-[140px]">
            See My Work
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.2,
        }}
      >
        <a
          href="#about"
          className="flex flex-col items-center text-accent w-full mx-auto absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown size={20} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
