import {
  Lato,
  Fira_Sans,
  Noto_Sans_SC,
  JetBrains_Mono,
} from "next/font/google";

// Lato: `font-title` (UI chrome, headings). Semibold/bold map to 700.
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-notosans",
  preload: false,
});

// Fira Sans: `font-sans` / `font-article` (body copy). 500/600 are
// used by `font-medium` / `font-semibold` text in the default font.
const fira = Fira_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

/** CSS variable classes for every site font; put on `<html>`. */
export const fontVariables = [
  lato.variable,
  notoSansSC.variable,
  fira.variable,
  jetbrainsMono.variable,
].join(" ");
