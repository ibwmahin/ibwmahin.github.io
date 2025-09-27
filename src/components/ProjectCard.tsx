// ProjectCard.tsx
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  icon?: any; // keep if you use fontawesome, otherwise ignore
  src?: string;
  url: string;
  tags?: string[];
  date?: string | number | string;
  mobileExpandedId: string | null;
  setMobileExpandedId: (id: string | null) => void;
};

export default function ProjectCard({
  id,
  title,
  description,
  src,
  url,
  tags = [],
  date,
  mobileExpandedId,
  setMobileExpandedId,
}: ProjectCardProps) {
  // Treat <768px as mobile — simple, predictable
  const [isSmall, setIsSmall] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 768 : true,
  );
  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // For desktop, use a subtle hover lift instead of expand to avoid issues
  const [hovered, setHovered] = useState(false);
  const isMobileExpanded = mobileExpandedId === id;
  const isExpanded = isMobileExpanded || (!isSmall && hovered); // Re-enable expand on desktop hover

  // measure content height for smooth transitions on mobile
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentH, setContentH] = useState(0);
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => setContentH(el.scrollHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [description, src]);

  const toggleMobile = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setMobileExpandedId((prev) => (prev === id ? null : id));
  };

  const openProject = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    if (typeof window !== "undefined") window.open(url, "_blank");
  };

  const onCardClick = (e: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    // Desktop: click opens link. Mobile: do nothing here (chevron / Open handle it)
    if (!isSmall) window.open(url, "_blank");
    else e.stopPropagation();
  };

  return (
    <article
      onClick={onCardClick}
      onMouseEnter={() => !isSmall && setHovered(true)}
      onMouseLeave={() => !isSmall && setHovered(false)}
      onFocus={() => !isSmall && setHovered(true)}
      onBlur={() => !isSmall && setHovered(false)}
      className="group relative rounded-xl p-6 bg-white dark:bg-black border border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
      style={{
        transform: hovered && !isSmall ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div className="flex items-start gap-4 flex-shrink-0">
        <div className="w-10 h-10 rounded-lg flex-shrink-0 bg-gray-900 dark:bg-white flex items-center justify-center">
          {/* keep tiny placeholder — replace with your icon if you want */}
          <div className="w-5 h-5 rounded bg-white dark:bg-gray-900" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-base text-black dark:text-white truncate">
              {title}
            </h3>

            {/* Chevron toggle (mobile & keyboard) */}
            <button
              aria-expanded={isMobileExpanded}
              aria-controls={`proj-${id}-preview`}
              onClick={toggleMobile}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleMobile(e);
              }}
              className="ml-2 md:hidden inline-flex items-center justify-center p-1.5 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 z-20 transition-colors duration-200"
              title={isMobileExpanded ? "Collapse preview" : "Preview"}
            >
              <svg
                className={`w-3.5 h-3.5 transform transition-transform duration-200 ${isMobileExpanded ? "rotate-180" : "rotate-0"}`}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {!isExpanded && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
              {((description || "").split(". ").slice(0, 1).join(". ") || "") +
                (description?.endsWith(".") ? "" : ".")}
            </p>
          )}
        </div>

        <div className="ml-4 hidden md:flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* right chevron for desktop hover affordance */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex-1" />{" "}
      {/* Spacer to push preview to bottom if needed */}
      {/* Preview area: for both mobile expand and desktop hover */}
      <div
        id={`proj-${id}-preview`}
        aria-hidden={!isExpanded}
        style={{
          maxHeight: isExpanded ? `${contentH}px` : 0,
          opacity: isExpanded ? 1 : 0,
          transition: "max-height 300ms ease-in-out, opacity 250ms ease-in-out",
        }}
        className="overflow-hidden rounded-lg flex-shrink-0"
      >
        <div ref={contentRef} className="w-full h-full flex gap-4 py-3">
          {src && (
            <img
              src={src}
              alt={`${title} preview`}
              className="w-2/5 h-28 object-cover rounded-lg flex-shrink-0 sm:w-1/2 sm:h-32"
              loading="lazy"
            />
          )}

          <div
            className={`${src ? "w-3/5 sm:w-1/2" : "w-full"} p-3 text-sm text-gray-700 dark:text-gray-300`}
          >
            <div className="mb-4">{description}</div>

            <div className="flex items-center gap-3">
              <div className="text-xs opacity-70">
                {date ? new Date(String(date)).getFullYear() : ""}
              </div>

              {/* Mobile Open button — only interactive when mobile-expanded */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openProject(e);
                }}
                className={`ml-2 md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-black dark:bg-white text-white dark:text-black transition-all duration-200 ${
                  isMobileExpanded
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
                title="Open project"
              >
                Open
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M14 3h7v7M21 3L10 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 21H3V3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
