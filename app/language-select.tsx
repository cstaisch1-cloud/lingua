import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { usePostHog } from "posthog-react-native";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageCard } from "@/components/LanguageCard";
import { images } from "@/constants/images";
import { PrimaryGradientButton } from "@/components/auth/PrimaryGradientButton";
import { useLanguageStore } from "@/store/language-store";
import { languages } from "@/data/languages";
import { colors } from "@/theme/colors";
import type { LanguageCode } from "@/types/learning";

export default function LanguageSelectScreen() {
  const router = useRouter();
  const posthog = usePostHog();
  const [search, setSearch] = useState("");
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const setSelectedLanguage = useLanguageStore((state) => state.setSelectedLanguage);
  const [selectedId, setSelectedId] = useState<LanguageCode>(selectedLanguage ?? languages[0].id);

  const filteredLanguages = languages.filter((language) => {
    const query = search.trim().toLowerCase();
    return (
      language.name.toLowerCase().includes(query) ||
      language.nativeName.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1">
        <View className="flex-1 px-6">
          <View className="mt-2 flex-row items-center justify-center">
            <TouchableOpacity onPress={() => router.back()} hitSlop={12} className="absolute left-0">
              <Ionicons name="chevron-back" size={26} color={colors.ink} />
            </TouchableOpacity>
            <Text className="typo-h3">Choose a language</Text>
          </View>

          <View className="mt-5 flex-row items-center gap-2 rounded-2xl bg-surface px-4 py-3">
            <Ionicons name="search" size={18} color={colors.inkMuted} />
            <TextInput
              className="typo-body-lg flex-1 p-0"
              placeholder="Search languages"
              placeholderTextColor={colors.inkMuted}
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text className="typo-h4 mt-6 mb-3">Popular</Text>

          <FlatList
            data={filteredLanguages}
            keyExtractor={(language) => language.id}
            ItemSeparatorComponent={() => <View className="h-3" />}
            renderItem={({ item }) => (
              <LanguageCard
                language={item}
                selected={item.id === selectedId}
                onPress={() => setSelectedId(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            className="flex-1"
          />

          <View className="mt-4">
            <PrimaryGradientButton
              label="Confirm"
              onPress={() => {
                posthog.capture("language_selected", {
                  language_id: selectedId,
                  previous_language: selectedLanguage ?? null,
                });
                setSelectedLanguage(selectedId);
                router.replace("/");
              }}
            />
          </View>
        </View>

        <Image
          source={images.earth}
          style={{ width: "100%", height: 130, marginTop: 12 }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
