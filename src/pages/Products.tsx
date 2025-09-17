/**
 * Products Page Component
 *
 * Dedicated page for showcasing digital products and applications.
 * Features expanded product listings with external links.
 */

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { ProductCard } from "../components/ProductCard";
import { Footer } from "../components/Footer";

/**
 * Products data array for easy management
 * Add or remove products by modifying this array
 */
const products = [
  {
    title: "Pearni",
    category: "Learning Platform",
    icon: "📚",
    href: "https://pearni.netlify.app/",
    description:
      "Interactive learning platform designed to enhance educational experiences with modern UI/UX.",
  },
  {
    title: "Cyber Scan Guardian Shield",
    category: "Security Tool",
    icon: "🛡️",
    href: "https://ibwmahin.github.io/cyber-scan-guardian-shield/",
    description:
      "Advanced cybersecurity scanning tool for vulnerability assessment and protection.",
  },
];

/**
 * Additional showcase projects
 */
const showcaseProjects = [
  {
    title: "Digital Pathways AI",
    category: "AI Educational Platform",
    icon: "🚀",
    href: "https://digitalpathways.ai/",
    description:
      "AI-powered educational platform revolutionizing learning experiences.",
  },
  {
    title: "Gaming Website",
    category: "Entertainment Platform",
    icon: "🎮",
    href: "https://ibwmahin.github.io/Gaming_Website/",
    description:
      "Interactive gaming platform with modern design and smooth user experience.",
  },
  {
    title: "Manae Shopping Mart",
    category: "E-commerce Platform",
    icon: "🛍️",
    href: "https://manaeshoppingmartllc.com/",
    description:
      "Full-featured e-commerce platform with secure payment integration.",
  },
];

/**
 * Products page showcasing digital products and applications
 */
export function Products() {
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
            <StatusBadge status="Products" isAvailable={false} />
          </motion.div>

          {/* Page Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              My Digital Products
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore the digital products and applications I've built, each
              designed to solve real-world problems with modern web
              technologies.
            </p>
          </motion.div>

          {/* Main Products Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              Featured Products
            </h2>

            <div className="space-y-4">
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
          </motion.div>

          {/* Feature Highlight */}
          <motion.div
            variants={itemVariants}
            className="bg-card border border-border rounded-2xl p-6 text-center space-y-4"
          >
            <h3 className="text-xl font-semibold text-card-foreground">
              🚀 Featured Project
            </h3>
            <p className="text-muted-foreground">
              "Pearni" - An interactive learning platform that revolutionizes
              educational experiences with modern design, smooth animations, and
              intuitive user interface.
            </p>
            <motion.a
              href="https://pearni.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hire-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Pearni
            </motion.a>
          </motion.div>

          {/* Tech Stack Info */}
          <motion.div
            variants={itemVariants}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold text-card-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Built With Modern Technologies
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                All my products are built using cutting-edge web technologies
                including React, TypeScript, Tailwind CSS, and various modern
                frameworks to ensure optimal performance and user experience.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Node.js",
                  "MongoDB",
                  "AWS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-muted rounded-md text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6 pt-8"
          >
            <h3 className="text-2xl font-bold text-foreground">
              Ready to build something amazing?
            </h3>
            <p className="text-muted-foreground">
              Let's collaborate and bring your ideas to life with modern web
              development
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

