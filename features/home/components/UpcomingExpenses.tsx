import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

interface UpcomingExpense {
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  dueDay: number;
  amount: number;
  color: string;
}

const UPCOMING_EXPENSES: UpcomingExpense[] = [
  { icon: 'home', name: 'Rent', dueDay: 1, amount: 1200, color: '#FF3B30' },
  { icon: 'logo-youtube', name: 'Netflix', dueDay: 5, amount: 15.99, color: '#E50914' },
  { icon: 'barbell', name: 'Gym', dueDay: 10, amount: 49.99, color: '#34C759' },
  { icon: 'wifi', name: 'Internet', dueDay: 15, amount: 59.99, color: '#007AFF' },
];

export const UpcomingExpenses: React.FC = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();

  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const monthName = nextMonth.toLocaleString('default', { month: 'short' });

  const total = UPCOMING_EXPENSES.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View style={[styles.section, {
      backgroundColor: colors.card,
      shadowColor: colors.text,
    }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {t('home.upcomingExpenses.title')}
      </Text>

      {UPCOMING_EXPENSES.map((expense, index) => (
        <View
          key={index}
          style={[styles.expenseItem, { borderBottomColor: colors.separator }]}
        >
          <View style={[styles.expenseIcon, { backgroundColor: colors.surfaceSecondary }]}>
            <Ionicons name={expense.icon} size={20} color={expense.color} />
          </View>
          <View style={styles.expenseDetails}>
            <Text style={[styles.expenseName, { color: colors.text }]}>{expense.name}</Text>
            <Text style={[styles.expenseDate, { color: colors.textSecondary }]}>
              {t('home.upcomingExpenses.dueDate')} {monthName} {expense.dueDay}
            </Text>
          </View>
          <Text style={[styles.expenseAmount, { color: colors.error }]}>
            -${expense.amount.toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>
          {t('home.upcomingExpenses.total')}
        </Text>
        <Text style={[styles.totalAmount, { color: colors.text }]}>
          ${total.toFixed(2)}
        </Text>
      </View>
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
    fontWeight: '600',
    marginBottom: 15,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  expenseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: '500',
  },
  expenseDate: {
    fontSize: 14,
    marginTop: 2,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
});
