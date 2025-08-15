import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const HomeHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>{t('home.greeting')}</Text>
      <Text style={styles.subtitle}>{t('home.welcome')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
  },
});
