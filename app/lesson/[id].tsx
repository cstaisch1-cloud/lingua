import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePostHog } from "posthog-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getLessonById } from "@/data/lessons";
import { getLessonImageUrl } from "@/lib/lesson-images";
import { useProgressStore } from "@/store/progress-store";
import { colors } from "@/theme/colors";

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const posthog = usePostHog();
  const lesson = getLessonById(id);

  const isCompleted = useProgressStore((state) => (lesson ? state.isLessonCompleted(lesson.id) : false));

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="typo-h4 text-center">Lesson not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity hitSlop={8} onPress={() => router.back()} className="mb-3">
          <Ionicons name="chevron-back" size={26} color={colors.ink} />
        </TouchableOpacity>

        <Image source={{ uri: getLessonImageUrl(lesson.id) }} style={styles.hero} resizeMode="cover" />

        <View className="mt-5 gap-1">
          <Text className="typo-caption">{lesson.xpReward} XP</Text>
          <Text className="typo-h1">{lesson.title}</Text>
          <Text className="typo-body-md">{lesson.description}</Text>
        </View>

        <View className="mt-6 gap-3">
          <Text className="typo-h3">You&apos;ll learn</Text>
          {lesson.goals.map((goal) => (
            <View key={goal} className="flex-row items-center gap-3">
              <View className="h-2 w-2 rounded-full bg-primary" />
              <Text className="typo-body-md flex-1">{goal}</Text>
            </View>
          ))}
        </View>

        <View className="mt-6 gap-3">
          <Text className="typo-h3">Vocabulary</Text>
          <View className="flex-row flex-wrap gap-2">
            {lesson.vocabulary.map((item) => (
              <View key={item.id} className="rounded-full border border-border px-4 py-2">
                <Text className="typo-body-sm" style={{ color: colors.ink }}>
                  {item.term} — {item.translation}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={isCompleted}
          onPress={() => {
            posthog.capture("lesson_opened", {
              lesson_id: lesson.id,
              unit_id: lesson.unitId,
              source: "lesson_detail",
            });
            router.push({ pathname: "/(tabs)/ai-teacher", params: { id: lesson.id } });
          }}
          className="mt-8 items-center rounded-full py-4"
          style={{ backgroundColor: isCompleted ? colors.success : colors.primary }}
        >
          <Text className="typo-h4 text-white">{isCompleted ? "Completed" : "Start with AI Teacher"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  hero: {
    width: "100%",
    height: 200,
    borderRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
