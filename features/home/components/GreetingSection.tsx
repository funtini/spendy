import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning,';
  if (hour < 18) return 'Good afternoon,';
  return 'Good evening,';
};

export const GreetingSection: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();

  const now = new Date();
  const monthName = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.monthLabel, { color: colors.textTertiary, fontFamily: ff.bodyMedium }]}>
        {monthName} {year}
      </Text>
      <Text style={[styles.greeting, { fontFamily: ff.headingBold }]}>
        <Text style={{ color: colors.text }}>{getGreeting()} </Text>
        <Text style={{ color: colors.accent, fontStyle: 'italic' }}>João</Text>
        <Text style={{ color: colors.text }}> 👋</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 4,
  },
  monthLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  greeting: {
    fontSize: 24,
    lineHeight: 30,
  },
});
