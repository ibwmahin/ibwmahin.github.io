import React, { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  variant?: "default" | "highlight";
  liveUrl?: string;
  caseStudyUrl?: string;
};

interface PortfolioGridProps {
  projects?: Project[];
}

// Project value
const INITIAL_VISIBLE = "3";

// The current main categories in the portfolio are:
//
// Ecommece
// Business
// opensource
// landing page

const DEFAULT_PROJECTS: Project[] = [
  // TODO: Details needed to be update
  {
    id: "Dlux-store",
    title: "Dlux-store",
    category: "Ecommece",
    imageUrl:
      "https://cdn.dribbble.com/userupload/10640475/file/original-45021f3c7c0a29ff29004e05181f429a.png?resize=744x558&vertical=center",
    liveUrl: "",
    caseStudyUrl: "",
    description:
      "An e-commerce demo for a clothing store — fast product listings and conversion-focused UI.",
  },
  {
    id: "DigitalPathways.ai",
    title: "DigitalPathways.ai",
    category: "Business",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3",
    liveUrl: "https://digitalpathways.ai/",
    caseStudyUrl: "",
    description:
      "A Digital platform for the digital transfomation with the help of ai & consulting.",
  },
  {
    id: "dev-forum",
    title: "Dev Forum",
    category: "opensource",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    liveUrl: "",
    caseStudyUrl: "",
    description:
      "Community forum focused on developer collaboration with threads, replies, and reputation.",
  },
  {
    id: "grid",
    title: "Grid",
    category: "landing page",
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    liveUrl: "",
    caseStudyUrl: "",
    description:
      "A performant portfolio template showcasing masonry grids, image streaming and minimal JS.",
  },

  // NOTE: projects that belonged to the removed category ("Educational and Non-profit")
  // have been removed from DEFAULT_PROJECTS as requested.
];

const MAJOR_ORDER = [
  "All",
  "Ecommece",
  "Business",
  "opensource",
  "landing page",
];

const placeholderSVG = (title = "Project") =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><rect width='100%' height='100%' fill='#050505'/><text x='50%' y='50%' font-size='28' dominant-baseline='middle' text-anchor='middle' fill='#6b7280' font-family='system-ui, -apple-system, Segoe UI, Roboto, Arial'>${title}</text></svg>`,
  )}`;

/* Project card */
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onOpen: (globalIndex: number) => void;
  globalIndex: number;
}> = ({ project, index, onOpen, globalIndex }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);

  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const small = `${project.imageUrl}?w=480&q=60&auto=format&fit=crop`;
  const med = `${project.imageUrl}?w=900&q=70&auto=format&fit=crop`;
  const large = `${project.imageUrl}?w=1400&q=75&auto=format&fit=crop`;

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }
    if (typeof IntersectionObserver !== "undefined") {
      ioRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              setVisible(true);
              ioRef.current?.disconnect();
            }
          });
        },
        { rootMargin: "200px", threshold: 0.01 },
      );
      ioRef.current.observe(el);
    } else {
      setVisible(true);
    }
    return () => ioRef.current?.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden cursor-pointer border-2 border-white/6 transition-all duration-200 ease-in-out rounded-lg"
      onClick={() => onOpen(globalIndex)}
      style={{ animationDelay: `${index * 18}ms` }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(globalIndex);
        }
      }}
      aria-label={`Preview ${project.title}`}
    >
      <div className="relative h-48 md:h-56 bg-black">
        {!loaded && !errored && (
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: "linear-gradient(90deg, #050505, #0b0b0b, #050505)",
            }}
            aria-hidden
          />
        )}

        {visible ? (
          <img
            ref={imgRef}
            src={med}
            srcSet={`${small} 480w, ${med} 900w, ${large} 1400w`}
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            alt={project.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              setErrored(true);
              const img = e.currentTarget as HTMLImageElement;
              if (img.src !== placeholderSVG(project.title))
                img.src = placeholderSVG(project.title);
              setLoaded(true);
            }}
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-300 filter grayscale contrast-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 rounded-t-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-xs text-gray-400 font-medium">
              {project.title}
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none flex items-end rounded-lg">
        <div
          className="w-full p-4 transition-colors duration-200 rounded-b-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.7) 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-extrabold text-sm opacity-90 group-hover:opacity-100">
                {project.title}
              </h3>
              <p className="text-white/70 text-xs opacity-80 group-hover:opacity-95">
                {project.category}
              </p>
            </div>

            <div className="text-xs text-white/90 font-semibold uppercase">
              Preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemoProjectCard = React.memo(ProjectCard);

/* Accessible modal */
const Modal: React.FC<{
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ project, onClose, onPrev, onNext }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const lastActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lastActive.current = (document &&
      document.activeElement) as HTMLElement | null;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    // prevent scroll behind modal
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      const node = ref.current;
      if (!node) return;
      const focusable = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      (focusable[0] as HTMLElement | undefined)?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
      lastActive.current?.focus();
      clearTimeout(timer);
    };
  }, [onClose, onPrev, onNext]);

  const [imgErrored, setImgErrored] = useState(false);
  const med = `${project.imageUrl}?w=1200&q=70&auto=format&fit=crop`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label={`${project.title} preview`}
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden
      />
      <div
        ref={ref}
        className="relative bg-black border-2 border-white/6 max-w-3xl w-full max-h-[90vh] overflow-auto p-6 z-10 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold uppercase tracking-wide text-white">
              {project.title}
            </h3>
            <p className="text-gray-300">{project.category}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              aria-label="Previous project"
              className="px-3 py-1 border-2 border-white/6 rounded-md text-white/90 bg-transparent hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              ←
            </button>
            <button
              onClick={onNext}
              aria-label="Next project"
              className="px-3 py-1 border-2 border-white/6 rounded-md text-white/90 bg-transparent hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              →
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-2xl font-bold text-gray-300 hover:text-white transition-colors ml-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              ×
            </button>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            {!imgErrored ? (
              <img
                src={med}
                alt={project.title}
                className="w-full h-64 object-cover border-2 border-white/6 rounded-lg"
                onError={(e) => {
                  setImgErrored(true);
                  (e.currentTarget as HTMLImageElement).src = placeholderSVG(
                    project.title,
                  );
                }}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <img
                src={placeholderSVG(project.title)}
                alt={project.title}
                className="w-full h-64 object-cover border-2 border-white/6 rounded-lg"
              />
            )}
          </div>

          <div>
            <p className="text-gray-300 leading-relaxed font-medium">
              {project.description ??
                `Detailed preview of ${project.title}. Add technologies used, your role, measurable outcomes.`}
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={project.liveUrl ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 border-2 rounded-md font-bold text-sm ${
                  project.liveUrl
                    ? "bg-sky-500 text-black border-transparent"
                    : "bg-black text-gray-500 opacity-60 pointer-events-none border-white/6"
                }`}
              >
                View Live Project
              </a>

              <a
                href={project.caseStudyUrl ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 border-2 rounded-md text-sm ${
                  project.caseStudyUrl
                    ? "bg-transparent text-white border-white/6"
                    : "bg-black text-gray-500 opacity-60 pointer-events-none border-white/6"
                }`}
              >
                Case Study
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Main grid component */
const PortfolioGridWithModal: React.FC<PortfolioGridProps> = ({
  projects = DEFAULT_PROJECTS,
}) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const detectedMajors = useMemo(() => {
    const setMajors = new Set<string>(projects.map((p) => p.category));
    return MAJOR_ORDER.filter((m) => m === "All" || setMajors.has(m));
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const catMatch =
        activeCategory === "All" || p.category === activeCategory;
      const queryMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q);
      return catMatch && queryMatch;
    });
  }, [projects, activeCategory, query]);

  const visible = useMemo(() => {
    const isFiltering = query.trim() !== "" || activeCategory !== "All";
    if (isFiltering) return filtered;
    if (expanded) return filtered;
    return filtered.slice(0, INITIAL_VISIBLE);
  }, [filtered, expanded, query, activeCategory]);

  const openModal = (indexInFiltered: number) =>
    setSelectedIndex(indexInFiltered);
  const closeModal = () => setSelectedIndex(null);

  const prev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((s) =>
      s === null ? null : (s - 1 + filtered.length) % filtered.length,
    );
  };
  const next = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((s) => (s === null ? null : (s + 1) % filtered.length));
  };

  return (
    <>
      <section id="portfolio" className="section-padding bg-black text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between flex-wrap mb-6 gap-4">
            <div className="flex items-start flex-col space-y-3">
              <span className="text-xs font-bold uppercase bg-black border-2 border-white/6 px-4 py-2 rounded-md text-white">
                Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter leading-tight text-white">
                Explore growth-driven front-end work
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="px-3 py-2 border rounded-md text-sm w-56 bg-black border-white/6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
                aria-label="Search projects"
              />
              <div className="text-sm text-gray-300">
                {filtered.length} results
              </div>
            </div>
          </div>

          <div className="mb-6 flex gap-2 flex-wrap">
            {detectedMajors.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpanded(false);
                }}
                className={`text-xs font-medium px-3 py-1 rounded-md border-2 transition ${
                  activeCategory === cat
                    ? "bg-sky-500 text-black border-sky-500"
                    : "bg-black text-white border-white/6"
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {visible.map((p, i) => {
              const indexInFiltered = filtered.findIndex((f) => f.id === p.id);
              return (
                <MemoProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  globalIndex={indexInFiltered}
                  onOpen={(gIndex) => openModal(gIndex)}
                />
              );
            })}
          </div>

          {!(query.trim() !== "" || activeCategory !== "All") &&
            filtered.length > INITIAL_VISIBLE && (
              <div className="mt-6 text-center">
                {!expanded ? (
                  <button
                    onClick={() => setExpanded(true)}
                    className="px-4 py-2 border-2 border-white/6 rounded-md font-medium text-white"
                  >
                    Show more projects ({filtered.length - INITIAL_VISIBLE})
                  </button>
                ) : (
                  <button
                    onClick={() => setExpanded(false)}
                    className="px-4 py-2 border-2 border-white/6 rounded-md font-medium text-white"
                  >
                    Show less
                  </button>
                )}
              </div>
            )}
        </div>
      </section>

      {selectedIndex !== null && filtered[selectedIndex] && (
        <Modal
          project={filtered[selectedIndex]}
          onClose={closeModal}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
};

export default PortfolioGridWithModal;
