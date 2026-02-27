import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

const WEEK_DATA = [
  { key: 'M', value: 62, height: 62 },
  { key: 'T', value: 45, height: 45 },
  { key: 'W', value: 78, height: 78 },
  { key: 'T', value: 35, height: 35 },
  { key: 'F', value: 90, height: 90 },
  { key: 'S', value: 55, height: 55 },
  { key: 'S', value: 40, height: 40 },
];

export const WeeklyTrend: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text, fontFamily: ff.heading }]}>
        Weekly Trend
      </Text>
      <View style={styles.chart}>
        {WEEK_DATA.map((day, i) => (
          <View key={i} style={styles.barColumn}>
            <View style={[styles.barTrack, { backgroundColor: colors.surface3 }]}>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${day.height}%` as any,
                    backgroundColor: i === 4
                      ? colors.accent
                      : `rgba(42,109,181,${0.2 + day.value / 200})`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.dayLabel, { color: colors.textTertiary, fontFamily: ff.mono }]}>
              {day.key}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textTertiary, fontFamily: ff.body }]}>
          Peak: Friday €90
        </Text>
        <Text style={[styles.footerAccent, { color: colors.accent, fontFamily: ff.bodyBold }]}>
          Avg: €63/day
        </Text>
      </View>
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
});
