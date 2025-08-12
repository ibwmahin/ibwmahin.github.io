"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Experience = () => {
  const skillsRef = useRef(null);

  const personalInfo = [
    { label: "Age", value: "20" },
    { label: "Residence", value: "Bangladesh" },
    { label: "Address", value: "Dhaka, Bangladesh" },
    { label: "E-mail", value: "ibwmahin@gmail.com" },
    { label: "Phone", value: "+8801854333256" },
  ];

  const skills = [
    { name: "React & JavaScript", percentage: 95 },
    { name: "HTML & CSS", percentage: 98 },
    { name: "Tailwind CSS", percentage: 90 },
    { name: "UI/UX Design", percentage: 85 },
    { name: "Video Editing", percentage: 80 },
  ];

  useEffect(() => {
    const skillBars = skillsRef.current?.querySelectorAll(".skill-bar");

    if (skillBars) {
      gsap.fromTo(
        skillBars,
        { width: "0%" },
        {
          width: (i, target) => target.dataset.percentage + "%",
          duration: 1.5,
          delay: 0.2,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
              INTRODUCTION
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Experienced
              <br />
              Creative mind
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I help small businesses, creators, and startups grow their online
              presence through modern, fast, and beautifully designed websites.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {personalInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center py-4 border-b border-gray-100"
                  >
                    <span className="text-gray-900 font-medium text-lg">
                      {info.label}
                    </span>
                    <span className="text-gray-600 text-lg">{info.value}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Skills */}
              <motion.div
                ref={skillsRef}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-medium text-lg">
                        {skill.name}
                      </span>
                      <span className="text-gray-600 font-medium text-lg">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="skill-bar bg-red-500 h-3 rounded-full shadow-sm"
                        data-percentage={skill.percentage}
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
