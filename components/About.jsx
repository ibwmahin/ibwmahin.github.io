"use client"
import { motion } from "framer-motion"

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Education Section */}
          <motion.div variants={itemVariants} className="pb-8">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">BIODATA</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 mt-2">Education</h2>

            <div className="space-y-8">
              <motion.div variants={itemVariants} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-2 top-1"></div>
                <span className="text-gray-500 text-sm font-medium">1998 - 2004</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">
                  Bachelors in Engineering in Information Technology
                </h3>
                <p className="text-gray-600">Harvard School of Science and management</p>
              </motion.div>

              <motion.div variants={itemVariants} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-2 top-1"></div>
                <span className="text-gray-500 text-sm font-medium">2004 - 2006</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">Masters in Data Analysis</h3>
                <p className="text-gray-600">Harvard School of Science and management</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Experiences Section */}
          <motion.div variants={itemVariants} className="pb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Experiences</h2>

            <div className="space-y-8">
              <motion.div variants={itemVariants} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-2 top-1"></div>
                <span className="text-gray-500 text-sm font-medium">2007 - 2012</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">Creative Agency Inc.: Design head</h3>
                <p className="text-gray-600">
                  iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-2 top-1"></div>
                <span className="text-gray-500 text-sm font-medium">2013 - present</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">Studio Alpha.: Project Manager</h3>
                <p className="text-gray-600">
                  iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div variants={itemVariants} className="pb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Interests</h2>

            <div className="space-y-8">
              <motion.div variants={itemVariants} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-2 top-1"></div>
                <span className="text-gray-500 text-sm font-medium">2007 - 2012</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">
                  Bachelors in Engineering in Information Technology
                </h3>
                <p className="text-gray-600">Harvard School of Science and management</p>
              </motion.div>

              <motion.div variants={itemVariants} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-2 top-1"></div>
                <span className="text-gray-500 text-sm font-medium">2013 - present</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">Studio Alpha.: Project Manager</h3>
                <p className="text-gray-600">
                  iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* References Section */}
          <motion.div variants={itemVariants} className="pb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">References</h2>

            <div className="space-y-8">
              <motion.div variants={itemVariants} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-2 top-1"></div>
                <span className="text-gray-500 text-sm font-medium">1998 - 2004</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">Dr. Stephen H. King</h3>
                <p className="text-gray-600">
                  iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-2 top-1"></div>
                <span className="text-gray-500 text-sm font-medium">2004 - 2006</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">Dr. David Howard</h3>
                <p className="text-gray-600">
                  iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
