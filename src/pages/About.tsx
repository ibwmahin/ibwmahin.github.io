// Updated About.tsx - Add import and insert Gallery after More About Me
import { motion } from "framer-motion";
import { StatusBadge } from "../components/StatusBadge";
import { Footer } from "../components/Footer";
import { CTASection } from "@/components/ui/CTASection";
import { ExperienceTimeline } from "@/components/subcomponents/ExperienceTimeline";
import TechMarquee from "@/components/subcomponents/TechMarquee";
/**
 * About page with personal information and background
 */
export function About(): JSX.Element {
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

  return (
    <div className="min-h-screen bg-background  mt-5">
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              About Me
            </h1>
          </motion.div>

          {/* NOTE:  I might add a "what song playing now , spotify thing here" */}

          {/* Introduction */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              I’m Abdulla Al Mahin — a creative web developer from Bangladesh
              who builds fast, reliable, and meaningful digital experiences. I
              specialize in React, TypeScript, and modern web technologies, but
              what defines my work is not just the tools — it’s the mindset. I
              think like a developer and design like a problem-solver, combining
              precision with creativity to deliver solutions that feel simple,
              powerful, and lasting.
            </p>
            <div className="h-[1px] bg-gray-700/20"></div>
          </motion.div>
          <TechMarquee />
          <div className="h-[1px] bg-gray-700/20"></div>

          {/* More About Me Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              More About Me
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I believe in quality over quantity. Every project I take on is
                approached with focus, care, and attention to detail — ensuring
                the end result is not only functional but also purposeful. My
                style leans toward minimalism and clarity, always keeping
                business growth and user needs at the center.
              </p>
              <p>
                Outside of coding, I explore emerging technologies, contribute
                to open-source, and share knowledge within the developer about
                community. Clean code, scalable architecture, and thoughtful
                execution are the principles that guide my work, helping me
                build applications that provide real value.
              </p>
            </div>
          </motion.div>
          {/* narrow line */}
          <div className="h-[1px] bg-gray-700/20"></div>

          {/* narrow line */}
          <ExperienceTimeline />
          {/* cta button gose from here */}

          <CTASection />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
