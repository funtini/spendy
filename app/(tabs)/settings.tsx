import { useTheme } from '@/contexts/ThemeContext';
import { LanguageSwitcher } from '@/features/shared';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { themeMode, isDark, setThemeMode } = useTheme();
  const colors = useThemeColors();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [dataSyncEnabled, setDataSyncEnabled] = useState(true);

  const handleDarkModeToggle = async (value: boolean) => {
    const newThemeMode = value ? 'dark' : 'light';
    await setThemeMode(newThemeMode);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={[styles.header, { 
          backgroundColor: colors.card,
          borderBottomColor: colors.separator 
        }]}>
          <Text style={[styles.title, { color: colors.text }]}>{t('settings.title')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{t('settings.subtitle')}</Text>
        </View>

        {/* Notifications Section */}
        <View style={[styles.section, { 
          backgroundColor: colors.card,
          shadowColor: colors.text 
        }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.notifications')}</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={20} color={colors.primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.pushNotifications')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{t('settings.pushNotificationsDesc')}</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.separator, true: colors.primary }}
              thumbColor={colors.card}
            />
          </View>

          <View style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="mail" size={20} color={colors.success} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.emailNotifications')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{t('settings.emailNotificationsDesc')}</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.separator, true: colors.primary }}
              thumbColor={colors.card}
            />
          </View>
        </View>

        {/* Appearance Section */}
        <View style={[styles.section, { 
          backgroundColor: colors.card,
          shadowColor: colors.text 
        }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.appearance')}</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon" size={20} color={colors.secondary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.darkMode')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{t('settings.darkModeDesc')}</Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: colors.separator, true: colors.primary }}
              thumbColor={colors.card}
            />
          </View>

          <View style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="color-palette" size={20} color={colors.warning} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.accentColor')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{t('settings.accentColorDesc')}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </View>
        </View>

        {/* Security Section */}
        <View style={[styles.section, { 
          backgroundColor: colors.card,
          shadowColor: colors.text 
        }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.security')}</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="finger-print" size={20} color={colors.error} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.biometric')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{t('settings.biometricDesc')}</Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: colors.separator, true: colors.primary }}
              thumbColor={colors.card}
            />
          </View>

          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="lock-closed" size={20} color={colors.primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.changePassword')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{t('settings.changePasswordDesc')}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Data & Sync Section */}
        <View style={[styles.section, { 
          backgroundColor: colors.card,
          shadowColor: colors.text 
        }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.dataSync')}</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="cloud-upload" size={20} color={colors.success} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.autoSync')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{t('settings.autoSyncDesc')}</Text>
              </View>
            </View>
            <Switch
              value={dataSyncEnabled}
              onValueChange={setDataSyncEnabled}
              trackColor={{ false: colors.separator, true: colors.primary }}
              thumbColor={colors.card}
            />
          </View>

          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="download" size={20} color={colors.primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.exportData')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{t('settings.exportDataDesc')}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Language Section */}
        <View style={[styles.section, { 
          backgroundColor: colors.card,
          shadowColor: colors.text 
        }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.language')}</Text>
          <LanguageSwitcher />
        </View>

        {/* About Section */}
        <View style={[styles.section, { 
          backgroundColor: colors.card,
          shadowColor: colors.text 
        }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.about')}</Text>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="information-circle" size={20} color={colors.primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.version')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>Spendy v1.0.0</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="help-circle" size={20} color={colors.warning} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.help')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{t('settings.helpDesc')}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="star" size={20} color={colors.warning} />
              <View style={styles.settingText}>
                <Text style={[styles.settingName, { color: colors.text }]}>{t('settings.rateApp')}</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>{t('settings.rateAppDesc')}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>
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
  header: {
    padding: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    padding: 20,
    paddingBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
  },
});
