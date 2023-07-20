/* eslint-disable linebreak-style */

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        vt323: ['VT323', 'monospace'],
        sf: ['SF-Pro'],
      },
    },
  },
  plugins: [],
};
