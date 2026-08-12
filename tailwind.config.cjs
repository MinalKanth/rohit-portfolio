/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // New palette: warm graphite instead of navy, Swift-orange accent instead of violet
        primary: "#0E0D11",       // near-black warm graphite background
        secondary: "#C9C3BA",     // warm light-grey body text
        tertiary: "#1C1A1F",      // card / panel background
        "black-100": "#17161B",
        "black-200": "#0A090C",
        "white-100": "#F5F1EC",
        accent: "#FA7343",        // Swift orange — primary highlight color
        "accent-dark": "#D65A2E",
        teal: "#2DD4BF",          // secondary accent for gradients/contrast
      },
      boxShadow: {
        card: "0px 35px 120px -15px #05040a",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
