import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const RecentTransactions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('home.recentTransactions')}</Text>
      <View style={styles.transactionItem}>
        <View style={styles.transactionIcon}>
          <Ionicons name="restaurant" size={20} color="#FF9500" />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>Coffee Shop</Text>
          <Text style={styles.transactionDate}>Today, 9:30 AM</Text>
        </View>
        <Text style={styles.transactionAmount}>-$4.50</Text>
      </View>
      
      <View style={styles.transactionItem}>
        <View style={styles.transactionIcon}>
          <Ionicons name="car" size={20} color="#007AFF" />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>Gas Station</Text>
          <Text style={styles.transactionDate}>Yesterday, 5:15 PM</Text>
        </View>
        <Text style={styles.transactionAmount}>-$45.00</Text>
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
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
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
    color: "#1C1C1E",
  },
  transactionDate: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
  },
});
