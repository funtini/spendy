import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';
import { SparkLine } from '@/features/shared';
import { useSelectedAccount } from '@/contexts/AccountContext';
import { useDashboard, useMonthlyTrend } from '@/hooks/queries';

export const QuickStats: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();
  const { selectedAccountId } = useSelectedAccount();

  const { data: dashboard, isLoading: dashLoading } = useDashboard(selectedAccountId);
  const { data: trend } = useMonthlyTrend(selectedAccountId);

  const currentMonthSpending = (dashboard?.currentMonthSpending ?? 0) / 100;
  const monthlyAverage = (dashboard?.monthlyAverage ?? 0) / 100;
  const budget = 0; // Budget endpoint is optional (Step 8), defaults to 0
  const budgetUsed = budget > 0 ? Math.round((currentMonthSpending / budget) * 100) : 0;

  const sparkData = trend?.map((t) => t.amount / 100) ?? [0];

  const avgDiff = monthlyAverage > 0
    ? Math.round(((currentMonthSpending - monthlyAverage) / monthlyAverage) * 100)
    : 0;

  return (
    <View style={styles.row}>
      {/* This Month card */}
      <View style={[styles.card, {
        backgroundColor: colors.primaryCard,
        borderColor: colors.primaryCardBorder,
      }]}>
        <Text style={[styles.cardLabel, { color: colors.textTertiary, fontFamily: ff.bodyMedium }]}>
          THIS MONTH
        </Text>
        {dashLoading ? (
          <ActivityIndicator size="small" color={colors.accent} style={styles.loader} />
        ) : (
          <Text style={[styles.cardAmount, { color: colors.text, fontFamily: ff.headingBold }]}>
            €{currentMonthSpending.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </Text>
        )}
        <Text style={[styles.cardSub, { color: colors.textTertiary, fontFamily: ff.body }]}>
          {budget > 0 ? `of €${budget.toLocaleString()} budget` : 'this month'}
        </Text>

        {avgDiff !== 0 && (
          <View style={[styles.badge, {
            backgroundColor: avgDiff > 0 ? colors.error + '22' : colors.accent + '22',
          }]}>
            <Text style={[styles.badgeText, {
              color: avgDiff > 0 ? colors.error : colors.accent,
              fontFamily: ff.bodyBold,
            }]}>
              {avgDiff > 0 ? '▲' : '▼'} {avgDiff > 0 ? '+' : ''}{avgDiff}%
            </Text>
          </View>
        )}

        {budget > 0 && (
          <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, {
              width: `${Math.min(budgetUsed, 100)}%` as any,
              backgroundColor: colors.accent,
            }]} />
          </View>
        )}
      </View>

      {/* Monthly Avg card */}
      <View style={[styles.card, {
        backgroundColor: colors.secondaryCard,
        borderColor: colors.secondaryCardBorder,
      }]}>
        <Text style={[styles.cardLabel, { color: colors.textTertiary, fontFamily: ff.bodyMedium }]}>
          MONTHLY AVG
        </Text>
        {dashLoading ? (
          <ActivityIndicator size="small" color={colors.secondary} style={styles.loader} />
        ) : (
          <Text style={[styles.cardAmount, { color: colors.text, fontFamily: ff.headingBold }]}>
            €{monthlyAverage.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </Text>
        )}
        <Text style={[styles.cardSub, { color: colors.textTertiary, fontFamily: ff.body }]}>
          last 6 months
        </Text>

        {avgDiff !== 0 && (
          <View style={[styles.badge, {
            backgroundColor: colors.secondary + '22',
          }]}>
            <Text style={[styles.badgeText, { color: colors.secondary, fontFamily: ff.bodyBold }]}>
              {avgDiff < 0 ? '▼' : '▲'} {avgDiff < 0 ? '' : '+'}{-avgDiff}%
            </Text>
          </View>
        )}

        <View style={styles.sparkContainer}>
          <SparkLine data={sparkData} width={100} height={34} color={colors.secondary} gradientId="avgGradient" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 10,
  },
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
  },
  cardLabel: {
    fontSize: 10,
    letterSpacing: 0.7,
    marginBottom: 6,
  },
  cardAmount: {
    fontSize: 26,
    letterSpacing: -0.5,
    lineHeight: 30,
    marginBottom: 3,
  },
  cardSub: {
    fontSize: 11,
    marginBottom: 7,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  sparkContainer: {
    marginTop: 8,
  },
  loader: {
    height: 30,
    marginBottom: 3,
    alignSelf: 'flex-start',
  },
});
