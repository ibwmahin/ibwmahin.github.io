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
  majorCategory?: string;
};

interface PortfolioGridProps {
  projects?: Project[];
}

const INITIAL_VISIBLE = 6;

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "Dlux-store",
    title: "Dlux-store",
    category: "E-commerce",
    imageUrl:
      "https://cdn.dribbble.com/userupload/10640475/file/original-45021f3c7c0a29ff29004e05181f429a.png?resize=744x558&vertical=center",
    liveUrl: "",
    caseStudyUrl: "",
    description:
      "A E-commerce website for clothing, the websie this website is build for the cloting store (it's demo webesite for unlocking website contract me.)",
  },
  {
    id: "spark-docs",
    title: "Spark Docs",
    category: "Docs",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3",
    liveUrl: "https://spark-docs.example.com",
    caseStudyUrl: "/case-studies/spark-docs",
    description:
      "MDX documentation site with live examples, copyable snippets and performance tuned builds.",
  },
  {
    id: "dev-forum",
    title: "Dev Forum",
    category: "Forum/Community",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    liveUrl: "https://forum.example.com",
    caseStudyUrl: "/case-studies/dev-forum",
    description:
      "Community forum with threads, replies, and reputation — focused on developer collaboration.",
  },
  {
    id: "grid-portfolio",
    title: "Grid Portfolio",
    category: "Portfolio",
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    liveUrl: "https://grid-portfolio.example.com",
    caseStudyUrl: "/case-studies/grid-portfolio",
    description:
      "A performant portfolio template showing masonry grids, image streaming and minimal JS transitions.",
  },
  {
    id: "studio-cms",
    title: "Studio CMS",
    category: "Web Portal",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsx4i9rJZPTLQQ0Vy0yWQjpVjj-SVi5Ya-DA&s",
    liveUrl: "https://studio-cms.example.com",
    caseStudyUrl: "/case-studies/studio-cms",
    description:
      "Headless CMS frontend with preview and design-token driven editor styles.",
  },
  {
    id: "ai-lab",
    title: "AI Playground",
    category: "AI Project",
    imageUrl:
      "https://images.unsplash.com/photo-1531497865142-1ec9f3a5b1a8?auto=format&fit=crop&w=1400&q=80",
    liveUrl: "https://ai-playground.example.com",
    caseStudyUrl: "/case-studies/ai-lab",
    description:
      "Playground for AI/ML experiments, visualizations, and prototypes.",
  },
];

const SUB_TO_MAJOR: Record<string, string> = {
  "Business/Corporate": "Commercial Websites",
  "E-commerce": "Commercial Websites",
  "Landing Page": "Commercial Websites",
  "Starter Kit": "Commercial Websites",
  Tooling: "Commercial Websites",
  Dashboard: "Commercial Websites",
  "Blog/Personal": "Content and Media",
  "News and Media": "Content and Media",
  Docs: "Content and Media",
  Animations: "Content and Media",
  "Social Media": "Community and Social Platforms",
  "Forum/Community": "Community and Social Platforms",
  Portfolio: "Portfolio and Showcase",
  "Design System": "Portfolio and Showcase",
  Educational: "Educational and Non-profit",
  "Non-profit": "Educational and Non-profit",
  "Web Portal": "Educational and Non-profit",
};

const MAJOR_ORDER = [
  "All",
  "Commercial Websites",
  "Content and Media",
  "Community and Social Platforms",
  "Portfolio and Showcase",
  "Educational and Non-profit",
  "Other",
];

const getMajorCategory = (p: Project) =>
  p.majorCategory || SUB_TO_MAJOR[p.category] || "Other";

const placeholderSVG = (title = "Project") =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><rect width='100%' height='100%' fill='hsl(0 0% 5.1%)'/><text x='50%' y='50%' font-size='28' dominant-baseline='middle' text-anchor='middle' fill='hsl(0 0% 42%)'>${title}</text></svg>`,
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
    if ("IntersectionObserver" in window) {
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
      className="group relative overflow-hidden cursor-pointer border-2 border-[hsl(var(--foreground))] transition-all duration-200 ease-in-out rounded-none"
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
              background:
                "linear-gradient(90deg, hsl(0 0% 5.1%), hsl(0 0% 10%), hsl(0 0% 5.1%))",
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
            className="w-full h-full object-cover transition-transform duration-300 filter grayscale contrast-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-xs text-[hsl(var(--muted))] font-medium">
              {project.title}
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none flex items-end rounded-none">
        <div
          className="w-full p-4 transition-colors duration-200"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.55) 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[hsl(var(--foreground))] font-extrabold text-sm opacity-80 group-hover:opacity-100">
                {project.title}
              </h3>
              <p className="text-[hsl(var(--foreground))]/70 text-xs opacity-70 group-hover:opacity-90">
                {project.category}
              </p>
            </div>

            <div className="text-xs text-[hsl(var(--foreground))]/90 font-semibold uppercase">
              Preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemoProjectCard = React.memo(
  ProjectCard,
  (a, b) => a.project.id === b.project.id && a.index === b.index,
);

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
    lastActive.current = document.activeElement as HTMLElement | null;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
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
      document.body.style.overflow = "";
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
      <div className="absolute inset-0 bg-[hsl(var(--dark),0.8)]" aria-hidden />
      <div
        ref={ref}
        className="relative bg-black border-2 border-[hsl(var(--foreground))] max-w-3xl w-full max-h-[90vh] overflow-auto p-6 z-10 rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-h2 font-extrabold uppercase tracking-wide text-[hsl(var(--foreground))]">
              {project.title}
            </h3>
            <p className="text-[hsl(var(--muted))]">{project.category}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              aria-label="Previous project"
              className="px-3 py-1 border-2 border-[hsl(var(--foreground))] rounded-none text-[hsl(var(--foreground))]"
            >
              ←
            </button>
            <button
              onClick={onNext}
              aria-label="Next project"
              className="px-3 py-1 border-2 border-[hsl(var(--foreground))] rounded-none text-[hsl(var(--foreground))]"
            >
              →
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-2xl font-bold text-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors ml-2"
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
                className="w-full h-64 object-cover border-2 border-[hsl(var(--foreground))] rounded-none"
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
                className="w-full h-64 object-cover border-2 border-[hsl(var(--foreground))] rounded-none"
              />
            )}
          </div>

          <div>
            <p className="text-[hsl(var(--muted))] leading-relaxed font-medium">
              {project.description ??
                `Detailed preview of ${project.title}. Add technologies used, your role, measurable outcomes.`}
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={project.liveUrl ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 border-2 border-[hsl(var(--foreground))] rounded-none font-bold text-sm ${
                  project.liveUrl
                    ? "bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
                    : "bg-black text-[hsl(var(--muted))] opacity-60 pointer-events-none"
                }`}
              >
                View Live Project
              </a>

              <a
                href={project.caseStudyUrl ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 border-2 border-[hsl(var(--foreground))] rounded-none text-sm ${
                  project.caseStudyUrl
                    ? "bg-transparent text-[hsl(var(--foreground))]"
                    : "bg-black text-[hsl(var(--muted))] opacity-60 pointer-events-none"
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
    const setMajors = new Set<string>(projects.map((p) => getMajorCategory(p)));
    return MAJOR_ORDER.filter((m) => m === "All" || setMajors.has(m));
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const major = getMajorCategory(p);
      const catMatch = activeCategory === "All" || major === activeCategory;
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
      <section id="portfolio" className="section-padding">
        <div className="container">
          <div className="flex items-center justify-between flex-wrap mb-6 gap-4">
            <div className="flex items-start flex-col space-y-3">
              <span className="text-xs font-bold uppercase bg-black border-2 border-[hsl(var(--foreground))] px-4 py-2 rounded-none text-[hsl(var(--foreground))]">
                Portfolio
              </span>
              <h2 className="text-h1 font-extrabold tracking-tighter leading-tight text-[hsl(var(--foreground))]">
                Explore growth-driven front-end work
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="px-3 py-2 border rounded-none text-sm w-56 bg-black border-[hsl(var(--foreground))] text-[hsl(var(--foreground))]"
                aria-label="Search projects"
              />
              <div className="text-sm text-[hsl(var(--muted))]">
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
                className={`text-xs font-medium px-3 py-1 rounded-none border-2 transition ${
                  activeCategory === cat
                    ? "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] border-[hsl(var(--foreground))]"
                    : "bg-black text-[hsl(var(--foreground))] border-[hsl(var(--foreground))]"
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
                    className="px-4 py-2 border-2 border-[hsl(var(--foreground))] rounded-none font-medium text-[hsl(var(--foreground))]"
                  >
                    Show more projects ({filtered.length - INITIAL_VISIBLE})
                  </button>
                ) : (
                  <button
                    onClick={() => setExpanded(false)}
                    className="px-4 py-2 border-2 border-[hsl(var(--foreground))] rounded-none font-medium text-[hsl(var(--foreground))]"
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
