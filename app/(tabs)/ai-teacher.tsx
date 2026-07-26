import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePostHog } from "posthog-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { CallControlButton } from "@/components/CallControlButton";
import { getLessonById, getLessonsByUnit } from "@/data/lessons";
import { getLanguageById } from "@/data/languages";
import { getUnitById, getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { useProgressStore } from "@/store/progress-store";
import { colors } from "@/theme/colors";

type TeacherMessage = {
  text: string;
  translation: string;
};

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function AiTeacherScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const posthog = usePostHog();

  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const completedLessonIds = useProgressStore((state) => state.completedLessonIds);
  const completeLesson = useProgressStore((state) => state.completeLesson);

  // No lesson id passed (e.g. tapping the tab directly) — default to the
  // learner's current in-progress lesson, same logic as the Learn screen.
  const defaultLesson = useMemo(() => {
    if (!selectedLanguage) return undefined;
    const units = getUnitsByLanguage(selectedLanguage);
    for (const unit of units) {
      const unitLessons = getLessonsByUnit(unit.id);
      const nextLesson = unitLessons.find((l) => !completedLessonIds.includes(l.id));
      if (nextLesson) return nextLesson;
    }
    const lastUnit = units[units.length - 1];
    const lastUnitLessons = lastUnit ? getLessonsByUnit(lastUnit.id) : [];
    return lastUnitLessons[lastUnitLessons.length - 1];
  }, [selectedLanguage, completedLessonIds]);

  const lesson = id ? getLessonById(id) : defaultLesson;
  const unit = lesson ? getUnitById(lesson.unitId) : undefined;
  const language = unit ? getLanguageById(unit.languageId) : undefined;

  const isCompleted = useProgressStore((state) => (lesson ? state.isLessonCompleted(lesson.id) : false));

  const [messageIndex, setMessageIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Reset session state whenever a new lesson is opened.
  useEffect(() => {
    setMessageIndex(0);
    setIsMuted(false);
    setElapsedSeconds(0);
  }, [lesson?.id]);

  useEffect(() => {
    if (!lesson) return;
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [lesson]);

  const messages: TeacherMessage[] = useMemo(() => {
    if (!lesson) return [];
    return [
      { text: lesson.aiTeacherPrompt.openingLine, translation: lesson.description },
      ...lesson.phrases.map((phrase) => ({ text: phrase.phrase, translation: phrase.translation })),
      { text: "Great job! 🎉", translation: `Session complete — +${lesson.xpReward} XP` },
    ];
  }, [lesson]);

  const currentMessage = messages[Math.min(messageIndex, messages.length - 1)];
  const isLastMessage = messageIndex >= messages.length - 1;

  if (!lesson || !language) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <Image source={images.earth} style={{ width: 140, height: 140 }} resizeMode="contain" />
          <Text className="typo-h3 text-center">Pick a language to get started</Text>
          <Text className="typo-body-sm text-center">
            Choose a language and your AI teacher will pick up where you left off.
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

  const handleAdvanceMessage = () => {
    if (!isLastMessage) {
      setMessageIndex((i) => Math.min(i + 1, messages.length - 1));
    }
  };

  const handleEndCall = () => {
    if (!isCompleted) {
      completeLesson(lesson.id);
      posthog.capture("lesson_completed", {
        lesson_id: lesson.id,
        unit_id: lesson.unitId,
        duration_seconds: elapsedSeconds,
      });
    }
    router.push("/(tabs)/learn");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pt-2">
        <TouchableOpacity hitSlop={8} onPress={() => router.push("/(tabs)/learn")}>
          <Ionicons name="chevron-back" size={26} color={colors.ink} />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="typo-h4">AI Teacher</Text>
          <View className="flex-row items-center gap-1.5">
            <View className="h-2 w-2 rounded-full bg-success" />
            <Text className="typo-caption">Online</Text>
          </View>
        </View>

        <View className="rounded-full border border-border px-3 py-1.5">
          <Text className="typo-caption">{formatDuration(elapsedSeconds)}</Text>
        </View>
      </View>

      <View className="mt-3 items-center px-5">
        <Text className="typo-body-sm">
          {language.flagEmoji} {language.name} • {lesson.title}
        </Text>
        <Text className="typo-caption text-center mt-0.5">{lesson.goals.join(" • ")}</Text>
      </View>

      <View className="mt-3 flex-1 overflow-hidden rounded-3xl" style={{ backgroundColor: `${language.color}1A` }}>
        <View className="flex-1 items-center justify-center px-8">
          <Image source={images.mascotWelcome} style={styles.mascot} resizeMode="contain" />
        </View>

        <View className="px-5 pb-5">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleAdvanceMessage}
            className="flex-row items-center gap-3 rounded-2xl bg-background px-4 py-4"
            style={styles.bubbleShadow}
          >
            <View className="flex-1 gap-1">
              <Text className="typo-h4">{currentMessage.text}</Text>
              {subtitlesOn ? <Text className="typo-body-sm">{currentMessage.translation}</Text> : null}
            </View>
            <Ionicons
              name={isLastMessage ? "checkmark-circle" : "volume-high"}
              size={22}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.bubbleTail} />
        </View>
      </View>

      <View className="flex-row items-center justify-center gap-8 px-5 pt-6">
        <CallControlButton
          icon={isMuted ? "mic-off" : "mic"}
          label="Mic"
          variant={isMuted ? "danger" : "default"}
          onPress={() => setIsMuted((m) => !m)}
        />
        <CallControlButton
          icon="language"
          label="Subtitles"
          variant={subtitlesOn ? "active" : "default"}
          onPress={() => setSubtitlesOn((s) => !s)}
        />
        <CallControlButton icon="call" label="End Call" variant="danger" rotateIcon onPress={handleEndCall} />
      </View>

      <View className="mx-5 mt-6 mb-4 flex-row items-center justify-around rounded-2xl border border-border py-4">
        <View className="items-center gap-1">
          <Text className="typo-caption">Speaking</Text>
          <Text className="typo-h4" style={{ color: colors.success }}>
            Excellent
          </Text>
        </View>
        <View className="items-center gap-1">
          <Text className="typo-caption">Pronunciation</Text>
          <Text className="typo-h4" style={{ color: colors.primary }}>
            Great
          </Text>
        </View>
        <View className="items-center gap-1">
          <Text className="typo-caption">Grammar</Text>
          <Text className="typo-h4" style={{ color: colors.primary }}>
            Good
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mascot: {
    width: "80%",
    height: "80%",
  },
  bubbleShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  bubbleTail: {
    position: "absolute",
    bottom: 12,
    left: 32,
    width: 16,
    height: 16,
    backgroundColor: colors.background,
    transform: [{ rotate: "45deg" }],
    zIndex: -1,
  },
});
