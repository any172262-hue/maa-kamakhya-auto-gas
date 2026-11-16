import { en } from "./en.js";
import { hi } from "./hi.js";
import { as } from "./as.js";

export const SUPPORTED_LANGUAGES = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    flag: "EN",
    ariaLabel: "English language"
  },
  {
    code: "hi",
    label: "Hindi",
    nativeLabel: "हिन्दी",
    flag: "HI",
    ariaLabel: "Hindi language (हिन्दी)"
  },
  {
    code: "as",
    label: "Assamese",
    nativeLabel: "অসমীয়া",
    flag: "AS",
    ariaLabel: "Assamese language (অসমীয়া)"
  }
];

export const DEFAULT_LANGUAGE = "en";

export const translations = {
  en,
  hi,
  as
};

export { en, hi, as };
