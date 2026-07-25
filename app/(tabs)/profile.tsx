import AsyncStorage from "@react-native-async-storage/async-storage";
import { useClerk } from "@clerk/expo";
import { Text, TouchableOpacity, View } from "react-native";

import { useLanguageStore } from "@/store/language-store";

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const setSelectedLanguage = useLanguageStore((state) => state.setSelectedLanguage);

  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    setSelectedLanguage(null);
  };

  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background px-6">
      <Text className="typo-h2">Profile</Text>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => signOut()}
        className="mt-4 rounded-full bg-primary px-6 py-3"
      >
        <Text className="typo-h4 text-white">Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleClearStorage}
        className="mt-4 rounded-full bg-error px-6 py-3"
      >
        <Text className="typo-h4 text-white">Clear Storage (Dev)</Text>
      </TouchableOpacity>
    </View>
  );
}
