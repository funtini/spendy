import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

import { AccountPicker, ProfileButton } from "@/features/home";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function TabLayout() {
  const { t } = useTranslation();
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 1,
          paddingTop: 3,
          height: 50,
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        },
        headerStyle: {
          backgroundColor: colors.card,
          height: 100,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: colors.text,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation.home'),
          headerTitleAlign: 'left',
          headerTitle: () => <AccountPicker />,
          headerTitleContainerStyle: { paddingBottom: 6 },
          headerRight: () => <ProfileButton />,
          headerRightContainerStyle: { paddingBottom: 6, paddingRight: 5 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: t('navigation.statistics'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('navigation.settings'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
