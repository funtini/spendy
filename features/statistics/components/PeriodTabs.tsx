import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useTheme } from '@/contexts/ThemeContext';

type Period = 'Weekly' | 'Monthly' | 'Yearly';

interface PeriodTabsProps {
  selected: Period;
  onSelect: (period: Period) => void;
}

const PERIODS: Period[] = ['Weekly', 'Monthly', 'Yearly'];

export const PeriodTabs: React.FC<PeriodTabsProps> = ({ selected, onSelect }) => {
  const colors = useThemeColors();
  const ff = useFontFamily();
  const { isDark } = useTheme();

  return (
    <View style={[styles.container, {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    }]}>
      {PERIODS.map((period) => {
        const isActive = selected === period;
        const activeBg = isDark ? 'rgba(77,255,160,0.1)' : colors.accent;
        const activeTextColor = isDark ? colors.accent : '#FFFFFF';
        return (
          <TouchableOpacity
            key={period}
            style={[
              styles.tab,
              isActive && { backgroundColor: activeBg },
            ]}
            onPress={() => onSelect(period)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.label,
              {
                color: isActive ? activeTextColor : colors.textSecondary,
                fontFamily: isActive ? ff.bodyMedium : ff.body,
              },
            ]}>
              {period}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1.5,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
});
