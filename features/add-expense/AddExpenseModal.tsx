import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ExpenseData {
  description: string;
  amount: string;
  type: 'one-time' | 'fixed';
  date: Date;
  category: string;
}

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddExpenseModal({ visible, onClose }: AddExpenseModalProps) {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    description: '',
    amount: '',
    type: 'one-time',
    date: new Date(),
    category: ''
  });

  // Categories matching the image design
  const categories = [
    { id: 'bills', name: 'Bills', icon: 'receipt', color: '#007AFF' },
    { id: 'food', name: 'Food', icon: 'restaurant', color: '#8E8E93' },
    { id: 'shopping', name: 'Shopping', icon: 'bag', color: '#FF69B4' },
    { id: 'vacation', name: 'Vacation', icon: 'airplane', color: '#FF9500' },
    { id: 'medicine', name: 'Medicine', icon: 'medical', color: '#007AFF' },
    { id: 'transport', name: 'Transport', icon: 'car', color: '#34C759' },
    { id: 'entertainment', name: 'Fun', icon: 'film', color: '#AF52DE' },
    { id: 'education', name: 'School', icon: 'school', color: '#FF3B30' },
  ];

  const handleSave = () => {
    if (!expenseData.description || !expenseData.amount || !expenseData.category) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    console.log('Saving expense:', expenseData);
    Alert.alert('Success', 'Expense added successfully!', [
      { text: 'OK', onPress: () => onClose() }
    ]);
  };

  const selectCategory = (categoryId: string) => {
    setExpenseData(prev => ({ ...prev, category: categoryId }));
  };

  const handleClose = () => {
    setExpenseData({
      description: '',
      amount: '',
      type: 'one-time',
      date: new Date(),
      category: ''
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        {/* Header */}
        <View style={[styles.header, { 
          backgroundColor: colors.card,
          borderBottomColor: colors.separator 
        }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Add Expenses</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* What did you spend on? */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>What did you spend on?</Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: colors.card,
                  borderColor: colors.separator,
                  color: colors.text
                }]}
                placeholder="Enter expense description..."
                placeholderTextColor={colors.textSecondary}
                value={expenseData.description}
                onChangeText={(text) => setExpenseData(prev => ({ ...prev, description: text }))}
              />
            </View>

            {/* Amount Spent */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Amount Spent</Text>
              <View style={[styles.amountContainer, { 
                backgroundColor: colors.card,
                borderColor: colors.separator
              }]}>
                <Text style={[styles.currencySymbol, { color: colors.textSecondary }]}>$</Text>
                <TextInput
                  style={[styles.amountInput, { color: colors.text }]}
                  placeholder="0.00"
                  placeholderTextColor={colors.textSecondary}
                  value={expenseData.amount}
                  onChangeText={(text) => setExpenseData(prev => ({ ...prev, amount: text }))}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Date */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Date</Text>
              <TouchableOpacity style={[styles.dateButton, { 
                backgroundColor: colors.card,
                borderColor: colors.separator
              }]}>
                <Ionicons name="calendar" size={20} color={colors.primary} />
                <Text style={[styles.dateText, { color: colors.textSecondary }]}>
                  {expenseData.date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Select Categories */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Categories</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryItem,
                      { 
                        backgroundColor: expenseData.category === category.id 
                          ? colors.primary + '20' 
                          : colors.card,
                        borderColor: expenseData.category === category.id 
                          ? colors.primary 
                          : colors.separator
                      }
                    ]}
                    onPress={() => selectCategory(category.id)}
                  >
                    <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                      <Ionicons name={category.icon as any} size={24} color={category.color} />
                    </View>
                    <Text style={[
                      styles.categoryName, 
                      { 
                        color: expenseData.category === category.id 
                          ? colors.primary 
                          : colors.text 
                      }
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Expense Type */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Expense Type</Text>
              <View style={styles.typeContainer}>
                <Text style={[
                  styles.typeLabel, 
                  { 
                    color: expenseData.type === 'one-time' 
                      ? colors.text 
                      : colors.textSecondary 
                  }
                ]}>
                  One-time
                </Text>
                <Switch
                  value={expenseData.type === 'fixed'}
                  onValueChange={(value) => setExpenseData(prev => ({ 
                    ...prev, 
                    type: value ? 'fixed' : 'one-time' 
                  }))}
                  trackColor={{ false: colors.separator, true: colors.primary }}
                  thumbColor={colors.card}
                />
                <Text style={[
                  styles.typeLabel, 
                  { 
                    color: expenseData.type === 'fixed' 
                      ? colors.text 
                      : colors.textSecondary 
                  }
                ]}>
                  Fixed
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Add Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleSave}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
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
    minHeight: 60,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1F2937',
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
    color: '#9CA3AF',
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  dateText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  categoriesContainer: {
    paddingHorizontal: 5,
    gap: 12,
  },
  categoryItem: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 80,
    backgroundColor: '#FFFFFF',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#1F2937',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
    minWidth: 200,
    maxWidth: 250,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  addButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
