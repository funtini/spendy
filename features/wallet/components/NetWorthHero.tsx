import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useFontFamily } from '@/hooks/useFontFamily';
import { SparkLine } from '@/features/shared';

const SPARK_DATA = [42000, 44500, 41000, 46000, 48000, 45500, 52430];

// Always dark card for strong contrast, regardless of theme
const CARD_BG = '#1C2F4A';
const CARD_BG2 = '#0F1E33';

export const NetWorthHero: React.FC = () => {
  const ff = useFontFamily();

  return (
    <View style={[styles.card, { backgroundColor: CARD_BG }]}>
      <View style={styles.top}>
        <View style={styles.leftCol}>
          <Text style={[styles.label, { fontFamily: ff.bodyMedium }]}>
            Total Net Worth
          </Text>
          <Text style={[styles.amount, { fontFamily: ff.headingBold }]}>
            €20,970
          </Text>
          <Text style={[styles.sub, { fontFamily: ff.body }]}>
            Across 5 assets · Updated now
          </Text>
        </View>
        <View style={styles.sparkWrap}>
          <SparkLine data={SPARK_DATA} width={100} height={48} color="#5B8AF0" gradientId="netWorthHeroGradient" />
        </View>
      </View>

      <View style={styles.badges}>
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { fontFamily: ff.body }]}>
            <Text style={{ color: '#4DFFA0' }}>▲</Text> +8.4% all time
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { fontFamily: ff.body }]}>💰 €7,700 liquid</Text>
        </View>
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { fontFamily: ff.body }]}>📈 €13,270 invested</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  leftCol: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 5,
  },
  amount: {
    fontSize: 34,
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 38,
    marginBottom: 5,
  },
  sub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
  },
  sparkWrap: {
    marginTop: 4,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  badgeText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
});
