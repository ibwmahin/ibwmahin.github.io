import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-white to-orange-50 h-screen flex items-center flex-col justify-center"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-7xl mb-6 bg-gradient-to-l from-orange-500 to-orange-400 font-black bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="font-black text-lg text-black leading-relaxed max-w-2xl mx-auto">
            I'm
            <span className="font-black bg-gradient-to-l from-orange-700 to-orange-400 bg-clip-text text-transparent">
              AlexDev
            </span>
            , a full-stack developer and AI enthusiast with a passion for
            crafting high-performance, elegant web solutions. As the founder &
            lead developer of{" "}
            <span className="font-black bg-gradient-to-l from-orange-700 to-orange-400 bg-clip-text text-transparent">
              AlexDev Studio
            </span>
            , I specialize in building production-grade apps and custom websites
            using code and modern tools.
          </p>
          <p className="font-semibold text-lg text-gray-950 leading-relaxed max-w-2xl mx-auto">
            I follow an{" "}
            <span className="text-black">AI-assisted development mindset</span>{" "}
            — integrating intelligent tools and clean code from day one — and
            promote maintainable, scalable systems. I actively contribute to
            open-source projects and constantly innovate to stay at the edge of
            modern software.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-slate-900">
            My Development Philosophy
          </h3>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            I believe in{" "}
            <span className="font-semibold text-slate-800">
              clean code & architecture
            </span>{" "}
            with modular, reusable components and well-organized structure. My{" "}
            <span className="font-semibold text-slate-800">
              AI-first development
            </span>{" "}
            approach uses intelligent tools and APIs to build faster, smarter
            solutions while maintaining modern tools & frameworks expertise.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
