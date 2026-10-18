/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffcf7',
          100: '#fff8f1',
          200: '#fcf1e6',
          300: '#f2decb',
        },
        berry: {
          DEFAULT: '#a34063',
          hover: '#8f3353',
          light: '#ffccd8',
          dark: '#f4729b',
        },
        espresso: '#5c4033',
        amberGlow: '#fbb03b',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        bubbly: ['Fredoka', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
