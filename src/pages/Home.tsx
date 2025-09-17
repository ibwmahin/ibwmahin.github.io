/**
 * Home Page Component
 *
 * The main landing page featuring hero section, project preview, and products showcase.
 * Includes animated elements using Framer Motion and responsive design.
 */

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { ProjectCard } from "../components/ProjectCard";
import { ProductCard } from "../components/ProductCard";
import { Footer } from "../components/Footer";
import profilePhoto from "../assets/profile-photo.jpg";

/**
 * Main home page with hero section and project previews
 */
export function Home() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ibwmahin@gmail.com");
    alert("Mail Copyed!");
    // Add toast notification here if desired
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
            <StatusBadge status="Web Developer" />
          </motion.div>

          {/* Hero Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground flex gap-2">
                  I'm Mahin
                  <motion.div
                    animate={{
                      rotate: [0, 20, -10, 20, 0], // wave motion
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ display: "inline-block", fontSize: "3rem" }}
                  >
                    👋
                  </motion.div>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Web Developer from Bangladesh.
                  <br />
                  Creating amazing digital experiences.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
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
              </div>

              {/* Profile Photo */}
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={profilePhoto}
                  alt="Abdulla Al Mahin - Web Developer"
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-border"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                Projects
              </h2>
              <Link
                to="/projects"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm"
              >
                View All
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              <ProjectCard
                title="Digital Pathways"
                description="AI-powered educational platform"
                icon="🚀"
                color="morva"
                onClick={() =>
                  window.open("https://digitalpathways.ai/", "_blank")
                }
              />
              <ProjectCard
                title="LazyNvim Config"
                description="Custom Neovim configuration"
                icon="⚡"
                color="rectangle"
                onClick={() =>
                  window.open("https://github.com/ibwmahin/LazyNvim", "_blank")
                }
              />
              <ProjectCard
                title="Gaming Website"
                description="Interactive gaming platform"
                icon="🎮"
                color="simply"
                onClick={() =>
                  window.open(
                    "https://ibwmahin.github.io/Gaming_Website/",
                    "_blank",
                  )
                }
              />
            </div>
          </motion.div>

          {/* Products Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              Products
            </h2>

            <div className="space-y-3">
              <ProductCard
                title="Pearni"
                category="Learning Platform"
                icon="📚"
                href="https://pearni.netlify.app/"
              />
              <ProductCard
                title="Cyber Scan Guardian Shield"
                category="Security Tool"
                icon="🛡️"
                href="https://ibwmahin.github.io/cyber-scan-guardian-shield/"
              />
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
              Creating user experience and visual appealing design
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
