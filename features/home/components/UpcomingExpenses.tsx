import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

interface UpcomingItem {
  name: string;
  date: string;
  amount: number;
}

const UPCOMING: UpcomingItem[] = [
  { name: 'Netflix', date: 'Mar 1', amount: 15.99 },
  { name: 'EDP Energy', date: 'Mar 5', amount: 64.0 },
  { name: 'Metro Card', date: 'Mar 10', amount: 30.0 },
];

const AMBER = '#D4760E';
const AMBER_L = '#FEF3E2';
const AMBER_BORDER = 'rgba(212,118,14,0.22)';
const AMBER_ROW_BORDER = 'rgba(212,118,14,0.1)';

export const UpcomingExpenses: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <View style={[styles.card, { backgroundColor: AMBER_L, borderColor: AMBER_BORDER }]}>
      {/* Close button */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => setDismissed(true)}>
        <Text style={[styles.closeBtnText, { color: AMBER }]}>✕</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: AMBER, fontFamily: ff.heading }]}>
          🗓 Upcoming next month
        </Text>
      </View>

      {/* Rows */}
      {UPCOMING.map((item, index) => (
        <View key={index} style={[styles.row, { borderBottomColor: AMBER_ROW_BORDER }]}>
          <View style={styles.rowLeft}>
            <View style={[styles.dot, { backgroundColor: AMBER }]} />
            <Text style={[styles.name, { color: colors.textSecondary, fontFamily: ff.body }]}>
              {item.name}
            </Text>
            <Text style={[styles.date, { color: colors.textTertiary, fontFamily: ff.body }]}>
              · {item.date}
            </Text>
          </View>
          <Text style={[styles.amount, { color: AMBER, fontFamily: ff.mono }]}>
            €{item.amount.toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(212,118,14,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  header: {
    marginBottom: 10,
    paddingRight: 24,
  },
  title: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  name: {
    fontSize: 12,
  },
  date: {
    fontSize: 10,
    marginLeft: 4,
  },
  amount: {
    fontSize: 12,
    fontWeight: '500',
  },
});
