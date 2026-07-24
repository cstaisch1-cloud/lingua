import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background px-6">
      <Text className="typo-h1">lingua</Text>
      <Text className="typo-body-md text-center">
        Design system wired up — Poppins + Lingua tokens.
      </Text>
    </View>
  );
}
