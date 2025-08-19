import {
	MonthlyOverview,
	SpendingByCategory,
	StatisticsHeader,
	WeeklyTrend
} from '@/features/statistics';
import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StatisticsScreen() {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <StatisticsHeader />
        <MonthlyOverview />
        <SpendingByCategory />
        <WeeklyTrend />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
});
