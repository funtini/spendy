import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

import { Colors } from "@/constants/Colors";
import { AccountPicker, ProfileButton } from "@/features/home";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].card,
          borderTopWidth: 1,
          borderTopColor: Colors[colorScheme ?? 'light'].border,
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
          backgroundColor: Colors[colorScheme ?? 'light'].card,
          height: 100,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: Colors[colorScheme ?? 'light'].text,
        },
        headerTintColor: Colors[colorScheme ?? 'light'].text,
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
        name="profile"
        options={{
          title: t('navigation.profile'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
