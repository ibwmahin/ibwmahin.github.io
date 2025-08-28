import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 h-[90svh] flex justify-center items-center">
      <motion.section
        id="hero"
        className="text-center px-4 h-[60vh] flex flex-col justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-lg sm:text-xl mb-3 text-gray-700">
          Hi! I'm Abdulla Al Mahin 👋
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-gray-900 leading-tight">
          Creative Web Developer &
          <br />
          Designer
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto mb-8">
          I help small businesses, creators, and startups grow their online
          presence with modern, fast, and beautifully designed websites,
          intuitive UI/UX, and engaging video content.{" "}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white border-2 border-[hsl(var(--dark))] text-sm font-bold uppercase px-4 py-2 hover:[filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] hover:text-black hover:bg-white hover:animate-glitch transition-all duration-300"
          >
            CONNECT WITH ME
            <i className="fa-solid fa-arrow-right"></i>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[hsl(var(--background))] text-[hsl(var(--dark))] border-2 border-[hsl(var(--dark))] text-sm font-bold uppercase px-4 py-2 hover:[filter:drop-shadow(2px_2px_0_hsl(var(--dark)))] hover:animate-glitch transition-all duration-300"
          >
            MY RESUME
            <i className="fa-solid fa-file"></i>
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Hero;
