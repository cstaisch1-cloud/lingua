import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme/colors";

export type LessonStatus = "completed" | "in-progress" | "locked";

type LessonListItemProps = {
  order: number;
  title: string;
  status: LessonStatus;
  activityCount: number;
  onPress: () => void;
};

export function LessonListItem({ order, title, status, activityCount, onPress }: LessonListItemProps) {
  const isInProgress = status === "in-progress";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="flex-row items-center justify-between rounded-2xl border px-4 py-4"
      style={{
        borderColor: isInProgress ? colors.primary : colors.border,
        backgroundColor: isInProgress ? `${colors.primary}0D` : colors.background,
      }}
    >
      <View className="flex-1 gap-1 pr-3">
        <Text className="typo-caption" style={isInProgress ? { color: colors.primary } : undefined}>
          Lesson {order}
        </Text>
        <Text className="typo-h4" style={isInProgress ? { color: colors.primary } : undefined}>
          {title}
        </Text>

        {status === "in-progress" ? (
          <Text className="typo-body-sm" style={{ color: colors.primary }}>
            In progress
          </Text>
        ) : null}
        {status === "locked" ? <Text className="typo-body-sm">0/{activityCount} lessons</Text> : null}
      </View>

      {status === "completed" ? (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-success">
          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
        </View>
      ) : null}
      {status === "in-progress" ? (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
          <Ionicons name="flag" size={16} color="#FFFFFF" />
        </View>
      ) : null}
      {status === "locked" ? <Ionicons name="lock-closed" size={20} color={colors.inkMuted} /> : null}
    </TouchableOpacity>
  );
}
