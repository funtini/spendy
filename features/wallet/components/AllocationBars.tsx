import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

const ALLOCATIONS = [
  { label: 'Investments', percent: 63, color: '#2A6DB5' },
  { label: 'Savings', percent: 25, color: '#3D8A6E' },
  { label: 'Crypto', percent: 9, color: '#D4760E' },
  { label: 'Cash', percent: 3, color: '#6B4FC8' },
];

export const AllocationBars: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text, fontFamily: ff.heading }]}>
        Allocation
      </Text>
      {ALLOCATIONS.map((alloc, i) => (
        <View key={i} style={styles.row}>
          <View style={styles.labelRow}>
            <Text style={[styles.label, { color: colors.textSecondary, fontFamily: ff.bodyMedium }]}>
              {alloc.label}
            </Text>
            <Text style={[styles.percent, { color: alloc.color, fontFamily: ff.mono }]}>
              {alloc.percent}%
            </Text>
          </View>
          <View style={[styles.track, { backgroundColor: colors.surface3 }]}>
            <View style={[styles.fill, { width: `${alloc.percent}%` as any, backgroundColor: alloc.color }]} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
  },
  title: {
    fontSize: 15,
    marginBottom: 14,
  },
  row: {
    marginBottom: 10,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
  percent: {
    fontSize: 12,
  },
  track: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
