import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthTextInput } from "@/components/auth/AuthTextInput";
import { PrimaryGradientButton } from "@/components/auth/PrimaryGradientButton";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { VerificationModal } from "@/components/auth/VerificationModal";
import { images } from "@/constants/images";
import { colors } from "@/theme/colors";

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pb-6">
            <TouchableOpacity onPress={() => router.back()} hitSlop={12} className="mt-2">
              <Ionicons name="chevron-back" size={26} color={colors.ink} />
            </TouchableOpacity>

            <Text className="typo-h1 mt-4">Create your account</Text>
            <Text className="typo-body-md mt-2 text-ink-muted">
              Start your language journey today ✨
            </Text>

            <View className="items-center justify-center py-2">
              <Image source={images.mascotAuth} style={styles.mascot} resizeMode="contain" />
            </View>

            <View className="gap-3">
              <AuthTextInput
                label="Email"
                placeholder="alex@gmail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
              />
              <AuthTextInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                isPassword
                textContentType="newPassword"
                autoComplete="password-new"
              />
            </View>

            <View className="mt-5">
              <PrimaryGradientButton label="Sign Up" onPress={() => setIsVerifying(true)} />
            </View>

            <View className="mt-5">
              <SocialAuthButtons />
            </View>

            <View className="mt-auto flex-row items-center justify-center gap-1 pt-6">
              <Text className="typo-body-md text-ink-muted">Already have an account?</Text>
              <Link href="/sign-in" asChild>
                <TouchableOpacity>
                  <Text className="typo-body-md text-primary">Log in</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={isVerifying}
        onClose={() => setIsVerifying(false)}
        email={email || "your email"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mascot: {
    width: 170,
    height: 140,
  },
});
