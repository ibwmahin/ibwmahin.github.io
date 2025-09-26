import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ProjectCardAppleProps {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: IconDefinition;
  image?: string; // optional preview image (cover)
  tags?: string[];
  onClick?: () => void;
}

/**
 * ProjectCard — Apple Developer style
 * - Clean spacing, thin border, soft glass effect
 * - Subtle elevation + spring hover
 * - Accessible (keyboard + focus styles)
 *
 * Usage:
 * <ProjectCardApple title="My App" description="Short desc..." icon={faApple} onClick={() => {}} />
 *
 * Notes: requires Tailwind CSS and Framer Motion. Works well in both light/dark
 * themes when your Tailwind palette follows standard tokens (background/foreground/etc.).
 */
export default function ProjectCardApple({
  id,
  title,
  subtitle,
  description,
  icon,
  image,
  tags = [],
  onClick,
}: ProjectCardAppleProps) {
  return (
    <motion.article
      layout
      role={onClick ? "button" : "article"}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -6, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className={
        "group relative rounded-2xl p-5 bg-card/60 backdrop-blur-sm border border-border/30 shadow-[0_6px_30px_rgba(10,10,10,0.06)] overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 cursor-pointer"
      }
    >
      {/* Optional cover image — subtle top preview */}
      {image && (
        <div className="absolute -top-4 right-4 w-28 h-16 rounded-lg overflow-hidden opacity-90 ring-1 ring-border/20">
          <img
            src={image}
            alt={`${title} preview`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-white/6 backdrop-blur-sm border border-border/20 flex items-center justify-center text-foreground/90 group-hover:bg-white/8 transition-colors duration-250">
          <FontAwesomeIcon
            icon={icon}
            fixedWidth
            style={{ width: 22, height: 22 }}
          />
        </div>

        {/* Title & description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-foreground text-base truncate">
              {title}
            </h3>
            {subtitle && (
              <span className="text-xs text-muted-foreground truncate">
                {subtitle}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-h-12 overflow-hidden transition-all duration-300 group-hover:max-h-48">
            {description}
          </p>

          {/* tags (small pills) */}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-1 rounded-full border border-border/20 bg-background/40 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right chevron / affordance */}
        <motion.div
          className="ml-3 flex items-center justify-center"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="rounded-full w-9 h-9 flex items-center justify-center border border-border/20 bg-background/30 group-hover:bg-background/40 transition-colors duration-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
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
        </motion.div>
      </div>

      {/* subtle divider for large cards */}
      <div className="mt-4 border-t border-border/10 pt-4 text-xs text-muted-foreground flex items-center justify-between">
        <span>Updated • {new Date().getFullYear()}</span>
        <span className="opacity-80">{tags.length} tags</span>
      </div>
    </motion.article>
  );
}
