/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Apple-inspired deep dark system — not pure black
        primary: "#070708",        // base background
        "primary-alt": "#0A0A0C",  // alternating section background
        secondary: "#9A9AA3",      // secondary text
        tertiary: "#101014",       // panels / surfaces
        "black-100": "#15151A",    // elevated surfaces
        "black-200": "#0A0A0C",
        "white-100": "#F5F5F7",    // primary text
        line: "#25252C",           // hairline borders
        accent: "#4F7FFF",         // electric blue
        "accent-violet": "#7C6FFF",
        "accent-cyan": "#5EEAD4",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #030303",
        glow: "0 0 0 1px rgba(79,127,255,0.15), 0 20px 60px -20px rgba(79,127,255,0.45)",
        "glow-lg": "0 0 0 1px rgba(79,127,255,0.12), 0 40px 100px -30px rgba(79,127,255,0.5)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        // Small, heavily-compressed variant loaded by default (mobile-first).
        "hero-pattern": "url('/src/assets/herobg-mobile.webp')",
        // Larger variant swapped in at sm:+ via the responsive class below.
        "hero-pattern-desktop": "url('/src/assets/herobg.webp')",
        "radial-glow":
          "radial-gradient(55% 55% at 50% 35%, rgba(79,127,255,0.16) 0%, rgba(7,7,8,0) 70%)",
        "grid-lines":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(20px, -15px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
