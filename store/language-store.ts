import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageCode } from "@/types/learning";

interface LanguageState {
  selectedLanguage: LanguageCode | null;
  hasHydrated: boolean;
  setSelectedLanguage: (language: LanguageCode | null) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      hasHydrated: false,
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
      // Expo Router's static web output renders routes during SSR (no `window`),
      // which crashes AsyncStorage's web shim if hydration runs on store creation.
      // Hydrate manually on the client instead — see app/_layout.tsx.
      skipHydration: true,
      onRehydrateStorage: () => () => {
        useLanguageStore.setState({ hasHydrated: true });
      },
    },
  ),
);
