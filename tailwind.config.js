/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        liquid: "liquid 20s linear infinite",
        "slide-in-left": "slideInLeft 1s ease-out forwards",
        "slide-in-right": "slideInRight 1s ease-out forwards",
        "slide-in-up": "slideInUp 0.8s ease-out forwards",
        gradient: "gradient 6s ease-in-out infinite",
        "gradient-flow": "gradientFlow 15s ease-in-out infinite",
        "pulse-gradient": "pulseGradient 8s ease-in-out infinite", // New animation
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        liquid: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-50px) rotate(180deg)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        gradientFlow: {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        pulseGradient: {
          // New keyframe for pulsing gradient
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
};
