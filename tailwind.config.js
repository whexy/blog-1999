const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./posts/**/*.{md, mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter", serif'],
      },
      colors: {
        white: {
          DEFAULT: colors.white,
          readable: "#F5F5F7",
        },
        black: {
          DEFAULT: colors.black,
          readable: "#1D1D1F",
        },
        spgray: {
          DEFAULT: "#121212",
          secondary: "#181818",
          bright: "#282828",
        },
        jbgray: {
          DEFAULT: "#27282c",
          light: "rgb(138, 138, 140)",
        },
        jbpurple: {
          DEFAULT: "#776590",
          dark: "#6F3DCC",
          deep: "#39106e",
          light: "#8A7F9A",
        },
        jbgreen: {
          DEFAULT: "#547863",
        },
        smartisanred: {
          DEFAULT: "rgb(196, 162, 160)",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            code: {
              color: theme("colors.red.500"),
              fontWeight: "400",
            },
            img: {
              marginLeft: "auto",
              marginRight: "auto",
            },
          },
        },
      }),
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
      },
      animation: {
        "pulse-fast": "pulse 0.5s linear infinite",
        shake: "shake 0.82s cubic-bezier(.36, .07, .19, .97) both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
