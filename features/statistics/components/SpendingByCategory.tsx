import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

const CATEGORIES = [
  { name: '🍔 Food', amount: '€464', percent: 32, color: '#E8533A' },
  { name: '🏠 Housing', amount: '€362', percent: 25, color: '#2A6DB5' },
  { name: '🚗 Transport', amount: '€217', percent: 15, color: '#D4760E' },
  { name: '📺 Subs', amount: '€174', percent: 12, color: '#6B4FC8' },
  { name: '🛍 Shopping', amount: '€145', percent: 10, color: '#C44F9A' },
  { name: '⚡ Other', amount: '€87', percent: 6, color: '#3D8A6E' },
];

export const SpendingByCategory: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text, fontFamily: ff.heading }]}>
        Breakdown
      </Text>
      {CATEGORIES.map((cat, i) => (
        <View key={i} style={[styles.row, { borderBottomColor: colors.separator }]}>
          <View style={[styles.dot, { backgroundColor: cat.color, borderRadius: 3 }]} />
          <Text style={[styles.name, { color: colors.text, fontFamily: ff.bodyMedium }]}>
            {cat.name}
          </Text>
          <View style={[styles.barTrack, { backgroundColor: colors.surface3 }]}>
            <View style={[styles.barFill, { width: `${cat.percent}%` as any, backgroundColor: cat.color }]} />
          </View>
          <Text style={[styles.percent, { color: colors.textTertiary, fontFamily: ff.mono }]}>
            {cat.percent}%
          </Text>
          <Text style={[styles.amount, { color: colors.text, fontFamily: ff.mono }]}>
            {cat.amount}
          </Text>
        </View>
      ))}
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
});
