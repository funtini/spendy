import {
  GreetingSection,
  HomeTopbar,
  QuickStats,
  RecentTransactions,
  UpcomingExpenses,
} from '@/features/home';
import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <HomeTopbar />
      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <GreetingSection />
        <QuickStats />
        <UpcomingExpenses />
        <RecentTransactions />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
});
