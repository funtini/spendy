import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { AddExpenseBottomSheet } from "@/features/add-expense";
import { AccountPicker, ProfileButton } from "@/features/home";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function TabLayout() {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const AddExpenseButton = () => (
    <TouchableOpacity 
      style={[styles.addButton, { backgroundColor: colors.primary }]}
      onPress={() => setIsModalVisible(true)}
    >
      <Ionicons name="add" size={28} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
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
            height: 60,
            paddingHorizontal: 5,
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
            tabBarItemStyle: {
              marginRight: 25, 
            },
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: t('navigation.wallet'),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet" size={size} color={color} />
            ),
            tabBarItemStyle: {
              marginLeft: 25,
            },
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
      
      {/* Add Expense Button Overlay */}
      <AddExpenseButton />

      {/* Add Expense Bottom Sheet */}
      <AddExpenseBottomSheet 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
});
