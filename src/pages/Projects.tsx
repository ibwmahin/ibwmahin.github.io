/**
 * Projects Page — centered featured header + solid Apple-style filters
 * CTA removed per request.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatusBadge } from "../components/StatusBadge";
import { Footer } from "../components/Footer";
import { Project, projects } from "../data/projects";
import { CTASection } from "@/components/ui/CTASection";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  icon: any;
  src?: string;
  url: string;
  tags?: string[];
  date?: string | number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  mobileExpandedId: string | null;
  setMobileExpandedId: (id: string | null) => void;
};

/** Internal ProjectCard — unchanged behavior, same props */
function ProjectCard({
  id,
  title,
  description,
  icon,
  src,
  url,
  tags = [],
  date,
  hoveredId,
  setHoveredId,
  mobileExpandedId,
  setMobileExpandedId,
}: ProjectCardProps) {
  const isHovered = hoveredId === id;
  const isMobileExpanded = mobileExpandedId === id;
  const isExpanded = isHovered || isMobileExpanded;

  const shortDesc =
    (description || "").split(". ").slice(0, 1).join(". ") +
    ((description || "").endsWith(".") ? "" : ".");

  const toggleMobileExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileExpandedId(isMobileExpanded ? null : id);
  };

  const handleOpenProject = (e?: React.MouseEvent) => {
    e && e.stopPropagation();
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    const desktopLike =
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (desktopLike) {
      window.open(url, "_blank");
    } else {
      e.stopPropagation();
    }
  };

  return (
    <motion.article
      layout
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick(e as unknown as React.MouseEvent);
        }
      }}
      onMouseEnter={() => setHoveredId(id)}
      onMouseLeave={() => setHoveredId(null)}
      onFocus={() => setHoveredId(id)}
      onBlur={() => setHoveredId(null)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      whileHover={{ translateY: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="group relative rounded-2xl p-4 bg-card/60 backdrop-blur-sm border border-border/30 shadow-[0_6px_20px_rgba(10,10,10,0.04)] cursor-pointer overflow-hidden"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl flex-shrink-0 bg-white/6 border border-border/10 flex items-center justify-center">
          <FontAwesomeIcon
            icon={icon}
            fixedWidth
            style={{ width: 18, height: 18 }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-foreground text-sm truncate">
              {title}
            </h3>

            <button
              type="button"
              onClick={toggleMobileExpand}
              aria-expanded={isMobileExpanded}
              aria-controls={`proj-${id}-preview`}
              className="ml-2 md:hidden inline-flex items-center justify-center p-1 rounded-full border border-border/20 bg-background/80"
              title={isMobileExpanded ? "Collapse preview" : "Preview"}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <svg
                className={`w-4 h-4 transform transition-transform ${isMobileExpanded ? "rotate-180" : "rotate-0"}`}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* short summary only when not expanded */}
          {!isExpanded && (
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {shortDesc}
            </p>
          )}
        </div>

        <div className="ml-3 hidden md:flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <motion.div
        id={`proj-${id}-preview`}
        animate={{ height: isExpanded ? (src ? 160 : 96) : 0 }}
        transition={{ duration: 0.26, ease: "easeInOut" }}
        className="mt-3 overflow-hidden rounded-md"
        aria-hidden={!isExpanded}
      >
        {isExpanded && (
          <div className="w-full h-full flex gap-3">
            {src ? (
              <img
                src={src}
                alt={`${title} preview`}
                className="w-1/2 h-36 object-cover rounded-md"
                loading="lazy"
              />
            ) : null}
            <div
              className={`${src ? "w-1/2" : "w-full"} p-2 text-xs text-muted-foreground`}
            >
              {description}
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex gap-2 items-center">
          {tags?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full border border-border/20 text-[11px]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="opacity-80 text-[12px]">
            {date ? new Date(date).getFullYear() : ""}
          </div>

          <button
            type="button"
            onClick={handleOpenProject}
            className="hidden md:inline-flex px-3 py-1 rounded-full border border-border/20 bg-background/50 text-sm"
          >
            Open
          </button>

          <button
            type="button"
            onClick={handleOpenProject}
            className={`ml-2 md:hidden inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/20 bg-accent/90 text-accent-foreground text-sm transition-opacity ${
              isMobileExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={!isMobileExpanded}
            title="Open project"
          >
            Open
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/** Projects page */
export function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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

  const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delayChildren: 0.12, staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 mt-16 ">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <StatusBadge status="Projects" isAvailable={false} />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3 text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground py-6">
              My Works
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Discover my portfolio of web development projects — clean,
              performant, and thoughtfully designed.
            </p>
          </motion.div>

          {/* Filters — solid Apple-like pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((cat) => {
              const selected = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(6);
                    setShowAll(false);
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-pressed={selected}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/30 ${
                    selected
                      ? " decoration-white to-primary text-accent-foreground shadow-md border border-border/20"
                      : "bg-card/90 text-foreground border border-border/20 shadow-sm"
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.section variants={itemVariants} className="space-y-6">
            {/* Centered featured header (green dot + label) */}
            <div className="w-full flex justify-center mt-20">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-success to-green-500 shadow-sm" />
                <span>Featured {selectedCategory}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {visibleProjects.map((p: Project) => (
                  <motion.div key={p.id} layout variants={itemVariants}>
                    <ProjectCard
                      id={p.id}
                      title={p.title}
                      description={p.description}
                      icon={p.icon}
                      src={p.src}
                      url={p.url}
                      tags={p.tags}
                      date={p.date}
                      hoveredId={hoveredId}
                      setHoveredId={setHoveredId}
                      mobileExpandedId={mobileExpandedId}
                      setMobileExpandedId={setMobileExpandedId}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {(showMoreButton || showLessButton) && (
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={showMoreButton ? handleShowMore : handleShowLess}
                  className="px-8 py-3 rounded-full text-sm font-semibold border border-border/40 bg-background/70 shadow-sm"
                >
                  {showMoreButton ? "Show All" : "Show Less"}
                </motion.button>
              </div>
            )}
          </motion.section>
        </motion.div>
      </div>

      <CTASection />
      <div className=" mt-20">
        <Footer />
      </div>
    </div>
  );
}
