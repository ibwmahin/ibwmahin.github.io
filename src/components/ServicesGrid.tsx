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
  const servicesRef = useRef<HTMLElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      },
      { threshold: 0.15 },
    );

    if (servicesRef.current) observer.observe(servicesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={servicesRef}
      className="section-padding animate-fade-up bg-black text-white"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Header */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-md border-2 border-indigo-500 bg-black/40 text-indigo-400 font-medium transition">
                Services
              </span>
            </div>

            <h2 className="text-[clamp(1.6rem,3.6vw,2.2rem)] leading-tight font-semibold max-w-lg text-white">
              How I help businesses thrive online with tailored solutions.
            </h2>

            <p className="text-gray-300 leading-relaxed max-w-md">
              A comprehensive look at my services and how we deliver them —
              focused on speed, clarity, and delightful UX.
            </p>

            <button className="inline-flex items-center gap-2 px-3 py-1 border-2 border-indigo-500 rounded-md bg-transparent text-indigo-400 font-semibold hover:bg-indigo-500 hover:text-black transition focus:outline-none focus:ring-2 focus:ring-indigo-300">
              <a href="#contact">Hire Me</a>
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
                  tabIndex={0}
                  role="button"
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      // optional: handle activation
                    }
                  }}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`p-6 border transition-all duration-300 group cursor-pointer transform-gpu rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300
                    ${isActive ? "bg-indigo-500 text-black border-transparent shadow-lg scale-[1.02]" : "bg-black text-white border-white/6 hover:shadow-md hover:scale-105"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className={`font-semibold text-lg ${isActive ? "text-black" : "text-white"}`}
                    >
                      {service.title}
                    </h3>

                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={isActive ? "text-black" : "text-white"}
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
                    className={`${isActive ? "text-black/80" : "text-gray-300"} text-sm leading-relaxed`}
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
