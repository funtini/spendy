import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';
import { SparkLine } from '@/features/shared';

const MONTHLY_DATA = [980, 1100, 1050, 1380, 1200, 1320, 1250];
const BUDGET = 2000;

export const QuickStats: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();

  const currentMonthSpending = 1450;
  const monthlyAverage = 1738;
  const budgetUsed = Math.round((currentMonthSpending / BUDGET) * 100);
  const isOverAvg = currentMonthSpending > monthlyAverage;

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
        <Text style={[styles.cardAmount, { color: colors.text, fontFamily: ff.headingBold }]}>
          €1,450
        </Text>
        <Text style={[styles.cardSub, { color: colors.textTertiary, fontFamily: ff.body }]}>
          of €{BUDGET.toLocaleString()} budget
        </Text>

        <View style={[styles.badge, {
          backgroundColor: colors.error + '22',
        }]}>
          <Text style={[styles.badgeText, { color: colors.error, fontFamily: ff.bodyBold }]}>
            ▲ +8%
          </Text>
        </View>

        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
          <View style={[styles.progressFill, {
            width: `${Math.min(budgetUsed, 100)}%` as any,
            backgroundColor: colors.accent,
          }]} />
        </View>
      </View>

      {/* Monthly Avg card */}
      <View style={[styles.card, {
        backgroundColor: colors.secondaryCard,
        borderColor: colors.secondaryCardBorder,
      }]}>
        <Text style={[styles.cardLabel, { color: colors.textTertiary, fontFamily: ff.bodyMedium }]}>
          MONTHLY AVG
        </Text>
        <Text style={[styles.cardAmount, { color: colors.text, fontFamily: ff.headingBold }]}>
          €1,738
        </Text>
        <Text style={[styles.cardSub, { color: colors.textTertiary, fontFamily: ff.body }]}>
          last 6 months
        </Text>

        <View style={[styles.badge, {
          backgroundColor: colors.secondary + '22',
        }]}>
          <Text style={[styles.badgeText, { color: colors.secondary, fontFamily: ff.bodyBold }]}>
            ▼ −16%
          </Text>
        </View>

        <View style={styles.sparkContainer}>
          <SparkLine data={MONTHLY_DATA} width={100} height={34} color={colors.secondary} gradientId="avgGradient" />
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
});
