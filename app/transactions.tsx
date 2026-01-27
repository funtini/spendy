import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Transaction {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: Date;
  icon: string;
  color: string;
}

interface TransactionSection {
  title: string;
  data: Transaction[];
}

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatSectionTitle = (date: Date, language: string) => {
  const locale = language === 'pt' ? 'pt-PT' : 'en-US';

  const weekdayLong = date.toLocaleDateString(locale, { weekday: 'long' });
  const weekday =
    language === 'pt'
      ? weekdayLong.replace('-feira', '').trim()
      : weekdayLong;

  const day = date.toLocaleDateString(locale, { day: 'numeric' });
  const monthRaw = date.toLocaleDateString(locale, { month: 'short' });
  const month = monthRaw.replace('.', '').trim();

  const title = `${weekday}, ${day} ${month}`;
  return language === 'pt' ? title.toLowerCase() : title;
};

const daysAgo = (days: number, hour: number, minute: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d;
};

const formatCurrency = (value: number, language: string) => {
  const locale = language === 'pt' ? 'pt-PT' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
};

export default function TransactionsScreen() {
  const { t, i18n } = useTranslation();
  const colors = useThemeColors();

  const handleBack = () => {
    router.back();
  };

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: 1,
      name: 'Coffee Shop',
      category: 'Food & Dining',
      amount: -4.50,
      date: daysAgo(0, 9, 30),
      icon: 'restaurant',
      color: '#FF9500'
    },
    {
      id: 2,
      name: 'Gas Station',
      category: 'Transportation',
      amount: -45.00,
      date: daysAgo(1, 17, 15),
      icon: 'car',
      color: '#007AFF'
    },
    {
      id: 3,
      name: 'Grocery Store',
      category: 'Food & Dining',
      amount: -67.80,
      date: daysAgo(1, 14, 30),
      icon: 'basket',
      color: '#34C759'
    },
    {
      id: 4,
      name: 'Movie Theater',
      category: 'Entertainment',
      amount: -24.00,
      date: daysAgo(2, 20, 0),
      icon: 'film',
      color: '#AF52DE'
    },
    {
      id: 5,
      name: 'Gas Station',
      category: 'Transportation',
      amount: -38.50,
      date: daysAgo(3, 9, 45),
      icon: 'car',
      color: '#007AFF'
    },
    {
      id: 6,
      name: 'Restaurant',
      category: 'Food & Dining',
      amount: -89.90,
      date: daysAgo(3, 13, 10),
      icon: 'restaurant',
      color: '#FF9500'
    },
    {
      id: 7,
      name: 'Shopping Mall',
      category: 'Shopping',
      amount: -156.75,
      date: daysAgo(4, 16, 5),
      icon: 'shirt',
      color: '#FF3B30'
    },
    {
      id: 8,
      name: 'Pharmacy',
      category: 'Healthcare',
      amount: -23.45,
      date: daysAgo(5, 11, 25),
      icon: 'medical',
      color: '#FF9500'
    }
  ];

  const sections: TransactionSection[] = Object.values(
    transactions
      .slice()
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reduce<Record<string, TransactionSection>>((acc, transaction) => {
        const key = getDateKey(transaction.date);

        if (!acc[key]) {
          acc[key] = {
            title: formatSectionTitle(transaction.date, i18n.language),
            data: [],
          };
        }

        acc[key].data.push(transaction);
        return acc;
      }, {})
  );

  const spent = transactions.reduce((sum, tx) => sum + (tx.amount < 0 ? Math.abs(tx.amount) : 0), 0);
  const monthlyBudget = 500;
  const spentRatio = monthlyBudget > 0 ? Math.min(spent / monthlyBudget, 1) : 0;
  const isOverBudget = spent > monthlyBudget;
  const remaining = monthlyBudget - spent;

  const today = new Date();
  const daysElapsed = Math.max(today.getDate(), 1);
  const averagePerDay = spent / daysElapsed;

  const budgetLabel = t('statistics.budget');
  const spentLabel = t('transactions.totalSpent');
  const remainingLabel = t('statistics.remaining');
  const averageLabel = i18n.language === 'pt' ? 'Média/dia' : 'Avg/day';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { 
        backgroundColor: colors.card,
        borderBottomColor: colors.separator 
      }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>{t('transactions.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Summary */}
      <View style={[styles.summary, { backgroundColor: colors.card, shadowColor: colors.text }]}>
        <View style={styles.summaryHeaderRow}>
          <View>
            <Text style={[styles.summaryTopLabel, { color: colors.textSecondary }]}>
              {t('home.quickStats.thisMonth')}
            </Text>
            <Text style={[styles.summaryMainLabel, { color: colors.text }]}>{spentLabel}</Text>
          </View>

          <Text style={[styles.summaryMainValue, { color: colors.text }]}>
            {formatCurrency(spent, i18n.language)}
            <Text style={[styles.summaryMainValueMuted, { color: colors.textSecondary }]}>
              {` / ${formatCurrency(monthlyBudget, i18n.language)}`}
            </Text>
          </Text>
        </View>

        <View style={[styles.progressTrack, { backgroundColor: colors.surfaceSecondary }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.round(spentRatio * 100)}%`,
                backgroundColor: isOverBudget ? colors.error : colors.primary,
              },
            ]}
          />
        </View>

        <View style={styles.summaryMetaRow}>
          <View style={styles.summaryMetaItem}>
            <Text style={[styles.summaryMetaLabel, { color: colors.textSecondary }]}>{remainingLabel}</Text>
            <Text style={[styles.summaryMetaValue, { color: isOverBudget ? colors.error : colors.success }]}>
              {formatCurrency(remaining, i18n.language)}
            </Text>
          </View>

          <View style={[styles.summaryMetaDivider, { backgroundColor: colors.separator, opacity: 0.6 }]} />

          <View style={styles.summaryMetaItem}>
            <Text style={[styles.summaryMetaLabel, { color: colors.textSecondary }]}>{averageLabel}</Text>
            <Text style={[styles.summaryMetaValue, { color: colors.text }]}>
              {formatCurrency(averagePerDay, i18n.language)}
            </Text>
          </View>
        </View>

        <Text style={[styles.summaryFootnote, { color: colors.textTertiary }]}>
          {budgetLabel}: {formatCurrency(monthlyBudget, i18n.language)}
        </Text>
      </View>

      {/* Transactions List (Grouped by Date) */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => String(item.id)}
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsContent}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => (
          <View style={[styles.transactionItem, { 
            backgroundColor: colors.card,
            shadowColor: colors.text 
          }]}>
            <View style={[styles.transactionIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={[styles.transactionName, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.transactionCategory, { color: colors.textSecondary }]}>{item.category}</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: item.amount < 0 ? colors.error : colors.success }]}>
              {formatCurrency(item.amount, i18n.language)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 34,
  },
  summary: {
    margin: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTopLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  summaryMainLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  summaryMainValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  summaryMainValueMuted: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  summaryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },
  summaryMetaItem: {
    flex: 1,
  },
  summaryMetaDivider: {
    width: 1,
    height: 28,
    marginHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  summaryMetaLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  summaryMetaValue: {
    fontSize: 14,
    fontWeight: '800',
  },
  summaryFootnote: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  transactionsContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
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
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 14,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});
