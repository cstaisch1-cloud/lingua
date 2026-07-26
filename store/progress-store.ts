import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProgressState {
  completedLessonIds: string[];
  hasHydrated: boolean;
  completeLesson: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessonIds: [],
      hasHydrated: false,
      completeLesson: (lessonId) =>
        set((state) =>
          state.completedLessonIds.includes(lessonId)
            ? state
            : { completedLessonIds: [...state.completedLessonIds, lessonId] },
        ),
      isLessonCompleted: (lessonId) => get().completedLessonIds.includes(lessonId),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ completedLessonIds: state.completedLessonIds }),
      // See store/language-store.ts — same manual-hydration pattern to avoid
      // crashing AsyncStorage's web shim during Expo Router's static SSR.
      skipHydration: true,
      onRehydrateStorage: () => () => {
        useProgressStore.setState({ hasHydrated: true });
      },
    },
  ),
);
