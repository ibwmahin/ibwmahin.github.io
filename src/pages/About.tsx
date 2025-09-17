/**
 * About Page Component
 *
 * Personal information page with detailed bio, profile photo, and side projects.
 * Features animated sections and responsive layout.
 */

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { ProductCard } from "../components/ProductCard";
import { Footer } from "../components/Footer";
import profilePhoto from "../assets/profile-photo.jpg";

/**
 * About page with personal information and background
 */
export function About() {
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
              About Abdulla Al Mahin
            </h1>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              I'm Abdulla Al Mahin, a passionate web developer from Bangladesh
              with expertise in modern web technologies. I specialize in
              creating responsive, user-friendly applications using React,
              TypeScript, and other cutting-edge tools. My goal is to build
              digital solutions that make a real impact and provide exceptional
              user experiences.
            </p>
          </motion.div>

          {/* Profile Photo */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={profilePhoto}
                alt="Abdulla Al Mahin - Full Profile Photo"
                className="w-full max-w-xs rounded-2xl object-cover"
              />
            </motion.div>
          </motion.div>

          {/* More About Me Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              More About Me
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As a dedicated web developer from Bangladesh, I bring passion
                and expertise to every project. I stay current with the latest
                web technologies and best practices, constantly learning and
                evolving with the fast-paced world of web development.
              </p>

              <p>
                When I'm not coding, I enjoy exploring new technologies,
                contributing to open-source projects, and sharing knowledge with
                the developer community. I believe in writing clean,
                maintainable code and creating applications that provide real
                value to users.
              </p>
            </div>
          </motion.div>

          {/* Side Projects */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              My Projects & Products
            </h2>
            <p className="text-muted-foreground">
              Here are some of the projects and products I've built, showcasing
              my skills and passion for web development.
            </p>

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
              <ProductCard
                title="Digital Pathways"
                category="AI Educational Platform"
                icon="🚀"
                href="https://digitalpathways.ai/"
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

