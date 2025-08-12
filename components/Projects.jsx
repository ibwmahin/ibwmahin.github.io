"use client"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const projectsRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)
  const carouselRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      image: "/modern-ecommerce-interface.png",
      format: "react",
      formatColor: "bg-blue-500",
    },
    {
      id: 2,
      title: "Task Management App",
      image: "/task-management-dashboard.png",
      format: "vue",
      formatColor: "bg-green-500",
    },
    {
      id: 3,
      title: "AI Chat Interface",
      image: "/ai-chatbot-interface.png",
      format: "next",
      formatColor: "bg-purple-500",
    },
    {
      id: 4,
      title: "Portfolio Website",
      image: "/portfolio-website-design.png",
      format: "html",
      formatColor: "bg-orange-500",
    },
  ]

  useEffect(() => {
    // Title animation with split text effect
    const titleText = titleRef.current
    const words = titleText.textContent.split(" ")
    titleText.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(" ")

    gsap.fromTo(
      ".word",
      { opacity: 0, y: 100, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Project cards stagger animation
    gsap.fromTo(
      cardsRef.current?.children,
      { opacity: 0, y: 80, scale: 0.8, rotationY: -15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Parallax effect for section
    gsap.to(projectsRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })
  }, [])

  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % projects.length
        gsap.to(carouselRef.current, {
          x: -nextSlide * (100 / projects.length) + "%",
          duration: 0.8,
          ease: "power2.inOut",
        })
        return nextSlide
      })
    }, 4000)

    return () => clearInterval(autoScrollInterval)
  }, [projects.length])

  useEffect(() => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: -currentSlide * (100 / projects.length) + "%",
        duration: 0.8,
        ease: "power2.inOut",
      })
    }
  }, [currentSlide])

  const handleCardHover = (e, isEntering) => {
    const card = e.currentTarget
    const image = card.querySelector("img")
    const formatBadge = card.querySelector(".format-badge")

    if (isEntering) {
      gsap.to(card, {
        y: -15,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.to(image, {
        scale: 1.1,
        rotation: 2,
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.to(formatBadge, {
        scale: 1.1,
        rotation: -5,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.to(image, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.to(formatBadge, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handleDotClick = (index) => {
    setCurrentSlide(index)
    gsap.fromTo(`.dot-${index}`, { scale: 1 }, { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" })
  }

  return (
    <section ref={projectsRef} id="portfolio" className="my-20 py-20 relative overflow-hidden" data-text="04">
      <div className="absolute top-10 right-20 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 parallax-bg"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full opacity-40 parallax-bg"></div>

      <div className="mb-20 fade-in">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <span className="text-gray-500 text-sm font-medium tracking-wider uppercase">some of my recent works</span>
            <h2 ref={titleRef} className="text-6xl md:text-7xl font-bold text-gray-900 leading-none">
              Portfolio
            </h2>
          </div>
          <div className="fade-in">
            <p className="text-gray-600 mb-8 leading-relaxed">
              Showcasing modern web applications and creative solutions that help businesses grow their digital
              presence.
            </p>
            <a
              href="#"
              className="magnetic inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-sm font-medium transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              View All
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-800 ease-in-out"
          style={{ width: `${projects.length * 100}%` }}
        >
          {projects.map((project, index) => (
            <div key={project.id} className="w-full flex-shrink-0 px-4" style={{ width: `${100 / projects.length}%` }}>
              <div
                ref={index === 0 ? cardsRef : null}
                className="group cursor-pointer max-w-md mx-auto"
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
                onClick={() => window.open("#", "_blank")}
              >
                <div className="relative overflow-hidden mb-4 rounded-lg shadow-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </div>
                  <span
                    className={`format-badge ${project.formatColor} text-white px-3 py-1 text-xs font-medium rounded-full shadow-md`}
                  >
                    {project.format}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12 space-x-2">
        {projects.map((_, dot) => (
          <button
            key={dot}
            onClick={() => handleDotClick(dot)}
            className={`dot-${dot} w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              currentSlide === dot ? "bg-red-500 shadow-lg animate-pulse" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Projects
