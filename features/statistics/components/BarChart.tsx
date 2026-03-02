import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useSelectedAccount } from '@/contexts/AccountContext';
import { useMonthlyTrend } from '@/hooks/queries';

const CHART_HEIGHT = 96;

export const BarChart: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();
  const { selectedAccountId } = useSelectedAccount();
  const { data: trend, isLoading } = useMonthlyTrend(selectedAccountId);

  const now = new Date();

  const chartData = trend ?? [];
  const maxAmount = Math.max(...chartData.map((d) => d.amount), 1);

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.title, { color: colors.text, fontFamily: ff.heading }]}>
          Spending History
        </Text>
        <Text style={[styles.subtitle, { color: colors.textTertiary, fontFamily: ff.body }]}>
          6 months
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.accent} style={styles.loader} />
      ) : (
        <View style={[styles.chart, { height: CHART_HEIGHT + 24 }]}>
          {chartData.map((item, index) => {
            const barH = (item.amount / maxAmount) * CHART_HEIGHT;
            const isCurrent = item.year === now.getFullYear() && item.month === now.toLocaleString('en', { month: 'short' });
            const isHigh = item.amount === maxAmount && maxAmount > 0;
            const barColor = isCurrent
              ? colors.accent
              : isHigh
              ? colors.warning
              : colors.surface3;
            const amountK = item.amount >= 100000
              ? `€${(item.amount / 100000).toFixed(1)}k`
              : `€${(item.amount / 100).toFixed(0)}`;
            return (
              <View key={index} style={styles.barGroup}>
                <Text style={[styles.valueLabel, {
                  color: isCurrent ? colors.accent : 'transparent',
                  fontFamily: ff.mono,
                }]}>
                  {isCurrent ? amountK : '.'}
                </Text>
                <View style={[styles.barTrack, { height: CHART_HEIGHT, backgroundColor: colors.surface2 }]}>
                  <View style={[styles.bar, { height: barH, backgroundColor: barColor }]} />
                </View>
                <Text style={[styles.barLabel, { color: isCurrent ? colors.accent : colors.textTertiary, fontFamily: ff.mono }]}>
                  {item.month}
                </Text>
              </View>
            );
          })}
        </View>
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
    borderWidth: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 11,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
    paddingHorizontal: 2,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
  },
  valueLabel: {
    fontSize: 9,
    marginBottom: 2,
    height: 12,
  },
  barTrack: {
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 6,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 9,
    marginTop: 4,
  },
  loader: {
    height: CHART_HEIGHT + 24,
  },
});
