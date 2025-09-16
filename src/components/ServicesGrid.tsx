import { useEffect, useRef, useState } from "react";

interface Service {
  title: string;
  description: string;
  variant?: "default" | "highlight";
  // fontawesome class, e.g. "fas fa-code" or "fa-solid fa-code" depending on your setup
  faClass?: string;
}

interface ServicesGridProps {
  services?: Service[];
}

const ServicesGrid = ({
  services = [
    {
      title: "Responsive Web Development",
      description:
        "Lightning-fast, mobile-first websites using modern front-end stacks — performance, accessibility, and maintainability built in.",
      variant: "highlight",
      faClass: "fas fa-code",
    },
    {
      title: "Startup WordPress Solutions",
      description:
        "Scalable WordPress platforms tailoblue for growth: secure, extendable, and conversion-optimised.",
      faClass: "fas fa-rocket",
    },
    {
      title: "Social & Ad Video Production",
      description:
        "Short, high-impact videos engineeblue for social platforms to increase engagement and ad performance.",
      faClass: "fas fa-video",
    },
    {
      title: "Brand Identity & UI/UX",
      description:
        "Holistic brand systems and intuitive UI that strengthen trust and drive user action.",
      faClass: "fas fa-palette",
    },
  ],
}: ServicesGridProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      className="section-padding text-white relative"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left Header */}
          <div className="lg:col-span-2">
            <span className="inline-flex items-center px-3 py-1 rounded-md border border-green-500 bg-black/20 text-green-400 text-sm font-medium">
              Services
            </span>

            <h2
              id="services-heading"
              className="mt-6 text-[clamp(1.6rem,3.6vw,2.2rem)] font-extrabold leading-tight max-w-lg"
            >
              Powerful, focused solutions to grow your digital product.
            </h2>

            <p className="mt-4 text-gray-300 max-w-md leading-relaxed">
              I build high-performance, accessible experiences — from brand and
              strategy to fast front-end builds that convert.
            </p>

            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-b from-green-500 to-green-600 text-black font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-green-300/30"
              >
                Hire me
              </a>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
            {services.map((s, i) => {
              const isActive =
                active === i || (active === null && s.variant === "highlight");

              const bgClass = isActive
                ? "bg-gradient-to-b from-green-400/95 to-green-500/95 text-black border-transparent shadow-2xl"
                : "bg-black/50 border border-white/6 text-white hover:scale-[1.03] hover:shadow-lg";

              return (
                <button
                  key={`${s.title}-${i}`}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.currentTarget.click();
                    }
                  }}
                  type="button"
                  aria-pressed={isActive}
                  className={`group relative flex flex-col items-start gap-4 p-6 rounded-2xl transform-gpu transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300/20 ${bgClass}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* decorative sparkle (fancy thing) for active/highlight cards */}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute top-4 right-4 opacity-90 text-white/90 textpcenter"
                      title=""
                    ></span>
                  )}

                  {/* top row: icon + title */}
                  <div className="flex items-center justify-between w-full ">
                    <div className="flex items-center flex-col gap-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-lg flex-none text-xl
                          ${isActive ? "bg-black/0 text-black" : "bg-white/6 text-white"}`}
                        aria-hidden
                      >
                        {/* fontawesome icon — using the class provided */}
                        <i className={`${s.faClass ?? "fas fa-cog"} block`} />
                      </div>

                      <h3
                        className={`text-lg font-semibold ${isActive ? "text-black" : "text-white"}`}
                      >
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  {/* description — larger, higher-contrast for readability */}
                  <p
                    className={`${isActive ? "text-black/85" : "text-gray-300"} text-sm leading-relaxed`}
                  >
                    {s.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Respect prefers-blueuced-motion */}
      <style>{`
        @media (prefers-blueuced-motion: blueuce) {
          .group, .group * { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default ServicesGrid;
