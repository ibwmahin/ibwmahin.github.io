/**
 * Projects Page Component
 *
 * Showcases all projects and work portfolio with detailed descriptions.
 * Uses ProjectCard and the centralized projects data.
 */

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { ProjectCard } from "../components/ProjectCard";
import { Footer } from "../components/Footer";
import { projects as projectsData } from "../data/projects";

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
                  title={p.title}
                  description={p.description}
                  icon={p.icon}
                  onClick={() => window.open(p.url, "_blank")}
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
