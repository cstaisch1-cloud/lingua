import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { colors } from "@/theme/colors";
import type { LanguageCode } from "@/types/learning";

// Spoken greeting per language — a small touch of personalization for the header.
const GREETINGS: Record<LanguageCode, string> = {
  es: "Hola",
  fr: "Bonjour",
  ja: "こんにちは",
  de: "Hallo",
  ko: "안녕하세요",
  zh: "你好",
};

// No XP/streak store exists yet (see AGENTS.md "store/" rules) — these stay
// fixed until that feature is built.
const DAILY_GOAL_XP = 20;
const TODAY_XP = 15;
const STREAK_DAYS = 12;

// Placeholder AI teacher avatar — no matching asset in assets/images yet.
const NEXT_UP_AVATAR =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces&q=80";

type PlanItem = {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  title: string;
  subtitle: string;
  completed: boolean;
};

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);

  const language = selectedLanguage ? getLanguageById(selectedLanguage) : undefined;
  const currentUnit = selectedLanguage ? getUnitsByLanguage(selectedLanguage)[0] : undefined;
  const currentLesson = currentUnit ? getLessonsByUnit(currentUnit.id)[0] : undefined;

  const firstName = user?.firstName ?? "there";
  const greeting = selectedLanguage ? GREETINGS[selectedLanguage] : "Hi";
  const goalProgress = Math.min(TODAY_XP / DAILY_GOAL_XP, 1);

  // First plan item is marked done as a placeholder until real lesson-completion
  // tracking exists — the other two mirror today's data-driven content.
  const planItems: PlanItem[] = currentLesson
    ? [
        {
          icon: "book",
          iconBg: colors.primary,
          title: "Lesson",
          subtitle: currentLesson.title,
          completed: true,
        },
        {
          icon: "headset",
          iconBg: colors.primary,
          title: "AI Conversation",
          subtitle: currentLesson.goals[0] ?? "Practice speaking",
          completed: false,
        },
        {
          icon: "chatbubbles",
          iconBg: colors.error,
          title: "New words",
          subtitle: `${currentLesson.vocabulary.length} words`,
          completed: false,
        },
      ]
    : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View
              className="h-11 w-11 items-center justify-center rounded-full"
              style={{ backgroundColor: `${language?.color ?? colors.primary}26` }}
            >
              <Text className="text-xl">{language?.flagEmoji ?? "🌍"}</Text>
            </View>
            <Text className="typo-h3">
              {greeting}, {firstName}! 👋
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Ionicons name="flame" size={22} color={colors.streak} />
              <Text className="typo-h4">{STREAK_DAYS}</Text>
            </View>
            <TouchableOpacity hitSlop={8}>
              <Ionicons name="notifications-outline" size={22} color={colors.ink} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily goal */}
        <View
          className="flex-row items-center justify-between rounded-3xl bg-[#FDEEDD] p-5"
          style={styles.cardShadow}
        >
          <View className="flex-1 gap-2 pr-3">
            <Text className="typo-body-sm">Daily goal</Text>
            <Text className="typo-h2">
              {TODAY_XP} <Text className="typo-h4">/ {DAILY_GOAL_XP} XP</Text>
            </Text>
            <View className="h-2 w-full rounded-full bg-[#F7D9B6]">
              <View className="h-2 rounded-full bg-streak" style={{ width: `${goalProgress * 100}%` }} />
            </View>
          </View>
          <Image source={images.treasure} style={{ width: 84, height: 84 }} resizeMode="contain" />
        </View>

        {/* Continue learning */}
        {language && currentUnit ? (
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.continueCard, styles.cardShadow]}
          >
            <Text style={styles.mutedWhite}>Continue learning</Text>
            <Text className="typo-h1 mt-1 text-white">{language.name}</Text>
            <Text style={[styles.mutedWhite, { marginTop: 2 }]}>A1 • Unit {currentUnit.order}</Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/(tabs)/learn")}
              className="mt-4 self-start rounded-full bg-white px-6 py-2.5"
            >
              <Text className="typo-h4" style={{ color: colors.primary }}>
                Continue
              </Text>
            </TouchableOpacity>

            <Image
              source={images.palace}
              style={styles.continueIllustration}
              resizeMode="contain"
            />
          </LinearGradient>
        ) : null}

        {/* Today's plan */}
        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="typo-h3">Today&apos;s plan</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/learn")}>
              <Text className="typo-h4" style={{ color: colors.primary }}>
                View all
              </Text>
            </TouchableOpacity>
          </View>

          {planItems.length > 0 ? (
            <View className="gap-4">
              {planItems.map((item) => (
                <View key={item.title} className="flex-row items-center gap-3">
                  <View
                    className="h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <Ionicons name={item.icon} size={20} color="#FFFFFF" />
                  </View>
                  <View className="flex-1">
                    <Text className="typo-h4">{item.title}</Text>
                    <Text className="typo-body-sm">{item.subtitle}</Text>
                  </View>
                  {item.completed ? (
                    <View className="h-7 w-7 items-center justify-center rounded-full bg-primary">
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    </View>
                  ) : (
                    <View className="h-7 w-7 rounded-full border-2 border-border" />
                  )}
                </View>
              ))}
            </View>
          ) : (
            <Text className="typo-body-sm">
              New lessons for {language?.name ?? "this language"} are coming soon.
            </Text>
          )}
        </View>

        {/* Next up */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/(tabs)/ai-teacher")}
          className="flex-row items-center justify-between rounded-3xl bg-[#EAF6E7] p-4"
          style={styles.cardShadow}
        >
          <View className="flex-1 gap-1 pr-3">
            <Text className="typo-caption">Next up</Text>
            <Text className="typo-h4">AI Video Call</Text>
            <Text className="typo-body-sm">Practice speaking</Text>
          </View>

          <View style={styles.avatarWrap}>
            <Image source={{ uri: NEXT_UP_AVATAR }} style={styles.avatar} />
            <View style={styles.videoBadge}>
              <Ionicons name="videocam" size={14} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 20,
  },
  cardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  continueCard: {
    borderRadius: 24,
    padding: 20,
    overflow: "hidden",
    minHeight: 170,
  },
  continueIllustration: {
    position: "absolute",
    right: -16,
    bottom: -8,
    width: 160,
    height: 160,
  },
  mutedWhite: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Poppins-Regular",
    fontSize: 13,
  },
  avatarWrap: {
    width: 56,
    height: 56,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  videoBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#EAF6E7",
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
  },
});
