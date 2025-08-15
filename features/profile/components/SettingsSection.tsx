import { LanguageSwitcher } from '@/features/shared';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const SettingsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
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
            {t('profile.languageDesc', { language: t('languages.pt') })}
          </Text>
        </View>
        <LanguageSwitcher compact />
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
  );
};

const styles = StyleSheet.create({
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
});
