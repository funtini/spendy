import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const QuickStats: React.FC = () => {
  const { t } = useTranslation();

  // Mock data - in real app this would come from state/props
  const currentMonthSpending = 1250.00;
  const monthlyAverage = 1380.00;
  
  // Get current month name
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
  
  // Determine if current month is above or below average
  const isAboveAverage = currentMonthSpending > monthlyAverage;
  const trendIconName = isAboveAverage ? "trending-up" : "trending-down";
  const trendIconColor = isAboveAverage ? "#FF3B30" : "#34C759";
  
  // Calculate the difference
  const difference = currentMonthSpending - monthlyAverage;
  const differenceText = difference >= 0 ? `+$${difference.toFixed(0)}` : `$${difference.toFixed(0)}`;

  return (
    <View style={styles.statsContainer}>
      <View style={[styles.statCard, styles.highlightedCard]}>
        <View style={[styles.iconContainer, styles.highlightedIconContainer]}>
          <Ionicons name={trendIconName as any} size={20} color={trendIconColor} />
        </View>
        <Text style={[styles.statValue, styles.highlightedValue]}>${currentMonthSpending.toFixed(0)}</Text>
        <View style={styles.labelContainer}>
          <Text style={[styles.statLabel, styles.highlightedLabel]}>{currentMonth}</Text>
        </View>
      </View>
      
      <View style={styles.statCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="analytics" size={20} color="#007AFF" />
        </View>
        <Text style={styles.statValue}>${monthlyAverage.toFixed(0)}</Text>
        <View style={styles.labelContainer}>
          <Text style={styles.statLabel}>{t('home.quickStats.monthlyAverage')}</Text>
        </View>
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
  highlightedCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#778899",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  highlightedIconContainer: {
    backgroundColor: "#F2F2F7",
  },
  iconContainerSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  highlightedValue: {
    color: "#1C1C1E",
    fontSize: 26,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  highlightedLabel: {
    color: "#8E8E93",
    fontWeight: "600",
  },
});
