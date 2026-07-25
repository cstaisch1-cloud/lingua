import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "@/theme/colors";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  onClose: () => void;
  email: string;
  /** Verify the code with Clerk. Return an error message on failure, or null on success. */
  onVerify: (code: string) => Promise<string | null>;
};

export function VerificationModal({ visible, onClose, email, onVerify }: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setCode("");
    setError(null);
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(focusTimer);
  }, [visible]);

  const handleChangeCode = async (text: string) => {
    const digitsOnly = text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digitsOnly);
    setError(null);

    if (digitsOnly.length === CODE_LENGTH) {
      setIsVerifying(true);
      const errorMessage = await onVerify(digitsOnly);
      setIsVerifying(false);

      if (errorMessage) {
        setError(errorMessage);
        setCode("");
      } else {
        onClose();
      }
    }
  };

  const digits = Array.from({ length: CODE_LENGTH }, (_, index) => code[index] ?? "");

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
            <View className="mb-2 h-1 w-10 self-center rounded-full bg-border" />

            <Text className="typo-h3 mt-4">Check your email</Text>
            <Text className="typo-body-md mt-2 text-ink-muted">
              We sent a 6-digit code to{" "}
              <Text className="typo-body-md text-ink">{email}</Text>
            </Text>

            <View className="mt-6 flex-row justify-between">
              {digits.map((digit, index) => (
                <View
                  key={index}
                  className="h-14 w-12 items-center justify-center rounded-2xl border bg-surface"
                  style={{
                    borderColor: index === code.length ? colors.primary : colors.border,
                  }}
                >
                  <Text className="typo-h3">{digit}</Text>
                </View>
              ))}

              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleChangeCode}
                keyboardType="number-pad"
                maxLength={CODE_LENGTH}
                editable={!isVerifying}
                style={StyleSheet.absoluteFill}
                className="opacity-0"
                caretHidden
              />
            </View>

            {isVerifying && (
              <Text className="typo-body-sm mt-3 text-center text-ink-muted">Verifying…</Text>
            )}
            {error && (
              <Text className="typo-body-sm mt-3 text-center text-red-500">{error}</Text>
            )}
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(13, 19, 43, 0.5)",
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 36,
  },
});
