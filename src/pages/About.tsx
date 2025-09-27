// About.tsx
import { motion, AnimatePresence } from "framer-motion";
import { StatusBadge } from "../components/StatusBadge";
import { Footer } from "../components/Footer";
import { CTASection } from "@/components/ui/CTASection";
import { ExperienceTimeline } from "@/components/subcomponents/ExperienceTimeline";
import TechMarquee from "@/components/subcomponents/TechMarquee";

export function About(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const skills = [
    "Next.js",
    "TypeScript",
    "Optimization",
    "Accessibility ",
    "State Management",
    "Responsive Design",
  ];

  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "20+", label: "Projects Completed" },
    { value: "6+", label: "Happy Clients" },
    { value: "7", label: "Open Source Contributions" },
  ];

  return (
    <div className="min-h-screen mt-5">
      <div className="max-w-2xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants}>
            <StatusBadge status="About" isAvailable={false} />
          </motion.div>

          {/* Page Title */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
              About Me
            </h1>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              I’m Abdulla Al Mahin — a creative web developer from Bangladesh
              who builds fast, reliable, and meaningful digital experiences. I
              specialize in React, TypeScript, and modern web technologies, but
              what defines my work is not just the tools — it’s the mindset. I
              combine precision with creativity to deliver solutions that feel
              simple, powerful, and lasting.
            </p>
            <div className="h-[1px] bg-slate-200 dark:bg-slate-700"></div>
          </motion.div>

          {/* Tech Marquee */}
          <TechMarquee />
          <div className="h-[1px] bg-slate-200 dark:bg-slate-700"></div>

          {/* More About Me Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              More About Me
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                I believe in quality over quantity. Every project I take on is
                approached with focus, care, and attention to detail — ensuring
                the end result is functional, purposeful, and delightful.
              </p>
              <p>
                Outside coding, I explore emerging technologies, contribute to
                open-source, and share knowledge within the developer community.
                Clean code, scalable architecture, and thoughtful execution are
                my guiding principles.
              </p>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Skills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 text-center shadow-sm transition-all duration-300"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements / Stats Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Achievements
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline Section */}
          <ExperienceTimeline />

          {/* Call to Action Section */}
          <CTASection />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
