import { useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#FFFFFF" />
            </View>
            <TouchableOpacity style={styles.editAvatar}>
              <Ionicons name="camera" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <Text style={styles.memberSince}>{t('profile.memberSince', { date: 'January 2024' })}</Text>
        </View>

        {/* Account Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.accountOverview')}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>{t('profile.transactions')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>{t('profile.categories')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>{t('profile.months')}</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Ionicons name="notifications" size={20} color="#007AFF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>{t('profile.notifications')}</Text>
              <Text style={styles.settingDescription}>{t('profile.notificationsDesc')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Ionicons name="shield-checkmark" size={20} color="#34C759" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>{t('profile.privacySecurity')}</Text>
              <Text style={styles.settingDescription}>{t('profile.privacySecurityDesc')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Ionicons name="color-palette" size={20} color="#AF52DE" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>{t('profile.appearance')}</Text>
              <Text style={styles.settingDescription}>{t('profile.appearanceDesc')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          {/* Language Selector */}
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Ionicons name="language" size={20} color="#FF9500" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>{t('profile.language')}</Text>
              <Text style={styles.settingDescription}>
                {t('profile.languageDesc', { language: t(`languages.${currentLanguage}`) })}
              </Text>
            </View>
            <View style={styles.languageSelector}>
              {availableLanguages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    currentLanguage === lang.code && styles.languageOptionActive
                  ]}
                  onPress={() => handleLanguageChange(lang.code)}
                >
                  <Text style={[
                    styles.languageOptionText,
                    currentLanguage === lang.code && styles.languageOptionTextActive
                  ]}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Ionicons name="help-circle" size={20} color="#007AFF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>{t('profile.helpSupport')}</Text>
              <Text style={styles.settingDescription}>{t('profile.helpSupportDesc')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Ionicons name="star" size={20} color="#FF9500" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>{t('profile.rateApp')}</Text>
              <Text style={styles.settingDescription}>{t('profile.rateAppDesc')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out" size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>{t('profile.signOut')}</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>{t('profile.appVersion', { version: '1.0.0' })}</Text>
          <Text style={styles.appCopyright}>{t('profile.appCopyright')}</Text>
        </View>
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
  profileHeader: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 14,
    color: "#C7C7CC",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    marginInline: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 15,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  settingInfo: {
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: "#8E8E93",
  },
  languageSelector: {
    flexDirection: "row",
    gap: 8,
  },
  languageOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "transparent",
  },
  languageOptionActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  languageOptionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#8E8E93",
  },
  languageOptionTextActive: {
    color: "#FFFFFF",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FF3B30",
    margin: 20,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 10,
  },
  appInfo: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  appVersion: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 5,
  },
  appCopyright: {
    fontSize: 12,
    color: "#C7C7CC",
  },
});
