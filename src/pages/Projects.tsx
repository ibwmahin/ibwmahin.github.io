/**
 * Projects Page Component
 *
 * Showcases all projects and work portfolio with detailed descriptions.
 * Uses ProjectCard and the centralized projects data.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { Footer } from "../components/Footer";
import { Project, projects } from "../data/projects";

/**
 * ProjectCard with hover expansion effect
 */
function ProjectCard({
  id,
  title,
  description,
  icon,
  src,
  url,
  hoveredId,
  setHoveredId,
}: {
  id: string;
  title: string;
  description: string;
  icon: any; // IconDefinition
  src: string;
  url: string;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const isHovered = hoveredId === id;
  const shortDesc =
    description.split(". ").slice(0, 1).join(". ") +
    (description.endsWith(".") ? "" : ".");

  return (
    <motion.div
      layout
      className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 space-y-3 cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHoveredId(id)}
      onHoverEnd={() => setHoveredId(null)}
      onClick={() => window.open(url, "_blank")}
    >
      <motion.div
        layout
        className="relative overflow-hidden rounded-lg"
        animate={{ height: isHovered ? 200 : 60 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          {isHovered ? (
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, type: "spring" }}
              className="w-full h-full"
            >
              <img
                src={src}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ) : (
            <motion.div
              key="icon-row"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, type: "spring" }}
              className="w-full h-full flex items-center justify-start gap-3 p-2"
            >
              <FontAwesomeIcon
                icon={icon}
                className="text-2xl flex-shrink-0 text-muted-foreground"
              />
              <h3 className="font-semibold text-foreground text-sm">{title}</h3>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="text-white text-sm font-medium">View Project</span>
        </div>
      </motion.div>
      <motion.div layout className="space-y-2">
        <p
          className={`text-xs text-muted-foreground ${isHovered ? "line-clamp-none" : "line-clamp-1"} leading-relaxed`}
        >
          {isHovered ? description : shortDesc}
        </p>
      </motion.div>
    </motion.div>
  );
}

/**
 * Projects page displaying portfolio of work
 */
export function Projects() {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("ibwmahin@gmail.com");
      // simple feedback
      // If you have a toast system, replace with that
      alert("Email copied to clipboard: ibwmahin@gmail.com");
    } catch (err) {
      console.error("Failed to copy email", err);
      alert("Could not copy email. Please copy manually: ibwmahin@gmail.com");
    }
  };

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [showAll, setShowAll] = useState(false);

  // Filter by category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Visible projects
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Simplified categories for filter buttons
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.12,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 mt-5">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants}>
            <StatusBadge status="Projects" isAvailable={false} />
          </motion.div>

          {/* Page Header */}
          <motion.div variants={itemVariants} className="space-y-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              My Works
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Discover my portfolio of web development projects, where modern
              technology meets creative solutions. Each project represents my
              commitment to quality and innovation.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 justify-center"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(6);
                  setShowAll(false);
                }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-accent to-primary text-accent-foreground shadow-accent/20"
                    : "border border-border/50 bg-background/80 hover:bg-muted/50 text-foreground"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* All Projects */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2 justify-center">
              <div className="w-3 h-3 bg-gradient-to-r from-success to-green-500 rounded-full shadow-lg" />
              Featured {selectedCategory}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {visibleProjects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    description={p.description}
                    icon={p.icon}
                    src={p.src}
                    url={p.url}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                  />
                ))}
              </AnimatePresence>
            </div>

            {(showMoreButton || showLessButton) && (
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={showMoreButton ? handleShowMore : handleShowLess}
                  className="px-8 py-4 rounded-full text-sm font-semibold border border-border/50 bg-background/80 hover:bg-muted/50 transition-all duration-300 shadow-lg"
                >
                  {showMoreButton ? "Show All" : "Show Less"}
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Technical Skills Highlight */}
          <motion.div
            variants={itemVariants}
            className="bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-6 space-y-4 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-card-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-blue-500 rounded-full" />
              Technologies I Use
            </h3>
            <div className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-3 gap-4">
              <p className="mb-2">
                <strong>Frontend:</strong> React, TypeScript, Tailwind CSS,
                Framer Motion
              </p>
              <p className="mb-2">
                <strong>Backend:</strong> Node.js, Express, MongoDB, PostgreSQL
              </p>
              <p>
                <strong>Tools:</strong> Git, Docker, AWS, Vercel, Netlify
              </p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6 pt-8"
          >
            <h3 className="text-3xl font-bold text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Let's work together.
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Ready to bring your ideas to life with modern web technologies
            </p>

            <div className="flex gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  className="hire-button px-8 py-4 rounded-full shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hire Me
                </motion.button>
              </Link>
              <motion.button
                className="copy-button flex items-center gap-2 px-6 py-4 rounded-full border border-border/50 bg-background/80 hover:bg-muted/50 shadow-lg transition-all duration-300"
                onClick={handleCopyEmail}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon
                  icon={faCopy}
                  style={{ width: 16, height: 16 }}
                />
                <span>Copy Email</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
