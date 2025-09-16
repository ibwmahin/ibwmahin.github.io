interface Company {
  name: string;
  logoUrl?: string;
  faIcon?: string; // boxicons class like "bxl bx-react"
}

interface CompanyRowProps {
  companies?: Company[];
}

const CompanyRow = ({
  companies = [
    { name: "React", faIcon: "bxl bx-react" },
    { name: "NextJs", faIcon: "bxl bx-next-js" },
    { name: "Tailwind", faIcon: "bxl bx-tailwind-css" },
    { name: "Figma", faIcon: "bxl bx-figma" },
    { name: "Javascript", faIcon: "bxl bx-javascript" },
    { name: "Motion", faIcon: "bxl bx-motion-js" },
    { name: "gsap", faIcon: "bxl bx-gsap" },
  ],
}: CompanyRowProps) => {
  return (
    <section className="w-full bg-black my-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {companies.map((company, index) => (
            <div
              key={company.name}
              title={company.name}
              aria-label={company.name}
              style={{ animationDelay: `${index * 60}ms` }}
              className="flex items-center gap-3 px-3 py-1 rounded-sm border border-white/6 bg-transparent transition-transform duration-200 transform will-change-transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 focus-within:ring-2 focus-within:ring-green-300 hover:border-green-300 cursor-default"
            >
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="h-6 w-auto object-contain"
                  loading="lazy"
                />
              ) : company.faIcon ? (
                // Using Boxicons (e.g. "bxl bx-react"). Do NOT prefix with other icon libraries.
                <i
                  className={`${company.faIcon} text-2xl text-white`}
                  aria-hidden
                />
              ) : (
                // fallback: initials
                <div className="flex items-center justify-center h-8 w-8 rounded bg-white/6 text-sm font-semibold text-white">
                  {company.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}

              <span className="text-sm font-medium text-white">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyRow;
