interface Company {
  name: string;
  logoUrl?: string;
  faIcon?: string; // optional font awesome icon class
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
    <section className="w-full mt-4">
      <div className="container w-full mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {companies.map((company, index) => (
            <div
              key={company.name}
              className="flex items-center space-x-6 px-4 py-2 hover:scale-110 cursor-default duration-150 hover:text-cyan-300 hover:shadow-cyan-300/60 hover:shadow-lg rounded-sm "
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="h-5"
                  loading="lazy"
                />
              ) : company.faIcon ? (
                <i
                  className={`fab ${company.faIcon} text-lg`}
                  aria-hidden="true"
                ></i>
              ) : null}

              <span className="text-sm font-medium">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyRow;
