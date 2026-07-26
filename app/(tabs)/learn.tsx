import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePostHog } from "posthog-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { LessonListItem, type LessonStatus } from "@/components/LessonListItem";
import { getLanguageById } from "@/data/languages";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { useProgressStore } from "@/store/progress-store";
import { colors } from "@/theme/colors";

export default function LearnScreen() {
  const router = useRouter();
  const posthog = usePostHog();
  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");

  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const completedLessonIds = useProgressStore((state) => state.completedLessonIds);

  const language = selectedLanguage ? getLanguageById(selectedLanguage) : undefined;

  // Show the first unit that isn't fully complete yet, falling back to the
  // last unit once everything is done.
  const currentUnit = useMemo(() => {
    const languageUnits = selectedLanguage ? getUnitsByLanguage(selectedLanguage) : [];
    for (const unit of languageUnits) {
      const unitLessons = getLessonsByUnit(unit.id);
      const allDone = unitLessons.length > 0 && unitLessons.every((l) => completedLessonIds.includes(l.id));
      if (!allDone) return unit;
    }
    return languageUnits[languageUnits.length - 1];
  }, [selectedLanguage, completedLessonIds]);

  const lessons = currentUnit ? getLessonsByUnit(currentUnit.id) : [];
  const completedCount = lessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const firstIncompleteIndex = lessons.findIndex((l) => !completedLessonIds.includes(l.id));

  if (!language || !currentUnit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <Image source={images.earth} style={{ width: 140, height: 140 }} resizeMode="contain" />
          <Text className="typo-h3 text-center">Pick a language to get started</Text>
          <Text className="typo-body-sm text-center">
            Choose a language and we&apos;ll build a lesson path for you.
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/language-select")}
            className="mt-2 rounded-full bg-primary px-6 py-3"
          >
            <Text className="typo-h4 text-white">Choose a language</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-5 pt-2">
        <TouchableOpacity
          hitSlop={8}
          onPress={() => (router.canGoBack() ? router.back() : router.push("/(tabs)/home"))}
        >
          <Ionicons name="chevron-back" size={26} color={colors.ink} />
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <Text className="typo-h3">{currentUnit.title}</Text>
          <Text className="typo-body-sm">
            Unit {currentUnit.order} • {completedCount}/{lessons.length} lessons
          </Text>
        </View>

        <TouchableOpacity hitSlop={8}>
          <Ionicons name="bookmark-outline" size={24} color={colors.ink} />
        </TouchableOpacity>
      </View>

      <View style={[styles.hero, { backgroundColor: `${language.color}1A` }]}>
        <Image source={images.palace} style={styles.heroImage} resizeMode="contain" />
      </View>

      <View className="px-5">
        <View className="-mt-6 flex-row rounded-2xl bg-background p-1" style={styles.tabShadow}>
          <TouchableOpacity
            className="flex-1 items-center gap-1 rounded-xl py-3"
            onPress={() => setActiveTab("lessons")}
          >
            <Text className="typo-h4" style={{ color: activeTab === "lessons" ? colors.primary : colors.inkMuted }}>
              Lessons
            </Text>
            {activeTab === "lessons" ? <View className="h-0.5 w-8 rounded-full bg-primary" /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center gap-1 rounded-xl py-3"
            onPress={() => setActiveTab("practice")}
          >
            <Text className="typo-h4" style={{ color: activeTab === "practice" ? colors.primary : colors.inkMuted }}>
              Practice
            </Text>
            {activeTab === "practice" ? <View className="h-0.5 w-8 rounded-full bg-primary" /> : null}
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === "lessons" ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {lessons.map((lesson, index) => {
            const status: LessonStatus = completedLessonIds.includes(lesson.id)
              ? "completed"
              : index === firstIncompleteIndex
                ? "in-progress"
                : "locked";

            return (
              <LessonListItem
                key={lesson.id}
                order={index + 1}
                title={lesson.title}
                status={status}
                activityCount={lesson.activities.length}
                onPress={() => {
                  posthog.capture("lesson_opened", {
                    language_id: selectedLanguage,
                    unit_id: currentUnit.id,
                    lesson_id: lesson.id,
                    status,
                  });
                  router.push({ pathname: "/lesson/[id]", params: { id: lesson.id } });
                }}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center gap-3 px-8">
          <Image source={images.treasure} style={{ width: 120, height: 120 }} resizeMode="contain" />
          <Text className="typo-h4 text-center">Practice mode is coming soon</Text>
          <Text className="typo-body-sm text-center">
            Review vocabulary from completed lessons once it&apos;s ready.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: "100%",
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: "65%",
    height: "80%",
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 12,
  },
  tabShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
