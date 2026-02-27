import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

const SEGMENTS: DonutSegment[] = [
  { label: '🍔 Food', value: 32, color: '#E8533A' },
  { label: '🏠 Housing', value: 25, color: '#2A6DB5' },
  { label: '🚗 Transport', value: 15, color: '#D4760E' },
  { label: '📺 Subs', value: 12, color: '#6B4FC8' },
  { label: '🛍 Shopping', value: 10, color: '#C44F9A' },
  { label: '⚡ Other', value: 6, color: '#3D8A6E' },
];

const RADIUS = 44;
const STROKE_WIDTH = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = 120;
const CENTER = SIZE / 2;

export const DonutChart: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();

  let cumulativePercent = 0;

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text, fontFamily: ff.heading }]}>
        By Category
      </Text>
      <View style={styles.content}>
        <View style={styles.donutWrapper}>
          <Svg width={SIZE} height={SIZE}>
            <Circle
              cx={CENTER} cy={CENTER} r={RADIUS}
              stroke={colors.surface3} strokeWidth={STROKE_WIDTH} fill="none"
            />
            {SEGMENTS.map((seg, i) => {
              const dashLen = (seg.value / 100) * CIRCUMFERENCE;
              const rotation = -90 + cumulativePercent * 3.6;
              cumulativePercent += seg.value;
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
              €1,450
            </Text>
            <Text style={[styles.centerSub, { color: colors.textTertiary, fontFamily: ff.body }]}>
              Total
            </Text>
          </View>
        </View>

        <View style={styles.legend}>
          {SEGMENTS.map((seg, i) => (
            <View key={i} style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: seg.color, borderRadius: 3 }]} />
              <Text style={[styles.legendLabel, { color: colors.textSecondary, fontFamily: ff.body }]}>
                {seg.label}
              </Text>
              <Text style={[styles.legendValue, { color: colors.text, fontFamily: ff.mono }]}>
                {seg.value}%
              </Text>
            </View>
          ))}
        </View>
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
});
