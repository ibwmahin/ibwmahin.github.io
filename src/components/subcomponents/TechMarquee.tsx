// TechMarquee.tsx

type TechLogo = {
  name: string;
  icon: string; // Font Awesome class, e.g., "fab fa-react"
};

type TechMarqueeProps = {
  logos?: TechLogo[];
  duration?: number; // Animation duration in seconds
};

const sampleLogos: TechLogo[] = [
  { name: "React", icon: "fab fa-react" },
  { name: "JavaScript", icon: "fab fa-js-square" },
  { name: "HTML5", icon: "fab fa-html5" },
  { name: "CSS3", icon: "fab fa-css3-alt" },
  { name: "Tailwind CSS", icon: "fab fa-css3-alt" },
  // Using CSS icon as placeholder
  { name: "TypeScript", icon: "fab fa-js-square" },
  // Using JS icon as placeholder
  // Add more as needed
];

export default function TechMarquee({ logos = sampleLogos }: TechMarqueeProps) {
  const duplicatedLogos = [...logos, ...logos];
  // Double for seamless loop
  return (
    <div className="relative overflow-hidden py-7">
      {/* Marquee Track */}
      <div className="w-full h-20 flex items-center justify-center">
        <div
          className="flex items-center gap-12 whitespace-nowrap marquee-track"
          style={{ width: "200%" }} // Double width for double duplication
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex flex-col items-center gap-1 min-w-max"
            >
              <i
                className={`${logo.icon} text-3xl opacity-70 hover:opacity-100 transition-opacity text-foreground/70 hover:text-foreground`}
              />
              <span className="text-xs text-muted-foreground tracking-wide uppercase">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
