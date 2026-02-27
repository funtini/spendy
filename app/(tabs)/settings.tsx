import { useTheme } from '@/contexts/ThemeContext';
import { LanguageSwitcher } from '@/features/shared';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { isDark, setThemeMode } = useTheme();
  const colors = useThemeColors();
  const ff = useFontFamily();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [dataSyncEnabled, setDataSyncEnabled] = useState(true);

  const handleDarkModeToggle = async (value: boolean) => {
    await setThemeMode(value ? 'dark' : 'light');
  };

  const SectionLabel = ({ label }: { label: string }) => (
    <Text style={[styles.sectionLabel, { color: colors.textTertiary, fontFamily: ff.bodyBold }]}>
      {label.toUpperCase()}
    </Text>
  );

  const SettingRow = ({
    icon,
    iconColor,
    label,
    description,
    right,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    label: string;
    description?: string;
    right: React.ReactNode;
  }) => (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <View style={[styles.iconWrap, { backgroundColor: iconColor + '20' }]}>
        <Ionicons name={icon} size={16} color={iconColor} />
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, { color: colors.text, fontFamily: ff.bodyMedium }]}>
          {label}
        </Text>
        {description && (
          <Text style={[styles.rowDesc, { color: colors.textTertiary, fontFamily: ff.body }]}>
            {description}
          </Text>
        )}
      </View>
      {right}
    </View>
  );

  const trackColor = { false: colors.surface3, true: colors.accent };
  const thumbColor = colors.surface;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Profile Hero */}
        <View style={[styles.heroCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.avatarCircle, { backgroundColor: colors.accent }]}>
            <Text style={[styles.avatarText, { fontFamily: ff.headingBold }]}>J</Text>
          </View>
          <View style={styles.heroInfo}>
            <Text style={[styles.heroName, { color: colors.text, fontFamily: ff.headingBold }]}>
              João Silva
            </Text>
            <Text style={[styles.heroEmail, { color: colors.textTertiary, fontFamily: ff.body }]}>
              joao.silva@email.com
            </Text>
            <View style={[styles.proBadge, { backgroundColor: colors.accent + '22' }]}>
              <Text style={[styles.proBadgeText, { color: colors.accent, fontFamily: ff.bodyBold }]}>
                ✦ Pro Plan
              </Text>
            </View>
          </View>
        </View>

        {/* Notifications */}
        <SectionLabel label="Preferences" />
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <SettingRow icon="notifications" iconColor={colors.secondary} label="Push Notifications"
            right={<Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={trackColor} thumbColor={thumbColor} />}
          />
          <SettingRow icon="moon" iconColor={colors.info} label="Dark Mode"
            right={<Switch value={isDark} onValueChange={handleDarkModeToggle} trackColor={trackColor} thumbColor={thumbColor} />}
          />
          <SettingRow icon="finger-print" iconColor={colors.error} label="Biometric Auth"
            right={<Switch value={biometricEnabled} onValueChange={setBiometricEnabled} trackColor={trackColor} thumbColor={thumbColor} />}
          />
        </View>

        <SectionLabel label="App" />
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            { icon: 'globe-outline' as const, label: 'Language', val: 'English', color: colors.info },
            { icon: 'cash-outline' as const, label: 'Currency', val: 'EUR €', color: colors.secondary },
            { icon: 'calendar-outline' as const, label: 'Start of Month', val: '1st', color: colors.warning },
          ].map((item, i) => (
            <TouchableOpacity key={i}>
              <SettingRow icon={item.icon} iconColor={item.color} label={item.label}
                right={
                  <View style={styles.valueRow}>
                    <Text style={[styles.rowVal, { color: colors.textTertiary, fontFamily: ff.body }]}>{item.val}</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
                  </View>
                }
              />
            </TouchableOpacity>
          ))}
        </View>

        <SectionLabel label="Account Sharing" />
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            { icon: 'people-outline' as const, label: 'Shared Accounts', val: '1 active', color: colors.secondary },
            { icon: 'mail-outline' as const, label: 'Invite Member', val: '', color: colors.accent },
            { icon: 'link-outline' as const, label: 'Linked Services', val: '2', color: colors.info },
          ].map((item, i) => (
            <TouchableOpacity key={i}>
              <SettingRow icon={item.icon} iconColor={item.color} label={item.label}
                right={
                  <View style={styles.valueRow}>
                    {item.val ? <Text style={[styles.rowVal, { color: colors.textTertiary, fontFamily: ff.body }]}>{item.val}</Text> : null}
                    <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
                  </View>
                }
              />
            </TouchableOpacity>
          ))}
        </View>

        <SectionLabel label="Support" />
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            { icon: 'chatbubble-outline' as const, label: 'Help & Support', val: '', color: colors.info },
            { icon: 'star-outline' as const, label: 'Rate Spendy', val: '', color: colors.warning },
            { icon: 'document-text-outline' as const, label: 'Privacy Policy', val: '', color: colors.textTertiary },
            { icon: 'information-circle-outline' as const, label: 'About App', val: 'v1.0.0', color: colors.textTertiary },
          ].map((item, i) => (
            <TouchableOpacity key={i}>
              <SettingRow icon={item.icon} iconColor={item.color} label={item.label}
                right={
                  <View style={styles.valueRow}>
                    {item.val ? <Text style={[styles.rowVal, { color: colors.textTertiary, fontFamily: ff.body }]}>{item.val}</Text> : null}
                    <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
                  </View>
                }
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={[styles.signOut, { color: colors.accent, fontFamily: ff.bodyBold }]}>Sign Out</Text>
          </TouchableOpacity>
          <Text style={[styles.footerNote, { color: colors.textTertiary, fontFamily: ff.body }]}>
            SPENDY v1.0.0 · Made with ♥
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  content: { paddingBottom: 100, paddingTop: 16 },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 14,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 22, color: '#fff' },
  heroInfo: { flex: 1 },
  heroName: { fontSize: 18, marginBottom: 2 },
  heroEmail: { fontSize: 12, marginBottom: 6 },
  proBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  proBadgeText: { fontSize: 10 },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 1,
    marginHorizontal: 20,
    marginBottom: 6,
    marginTop: 18,
  },
  section: {
    marginHorizontal: 20,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
    gap: 12,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowText: { flex: 1 },
  rowLabel: { fontSize: 14 },
  rowDesc: { fontSize: 11, marginTop: 1 },
  valueRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowVal: { fontSize: 12 },
  footer: { alignItems: 'center', paddingTop: 10, paddingBottom: 4 },
  signOut: { fontSize: 13, marginBottom: 8 },
  footerNote: { fontSize: 10 },
});
