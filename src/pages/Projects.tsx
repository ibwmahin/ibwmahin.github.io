/**
 * Projects Page Component
 *
 * Showcases all projects and work portfolio with detailed descriptions.
 * Uses ProjectCard and the centralized projects data.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faRocket,
  faCode,
  faGamepad,
  faShoppingCart,
  faBookOpen,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { Footer } from "../components/Footer";

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
  id: number;
  title: string;
  description: string;
  icon: any; // FontAwesomeIcon
  src: string;
  url: string;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}) {
  const isHovered = hoveredId === id;
  const shortDesc =
    description.split(". ").slice(0, 1).join(". ") +
    (description.endsWith(".") ? "" : ".");

  return (
    <motion.div
      layout
      className="group relative bg-card border border-border rounded-lg p-4 space-y-3 cursor-pointer overflow-hidden"
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHoveredId(id)}
      onHoverEnd={() => setHoveredId(null)}
      onClick={() => window.open(url, "_blank")}
    >
      <motion.div
        layout
        className="relative overflow-hidden rounded-md"
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
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="text-white text-sm font-medium">View Project</span>
        </div>
      </motion.div>
      <motion.div layout className="space-y-2">
        <p
          className={`text-xs text-muted-foreground ${isHovered ? "line-clamp-none" : "line-clamp-1"}`}
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

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const projectsData = [
    {
      id: 1,
      title: "Digital Pathways",
      description:
        "AI-powered educational platform designed to personalize learning experiences for students worldwide.",
      icon: faRocket,
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      url: "https://example-digitalpathways.com",
    },
    {
      id: 2,
      title: "LazyVim Config",
      description:
        "Custom Neovim configuration optimized for developer productivity and seamless workflow integration.",
      icon: faCode,
      src: "https://images.unsplash.com/photo-1561336313-0dc4f3b1a1d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      url: "https://example-lazyvim.com",
    },
    {
      id: 3,
      title: "Gaming Website",
      description:
        "Interactive gaming platform featuring immersive experiences and community-driven content creation.",
      icon: faGamepad,
      src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      url: "https://example-gamingwebsite.com",
    },
    {
      id: 4,
      title: "Manae Shopping Mart",
      description:
        "E-commerce platform with advanced search, secure payments, and personalized shopping recommendations.",
      icon: faShoppingCart,
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      url: "https://example-manaeshopping.com",
    },
    {
      id: 5,
      title: "Pearni",
      description:
        "Learning platform offering interactive courses, progress tracking, and certification upon completion.",
      icon: faBookOpen,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      url: "https://example-pearni.com",
    },
    {
      id: 6,
      title: "Cyber Scan Guard Shield",
      description:
        "Security tool providing real-time threat detection, vulnerability scanning, and automated remediation.",
      icon: faShieldHalved,
      src: "https://images.unsplash.com/photo-1632427635820-24f8b7e0d4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      url: "https://example-cyberscanguard.com",
    },
  ];

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
    <div className="min-h-screen bg-background mt-5">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
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
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              My Works
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover my portfolio of web development projects, where modern
              technology meets creative solutions. Each project represents my
              commitment to quality and innovation.
            </p>
          </motion.div>

          {/* All Projects */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projectsData.map((p) => (
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
            </div>
          </motion.div>

          {/* Technical Skills Highlight */}
          <motion.div
            variants={itemVariants}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold text-card-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Technologies I Use
            </h3>
            <div className="text-sm text-muted-foreground">
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
            <h3 className="text-2xl font-bold text-foreground">
              Let's work together.
            </h3>
            <p className="text-muted-foreground">
              Ready to bring your ideas to life with modern web technologies
            </p>

            <div className="flex gap-3 justify-center">
              <Link to="/contact">
                <motion.button
                  className="hire-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hire Me
                </motion.button>
              </Link>
              <motion.button
                className="copy-button flex items-center gap-2"
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
