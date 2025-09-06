/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Uniform font 
        sans: ["'Uniform', sans-serif"],
      },
    },
  },
  plugins: [],
};
