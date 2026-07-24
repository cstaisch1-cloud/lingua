import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme/colors";

type AuthTextInputProps = TextInputProps & {
  label: string;
  isPassword?: boolean;
};

export function AuthTextInput({ label, isPassword, ...inputProps }: AuthTextInputProps) {
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View className="flex-row items-center rounded-2xl border border-border bg-white px-4 py-2.5">
      <View className="flex-1">
        <Text className="typo-caption">{label}</Text>
        <TextInput
          className="typo-body-lg p-0"
          placeholderTextColor={colors.inkMuted}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={isSecure}
          {...inputProps}
        />
      </View>

      {isPassword && (
        <TouchableOpacity onPress={() => setIsSecure((prev) => !prev)} hitSlop={8}>
          <Ionicons
            name={isSecure ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={colors.inkMuted}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
