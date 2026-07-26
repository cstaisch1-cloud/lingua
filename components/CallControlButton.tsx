import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme/colors";

type CallControlButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  variant?: "default" | "active" | "danger";
  rotateIcon?: boolean;
};

const CIRCLE_SIZE = 56;

export function CallControlButton({
  icon,
  label,
  onPress,
  variant = "default",
  rotateIcon = false,
}: CallControlButtonProps) {
  const backgroundColor =
    variant === "danger" ? colors.error : variant === "active" ? colors.primary : colors.surface;
  const iconColor = variant === "default" ? colors.ink : "#FFFFFF";

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} className="items-center gap-2">
      <View
        className="items-center justify-center rounded-full"
        style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE, backgroundColor }}
      >
        <Ionicons name={icon} size={24} color={iconColor} style={rotateIcon ? { transform: [{ rotate: "135deg" }] } : undefined} />
      </View>
      <Text className="typo-caption">{label}</Text>
    </TouchableOpacity>
  );
}
