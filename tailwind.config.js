/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6363", // Raycast Red
          dark: "#D94A4A", // Darker shade
          light: "#FF7C7C", // Lighter shade
        },
        accent: {
          DEFAULT: "#FF6363", // Raycast Red
          dark: "#D94A4A", // Darker shade
          light: "#FF7C7C", // Lighter shade
        },
        background: {
          dark: "#0A0A12", // Very dark blue-black
          card: "rgba(16, 16, 28, 0.5)", // Semi-transparent card background
          glass: "rgba(24, 24, 36, 0.25)", // Glassmorphism background
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern": "url('/src/assets/grid-pattern.svg')",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

