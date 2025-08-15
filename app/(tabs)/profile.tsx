import {
  AccountStats,
  AppInfo,
  LogoutSection,
  ProfileHeader,
  SettingsSection
} from '@/features/profile';
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <ProfileHeader />
        <AccountStats />
        <SettingsSection />
        <LogoutSection />
        <AppInfo />
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
  },
});
