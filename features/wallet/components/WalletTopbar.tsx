import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

export const WalletTopbar: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text, fontFamily: ff.headingBold }]}>
        Wallet{' '}
        <Text style={{ color: colors.accent, fontStyle: 'italic' }}>✦</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    letterSpacing: -0.5,
  },
});
