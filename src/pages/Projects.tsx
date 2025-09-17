/**
 * Projects Page Component
 *
 * Showcases all projects and work portfolio with detailed descriptions.
 * Features animated project cards and responsive grid layout.
 */

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { ProjectCard } from "../components/ProjectCard";
import { ProductCard } from "../components/ProductCard";
import { Footer } from "../components/Footer";

/**
 * Projects data array for easy management
 */
const projects = [
  {
    title: "Digital Pathways",
    description: "AI-powered educational platform",
    icon: "🎓",
    color: "morva" as const,
    url: "https://digitalpathways.ai/",
  },
  {
    title: "LazyNvim Config",
    description: "Custom Neovim configuration",
    icon: "⚡",
    color: "rectangle" as const,
    url: "https://github.com/ibwmahin/LazyNvim",
  },
  {
    title: "Gaming Website",
    description: "Interactive gaming platform",
    icon: "🎮",
    color: "simply" as const,
    url: "https://ibwmahin.github.io/Gaming_Website/",
  },
  {
    title: "Manae Shopping Mart",
    description: "E-commerce platform",
    icon: "🛍️",
    color: "glassdoor" as const,
    url: "https://manaeshoppingmartllc.com/",
  },
];

/** Products data for side projects section */
const products = [
  {
    title: "Pearni",
    category: "Learning Platform",
    icon: "📚",
    href: "https://pearni.netlify.app/",
  },
  {
    title: "Cyber Scan Guardian Shield",
    category: "Security Tool",
    icon: "🛡️",
    href: "https://ibwmahin.github.io/cyber-scan-guardian-shield/",
  },
];

/**
 * Projects page displaying portfolio of work
 */
export function Projects() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ibwmahin@gmail.com");
  };

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
    <div className="min-h-screen bg-background mt-5">
      <div className="max-w-2xl mx-auto px-6 pt-24 pb-16">
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
            <div className="space-y-3">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  icon={project.icon}
                  color={project.color}
                  onClick={() => window.open(project.url, "_blank")}
                />
              ))}
            </div>
          </motion.div>

          {/* Explore Products Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Explore My Products
            </h2>
            <p className="text-muted-foreground">
              Some of the digital products that I worked on as side projects,
              explore them now
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                Products
              </h3>

              <div className="space-y-3">
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    title={product.title}
                    category={product.category}
                    icon={product.icon}
                    href={product.href}
                  />
                ))}
              </div>
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
                <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                Copy Email
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
