// Projects.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard"; // adjust path if your file lives elsewhere
import { projects } from "../data/projects"; // your data file
import { StatusBadge } from "../components/StatusBadge";
import { CTASection } from "@/components/ui/CTASection";
import { Footer } from "@/components/Footer";

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

export function Projects() {
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const categories = ["All", "Projects", "Products"];
  const showMoreButton = visibleCount < filteredProjects.length && !showAll;
  const showLessButton = showAll;

  const handleShowMore = () => {
    setShowAll(true);
    setVisibleCount(filteredProjects.length);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setVisibleCount(6);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 mt-16"
    >
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <div className="space-y-12">
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <StatusBadge status="Projects" />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
              My Works
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Discover my portfolio — clean, performant, and thoughtfully
              designed.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 justify-center"
          >
            {categories.map((cat, index) => {
              const selected = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(6);
                    setShowAll(false);
                    setMobileExpandedId(null);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selected
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "bg-gray-50 dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {cat}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.section variants={itemVariants} className="space-y-8">
            <div className="w-full flex justify-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 rounded-full bg-black dark:bg-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span>Featured {selectedCategory}</span>
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {visibleProjects.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="h-full"
                >
                  <ProjectCard
                    id={p.id}
                    title={p.title}
                    description={p.description}
                    icon={p.icon}
                    src={p.src}
                    url={p.url}
                    tags={p.tags}
                    date={p.date}
                    mobileExpandedId={mobileExpandedId}
                    setMobileExpandedId={setMobileExpandedId}
                  />
                </motion.div>
              ))}
            </motion.div>

            {(showMoreButton || showLessButton) && (
              <motion.div variants={itemVariants} className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={showMoreButton ? handleShowMore : handleShowLess}
                  className="px-8 py-3 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300"
                >
                  {showMoreButton ? "Show All" : "Show Less"}
                </motion.button>
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>

      <div>
        <CTASection />
        <Footer />
      </div>
    </motion.div>
  );
}

export default Projects;
