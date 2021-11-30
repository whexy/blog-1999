const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  darkMode: "media",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        violet: colors.violet,
        rose: colors.rose,
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
      backgroundImage: {
        "deep-blue":
          "radial-gradient( circle farthest-corner at 83.7% 4.3%,  rgba(173,0,171,1) 0%, rgba(15,51,92,1) 90% );",
        mojave_dark: "url('/img/mojave.webp')",
        mojave: "url('/img/mojave_light.webp')",
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
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
