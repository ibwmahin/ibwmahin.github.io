interface Stat {
  value: string;
  label: string;
}

interface AboutProps {
  aboutText?: string;
  stats?: Stat[];
  imgSrc?: string;
}
import deskDev from "../assets/deskdev.png";
const About = ({
  aboutText = `I build clear, usable web experiences that help small businesses and teams move faster.
I combine front-end craftsmanship (HTML, CSS, JS) with design thinking to deliver focused, measurable results: faster interfaces, better conversions, and maintainable code.`,
  stats = [
    { value: "8+", label: "Years building interfaces" },
    { value: "120+", label: "Projects shipped" },
  ],
  imgSrc = deskDev,
}: AboutProps) => (
  <section
    id="about"
    aria-labelledby="about-heading"
    className="section-padding text-white"
  >
    <div className="container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Badge, heading, paragraph */}
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md border border-green-500 bg-black/30 text-green-400 text-sm font-medium">
            About
          </span>

          <h2
            id="about-heading"
            className="mt-6 text-[clamp(1.6rem,3.6vw,2.2rem)] font-extrabold leading-tight max-w-lg"
          >
            I design and build simple, high-performing websites.
          </h2>

          <p className="mt-4 text-gray-300 max-w-prose leading-relaxed">
            {aboutText}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {["React", "Tailwind", "Accessibility", "Performance"].map((t) => (
              <li key={t}>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 text-sm text-gray-200/90">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Profile image + stacked stats (definition list for semantics) */}
        <div className="flex flex-col items-start lg:items-end gap-6">
          <figure className="w-full max-w-md">
            <img
              src={imgSrc}
              alt="Profile portrait"
              className="w-full h-56 md:h-64 object-cover rounded-xl border border-white/6 shadow-sm"
              loading="lazy"
            />
            <figcaption className="sr-only">Portrait of the author</figcaption>
          </figure>

          <dl className="w-full max-w-xs mt-2 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={`${s.value}-${i}`}
                className="p-4 rounded-lg bg-gradient-to-b from-black/40 to-black/30 border border-white/6"
              >
                <dt className="text-xs text-gray-300"> </dt>
                <dd className="text-2xl font-extrabold text-green-400 leading-none">
                  {s.value}
                </dd>
                <dt className="mt-2 text-sm text-gray-300">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </section>
);

export default About;
