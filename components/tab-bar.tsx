import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme/colors";

type IconPair = {
  active: keyof typeof Ionicons.glyphMap;
  inactive: keyof typeof Ionicons.glyphMap;
};

const TAB_ICONS: Record<string, IconPair> = {
  home: { active: "home", inactive: "home-outline" },
  learn: { active: "book", inactive: "book-outline" },
  "ai-teacher": { active: "chatbubble-ellipses", inactive: "chatbubble-ellipses-outline" },
  chat: { active: "chatbubble", inactive: "chatbubble-outline" },
  profile: { active: "person", inactive: "person-outline" },
};

const CIRCLE_SIZE = 48;
const BAR_HEIGHT = 56;

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const tabWidth = barWidth / state.routes.length;

  const indicatorX = useSharedValue(0);

  useEffect(() => {
    if (tabWidth > 0) {
      indicatorX.value = withSpring(state.index * tabWidth, {
        damping: 16,
        stiffness: 160,
      });
    }
  }, [state.index, tabWidth, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setBarWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      className="border-t border-border bg-background"
      style={{ paddingBottom: insets.bottom || 12 }}
    >
      <View style={{ height: BAR_HEIGHT }} className="flex-row" onLayout={handleLayout}>
        {tabWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            className="absolute items-center justify-center rounded-full bg-primary"
            style={[
              {
                top: (BAR_HEIGHT - CIRCLE_SIZE) / 2,
                left: (tabWidth - CIRCLE_SIZE) / 2,
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
              },
              indicatorStyle,
            ]}
          />
        )}

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;
          const icons = TAB_ICONS[route.name];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="flex-1 items-center justify-center"
            >
              <Ionicons
                name={isFocused ? icons.active : icons.inactive}
                size={22}
                color={isFocused ? "#FFFFFF" : colors.inkMuted}
              />
              {!isFocused && <Text className="typo-caption mt-1">{label}</Text>}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
