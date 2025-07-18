import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Target, Heart } from 'lucide-react';

interface AboutProps {
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  totalPages: number;
}

const About: React.FC<AboutProps> = ({ nextPage }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const skills = [
    { name: "JavaScript", level: 95 },
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "UI/UX Design", level: 85 },
  ];

  const values = [
    {
      icon: <User size={24} />,
      title: "User-Centered",
      description: "I prioritize user experience in every design decision"
    },
    {
      icon: <Award size={24} />,
      title: "Quality First",
      description: "Delivering excellence through attention to detail"
    },
    {
      icon: <Target size={24} />,
      title: "Goal-Oriented",
      description: "Focused on achieving measurable business objectives"
    },
    {
      icon: <Heart size={24} />,
      title: "Passionate",
      description: "Genuine love for creating impactful digital solutions"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-latte-text dark:text-mocha-text mb-4">
              About Me
            </h2>
            <p className="text-xl text-latte-subtext1 dark:text-mocha-subtext1 max-w-3xl mx-auto">
              I'm a passionate developer who loves creating beautiful, functional, and user-friendly digital experiences.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-latte-subtext1 dark:text-mocha-subtext1 leading-relaxed">
                  With over 5 years of experience in web development, I've had the privilege of working with 
                  diverse clients and projects. My journey started with a curiosity about how websites work, 
                  and has evolved into a deep passion for creating digital solutions that make a difference.
                </p>
                
                <p className="text-latte-subtext1 dark:text-mocha-subtext1 leading-relaxed">
                  I believe that great design is not just about aesthetics—it's about creating intuitive, 
                  accessible, and meaningful experiences that connect with people. Every project is an 
                  opportunity to push boundaries and explore new possibilities.
                </p>
              </div>

              <motion.button
                onClick={nextPage}
                className="inline-flex items-center px-6 py-3 bg-latte-blue dark:bg-mocha-blue text-latte-base dark:text-mocha-base rounded-lg font-medium hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
            </motion.div>

            {/* Right Column - Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-latte-text dark:text-mocha-text mb-6">
                Skills & Expertise
              </h3>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-latte-text dark:text-mocha-text font-medium">
                        {skill.name}
                      </span>
                      <span className="text-latte-subtext1 dark:text-mocha-subtext1">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-latte-surface0 dark:bg-mocha-surface0 rounded-full h-2">
                      <motion.div
                        className="h-2 bg-gradient-to-r from-latte-blue to-latte-mauve dark:from-mocha-blue dark:to-mocha-mauve rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-3xl font-bold text-latte-text dark:text-mocha-text text-center">
              My Values
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-latte-blue dark:text-mocha-blue mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-latte-text dark:text-mocha-text mb-2">
                    {value.title}
                  </h4>
                  <p className="text-latte-subtext1 dark:text-mocha-subtext1 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;