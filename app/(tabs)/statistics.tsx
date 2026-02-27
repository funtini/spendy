import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  BarChart,
  DonutChart,
  PeriodTabs,
  SpendingByCategory,
  StatisticsHeader,
  WeeklyTrend,
} from '@/features/statistics';
import { useThemeColors } from '@/hooks/useThemeColors';

type Period = 'Weekly' | 'Monthly' | 'Yearly';

export default function StatisticsScreen() {
  const colors = useThemeColors();
  const [period, setPeriod] = useState<Period>('Monthly');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <StatisticsHeader />
        <PeriodTabs selected={period} onSelect={setPeriod} />
        <BarChart />
        <DonutChart />
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
  },
  content: {
    paddingBottom: 100,
  },
});
