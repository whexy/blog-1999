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
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
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
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
