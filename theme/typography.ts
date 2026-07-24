/**
 * Typography tokens from the Lingua design system.
 *
 * Matches the type scale in `tailwind.config.js` (text-h1, text-h2, ...)
 * and the `.h1`–`.caption` utilities in `global.css`. Reach for this file
 * directly only in the StyleSheet/inline-style exceptions listed in
 * AGENTS.md (SafeAreaView, Modal, shadows, Animated).
 */
export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const typeScale = {
  h1: { fontSize: 32, lineHeight: 32 * 1.2, fontFamily: fontFamily.bold }, // Page / Screen Title
  h2: { fontSize: 24, lineHeight: 24 * 1.3, fontFamily: fontFamily.semiBold }, // Section Title
  h3: { fontSize: 20, lineHeight: 20 * 1.3, fontFamily: fontFamily.semiBold }, // Card / Module Title
  h4: { fontSize: 16, lineHeight: 16 * 1.4, fontFamily: fontFamily.medium }, // Subheading
  bodyLarge: { fontSize: 16, lineHeight: 16 * 1.6, fontFamily: fontFamily.regular }, // Important content
  bodyMedium: { fontSize: 14, lineHeight: 14 * 1.6, fontFamily: fontFamily.regular }, // Body text
  bodySmall: { fontSize: 13, lineHeight: 13 * 1.6, fontFamily: fontFamily.regular }, // Supporting text
  caption: { fontSize: 11, lineHeight: 11 * 1.4, fontFamily: fontFamily.regular }, // Labels, meta text
} as const;

export type TypeScaleToken = keyof typeof typeScale;
