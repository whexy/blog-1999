import { en } from "./en";
import { zh } from "./zh";

export const translations = {
  en,
  zh,
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof en;
