"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "./Header"

gsap.registerPlugin(ScrollTrigger)

const CaseStudies = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate case study cards on scroll
      gsap.fromTo(
        ".case-study-card",
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".case-studies-container",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate metrics on scroll
      gsap.fromTo(
        ".metric-item",
        { opacity: 0, scale: 0.8, rotation: -5 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".metrics-container",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const caseStudies = [
    {
      id: 1,
      title: "E-Commerce Revolution: TechMart Digital Transformation",
      client: "TechMart Electronics",
      category: "E-Commerce Development",
      duration: "4 months",
      image: "/placeholder.svg?height=400&width=600",
      background: {
        company: "TechMart Electronics",
        industry: "Consumer Electronics Retail",
        size: "Mid-size retailer with 50+ physical stores",
        challenge: "Outdated online presence limiting growth potential",
      },
      problem: {
        title: "Digital Transformation Challenge",
        description:
          "TechMart was struggling with an outdated website that couldn't handle their growing online demand. Their conversion rate was only 1.2%, and mobile users were abandoning the site due to poor user experience.",
        keyIssues: [
          "Slow loading times (8+ seconds)",
          "Non-responsive design",
          "Complex checkout process",
          "Poor search functionality",
          "Limited payment options",
        ],
      },
      solution: {
        title: "Comprehensive Digital Overhaul",
        description:
          "I designed and developed a modern, responsive e-commerce platform with advanced features and optimized user experience.",
        keyFeatures: [
          "React-based frontend with Next.js for optimal performance",
          "Tailwind CSS for responsive, mobile-first design",
          "Advanced product filtering and search",
          "Streamlined one-page checkout",
          "Multiple payment gateway integration",
          "Real-time inventory management",
          "Progressive Web App (PWA) capabilities",
        ],
        technologies: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Stripe API"],
      },
      results: {
        title: "Transformative Business Impact",
        metrics: [
          { label: "Conversion Rate", before: "1.2%", after: "4.8%", improvement: "+300%" },
          { label: "Page Load Time", before: "8.2s", after: "1.4s", improvement: "-83%" },
          { label: "Mobile Traffic", before: "35%", after: "68%", improvement: "+94%" },
          { label: "Revenue Growth", before: "Baseline", after: "250% increase", improvement: "+250%" },
          { label: "User Engagement", before: "2.1 min", after: "5.7 min", improvement: "+171%" },
        ],
        testimonial: {
          text: "Mahin transformed our entire digital presence. The new website not only looks amazing but has tripled our online sales. The attention to detail and technical expertise exceeded our expectations.",
          author: "Sarah Johnson",
          position: "CEO, TechMart Electronics",
        },
      },
    },
    {
      id: 2,
      title: "Healthcare Innovation: MedConnect Patient Portal",
      client: "MedConnect Healthcare",
      category: "Healthcare Technology",
      duration: "6 months",
      image: "/placeholder.svg?height=400&width=600",
      background: {
        company: "MedConnect Healthcare",
        industry: "Healthcare Services",
        size: "Regional healthcare provider with 15 clinics",
        challenge: "Inefficient patient communication and appointment management",
      },
      problem: {
        title: "Patient Experience Crisis",
        description:
          "MedConnect was facing significant challenges with patient satisfaction due to inefficient communication systems and complex appointment booking processes.",
        keyIssues: [
          "Manual appointment booking causing delays",
          "Poor patient-doctor communication",
          "Lack of access to medical records",
          "High administrative overhead",
          "Patient dissatisfaction (2.8/5 rating)",
        ],
      },
      solution: {
        title: "Integrated Patient Experience Platform",
        description:
          "I developed a comprehensive patient portal that streamlined all aspects of patient interaction with the healthcare system.",
        keyFeatures: [
          "Intuitive appointment booking system",
          "Secure patient-doctor messaging",
          "Digital medical records access",
          "Prescription management",
          "Telemedicine integration",
          "Automated appointment reminders",
          "HIPAA-compliant security measures",
        ],
        technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "JWT Authentication", "AWS"],
      },
      results: {
        title: "Healthcare Excellence Achieved",
        metrics: [
          { label: "Patient Satisfaction", before: "2.8/5", after: "4.7/5", improvement: "+68%" },
          { label: "Appointment Efficiency", before: "15 min avg", after: "3 min avg", improvement: "-80%" },
          { label: "Administrative Costs", before: "Baseline", after: "45% reduction", improvement: "-45%" },
          { label: "Patient Engagement", before: "Low", after: "85% active users", improvement: "+85%" },
          { label: "No-show Rate", before: "25%", after: "8%", improvement: "-68%" },
        ],
        testimonial: {
          text: "The patient portal has revolutionized how we interact with our patients. The system is intuitive, secure, and has significantly improved our operational efficiency while enhancing patient satisfaction.",
          author: "Dr. Michael Chen",
          position: "Chief Medical Officer, MedConnect Healthcare",
        },
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="lg:ml-64">
        <section id="case-studies" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
            >
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4 tracking-wider uppercase">
                SUCCESS STORIES
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-gray-900 mb-4 sm:mb-6">
                Impact Chronicles
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover how I've helped businesses transform their digital presence and achieve remarkable growth
                through innovative web solutions.
              </p>
            </motion.div>

            {/* Case Studies */}
            <div className="case-studies-container space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28 xl:space-y-32">
              {caseStudies.map((study, index) => (
                <div key={study.id} className="case-study-card">
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
                    {/* Case Study Header */}
                    <div className="relative">
                      <img
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8">
                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-full">
                            {study.category}
                          </span>
                          <span className="px-3 sm:px-4 py-1 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-full">
                            {study.duration}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                          {study.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-gray-200">{study.client}</p>
                      </div>
                    </div>

                    {/* Case Study Content */}
                    <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16">
                      {/* Background */}
                      <div className="mb-8 sm:mb-10 md:mb-12">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                          Client Background
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Company</p>
                            <p className="font-semibold text-gray-900">{study.background.company}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Industry</p>
                            <p className="font-semibold text-gray-900">{study.background.industry}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Size</p>
                            <p className="font-semibold text-gray-900">{study.background.size}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Challenge</p>
                            <p className="font-semibold text-gray-900">{study.background.challenge}</p>
                          </div>
                        </div>
                      </div>

                      {/* Problem Statement */}
                      <div className="mb-8 sm:mb-10 md:mb-12">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                          {study.problem.title}
                        </h4>
                        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                          {study.problem.description}
                        </p>
                        <div className="bg-red-50 p-4 sm:p-6 rounded-xl">
                          <h5 className="font-semibold text-gray-900 mb-3 sm:mb-4">Key Issues:</h5>
                          <ul className="space-y-2">
                            {study.problem.keyIssues.map((issue, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-red-500 mr-2 mt-1">•</span>
                                <span className="text-sm sm:text-base text-gray-700">{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Solution */}
                      <div className="mb-8 sm:mb-10 md:mb-12">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                          {study.solution.title}
                        </h4>
                        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                          {study.solution.description}
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                          <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
                            <h5 className="font-semibold text-gray-900 mb-3 sm:mb-4">Key Features:</h5>
                            <ul className="space-y-2">
                              {study.solution.keyFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-blue-500 mr-2 mt-1">✓</span>
                                  <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-green-50 p-4 sm:p-6 rounded-xl">
                            <h5 className="font-semibold text-gray-900 mb-3 sm:mb-4">Technologies Used:</h5>
                            <div className="flex flex-wrap gap-2">
                              {study.solution.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-green-200 text-green-800 text-xs sm:text-sm rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="mb-8 sm:mb-10 md:mb-12">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                          {study.results.title}
                        </h4>

                        <div className="metrics-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-10">
                          {study.results.metrics.map((metric, idx) => (
                            <div
                              key={idx}
                              className="metric-item bg-gradient-to-br from-gray-900 to-gray-700 p-4 sm:p-6 rounded-xl text-white text-center"
                            >
                              <h6 className="text-xs sm:text-sm text-gray-300 mb-2">{metric.label}</h6>
                              <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{metric.after}</div>
                              <div className="text-xs sm:text-sm text-green-400 font-semibold">
                                {metric.improvement}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">from {metric.before}</div>
                            </div>
                          ))}
                        </div>

                        {/* Testimonial */}
                        <div className="bg-gray-900 p-6 sm:p-8 md:p-10 rounded-xl text-white">
                          <div className="text-4xl sm:text-5xl text-gray-600 mb-4">"</div>
                          <p className="text-base sm:text-lg md:text-xl italic mb-4 sm:mb-6 leading-relaxed">
                            {study.results.testimonial.text}
                          </p>
                          <div className="flex items-center">
                            <div>
                              <p className="font-semibold text-lg">{study.results.testimonial.author}</p>
                              <p className="text-gray-400 text-sm">{study.results.testimonial.position}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mt-16 sm:mt-20 md:mt-24 lg:mt-28"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Ready to Create Your Success Story?
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Let's discuss how I can help transform your business with innovative web solutions.
              </p>
              <a
                href="/#contact"
                className="magnetic inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gray-900 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default CaseStudies
