import type { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  {
    id: "es-unit-1",
    languageId: "es",
    order: 1,
    title: "Basics 1",
    description: "Greetings and simple everyday words.",
    icon: "👋",
    color: "#FF9600",
  },
  {
    id: "es-unit-2",
    languageId: "es",
    order: 2,
    title: "Basics 2",
    description: "Introduce yourself and count to ten.",
    icon: "🔢",
    color: "#58CC02",
  },
  {
    id: "fr-unit-1",
    languageId: "fr",
    order: 1,
    title: "Basics 1",
    description: "Greetings and simple everyday words.",
    icon: "👋",
    color: "#4D8BFF",
  },
  {
    id: "ja-unit-1",
    languageId: "ja",
    order: 1,
    title: "Basics 1",
    description: "Greetings and simple everyday words.",
    icon: "👋",
    color: "#FF4D4F",
  },
  {
    id: "de-unit-1",
    languageId: "de",
    order: 1,
    title: "Basics 1",
    description: "Greetings and simple everyday words.",
    icon: "👋",
    color: "#58CC02",
  },
  {
    id: "ko-unit-1",
    languageId: "ko",
    order: 1,
    title: "Basics 1",
    description: "Greetings and simple everyday words.",
    icon: "👋",
    color: "#8D7CF7",
  },
  {
    id: "zh-unit-1",
    languageId: "zh",
    order: 1,
    title: "Basics 1",
    description: "Greetings and simple everyday words.",
    icon: "👋",
    color: "#E2543F",
  },
];

export function getUnitsByLanguage(languageId: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
