export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        retro: ["GroovvyDay", "serif"],
        vintage: ["EB Garamond", "serif"],
        classic: ["Cormorant Garamond", "serif"],
        film: ["Playfair Display", "serif"],
      },

      colors: {
        gold: "#d2b57b",
        sepia: "#704214",
        mustard: "#d4a84e",
        darkMustard: "#b48632",
        charcoal: "#2b2521",
        cream: "#f5e7c6",
        retroRed: "#c44a2c",
      },

      boxShadow: {
        glow: "0 0 40px rgba(210,181,123,0.65)",
        deep: "0 0 60px rgba(0,0,0,0.8)",
        retro: "3px 3px 0 #2b2521, 6px 6px 0 #000000",
      },

      backgroundImage: {
        filmreel: "url('/filmreel.png')",
      },
    },
  },
  plugins: [],
};
