import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useFontFamily } from '@/hooks/useFontFamily';

interface Asset {
  name: string;
  type: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  iconBg: string;
}

const ASSETS: Asset[] = [
  { icon: '📈', name: 'S&P 500 ETF', type: 'Investment', value: '€8,430', change: '+12.4%', isPositive: true, iconBg: '#EEFAF5' },
  { icon: '🏦', name: 'Savings Account', type: 'Savings — 3.5% APY', value: '€5,200', change: '+3.5%', isPositive: true, iconBg: '#EEF3FF' },
  { icon: '₿', name: 'Bitcoin', type: 'Crypto', value: '€1,840', change: '-4.2%', isPositive: false, iconBg: '#FFF8EE' },
  { icon: '🏠', name: 'Real Estate Fund', type: 'Investment', value: '€3,000', change: '+7.1%', isPositive: true, iconBg: '#F5EEFF' },
  { icon: '💶', name: 'Emergency Fund', type: 'Savings', value: '€2,500', change: 'Safe', isPositive: true, iconBg: '#EEFAFE' },
];

export const AssetsList: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text, fontFamily: ff.heading }]}>
          All Assets
        </Text>
        <Text style={[styles.addLink, { color: colors.accent, fontFamily: ff.bodyBold }]}>
          + Add
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {ASSETS.map((asset, i) => (
          <View key={i} style={[styles.row, { borderBottomColor: colors.separator }]}>
            <View style={[styles.iconCircle, { backgroundColor: asset.iconBg }]}>
              <Text style={styles.icon}>{asset.icon}</Text>
            </View>
            <View style={styles.details}>
              <Text style={[styles.name, { color: colors.text, fontFamily: ff.bodyMedium }]}>
                {asset.name}
              </Text>
              <Text style={[styles.type, { color: colors.textTertiary, fontFamily: ff.body }]}>
                {asset.type}
              </Text>
            </View>
            <View style={styles.valueSection}>
              <Text style={[styles.value, { color: colors.text, fontFamily: ff.mono }]}>
                {asset.value}
              </Text>
              <Text style={[
                styles.change,
                {
                  color: asset.isPositive ? colors.secondary : colors.error,
                  fontFamily: ff.mono,
                }
              ]}>
                {asset.change}
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
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
  },
  addLink: {
    fontSize: 12,
  },
  card: {
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 12,
    borderBottomWidth: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    marginBottom: 2,
  },
  type: {
    fontSize: 11,
  },
  valueSection: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 14,
    marginBottom: 2,
  },
  change: {
    fontSize: 11,
  },
});
