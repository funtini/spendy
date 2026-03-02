import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useSelectedAccount } from '@/contexts/AccountContext';
import { useStatistics } from '@/hooks/queries';

export const SpendingByCategory: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();
  const { selectedAccountId } = useSelectedAccount();
  const { data, isLoading } = useStatistics(selectedAccountId);

  const categories = data?.spendingByCategory ?? [];

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text, fontFamily: ff.heading }]}>
        Breakdown
      </Text>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.accent} style={styles.loader} />
      ) : categories.length === 0 ? (
        <Text style={[styles.empty, { color: colors.textTertiary, fontFamily: ff.body }]}>
          No spending data this month
        </Text>
      ) : (
        categories.map((cat, i) => (
          <View key={cat.categoryId} style={[styles.row, { borderBottomColor: colors.separator }]}>
            <View style={[styles.dot, { backgroundColor: cat.color, borderRadius: 3 }]} />
            <Text style={[styles.name, { color: colors.text, fontFamily: ff.bodyMedium }]}>
              {cat.name}
            </Text>
            <View style={[styles.barTrack, { backgroundColor: colors.surface3 }]}>
              <View style={[styles.barFill, { width: `${cat.percentage}%` as any, backgroundColor: cat.color }]} />
            </View>
            <Text style={[styles.percent, { color: colors.textTertiary, fontFamily: ff.mono }]}>
              {cat.percentage}%
            </Text>
            <Text style={[styles.amount, { color: colors.text, fontFamily: ff.mono }]}>
              €{(cat.amount / 100).toFixed(0)}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    paddingBottom: 4,
    borderWidth: 1.5,
  },
  title: {
    fontSize: 15,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
  },
  dot: {
    width: 9,
    height: 9,
  },
  name: {
    flex: 1,
    fontSize: 13,
  },
  barTrack: {
    width: 70,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  percent: {
    width: 30,
    fontSize: 10,
    textAlign: 'right',
  },
  amount: {
    width: 48,
    fontSize: 12,
    textAlign: 'right',
  },
  loader: {
    marginVertical: 20,
  },
  empty: {
    textAlign: 'center',
    fontSize: 13,
    paddingVertical: 16,
  },
});
