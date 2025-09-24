/**
 * Project Card Component
 *
 * Displays individual project information with hover animations.
 * Used in project listings with monochrome icons and descriptions.
 */

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface ProjectCardProps {
  title: string;
  description: string;
  icon: IconDefinition;
  onClick?: () => void;
}

/**
 * Individual project card with hover animations
 */
export function ProjectCard({
  title,
  description,
  icon,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.div
      className="project-card group bg-card border border-border/50 rounded-xl p-4 cursor-pointer overflow-hidden"
      onClick={onClick}
      whileHover={{
        y: -2,
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        duration: 0.28,
        ease: "easeOut",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Project Icon */}
          <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-foreground font-bold text-lg group-hover:bg-muted transition-colors duration-300">
            <FontAwesomeIcon
              icon={icon}
              fixedWidth
              style={{ width: 20, height: 20 }}
            />
          </div>

          {/* Project Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-base group-hover:text-foreground/90 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Arrow Icon */}
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ x: 10 }}
          animate={{ x: 0 }}
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ width: 16, height: 16 }}
            className="text-muted-foreground group-hover:text-foreground transition-colors duration-300"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

