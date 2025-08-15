import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const QuickStats: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Ionicons name="wallet" size={24} color="#007AFF" />
        <Text style={styles.statValue}>$2,450</Text>
        <Text style={styles.statLabel}>{t('home.quickStats.thisMonth')}</Text>
      </View>
      
      <View style={styles.statCard}>
        <Ionicons name="trending-down" size={24} color="#FF3B30" />
        <Text style={styles.statValue}>$890</Text>
        <Text style={styles.statLabel}>{t('home.quickStats.remaining')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
    marginTop: 10,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
});
