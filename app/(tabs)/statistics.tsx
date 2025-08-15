import {
    MonthlyOverview,
    SpendingByCategory,
    StatisticsHeader,
    WeeklyTrend
} from '@/features/statistics';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StatisticsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
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
    backgroundColor: "#F2F2F7",
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
});
