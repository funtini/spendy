import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const QuickStats: React.FC = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();

  // Mock data - in real app this would come from state/props
  const currentMonthSpending = 1250.00;
  const monthlyAverage = 1380.00;
  
  // Get current month name
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
  
  // Determine if current month is above or below average
  const isAboveAverage = currentMonthSpending > monthlyAverage;
  const trendIconName = isAboveAverage ? "trending-up" : "trending-down";
  const trendIconColor = isAboveAverage ? colors.error : colors.success;
  
  // Calculate the difference
  const difference = currentMonthSpending - monthlyAverage;
  const differenceText = difference >= 0 ? `+$${difference.toFixed(0)}` : `$${difference.toFixed(0)}`;

  return (
    <View style={styles.statsContainer}>
      <View style={[styles.statCard, styles.highlightedCard, { 
        backgroundColor: colors.card,
        borderColor: colors.highlight,
        shadowColor: colors.text,
      }]}>
        <View style={[styles.iconContainer, styles.highlightedIconContainer, { 
          backgroundColor: colors.surfaceSecondary 
        }]}>
          <Ionicons name={trendIconName as any} size={20} color={trendIconColor} />
        </View>
        <Text style={[styles.statValue, styles.highlightedValue, { 
          color: colors.text 
        }]}>${currentMonthSpending.toFixed(0)}</Text>
        <View style={styles.labelContainer}>
          <Text style={[styles.statLabel, styles.highlightedLabel, { 
            color: colors.textSecondary 
          }]}>{currentMonth}</Text>
        </View>
      </View>
      
      <View style={[styles.statCard, { 
        backgroundColor: colors.card,
        shadowColor: colors.text,
      }]}>
        <View style={[styles.iconContainer, { 
          backgroundColor: colors.surfaceSecondary 
        }]}>
          <Ionicons name="analytics" size={20} color={colors.primary} />
        </View>
        <Text style={[styles.statValue, { 
          color: colors.text 
        }]}>${monthlyAverage.toFixed(0)}</Text>
        <View style={styles.labelContainer}>
          <Text style={[styles.statLabel, { 
            color: colors.textSecondary 
          }]}>{t('home.quickStats.monthlyAverage')}</Text>
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
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  highlightedCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  highlightedIconContainer: {
    // Inherits from iconContainer
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
    marginBottom: 8,
  },
  highlightedValue: {
    fontSize: 26,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
  },
  highlightedLabel: {
    fontWeight: "600",
  },
});
