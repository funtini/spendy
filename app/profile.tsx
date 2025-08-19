import {
    AccountStats,
    AppInfo,
    LogoutSection,
    ProfileHeader,
    SettingsSection
} from '@/features/profile';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const colors = useThemeColors();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header with back button */}
      <View style={[styles.header, { 
        backgroundColor: colors.card,
        borderBottomColor: colors.separator 
      }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
});
