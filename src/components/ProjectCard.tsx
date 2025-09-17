/**
 * Project Card Component
 * 
 * Displays individual project information with hover animations.
 * Used in project listings with colorful icons and descriptions.
 */

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ProjectCardProps {
  title: string;
  description: string;
  icon: string;
  color: 'morva' | 'rectangle' | 'simply' | 'glassdoor' | 'seven';
  onClick?: () => void;
}

/**
 * Individual project card with hover animations
 */
export function ProjectCard({ title, description, icon, color, onClick }: ProjectCardProps) {
  const colorClasses = {
    morva: 'bg-project-morva',
    rectangle: 'bg-project-rectangle',
    simply: 'bg-project-simply',
    glassdoor: 'bg-project-glassdoor',
    seven: 'bg-project-seven',
  };

  return (
    <motion.div
      className="project-card group"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Project Icon */}
          <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center text-white font-bold text-lg`}>
            {icon}
          </div>
          
          {/* Project Info */}
          <div>
            <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>

        {/* Arrow Icon */}
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </div>
    </motion.div>
  );
}