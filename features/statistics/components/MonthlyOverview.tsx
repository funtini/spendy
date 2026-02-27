import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

export const MonthlyOverview: React.FC = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const ff = useFontFamily();

  return (
    <View style={styles.row}>
      <View style={[styles.card, {
        backgroundColor: colors.primaryCard,
        borderColor: colors.primaryCardBorder,
      }]}>
        <Text style={[styles.label, { color: colors.textTertiary, fontFamily: ff.bodyMedium }]}>
          TOTAL SPENT
        </Text>
        <Text style={[styles.value, { color: colors.text, fontFamily: ff.headingBold }]}>€1,450</Text>
        <View style={[styles.badge, { backgroundColor: colors.error + '22' }]}>
          <Text style={[styles.badgeText, { color: colors.error, fontFamily: ff.bodyBold }]}>▲ +8%</Text>
        </View>
      </View>
      <View style={[styles.card, {
        backgroundColor: colors.secondaryCard,
        borderColor: colors.secondaryCardBorder,
      }]}>
        <Text style={[styles.label, { color: colors.textTertiary, fontFamily: ff.bodyMedium }]}>
          AVG / DAY
        </Text>
        <Text style={[styles.value, { color: colors.text, fontFamily: ff.headingBold }]}>€60.4</Text>
        <View style={[styles.badge, { backgroundColor: colors.secondary + '22' }]}>
          <Text style={[styles.badgeText, { color: colors.secondary, fontFamily: ff.bodyBold }]}>▼ −5%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 10,
  },
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.7,
    marginBottom: 6,
  },
  value: {
    fontSize: 22,
    letterSpacing: -0.5,
    marginBottom: 7,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 10,
  },
});
