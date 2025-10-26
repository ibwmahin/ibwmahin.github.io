import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Interface for experience items
 */
interface Experience {
  date: string;
  title: string;
  company?: string;
  description: string;
  icon?: ReactNode; // Optional icon for the timeline marker
}

/**
 * Timeline Experience Component
 * A simple vertical timeline for displaying work/professional experiences.
 */
export function ExperienceTimeline(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Sample experiences - replace with your actual data

  const experiences: Experience[] = [
    {
      date: "Sep 2024 - Present",
      title: "Senior Frontend Developer",
      company: "DigitalPathways.ai",
      description:
        "Driving growth at DigitalPathways.ai as a senior frontend developer. I lead the creation of sleek UI components, collaborate with product managers, and streamline development workflows to deliver impactful, user-first experiences.",
    },
    {
      date: "Jan 2022 - Aug 2024",
      title: "Frontend Developer",
      company: "Dataxpie",
      description:
        "Built high-performance, responsive websites using WordPress, Elementor, and modern animation libraries. Translated complex ideas into clean, interactive interfaces that elevated brand presence.",
    },
    {
      date: "Dec 2022 - Jun 2024  ",
      title: "Junior Web Developer",
      company: "Freelance",
      description:
        "Crafted custom WordPress themes and vanilla JavaScript applications for small businesses. Strengthened agile skills while transforming raw ideas into functional, lightweight digital products.",
    },
    {
      date: "2019 - 2020",
      title: "Graphic Designer",
      company: "Freelance",
      description:
        "Began my freelance journey as a graphic designer, working across marketplaces to deliver visual stories. This creative foundation naturally evolved into a passion for web development and interactive design.",
    },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mb-16 "
    >
      <motion.div className="mb-8 mt-20">
        <h2 className="text-2xl font-bold text-foreground">Experience</h2>
        <p className="text-muted-foreground">
          A timeline of my professional journey and key milestones.
        </p>
      </motion.div>

      <div className="relative border-l-2 border-gray-200 dark:border-gray-700">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="mb-10 ml-6"
          >
            {/* Timeline Marker */}
            <span className="absolute flex w-3 h-3 bg-indigo-400 rounded-full -left-2 ring-8 ring-gray-200 dark:ring-gray-900 transition duration-200"></span>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center mb-2"
            >
              <time className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {experience.date}
              </time>
            </motion.div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {experience.title}
                {experience.company && (
                  <span className="text-sm text-muted-foreground font-normal ml-2">
                    @ {experience.company}
                  </span>
                )}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {experience.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
