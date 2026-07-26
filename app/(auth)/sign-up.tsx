import { useSignUp, useSSO } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { usePostHog } from "posthog-react-native";
import {
  Alert,
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
  const { signUp, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();
  const posthog = usePostHog();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isSubmitting = fetchStatus === "fetching";

  const handleSignUp = async () => {
    if (!email || !password) {
      return;
    }

    const { error } = await signUp.password({ emailAddress: email, password });
    if (error) {
      Alert.alert("Couldn't sign up", error.longMessage ?? error.message);
      return;
    }

    await signUp.verifications.sendEmailCode();
    setIsVerifying(true);
  };

  const handleVerifyCode = async (code: string) => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      return error.longMessage ?? error.message;
    }

    if (signUp.status === "complete") {
      const userId = signUp.createdUserId ?? email;
      posthog.identify(userId, {
        $set: { email },
        $set_once: { first_signup_date: new Date().toISOString() },
      });
      posthog.capture("user_signed_up", { method: "email_password" });
      await signUp.finalize();
      router.replace("/");
    }

    return null;
  };

  const handleGoogleSignUp = async () => {
    if (isGoogleLoading) {
      return;
    }

    setIsGoogleLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        posthog.capture("user_signed_up", { method: "google_sso" });
        router.replace("/");
      }
    } catch (err) {
      console.error("Google sign-up error:", JSON.stringify(err, null, 2));
    } finally {
      setIsGoogleLoading(false);
    }
  };

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
              <PrimaryGradientButton
                label={isSubmitting ? "Signing up..." : "Sign Up"}
                onPress={handleSignUp}
              />
            </View>

            <View className="mt-5">
              <SocialAuthButtons
                onGooglePress={handleGoogleSignUp}
                isGoogleLoading={isGoogleLoading}
              />
            </View>

            <View nativeID="clerk-captcha" />

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
        onVerify={handleVerifyCode}
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
