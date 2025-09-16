import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

/* ------------------------------------------------ */
import digitalp from "../assets/works/digitalp.png";
import pearNi from "../assets/works/pearNi.png";
import nvim from "../assets/works/nvim.png";
import mana from "../assets/works/mana.png";
/* ------------------------------------------------ */

type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string | any;
  description?: string;
  variant?: "default" | "highlight";
  liveUrl?: string;
  caseStudyUrl?: string;
  quickFacts?: string[]; // <-- added optional quick facts
};

interface PortfolioGridProps {
  projects?: Project[];
}

/* Show 3 by default (fixed bug: used to be a string) */
const INITIAL_VISIBLE = 3;

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

/* --------------------------
   Project Card (memoized)
   -------------------------- */
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

  // Support imported image modules (some bundlers return an object) or strings.
  const src =
    typeof project.imageUrl === "object"
      ? (project.imageUrl.src ??
        project.imageUrl.default ??
        String(project.imageUrl))
      : String(project.imageUrl);

  const small = `${src}?w=480&q=60&auto=format&fit=crop`;
  const med = `${src}?w=900&q=70&auto=format&fit=crop`;
  const large = `${src}?w=1400&q=75&auto=format&fit=crop`;

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
        { rootMargin: "220px", threshold: 0.01 },
      );
      ioRef.current.observe(el);
    } else {
      setVisible(true);
    }
    return () => ioRef.current?.disconnect();
  }, []);

  const open = useCallback(() => onOpen(globalIndex), [onOpen, globalIndex]);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      aria-label={`Open ${project.title} preview`}
      className="group relative overflow-hidden rounded-xl cursor-pointer border border-white/6 transition-transform duration-300 ease-out transform hover:-translate-y-1 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-green-300/20"
      style={{ animationDelay: `${index * 20}ms` }}
    >
      <div className="relative w-full aspect-[16/11] bg-black rounded-t-xl overflow-hidden">
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
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-t-xl"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-xs text-gray-400 font-medium">
              {project.title}
            </div>
          </div>
        )}

        {/* top-left category pill */}
        <div className="absolute left-4 top-4 z-20">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-black/60 border border-white/6 text-gray-100">
            <span aria-hidden className="text-xs">
              🏷️
            </span>
            <span>{project.category}</span>
          </span>
        </div>

        {/* top-right quick icon */}
        <div className="absolute right-4 top-4 z-20 opacity-90">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-black/50 border border-white/6 text-white text-sm">
            <span aria-hidden>🔍</span>
          </span>
        </div>
      </div>

      {/* caption area */}
      <div className="p-4 rounded-b-xl bg-gradient-to-t from-black/75 via-black/40 to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-white text-md font-extrabold leading-tight truncate">
              {project.title}
            </h3>
            <p className="text-sm text-gray-300 mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-semibold uppercase text-white/90">
              Preview
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemoProjectCard = React.memo(ProjectCard);

/* --------------------------
   Modal with focus trap + keyboard nav
   -------------------------- */
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

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();

      // simple focus trap:
      if (e.key === "Tab") {
        const container = ref.current;
        if (!container) return;
        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter(Boolean);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && (active === first || active === container)) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      const node = ref.current;
      if (!node) return;
      const focusable = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      (focusable[0] as HTMLElement | undefined)?.focus();
    }, 40);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastActive.current?.focus();
      clearTimeout(timer);
    };
  }, [onClose, onPrev, onNext]);

  const [imgErrored, setImgErrored] = useState(false);

  const src =
    typeof project.imageUrl === "object"
      ? (project.imageUrl.src ??
        project.imageUrl.default ??
        String(project.imageUrl))
      : String(project.imageUrl);

  const med = `${src}?w=1400&q=75&auto=format&fit=crop`;

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
        className="relative bg-black border border-white/6 max-w-4xl w-full max-h-[92vh] overflow-auto p-6 z-10 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              {project.title}
            </h3>
            <p className="text-sm text-gray-300 mt-1">{project.category}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              aria-label="Previous project"
              className="px-3 py-2 rounded-md border border-white/6 text-white bg-transparent hover:bg-white/6 focus:outline-none focus:ring-4 focus:ring-green-300/20"
            >
              ◀
            </button>
            <button
              onClick={onNext}
              aria-label="Next project"
              className="px-3 py-2 rounded-md border border-white/6 text-white bg-transparent hover:bg-white/6 focus:outline-none focus:ring-4 focus:ring-green-300/20"
            >
              ▶
            </button>

            <button
              onClick={onClose}
              aria-label="Close preview"
              className="ml-2 px-3 py-2 rounded-md text-white bg-transparent hover:bg-white/6 focus:outline-none focus:ring-4 focus:ring-green-300/20"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            {!imgErrored ? (
              <img
                src={med}
                alt={project.title}
                className="w-full h-72 object-cover rounded-lg border border-white/6"
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
                className="w-full h-72 object-cover rounded-lg border border-white/6"
              />
            )}
          </div>

          <div>
            <p className="text-gray-300 leading-relaxed">
              {project.description ??
                `Add case study details for ${project.title}: technologies, role, metrics, links.`}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.liveUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-md font-semibold text-sm ${
                  project.liveUrl
                    ? "bg-green-500 text-black"
                    : "bg-black text-gray-500 opacity-60 pointer-events-none border border-white/6"
                }`}
              >
                View Live
              </a>

              <a
                href={project.caseStudyUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-md font-semibold text-sm ${
                  project.caseStudyUrl
                    ? "bg-transparent text-white border border-white/6"
                    : "bg-black text-gray-500 opacity-60 pointer-events-none border border-white/6"
                }`}
              >
                Case Study
              </a>
            </div>

            {/* dynamic quick facts area */}
            <div className="mt-6 text-sm text-gray-400">
              <div className="font-medium text-white/90 mb-2">Quick facts</div>

              {Array.isArray(project.quickFacts) &&
              project.quickFacts.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {project.quickFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --------------------------
   Main grid component
   -------------------------- */
const PortfolioGridWithModal: React.FC<PortfolioGridProps> = ({
  projects = [
    {
      id: "DgtlPathways",
      title: "DgtlPathways",
      category: "Business",
      imageUrl: digitalp,
      liveUrl: "https://digitalpathways.ai/",
      caseStudyUrl: "",
      description:
        "A Digital platform for digital transformation with the help of AI & consulting.",
      quickFacts: [
        "Role: Head Developer",
        "Tech: Wordpress, php, Node, SQL",
        "Work: Brand Building form Scratch",
      ],
    },
    {
      id: "PearNi",
      title: "PearNi",
      category: "opensource",
      imageUrl: pearNi,
      liveUrl: "https://pearni.netlify.app/",
      caseStudyUrl: "",
      description:
        "An Open-source Product to compit in Nasa Space Hackathon in 2024 (solo dev)",
      quickFacts: [
        "Role: Main Developer",
        "Tech: Typescirpt, ReactJs, API, Tailwind JavaScript, ThreeJS",
        "Status: Current IN Demo for 2025 Event",
      ],
    },
    {
      id: "LazyNvim",
      title: "LazyNvim",
      category: "opensource",
      imageUrl: nvim,
      liveUrl: "https://github.com/ibwmahin/LazyNvim",
      caseStudyUrl: "",
      description:
        "Curated Neovim configuration with useful plugins and configs.",
      quickFacts: [
        "Purp: Building Ready To go IDE for new dev, In Full nvim Work Flow.",
        "Tech: Lua, Neovim, LazyNvim",
        "Users: Any One can Use it.",
      ],
    },
    {
      id: "VulnScan",
      title: "VulnScan",
      category: "opensource",
      imageUrl:
        "https://cdn.freebiesupply.com/images/large/1x/cyber-security-one-pane-control-dashboard-e97.jpg",
      liveUrl: "https://ibwmahin.github.io/cyber-scan-guardian-shield/",
      caseStudyUrl: "",
      description:
        "An Open-source project to quick Scan a website Vulnerability",
      quickFacts: [
        "Type: Identify security vulnerabilities and misconfigurations in web applications",
        "Tech: Tailwind , CSS3, JavaScript gsap, framer-motion",
      ],
    },
    {
      id: "Illuvium",
      title: "Illuvium",
      category: "landing page",
      imageUrl:
        "https://raw.githubusercontent.com/ibwmahin/Gaming_Website/main/public/images/gaming-website.png",
      liveUrl: "https://ibwmahin.github.io/Gaming_Website/",
      caseStudyUrl: "",
      description: "A fun made Gaming_Website clone of illuvium  ",
      quickFacts: [
        "Type: Landing Page Clone",
        "Tech: React, Spline, Tailwind , CSS3, JavaScript",
        "Purp: Solo Project for Fun ",
      ],
    },
    {
      id: "manaeshop",
      title: "manaeshop",
      category: "Ecommece",
      imageUrl: mana,
      liveUrl: "https://manaeshoppingmartllc.com/",
      caseStudyUrl: "",
      description:
        "An e-commerce demo for a clothing store — fast product listings and conversion-focused UI.",
      quickFacts: [
        "Role: UI + Front-end",
        "Tech: React, Tailwind",
        "Metric: +18% conversion in demo flows",
      ],
    },
  ],
}) => {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState(query);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  // debounce search for nicer UX
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 260);
    return () => clearTimeout(t);
  }, [query]);

  const detectedMajors = useMemo(() => {
    const setMajors = new Set<string>(projects.map((p) => p.category));
    return MAJOR_ORDER.filter((m) => m === "All" || setMajors.has(m));
  }, [projects]);

  const filteblue = useMemo(() => {
    const q = debounced;
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
  }, [projects, activeCategory, debounced]);

  const visible = useMemo(() => {
    const isFiltering = debounced !== "" || activeCategory !== "All";
    if (isFiltering) return filteblue;
    if (expanded) return filteblue;
    return filteblue.slice(0, INITIAL_VISIBLE);
  }, [filteblue, expanded, debounced, activeCategory]);

  const openModal = (indexInFilteblue: number) =>
    setSelectedIndex(indexInFilteblue);
  const closeModal = () => setSelectedIndex(null);

  const prev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((s) =>
      s === null ? null : (s - 1 + filteblue.length) % filteblue.length,
    );
  };
  const next = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((s) => (s === null ? null : (s + 1) % filteblue.length));
  };

  return (
    <>
      <section id="portfolio" className="section-padding bg-black text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
            <div>
              <span className="inline-flex items-center px-4 py-2 rounded-md border border-white/6 text-xs font-bold uppercase bg-black">
                Portfolio
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight">
                Explore growth-driven front-end work
              </h2>
              <p className="mt-2 text-gray-400 max-w-prose">
                Selected projects focused on performance, UX, and measurable
                results.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="portfolio-search" className="sr-only">
                Search projects
              </label>
              <input
                id="portfolio-search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setExpanded(false);
                }}
                placeholder="Search projects..."
                className="px-3 py-2 rounded-md text-sm w-56 bg-black border border-white/6 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300/20"
                aria-label="Search projects"
              />
              <div className="text-sm text-gray-300">
                {filteblue.length} result{filteblue.length !== 1 ? "s" : ""}
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
                className={`text-xs font-medium px-3 py-1 rounded-md transition focus:outline-none focus:ring-4 focus:ring-green-300/20 ${
                  activeCategory === cat
                    ? "bg-green-500 text-black border-green-500"
                    : "bg-black text-white border border-white/6"
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visible.map((p, i) => {
              const indexInFilteblue = filteblue.findIndex(
                (f) => f.id === p.id,
              );
              return (
                <MemoProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  globalIndex={indexInFilteblue}
                  onOpen={(gIndex) => openModal(gIndex)}
                />
              );
            })}
          </div>

          {/* show more / less */}
          {!(debounced !== "" || activeCategory !== "All") &&
            filteblue.length > INITIAL_VISIBLE && (
              <div className="mt-8 text-center">
                {!expanded ? (
                  <button
                    onClick={() => setExpanded(true)}
                    className="px-5 py-2 rounded-md border border-white/6 font-semibold text-white bg-transparent focus:outline-none focus:ring-4 focus:ring-green-300/20"
                  >
                    Show more projects ({filteblue.length - INITIAL_VISIBLE})
                  </button>
                ) : (
                  <button
                    onClick={() => setExpanded(false)}
                    className="px-5 py-2 rounded-md border border-white/6 font-semibold text-white bg-transparent focus:outline-none focus:ring-4 focus:ring-green-300/20"
                  >
                    Show less
                  </button>
                )}
              </div>
            )}
        </div>
      </section>

      {/* Modal */}
      {selectedIndex !== null && filteblue[selectedIndex] && (
        <Modal
          project={filteblue[selectedIndex]}
          onClose={closeModal}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
};

export default PortfolioGridWithModal;
