import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalletScreen() {
  const colors = useThemeColors();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={[styles.header, { 
          backgroundColor: colors.card,
          borderBottomColor: colors.separator 
        }]}>
          <Text style={[styles.title, { color: colors.text }]}>{t('navigation.wallet')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Manage your accounts and cards</Text>
        </View>

        {/* Wallet Content */}
        <View style={[styles.content, { backgroundColor: colors.card }]}>
          <Text style={[styles.contentText, { color: colors.text }]}>
            Wallet functionality coming soon...
          </Text>
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
  content: {
    margin: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  contentText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
