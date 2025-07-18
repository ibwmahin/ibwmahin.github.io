import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Rocket } from 'lucide-react';

interface HomeProps {
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  totalPages: number;
}

const Home: React.FC<HomeProps> = ({ nextPage }) => {
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

  const features = [
    {
      icon: <Code size={24} />,
      title: "Clean Code",
      description: "Writing maintainable and efficient code"
    },
    {
      icon: <Palette size={24} />,
      title: "Modern Design",
      description: "Beautiful and responsive user interfaces"
    },
    {
      icon: <Rocket size={24} />,
      title: "Performance",
      description: "Optimized for speed and scalability"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-12"
        >
          {/* Main Hero Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <span className="bg-gradient-to-r from-latte-blue via-latte-mauve to-latte-pink dark:from-mocha-blue dark:via-mocha-mauve dark:to-mocha-pink bg-clip-text text-transparent animate-gradient-x">
                Hello, I'm
              </span>
              <br />
              <span className="text-latte-text dark:text-mocha-text">
                Creative Developer
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-latte-subtext1 dark:text-mocha-subtext1 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              I craft beautiful digital experiences with modern technologies and thoughtful design.
              Let's build something amazing together.
            </motion.p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-latte-blue dark:text-mocha-blue mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-latte-text dark:text-mocha-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-latte-subtext1 dark:text-mocha-subtext1">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={nextPage}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-latte-blue to-latte-mauve dark:from-mocha-blue dark:to-mocha-mauve text-latte-base dark:text-mocha-base font-semibold rounded-full hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Explore
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
          </motion.div>

          {/* Floating Animation */}
          <motion.div 
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-latte-blue/10 to-latte-mauve/10 dark:from-mocha-blue/10 dark:to-mocha-mauve/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div 
            className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-latte-pink/10 to-latte-peach/10 dark:from-mocha-pink/10 dark:to-mocha-peach/10 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;