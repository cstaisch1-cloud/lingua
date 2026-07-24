/**
 * Color tokens from the Lingua design system.
 *
 * These values must stay in sync with `theme.extend.colors` in
 * `tailwind.config.js` — that's what powers `bg-primary`, `text-ink`, etc.
 * Reach for this file directly only in the StyleSheet/inline-style
 * exceptions listed in AGENTS.md (SafeAreaView, Modal, shadows, Animated).
 */
export const colors = {
  // Brand / primary
  primary: "#6C4EF5", // Lingua Purple
  primaryDark: "#5B3BF6", // Lingua Deep Purple
  secondary: "#4D8BFF", // Lingua Blue

  // Semantic
  success: "#21C16B", // also Lingua Green
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  // Neutrals
  ink: "#0D132B", // Text / Primary
  inkMuted: "#6B7280", // Text / Secondary
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export type ColorToken = keyof typeof colors;
