import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

interface Transaction {
  id: string;
  name: string;
  category: string;
  type: 'Fixed' | 'Once';
  amount: number;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  date: string;
}

const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    name: "McDonald's",
    category: 'Food',
    type: 'Once',
    amount: -12.5,
    icon: 'fast-food',
    iconColor: '#E8533A',
    iconBg: '#FFF0EE',
    date: 'Today',
  },
  {
    id: '2',
    name: 'Metro Card',
    category: 'Transport',
    type: 'Fixed',
    amount: -30.0,
    icon: 'subway',
    iconColor: '#D4760E',
    iconBg: '#FFF8EE',
    date: 'Today',
  },
  {
    id: '3',
    name: 'Netflix',
    category: 'Subscriptions',
    type: 'Fixed',
    amount: -15.99,
    icon: 'play-circle',
    iconColor: '#2A6DB5',
    iconBg: '#EEF3FF',
    date: 'Yesterday',
  },
  {
    id: '4',
    name: 'Salary',
    category: 'Income',
    type: 'Fixed',
    amount: 2400,
    icon: 'briefcase',
    iconColor: '#3D8A6E',
    iconBg: '#EEFAF5',
    date: 'Feb 20',
  },
];

export const RecentTransactions: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text, fontFamily: ff.heading }]}>
          Recent
        </Text>
        <TouchableOpacity onPress={() => router.push('/transactions')}>
          <Text style={[styles.seeAll, { color: colors.accent, fontFamily: ff.bodyBold }]}>
            See all →
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {TRANSACTIONS.map((tx) => (
          <View key={tx.id} style={[styles.row, { borderBottomColor: colors.separator }]}>
            <View style={[styles.iconCircle, { backgroundColor: tx.iconBg }]}>
              <Ionicons name={tx.icon} size={18} color={tx.iconColor} />
            </View>
            <View style={styles.details}>
              <Text style={[styles.name, { color: colors.text, fontFamily: ff.bodyMedium }]}>
                {tx.name}
              </Text>
              <View style={styles.metaRow}>
                <Text style={[styles.category, { color: colors.textTertiary, fontFamily: ff.body }]}>
                  {tx.category}
                </Text>
                <View style={[
                  styles.pill,
                  {
                    backgroundColor: tx.type === 'Fixed'
                      ? 'rgba(42,109,181,0.12)'
                      : colors.surface3,
                  }
                ]}>
                  <Text style={[
                    styles.pillText,
                    {
                      color: tx.type === 'Fixed' ? '#2A6DB5' : colors.textTertiary,
                      fontFamily: ff.bodyBold,
                    }
                  ]}>
                    {tx.type}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.amountCol}>
              <Text style={[
                styles.amount,
                {
                  color: tx.amount < 0 ? colors.error : colors.secondary,
                  fontFamily: ff.mono,
                }
              ]}>
                {tx.amount < 0 ? '-' : '+'}€{Math.abs(tx.amount).toFixed(2)}
              </Text>
              <Text style={[styles.date, { color: colors.textTertiary, fontFamily: ff.body }]}>
                {tx.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
  },
  seeAll: {
    fontSize: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  category: {
    fontSize: 11,
  },
  pill: {
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  pillText: {
    fontSize: 9,
    letterSpacing: 0.2,
  },
  amountCol: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
  },
  date: {
    fontSize: 10,
    marginTop: 2,
  },
});
