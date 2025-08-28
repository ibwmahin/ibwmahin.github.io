import { useEffect, useRef, useState } from "react";

interface Service {
  title: string;
  description: string;
  variant?: "default" | "highlight";
}

interface ServicesGridProps {
  services?: Service[];
}

const ServicesGrid = ({
  services = [
    {
      title: "Responsive Web Development",
      description:
        "Crafting modern, fast websites using HTML, CSS, Tailwind, GSAP, Framer Motion, JavaScript, and React.",
      variant: "highlight",
    },
    {
      title: "Start-up WordPress Development",
      description:
        "Building robust and scalable WordPress solutions for startups.",
    },
    {
      title: "Video Editing for Social Media & Ads",
      description:
        "Creating engaging video content to enhance social media presence and ad campaigns.",
    },
    {
      title: "Branding & UI/UX Desing",
      description:
        "Designing unique visuals to strengthen brand identity. & Developing intuitive and user-friendly interfaces to elevate user experiences.",
    },
  ],
}: ServicesGridProps) => {
  const servicesRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      },
      { threshold: 0.2 },
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={servicesRef}
      className="section-padding animate-fade-up"
    >
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Header */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="flex items-center space-x-6 px-4 py-2 border-2 border-[hsl(var(--dark))] bg-[hsl(var(--background))] [filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] transition-all duration-300">
                Services
              </span>
            </div>

            <h2 className="text-h1 leading-tight">
              How I help businesses thrive online with tailored solutions.
            </h2>

            <p className="text-[hsl(var(--muted))] leading-relaxed">
              A comprehensive look at my services and how we deliver them
            </p>

            <button className="flex items-center  space-x-6 px-4 py-2 border-2 border-[hsl(var(--dark))] bg-[hsl(var(--background))] [filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] transition-all duration-300">
              Hire Me <span className="ml-1 font-bold ">!</span>
            </button>
          </div>

          {/* Right Column - Services Grid */}
          <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`p-6 border-2 border-[hsl(var(--dark))] transition-all duration-300 group
                  hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.3),0_0_15px_rgba(0,255,0,0.3),0_0_15px_rgba(0,0,255,0.3)]
                  ${
                    hoveredIndex === null && service.variant === "highlight"
                      ? "bg-[hsl(var(--dark))] text-white"
                      : hoveredIndex === index
                        ? "bg-[hsl(var(--dark))] text-white"
                        : "bg-white border border-[hsl(var(--border-light))]"
                  }`}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3
                    className={`font-semibold text-lg ${
                      (hoveredIndex === null &&
                        service.variant === "highlight") ||
                      hoveredIndex === index
                        ? "text-white"
                        : "text-[hsl(var(--foreground))]"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={
                        (hoveredIndex === null &&
                          service.variant === "highlight") ||
                        hoveredIndex === index
                          ? "text-white"
                          : "text-[hsl(var(--foreground))]"
                      }
                    >
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    (hoveredIndex === null &&
                      service.variant === "highlight") ||
                    hoveredIndex === index
                      ? "text-white/80"
                      : "text-[hsl(var(--muted))]"
                  }`}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
