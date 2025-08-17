"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const textRefs = useRef([]);

  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      image: "/modern-ecommerce-interface.png",
      format: "React",
      formatColor: "bg-blue-500",
      url: "https://example.com/ecommerce",
    },
    {
      id: 2,
      title: "Task Management App",
      image: "/task-management-dashboard.png",
      format: "Vue",
      formatColor: "bg-green-500",
      url: "https://example.com/taskapp",
    },
    {
      id: 3,
      title: "AI Chat Interface",
      image: "/ai-chatbot-interface.png",
      format: "Next.js",
      formatColor: "bg-purple-500",
      url: "https://example.com/aichat",
    },
    {
      id: 4,
      title: "Portfolio Website",
      image: "/portfolio-website-design.png",
      format: "HTML",
      formatColor: "bg-orange-500",
      url: "https://example.com/portfolio",
    },
  ];

  useEffect(() => {
    // Animate section title
    const words = titleRef.current.textContent.split(" ");
    titleRef.current.innerHTML = words
      .map((w) => `<span class="word">${w}</span>`)
      .join(" ");

    gsap.fromTo(
      ".word",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate cards
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
        },
      }
    );

    // Animate project text
    gsap.fromTo(
      textRefs.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRefs.current[0],
          start: "top 90%",
        },
      }
    );
  }, []);

  const handleCardHover = (card, isEntering) => {
    const image = card.querySelector("img");
    const badge = card.querySelector(".format-badge");

    if (isEntering) {
      gsap.to(card, { y: -8, scale: 1.01, duration: 0.25, ease: "power2.out" });
      gsap.to(image, { scale: 1.05, duration: 0.25, ease: "power2.out" });
      gsap.to(badge, { scale: 1.05, duration: 0.2, ease: "back.out(1.7)" });
    } else {
      gsap.to([card, image, badge], { clearProps: "all", duration: 0.25 });
    }
  };

  return (
    <section id="portfolio" className="my-20 py-16 relative overflow-hidden">
      {/* Title */}
      <div className="mb-14 text-center">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
        >
          Portfolio
        </h2>
        <p
          ref={(el) => (textRefs.current[0] = el)}
          className="mt-4 text-gray-600 max-w-xl mx-auto"
        >
          A selection of modern projects, designed and built with performance
          and creativity in mind.
        </p>
      </div>
      

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all"
            onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
          >
            {/* Image with hover icon */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => window.open(project.url, "_blank")}
                  className="bg-white/90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"
                >
                  <svg
                    className="w-6 h-6 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Text */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3
                  ref={(el) => (textRefs.current[i + 1] = el)}
                  className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
                >
                  {project.title}
                </h3>
              </div>
              <span
                className={`format-badge ${project.formatColor} inline-block w-fit text-white px-3 py-1 text-xs font-medium rounded-full mt-2`}
              >
                {project.format}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
    
  );
};

export default Projects;
