import React from "react";
import { motion } from "framer-motion";
import { skills as importedSkills, Skill } from "../data/portfolio";

// Fallback skills data
const defaultSkills: Skill[] = [
  { name: "React", category: "frontend", level: 95 },
  { name: "Node.js", category: "backend", level: 90 },
  { name: "PostgreSQL", category: "database", level: 88 },
  { name: "Git", category: "tools", level: 90 },
];

const skills: Skill[] = Array.isArray(importedSkills)
  ? importedSkills
  : defaultSkills;
console.log("Imported skills:", importedSkills);
console.log("Loaded skills:", skills);

const Skills: React.FC = () => {
  const skillCategories = [
    { name: "Frontend", key: "frontend", color: "blue" },
    { name: "Backend", key: "backend", color: "green" },
    { name: "Database", key: "database", color: "purple" },
    { name: "Tools", key: "tools", color: "orange" },
  ];

  const getColorClasses = (color: string): string => {
    const colors = {
      blue: "bg-blue-500 text-blue-100 border-blue-600",
      green: "bg-green-500 text-green-100 border-green-600",
      purple: "bg-purple-500 text-purple-100 border-purple-600",
      orange: "bg-orange-500 text-orange-100 border-orange-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-gradient-flow"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent mb-6 tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(
              (skill: Skill) => skill.category === category.key,
            );
            console.log(`Skills for ${category.name}:`, categorySkills);
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: categoryIndex * 0.1,
                  ease: "easeOut",
                }}
                className="bg-black/60 rounded-xl p-6 shadow-xl border border-white/15 hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-5 flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${getColorClasses(category.color)} mr-3`}
                  ></div>
                  {category.name}
                </h3>

                <div className="space-y-4">
                  {categorySkills.map((skill: Skill, skillIndex: number) => {
                    const level = Math.max(
                      0,
                      Math.min(100, Number(skill.level) || 0),
                    );
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: "easeOut",
                        }}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-300 font-medium text-sm">
                          {skill.name}
                        </span>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gray-700 rounded-full mr-3 overflow-hidden group">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level}%` }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{
                                duration: 1,
                                delay: categoryIndex * 0.1 + skillIndex * 0.1,
                                ease: "easeOut",
                              }}
                              className={`h-2 ${getColorClasses(category.color).replace("text-", "bg-").replace("border-", "bg-")} rounded-full group-hover:brightness-110 transition-all duration-200`}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {level}%
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          <div className="rounded-xl p-4 bg-black shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 max-h-[20rem]">
            <div className="flex items-center  mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                <i className="flex items-center justify-center bx bx-globe h-5 w-5 text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-white ml-2">
                Frontend
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                React.js
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Next.js
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Tailwind CSS
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                TypeScript
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Vite
              </span>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-black shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 max-h-[20rem]">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                <i className="flex items-center justify-center bx bx-server h-5 w-5 text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-white ml-2">
                Backend & Databases
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Node.js
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Express
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                MongoDB
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                PostgreSQL
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Prisma
              </span>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-black shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 max-h-[20rem]">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <i className="flex items-center justify-center bx bx-brain h-5 w-5 text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-white ml-2">AI & ML</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                OpenAI API
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                TensorFlow
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                PyTorch
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                HuggingFace
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                LangChain
              </span>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-black shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 max-h-[20rem]">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                <i className="flex items-center justify-center bx bx-cloud h-5 w-5 text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-white ml-2">
                DevOps & Cloud
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                AWS
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Docker
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Kubernetes
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                CI/CD
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Vercel
              </span>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-black shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 max-h-[20rem]">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                <i className="flex items-center justify-center bx bx-code h-5 w-5 text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-white ml-2">
                Tools & Frameworks
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Git
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Framer Motion
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Vitest
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                GitHub
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                ESLint
              </span>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-black shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 max-h-[20rem]">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500">
                <i className="flex items-center justify-center bx bx-keyframe h-5 w-5 text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-white ml-2">
                Specializations
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Full-Stack Development
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                AI Integration
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Clean Architecture
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                Scalable Systems
              </span>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <div className="bg-black/60 rounded-xl p-8 shadow-xl border border-white/15 max-w-4xl mx-auto hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-extrabold text-white mb-5">
              Always Learning
            </h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              The tech landscape is constantly evolving, and so am I. Currently
              exploring:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "WebAssembly",
                "Rust",
                "AI/ML",
                "Web3",
                "Microservices",
                "DevOps",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="px-4 py-2  bg-white text-black rounded-full text-sm font-medium border-2 hover:bg-black border-orange-700  cursor-default transition-colors duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
