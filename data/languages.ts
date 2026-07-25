import type { Language, LanguageCode } from "@/types/learning";

// Add a new entry here (and a matching `LanguageCode`) to support a new language.
export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flagEmoji: "🇪🇸",
    color: "#FF9600",
    description: "Learn the basics of Spanish through fun, bite-sized lessons.",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flagEmoji: "🇫🇷",
    color: "#4D8BFF",
    description: "Start speaking French with everyday words and phrases.",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flagEmoji: "🇯🇵",
    color: "#FF4D4F",
    description: "Get started with Japanese greetings, vocabulary, and phrases.",
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    flagEmoji: "🇩🇪",
    color: "#58CC02",
    description: "Start speaking German with everyday words and phrases.",
  },
  {
    id: "ko",
    name: "Korean",
    nativeName: "한국어",
    flagEmoji: "🇰🇷",
    color: "#8D7CF7",
    description: "Get started with Korean greetings, vocabulary, and phrases.",
  },
  {
    id: "zh",
    name: "Chinese",
    nativeName: "中文",
    flagEmoji: "🇨🇳",
    color: "#E2543F",
    description: "Start speaking Chinese with everyday words and phrases.",
  },
];

export function getLanguageById(id: LanguageCode): Language | undefined {
  return languages.find((language) => language.id === id);
}
