import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme/colors";
import type { Language } from "@/types/learning";

type LanguageCardProps = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

export function LanguageCard({ language, selected, onPress }: LanguageCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="flex-row items-center gap-3 rounded-2xl border px-4 py-3"
      style={{
        borderColor: selected ? colors.primary : colors.border,
        backgroundColor: selected ? `${colors.primary}0D` : colors.background,
      }}
    >
      <View
        className="h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: `${language.color}26` }}
      >
        <Text className="text-2xl">{language.flagEmoji}</Text>
      </View>

      <View className="flex-1">
        <Text className="typo-h4">{language.name}</Text>
        <Text className="typo-body-sm">{language.nativeName}</Text>
      </View>

      {selected ? (
        <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
          <Ionicons name="checkmark" size={16} color="#ffffff" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color={colors.inkMuted} />
      )}
    </TouchableOpacity>
  );
}
