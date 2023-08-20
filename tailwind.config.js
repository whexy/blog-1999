/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-fira)",
          "var(--font-notosans)",
          ...defaultTheme.fontFamily.sans,
        ],
        article: [
          "var(--font-fira)",
          "var(--font-notosans)",
          ...defaultTheme.fontFamily.sans,
        ],
        title: [
          "var(--font-lato)",
          "var(--font-notosans)",
          ...defaultTheme.fontFamily.sans,
        ],
        noto: [
          "var(--font-notosans)",
          ...defaultTheme.fontFamily.sans,
        ],
        default: [...defaultTheme.fontFamily.sans],
        mono: ["input-mono-narrow", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        white: {
          DEFAULT: colors.white,
          readable: "#F5F5F7",
        },
        black: {
          DEFAULT: colors.black,
          readable: "#1D1D1F",
          elegant: "#1F1F24",
        },
        secondary: {
          DEFAULT: "#F6F6F6",
          dark: "#1F1F24",
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
        nwpurple: {
          DEFAULT: "rgb(65, 39, 118)",
          light: "rgb(152, 78, 187)",
        },
      },
      typography: theme => ({
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
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};
