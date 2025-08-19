import {
  QuickActions,
  QuickStats,
  RecentTransactions
} from '@/features/home';
import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const colors = useThemeColors();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <QuickStats />
      <RecentTransactions />
      <QuickActions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
