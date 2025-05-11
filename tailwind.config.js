/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8a2be2', // Vibrant purple
          dark: '#6a1cb2',
          light: '#9d44f5',
        },
        accent: {
          DEFAULT: '#00eeff', // Neon cyan
          dark: '#00c8d7',
          light: '#4fffff',
        },
        background: {
          dark: '#0a0a12', // Very dark blue-black
          card: 'rgba(16, 16, 28, 0.5)', // Semi-transparent card background
          glass: 'rgba(24, 24, 36, 0.25)', // Glassmorphism background
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': "url('/src/assets/grid-pattern.svg')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};