import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

interface BarData {
  label: string;
  value: number;
  isCurrent?: boolean;
  isHigh?: boolean;
}

const MONTHLY_DATA: BarData[] = [
  { label: 'Sep', value: 65 },
  { label: 'Oct', value: 76 },
  { label: 'Nov', value: 52 },
  { label: 'Dec', value: 100, isHigh: true },
  { label: 'Jan', value: 70 },
  { label: 'Feb', value: 57, isCurrent: true },
];

const CHART_HEIGHT = 96;

export const BarChart: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();

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
      <View style={[styles.chart, { height: CHART_HEIGHT + 24 }]}>
        {MONTHLY_DATA.map((item, index) => {
          const barH = (item.value / 100) * CHART_HEIGHT;
          const barColor = item.isCurrent
            ? colors.accent
            : item.isHigh
            ? colors.warning
            : colors.surface3;
          return (
            <View key={index} style={styles.barGroup}>
              <Text style={[styles.valueLabel, {
                color: item.isCurrent ? colors.accent : 'transparent',
                fontFamily: ff.mono,
              }]}>
                {item.isCurrent ? '€1.5k' : '.'}
              </Text>
              <View style={[styles.barTrack, { height: CHART_HEIGHT, backgroundColor: colors.surface2 }]}>
                <View style={[styles.bar, { height: barH, backgroundColor: barColor }]} />
              </View>
              <Text style={[styles.barLabel, { color: item.isCurrent ? colors.accent : colors.textTertiary, fontFamily: ff.mono }]}>
                {item.label}
              </Text>
            </View>
          );
        })}
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
});
