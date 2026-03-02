import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useSelectedAccount } from '@/contexts/AccountContext';
import { useTransactions } from '@/hooks/queries';
import { TransactionType } from '@shared/types';
import type { ComponentProps } from 'react';

const DEFAULT_ICON: ComponentProps<typeof Ionicons>['name'] = 'receipt-outline';

export const RecentTransactions: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();
  const router = useRouter();
  const { selectedAccountId } = useSelectedAccount();

  const { data, isLoading } = useTransactions({ accountId: selectedAccountId, limit: 5 });
  const transactions = data?.data ?? [];

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
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.accent} style={styles.loader} />
        ) : transactions.length === 0 ? (
          <Text style={[styles.empty, { color: colors.textTertiary, fontFamily: ff.body }]}>
            No transactions yet
          </Text>
        ) : (
          transactions.map((tx, index) => {
            const amountCents = tx.amount;
            const amountEuros = amountCents / 100;
            const isExpense = amountCents < 0;
            const iconName = (tx.category?.icon ?? DEFAULT_ICON) as ComponentProps<typeof Ionicons>['name'];
            const iconColor = tx.category?.color ?? colors.textSecondary;
            const iconBg = iconColor + '22';
            const date = new Date(tx.date);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const isToday = date.toDateString() === today.toDateString();
            const isYesterday = date.toDateString() === yesterday.toDateString();
            const dateLabel = isToday
              ? 'Today'
              : isYesterday
              ? 'Yesterday'
              : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

            return (
              <View
                key={tx.id}
                style={[
                  styles.row,
                  { borderBottomColor: colors.separator },
                  index === transactions.length - 1 && styles.rowLast,
                ]}
              >
                <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
                  <Ionicons name={iconName} size={18} color={iconColor} />
                </View>
                <View style={styles.details}>
                  <Text style={[styles.name, { color: colors.text, fontFamily: ff.bodyMedium }]}>
                    {tx.description}
                  </Text>
                  <View style={styles.metaRow}>
                    <Text style={[styles.category, { color: colors.textTertiary, fontFamily: ff.body }]}>
                      {tx.category?.name ?? 'Other'}
                    </Text>
                    {tx.type === TransactionType.RECURRING ? (
                      <View style={[styles.pill, { backgroundColor: 'rgba(42,109,181,0.12)' }]}>
                        <Text style={[styles.pillText, { color: '#2A6DB5', fontFamily: ff.bodyBold }]}>
                          Fixed
                        </Text>
                      </View>
                    ) : tx.addedByAlias ? (
                      <View style={[styles.pill, { backgroundColor: colors.surface3 }]}>
                        <Text style={[styles.pillText, { color: colors.textTertiary, fontFamily: ff.bodyBold }]}>
                          {tx.addedByAlias}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
                <View style={styles.amountCol}>
                  <Text style={[
                    styles.amount,
                    {
                      color: isExpense ? colors.error : colors.secondary,
                      fontFamily: ff.mono,
                    }
                  ]}>
                    {isExpense ? '-' : '+'}€{Math.abs(amountEuros).toFixed(2)}
                  </Text>
                  <Text style={[styles.date, { color: colors.textTertiary, fontFamily: ff.body }]}>
                    {dateLabel}
                  </Text>
                </View>
              </View>
            );
          })
        )}
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
  rowLast: {
    borderBottomWidth: 0,
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
  loader: {
    marginVertical: 20,
  },
  empty: {
    textAlign: 'center',
    fontSize: 13,
    paddingVertical: 20,
  },
});
