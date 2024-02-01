/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Hahmlet", "serif"],
        subtitle: ["Inclusive Sans", "sans-serif"], 
        text: ['Nanum Gothic', "sans-serif"],
      },
    },
  },
  plugins: [],
};
