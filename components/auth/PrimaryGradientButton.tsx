import { LinearGradient } from "expo-linear-gradient";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

type PrimaryGradientButtonProps = {
  label: string;
  onPress: () => void;
};

export function PrimaryGradientButton({ label, onPress }: PrimaryGradientButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.shadow}>
      <LinearGradient
        colors={["#5B3BF6", "#8D7CF7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text className="typo-h4 text-white">{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
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
