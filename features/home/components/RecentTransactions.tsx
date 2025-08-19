import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const RecentTransactions: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const colors = useThemeColors();

  const handleViewAll = () => {
    router.push('/transactions');
  };

  return (
    <View style={[styles.section, { 
      backgroundColor: colors.card,
      shadowColor: colors.text 
    }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('home.recentTransactions')}</Text>
      <View style={[styles.transactionItem, { borderBottomColor: colors.separator }]}>
        <View style={[styles.transactionIcon, { backgroundColor: colors.surfaceSecondary }]}>
          <Ionicons name="restaurant" size={20} color="#FF9500" />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={[styles.transactionName, { color: colors.text }]}>Coffee Shop</Text>
          <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>Today, 9:30 AM</Text>
        </View>
        <Text style={[styles.transactionAmount, { color: colors.error }]}>-$4.50</Text>
      </View>
      
      <View style={[styles.transactionItem, { borderBottomColor: colors.separator }]}>
        <View style={[styles.transactionIcon, { backgroundColor: colors.surfaceSecondary }]}>
          <Ionicons name="car" size={20} color={colors.primary} />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={[styles.transactionName, { color: colors.text }]}>Gas Station</Text>
          <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>Yesterday, 5:15 PM</Text>
        </View>
        <Text style={[styles.transactionAmount, { color: colors.error }]}>-$45.00</Text>
      </View>
      <View style={[styles.transactionItem, { borderBottomColor: colors.separator }]}>
        <View style={[styles.transactionIcon, { backgroundColor: colors.surfaceSecondary }]}>
          <Ionicons name="car" size={20} color={colors.primary} />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={[styles.transactionName, { color: colors.text }]}>Gas Station</Text>
          <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>Yesterday, 5:15 PM</Text>
        </View>
        <Text style={[styles.transactionAmount, { color: colors.error }]}>-$45.00</Text>
      </View>

      {/* View All Button */}
      <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAll}>
        <Text style={[styles.viewAllText, { color: colors.primary }]}>{t('home.viewAll')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "500",
  },
  transactionDate: {
    fontSize: 14,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    paddingTop: 15,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 5,
  },
});
