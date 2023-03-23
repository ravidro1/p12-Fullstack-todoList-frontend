/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        toDarkScreen: {
          "0%": { backgroundColor: "transparent", zIndex: -1 },
          "100%": { backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 20 },
        },
        toTransparentScreen: {
          "0%": { backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 20 },
          "100%": { backgroundColor: "transparent", zIndex: -1 },
        },
      },
      animation: {
        toDarkScreen: "toDarkScreen 0.5s both",
        toTransparentScreen: "toTransparentScreen 0.5s both",
      },
    },
  },
  plugins: [],
};
