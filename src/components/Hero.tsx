const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-tl from-black via-gray-900 to-black "
    >
      {/* Liquid Glass Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Glass Orbs */}
        <div className="absolute w-3 h-3 bg-white/20 rounded-full backdrop-blur-sm" />
        <div className="absolute w-3 h-3 bg-white/20 rounded-full backdrop-blur-sm" />
        <div className="absolute w-3 h-3 bg-white/20 rounded-full backdrop-blur-sm" />
        {/* Large Liquid Glass Elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl backdrop-blur-sm" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl backdrop-blur-sm" />
      </div>
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Animated Logo */}
            <div className="flex items-center space-x-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Abdulla Al Mahin
                </h3>
                <p className="text-sm text-gray-400">
                  Full-Stack Developer & AI Innovator
                </p>
              </div>
            </div>

            {/* Large Typography with Gradient */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight tracking-tight">
                <span className="relative block bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                  Crafting
                </span>
                <span className="relative block bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
                  Next-Gen
                </span>
                <span className="relative block text-gray-300 hover:text-white transition-colors duration-300">
                  Web Solutions
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-white via-gray-300 to-white rounded-full w-28" />
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
                Lead Developer at
                <span className="font-semibold text-white">
                  {" "}
                  VisQode & DigitalPathways
                </span>
                . I build high-performance web applications using React,
                Node.js, and AI-driven technologies. Specializing in scalable,
                maintainable solutions.
              </p>
            </div>

            {/* Interactive CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="#projects">
                <button className="relative overflow-hidden bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <span className="relative">
                    <a href="#projects">Explore My Work</a>
                  </span>
                </button>
              </a>
              <a href="#contact">
                <button className="px-8 py-4 rounded-full font-semibold border-2 border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white transition-all duration-300 hover:scale-105">
                  Let's Collaborate
                </button>
              </a>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-800 to-black p-2 mb-3 flex items-center justify-center text-white text-xl">
                  <i className="bx bx-brain"></i>
                </div>
                <h3 className="font-semibold text-white mb-1">AI-Powered</h3>
                <p className="text-sm text-gray-400">
                  Innovative solutions with advanced AI/ML
                </p>
              </div>
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 p-2 mb-3 flex items-center justify-center text-white text-xl">
                  <i className="bx bx-laptop"></i>
                </div>
                <h3 className="font-semibold text-white mb-1">Full-Stack</h3>
                <p className="text-sm text-gray-400">
                  React, Node.js, and modern tech stacks
                </p>
              </div>
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 p-2 mb-3 flex items-center justify-center text-white text-xl">
                  <i className="bx bx-rocket"></i>
                </div>
                <h3 className="font-semibold text-white mb-1">
                  Production-Ready
                </h3>
                <p className="text-sm text-gray-400">
                  Scalable apps with robust architecture
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image with Floating Effects */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-md border-4 border-orange-600 animate-float-slow">
                <img
                  src="https://raw.githubusercontent.com/ibwmahin/ibwmahin.github.io/refs/heads/main/public/pfp.jpg"
                  alt="AlexDev - Full-Stack Developer & AI Innovator"
                  className="w-full h-auto "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/5" />
              </div>
              {/* Floating Glass Elements */}
              <div className="absolute w-4 h-4 bg-white/10 rounded-full blur-sm backdrop-blur-sm" />
              <div className="absolute w-5 h-5 bg-white/10 rounded-full blur-sm backdrop-blur-sm" />
              <div className="absolute w-6 h-6 bg-white/10 rounded-full blur-sm backdrop-blur-sm" />
              <div className="absolute w-7 h-7 bg-white/10 rounded-full blur-sm backdrop-blur-sm" />
              <div className="absolute w-8 h-8 bg-white/10 rounded-full blur-sm backdrop-blur-sm" />
              <div className="absolute w-9 h-9 bg-white/10 rounded-full blur-sm backdrop-blur-sm" />
            </div>
          </div>
        </div>
      </div>
      {/* back to top */}
      <a href="#home">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center text-3xl z-50 bg-orange-400 h-10 w-20 fixed right-5 bottom-20 rounded-full hover:scale-105 hover:text-white transition-all duration-300">
            <i className="bx bx-arrow-big-up-line"></i>
          </div>
        </div>
      </a>
    </section>
  );
};

export default Hero;
