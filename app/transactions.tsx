import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionsScreen() {
  const { t } = useTranslation();

  const handleBack = () => {
    router.back();
  };

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      name: 'Coffee Shop',
      category: 'Food & Dining',
      amount: -4.50,
      date: 'Today, 9:30 AM',
      icon: 'restaurant',
      color: '#FF9500'
    },
    {
      id: 2,
      name: 'Gas Station',
      category: 'Transportation',
      amount: -45.00,
      date: 'Yesterday, 5:15 PM',
      icon: 'car',
      color: '#007AFF'
    },
    {
      id: 3,
      name: 'Grocery Store',
      category: 'Food & Dining',
      amount: -67.80,
      date: 'Yesterday, 2:30 PM',
      icon: 'basket',
      color: '#34C759'
    },
    {
      id: 4,
      name: 'Movie Theater',
      category: 'Entertainment',
      amount: -24.00,
      date: '2 days ago',
      icon: 'film',
      color: '#AF52DE'
    },
    {
      id: 5,
      name: 'Gas Station',
      category: 'Transportation',
      amount: -38.50,
      date: '3 days ago',
      icon: 'car',
      color: '#007AFF'
    },
    {
      id: 6,
      name: 'Restaurant',
      category: 'Food & Dining',
      amount: -89.90,
      date: '3 days ago',
      icon: 'restaurant',
      color: '#FF9500'
    },
    {
      id: 7,
      name: 'Shopping Mall',
      category: 'Shopping',
      amount: -156.75,
      date: '4 days ago',
      icon: 'shirt',
      color: '#FF3B30'
    },
    {
      id: 8,
      name: 'Pharmacy',
      category: 'Healthcare',
      amount: -23.45,
      date: '5 days ago',
      icon: 'medical',
      color: '#FF9500'
    }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{t('transactions.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>{t('transactions.totalSpent')}</Text>
          <Text style={styles.summaryAmount}>$449.90</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>{t('transactions.transactions')}</Text>
          <Text style={styles.summaryCount}>8</Text>
        </View>
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.transactionsList}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={[styles.transactionIcon, { backgroundColor: transaction.color + '20' }]}>
              <Ionicons name={transaction.icon as any} size={20} color={transaction.color} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{transaction.name}</Text>
              <Text style={styles.transactionCategory}>{transaction.category}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: transaction.amount < 0 ? '#FF3B30' : '#34C759' }]}>
              {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  placeholder: {
    width: 34,
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 5,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF3B30',
  },
  summaryCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#C7C7CC',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});
