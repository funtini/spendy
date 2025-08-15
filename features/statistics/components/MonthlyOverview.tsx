import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const MonthlyOverview: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('statistics.monthlyOverview')}</Text>
      <View style={styles.monthlyStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>$2,450</Text>
          <Text style={styles.statLabel}>{t('statistics.totalSpent')}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>$890</Text>
          <Text style={styles.statLabel}>{t('statistics.remaining')}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>$3,340</Text>
          <Text style={styles.statLabel}>{t('statistics.budget')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 15,
  },
  monthlyStats: {
    flexDirection: "row",
    gap: 15,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
});
