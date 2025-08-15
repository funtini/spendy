import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const AppInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.appInfo}>
      <Text style={styles.appVersion}>{t('profile.appVersion', { version: '1.0.0' })}</Text>
      <Text style={styles.appCopyright}>{t('profile.appCopyright')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
