/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      BebasNeue: "Bebas Neue",
      cursive: "cursive",
    },
    extend: {
      keyframes: {
        toDarkScreen: {
          "0%": {
            backgroundColor: "transparent",
            zIndex: -1,
            backdropFilter: "blur(0px)",
          },
          "100%": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 20,
            backdropFilter: "blur(5px)",
          },
        },
        toTransparentScreen: {
          "0%": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 20,
            backdropFilter: "blur(5px)",
          },
          "100%": {
            backgroundColor: "transparent",
            zIndex: -1,
            backdropFilter: "blur(0px)",
          },
        },
        spinToUp: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(180deg)" },
        },
        spinToDown: {
          "0%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(0)" },
        },
      },
      animation: {
        toDarkScreen: "toDarkScreen 0.5s both",
        toTransparentScreen: "toTransparentScreen 0.5s both",
        spinToUp: "spinToUp 0.5s forwards",
        spinToDown: "spinToDown 0.5s forwards",
      },
    },
  },
  plugins: [],
};
