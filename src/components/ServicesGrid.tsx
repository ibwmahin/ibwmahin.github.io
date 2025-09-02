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
        "Designing lightning-fast, mobile-first websites with HTML, CSS, Tailwind, GSAP, Framer Motion, JavaScript, and React—crafted for performance and elegance.",
      variant: "highlight",
    },
    {
      title: "Startup Solutions For WordPress Development",
      description:
        "Delivering scalable, secure, and growth-focused WordPress platforms tailored to empower startups and ignite their digital presence.",
    },
    {
      title: "Social Media & Ad Video Production",
      description:
        "Producing scroll-stopping, high-converting video content that captivates audiences and elevates brand storytelling across social platforms.",
    },
    {
      title: "Brand Identity & UI/UX Design",
      description:
        "Shaping distinctive brand identities and designing intuitive, user-centered interfaces that seamlessly blend aesthetics with functionality.",
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
      className="section-padding animate-fade-up bg-black text-white"
    >
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Header */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="flex items-center space-x-6 px-4 py-2 border-2 border-cyan-300 rounded-sm bg-black shadow-md transition-all duration-300">
                Services
              </span>
            </div>

            <h2 className="text-h1 leading-tight">
              How I help businesses thrive online with tailored solutions.
            </h2>

            <p className="text-gray-400 leading-relaxed">
              A comprehensive look at my services and how we deliver them
            </p>

            <button className="flex items-center space-x-6 px-4 py-2 border-2 border-cyan-300 rounded-sm bg-black shadow-md transition-all duration-300 hover:bg-white hover:text-black">
              <span>Hire Me</span>
              <span className="ml-1 font-bold">!</span>
            </button>
          </div>

          {/* Right Column - Services Grid */}
          <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const isActive =
                (hoveredIndex === null && service.variant === "highlight") ||
                hoveredIndex === index;

              return (
                <div
                  key={service.title}
                  className={`p-6 border-2 transition-all duration-300 group cursor-pointer transform-gpu
                    hover:scale-105 hover:shadow-sm hover:shadow-cyan-300/40
                    ${isActive ? "bg-cyan-50/10 bg-blur-sm rounded-sm text-black border-cyan-500" : "bg-black text-white border-white  rounded-sm"}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className={`font-semibold text-lg ${isActive ? "text-white" : "text-white"}`}
                    >
                      {service.title}
                    </h3>

                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={isActive ? "text-white" : "text-white"}
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
                    className={`${isActive ? "text-white" : "text-gray-400"} text-sm leading-relaxed`}
                  >
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
