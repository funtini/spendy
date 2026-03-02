import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useSelectedAccount } from '@/contexts/AccountContext';
import { useStatistics } from '@/hooks/queries';

const RADIUS = 44;
const STROKE_WIDTH = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = 120;
const CENTER = SIZE / 2;

export const DonutChart: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();
  const { selectedAccountId } = useSelectedAccount();
  const { data, isLoading } = useStatistics(selectedAccountId);

  const categories = data?.spendingByCategory ?? [];
  const total = categories.reduce((sum, c) => sum + c.amount, 0);

  let cumulativePercent = 0;

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text, fontFamily: ff.heading }]}>
        By Category
      </Text>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.accent} style={styles.loader} />
      ) : (
        <View style={styles.content}>
          <View style={styles.donutWrapper}>
            <Svg width={SIZE} height={SIZE}>
              <Circle
                cx={CENTER} cy={CENTER} r={RADIUS}
                stroke={colors.surface3} strokeWidth={STROKE_WIDTH} fill="none"
              />
              {categories.map((seg, i) => {
                const dashLen = (seg.percentage / 100) * CIRCUMFERENCE;
                const rotation = -90 + cumulativePercent * 3.6;
                cumulativePercent += seg.percentage;
                return (
                  <Circle
                    key={i}
                    cx={CENTER} cy={CENTER} r={RADIUS}
                    stroke={seg.color} strokeWidth={STROKE_WIDTH} fill="none"
                    strokeDasharray={`${dashLen} ${CIRCUMFERENCE - dashLen}`}
                    strokeLinecap="butt"
                    rotation={rotation}
                    origin={`${CENTER}, ${CENTER}`}
                  />
                );
              })}
              <Circle cx={CENTER} cy={CENTER} r={RADIUS - STROKE_WIDTH / 2} fill={colors.card} />
            </Svg>
            <View style={styles.centerLabel}>
              <Text style={[styles.centerAmount, { color: colors.text, fontFamily: ff.headingBold }]}>
                €{(total / 100).toFixed(0)}
              </Text>
              <Text style={[styles.centerSub, { color: colors.textTertiary, fontFamily: ff.body }]}>
                Total
              </Text>
            </View>
          </View>

          <View style={styles.legend}>
            {categories.slice(0, 6).map((seg, i) => (
              <View key={i} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: seg.color, borderRadius: 3 }]} />
                <Text style={[styles.legendLabel, { color: colors.textSecondary, fontFamily: ff.body }]} numberOfLines={1}>
                  {seg.name}
                </Text>
                <Text style={[styles.legendValue, { color: colors.text, fontFamily: ff.mono }]}>
                  {seg.percentage}%
                </Text>
              </View>
            ))}
          </View>
        </View>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  donutWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    position: 'absolute',
    alignItems: 'center',
  },
  centerAmount: {
    fontSize: 14,
  },
  centerSub: {
    fontSize: 9,
  },
  legend: {
    flex: 1,
    gap: 7,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  legendDot: {
    width: 8,
    height: 8,
  },
  legendLabel: {
    flex: 1,
    fontSize: 11,
  },
  legendValue: {
    fontSize: 11,
  },
  loader: {
    height: 120,
  },
});
