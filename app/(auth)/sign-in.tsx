import { useSignIn, useSSO } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
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

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isSubmitting = fetchStatus === "fetching";

  const handleSignIn = async () => {
    if (!email) {
      return;
    }

    const { error } = await signIn.emailCode.sendCode({ emailAddress: email });
    if (error) {
      Alert.alert("Couldn't log in", error.longMessage ?? error.message);
      return;
    }

    setIsVerifying(true);
  };

  const handleVerifyCode = async (code: string) => {
    const { error } = await signIn.emailCode.verifyCode({ code });
    if (error) {
      return error.longMessage ?? error.message;
    }

    if (signIn.status === "complete") {
      await signIn.finalize();
      router.replace("/");
    }

    return null;
  };

  const handleGoogleSignIn = async () => {
    if (isGoogleLoading) {
      return;
    }

    setIsGoogleLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error("Google sign-in error:", JSON.stringify(err, null, 2));
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

            <Text className="typo-h1 mt-4">Welcome back</Text>
            <Text className="typo-body-md mt-2 text-ink-muted">
              Continue your language journey ✨
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
            </View>

            <View className="mt-5">
              <PrimaryGradientButton
                label={isSubmitting ? "Logging in..." : "Log In"}
                onPress={handleSignIn}
              />
            </View>

            <View className="mt-5">
              <SocialAuthButtons
                onGooglePress={handleGoogleSignIn}
                isGoogleLoading={isGoogleLoading}
              />
            </View>

            <View className="mt-auto flex-row items-center justify-center gap-1 pt-6">
              <Text className="typo-body-md text-ink-muted">Don&apos;t have an account?</Text>
              <Link href="/sign-up" asChild>
                <TouchableOpacity>
                  <Text className="typo-body-md text-primary">Sign up</Text>
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
