/**
 * Font assets for `useFonts()`, loaded once in `app/_layout.tsx` before
 * the app renders. Keys must match the `fontFamily` values in
 * `theme/typography.ts` exactly — RN looks up fonts by this name.
 */
export const fontAssets = {
  "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
};
