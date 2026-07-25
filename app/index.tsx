import { useUser } from "@clerk/expo";
import { Link, Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { useLanguageStore } from "@/store/language-store";

export default function Index() {
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  if (user) {
    if (!hasHydrated) {
      return null;
    }

    if (!selectedLanguage) {
      return <Redirect href="/language-select" />;
    }

    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background px-6">
      <Text className="typo-h1">lingua</Text>
      <Text className="typo-body-md text-center">
        Design system wired up — Poppins + Lingua tokens.
      </Text>

      <Link href="/onboarding" asChild>
        <TouchableOpacity activeOpacity={0.85} className="mt-4 rounded-full bg-primary px-6 py-3">
          <Text className="typo-h4 text-white">View Onboarding</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
