import { Ionicons } from "@expo/vector-icons";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 px-6">
        <View className="mt-2 flex-row items-center justify-center gap-2">
          <Image source={images.mascotLogo} style={styles.logo} resizeMode="contain" />
          <Text className="typo-h1">lingua</Text>
        </View>

        <View className="mt-8">
          <Text className="typo-h1">Your AI language</Text>
          <Text className="typo-h1 text-primary">teacher.</Text>
          <Text className="typo-body-md mt-3 text-ink-muted">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
          <View className="h-[340px] w-full items-center justify-end">
            <View
              className="absolute left-1 top-2 rounded-2xl bg-[#E4ECFB] px-4 py-2"
              style={styles.bubbleShadow}
            >
              <Text className="typo-body-md">Hello!</Text>
            </View>
            <View
              className="absolute -top-3 right-5 rounded-2xl bg-[#ECE9FE] px-4 py-2"
              style={styles.bubbleShadow}
            >
              <Text className="typo-body-md text-primary">¡Hola!</Text>
            </View>
            <View
              className="absolute -right-2 top-24 rounded-2xl bg-[#FBE9E4] px-4 py-2"
              style={styles.bubbleShadow}
            >
              <Text className="typo-body-md text-[#E2543F]">你好!</Text>
            </View>

            <Image source={images.mascotWelcome} style={styles.mascot} resizeMode="contain" />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          className="mb-6 flex-row items-center justify-center rounded-full bg-primary py-[18px]"
          style={styles.buttonShadow}
        >
          <Text className="typo-h4 text-white">Get Started</Text>
          <Ionicons name="chevron-forward" size={20} color="#ffffff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 36,
    height: 36,
  },
  mascot: {
    width: 260,
    height: 260,
  },
  bubbleShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#6C4EF5",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
