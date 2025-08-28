import { useState, useEffect, useRef } from "react";

interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  variant?: "default" | "highlight";
}

interface PortfolioGridProps {
  projects?: Project[];
}

const PortfolioGrid = ({
  projects = [
    {
      id: "1",
      title: "Mobile App Design",
      category: "App Design",
      imageUrl:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      variant: "highlight",
    },
    {
      id: "2",
      title: "Web Dashboard",
      category: "Web Design",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    },
    {
      id: "3",
      title: "E-commerce Platform",
      category: "Web Design",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    },
    {
      id: "4",
      title: "SaaS Platform",
      category: "Web Design",
      imageUrl:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    },
    {
      id: "5",
      title: "Social Media Dashboard",
      category: "Dashboard",
      imageUrl:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    },
    {
      id: "6",
      title: "Real Estate Platform",
      category: "Web Design",
      imageUrl:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
    },
  ],
}: PortfolioGridProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const portfolioRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      },
      { threshold: 0.2 },
    );

    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section
        id="portfolio"
        ref={portfolioRef}
        className="section-padding animate-fade-up"
      >
        <div className="container">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-xs font-bold uppercase bg-[hsl(var(--background))] border-2 border-[hsl(var(--dark))] px-4 py-2">
              Portfolio
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12 items-start">
            <h2 className="text-h1 font-extrabold tracking-tighter leading-tight text-[hsl(var(--dark))]">
              Explore my portfolio of growth-driven digital solutions
            </h2>

            <p className="text-[hsl(var(--muted))] text-sm leading-relaxed font-medium">
              See how I’ve helped businesses shine online.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`relative card card-interactive overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out
                  hover:outline hover:outline-4 hover:outline-offset-4 hover:outline-[hsl(var(--dark))]
                  ${
                    hoveredIndex === null && project.variant === "highlight"
                      ? "bg-[hsl(var(--dark))] text-white border-2 border-[hsl(var(--dark))]"
                      : hoveredIndex === index
                        ? "bg-[hsl(var(--dark))] text-white border-2 border-[hsl(var(--dark))]"
                        : "bg-[hsl(var(--background))] text-[hsl(var(--dark))] border-2 border-[hsl(var(--dark))]"
                  } group-hover:[filter:drop-shadow(2px_2px_0_hsl(var(--dark)))]`}
                onClick={() => openModal(project)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:[filter:grayscale(0)] [filter:grayscale(50%)]"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
                      hoveredIndex === null && project.variant === "highlight"
                        ? "bg-[hsl(var(--dark),0.7)] opacity-100"
                        : hoveredIndex === index
                          ? "bg-[hsl(var(--dark),0.7)] opacity-100"
                          : "bg-[hsl(var(--dark),0.5)] opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="text-center">
                      <h3
                        className={`font-extrabold text-base uppercase tracking-wide relative
                          ${
                            (hoveredIndex === null &&
                              project.variant === "highlight") ||
                            hoveredIndex === index
                              ? "text-white group-hover:[text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]"
                              : "text-white group-hover:[text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]"
                          }`}
                      >
                        {project.title}
                        <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-glitch"></span>
                      </h3>
                      <p
                        className={`text-xs font-medium ${
                          (hoveredIndex === null &&
                            project.variant === "highlight") ||
                          hoveredIndex === index
                            ? "text-white/80"
                            : "text-white/80"
                        }`}
                      >
                        {project.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modernized Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-[hsl(var(--dark),0.8)] z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-[hsl(var(--background))] border-2 border-[hsl(var(--dark))] p-8 max-w-2xl w-full max-h-[80vh] overflow-auto transition-all duration-300 ease-in-out [filter:drop-shadow(4px_4px_0_hsl(var(--dark)))]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-h2 font-extrabold uppercase tracking-wide text-[hsl(var(--dark))] [text-shadow:2px_2px_4px_rgba(0,0,0,0.2)]">
                  {selectedProject.title}
                </h3>
                <p className="text-[hsl(var(--muted))] font-medium">
                  {selectedProject.category}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-2xl font-bold text-[hsl(var(--muted))] hover:text-[hsl(var(--dark))] transition-colors"
              >
                ×
              </button>
            </div>

            <img
              src={selectedProject.imageUrl}
              alt={selectedProject.title}
              className="w-full border-2 border-[hsl(var(--dark))] mb-6 [filter:grayscale(50%)]"
            />

            <p className="text-[hsl(var(--muted))] leading-relaxed font-medium">
              This is a detailed view of {selectedProject.title}. Here you would
              typically include project details, technologies used, challenges
              overcome, and results achieved.
            </p>

            <div className="mt-6 pt-6 border-t border-[hsl(var(--dark))]">
              <button className="bg-[hsl(var(--dark))] text-white font-bold uppercase px-4 py-2 border-2 border-[hsl(var(--dark))] hover:[filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] transition-all">
                View Live Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioGrid;
