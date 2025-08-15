import {
  HomeHeader,
  QuickActions,
  QuickStats,
  RecentTransactions
} from '@/features/home';
import React from 'react';
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <HomeHeader />
      <QuickStats />
      <RecentTransactions />
      <QuickActions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
});
