import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useSelectedAccount } from '@/contexts/AccountContext';
import { useStatistics } from '@/hooks/queries';

const DAY_SHORT: Record<string, string> = {
  Monday: 'M',
  Tuesday: 'T',
  Wednesday: 'W',
  Thursday: 'T',
  Friday: 'F',
  Saturday: 'S',
  Sunday: 'S',
};

export const WeeklyTrend: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();
  const { selectedAccountId } = useSelectedAccount();
  const { data, isLoading } = useStatistics(selectedAccountId);

  const weeklyTrend = data?.weeklyTrend ?? [];
  const maxAmount = Math.max(...weeklyTrend.map((d) => d.amount), 1);
  const peakDay = weeklyTrend.reduce((prev, curr) => (curr.amount > prev.amount ? curr : prev), weeklyTrend[0]);
  const avgAmount = weeklyTrend.length > 0
    ? weeklyTrend.reduce((sum, d) => sum + d.amount, 0) / weeklyTrend.length
    : 0;

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text, fontFamily: ff.heading }]}>
        Weekly Trend
      </Text>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.accent} style={styles.loader} />
      ) : (
        <>
          <View style={styles.chart}>
            {weeklyTrend.map((day, i) => {
              const heightPct = maxAmount > 0 ? (day.amount / maxAmount) * 100 : 0;
              const isPeak = day.amount === maxAmount && maxAmount > 0;
              return (
                <View key={i} style={styles.barColumn}>
                  <View style={[styles.barTrack, { backgroundColor: colors.surface3 }]}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${heightPct}%` as any,
                          backgroundColor: isPeak
                            ? colors.accent
                            : `rgba(42,109,181,${0.2 + heightPct / 200})`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.dayLabel, { color: colors.textTertiary, fontFamily: ff.mono }]}>
                    {DAY_SHORT[day.day] ?? day.day[0]}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textTertiary, fontFamily: ff.body }]}>
              {peakDay ? `Peak: ${peakDay.day} €${(peakDay.amount / 100).toFixed(0)}` : 'No data'}
            </Text>
            <Text style={[styles.footerAccent, { color: colors.accent, fontFamily: ff.bodyBold }]}>
              Avg: €{(avgAmount / 100).toFixed(0)}/day
            </Text>
          </View>
        </>
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
  title: {
    fontSize: 15,
    marginBottom: 14,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 72,
    gap: 5,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTrack: {
    width: '100%',
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  dayLabel: {
    fontSize: 9,
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerText: {
    fontSize: 11,
  },
  footerAccent: {
    fontSize: 11,
  },
  loader: {
    height: 82,
  },
});
