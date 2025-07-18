/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Catppuccin Mocha (Dark)
        mocha: {
          base: '#1e1e2e',
          surface0: '#313244',
          surface1: '#45475a',
          surface2: '#585b70',
          overlay0: '#6c7086',
          overlay1: '#7f849c',
          overlay2: '#9399b2',
          subtext0: '#a6adc8',
          subtext1: '#bac2de',
          text: '#cdd6f4',
          lavender: '#b4befe',
          blue: '#89b4fa',
          sapphire: '#74c7ec',
          sky: '#89dceb',
          teal: '#94e2d5',
          green: '#a6e3a1',
          yellow: '#f9e2af',
          peach: '#fab387',
          maroon: '#eba0ac',
          red: '#f38ba8',
          mauve: '#cba6f7',
          pink: '#f5c2e7',
          flamingo: '#f2cdcd',
          rosewater: '#f5e0dc',
        },
        // Catppuccin Latte (Light)
        latte: {
          base: '#eff1f5',
          surface0: '#ccd0da',
          surface1: '#bcc0cc',
          surface2: '#acb0be',
          overlay0: '#9ca0b0',
          overlay1: '#8c8fa1',
          overlay2: '#7c7f93',
          subtext0: '#6c6f85',
          subtext1: '#5c5f77',
          text: '#4c4f69',
          lavender: '#7287fd',
          blue: '#1e66f5',
          sapphire: '#209fb5',
          sky: '#04a5e5',
          teal: '#179299',
          green: '#40a02b',
          yellow: '#df8e1d',
          peach: '#fe640b',
          maroon: '#e64553',
          red: '#d20f39',
          mauve: '#8839ef',
          pink: '#ea76cb',
          flamingo: '#dd7878',
          rosewater: '#dc8a78',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
    },
  },
  plugins: [],
};