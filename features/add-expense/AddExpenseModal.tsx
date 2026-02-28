import { useTheme } from '@/contexts/ThemeContext';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Animated,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Account, AccountPicker, GRADIENT_PRESETS } from '@/features/home';
import CategoryPicker from './components/CategoryPicker';
import RecurrenceSection from './components/RecurrenceSection';
import TypeToggle from './components/TypeToggle';

interface ExpenseData {
  description: string;
  amount: string;
  type: 'one-time' | 'fixed';
  date: Date;
  category: string;
}

export interface AddExpenseModalRef {
  open: () => void;
  close: () => void;
}

const EMPTY_EXPENSE: ExpenseData = {
  description: '',
  amount: '',
  type: 'one-time',
  date: new Date(),
  category: '',
};

const SPRING_CONTENT = { friction: 9, tension: 55 } as const;
const SPRING_TOGGLE = { friction: 8, tension: 60 } as const;

const DEFAULT_ACCOUNTS: Account[] = [
  {
    id: 'personal',
    name: 'Personal',
    gradient: GRADIENT_PRESETS[0],
    owners: [{ email: '', alias: 'Me' }],
  },
];

const AddExpenseModal = forwardRef<AddExpenseModalRef>((_, ref) => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const fontFamily = useFontFamily();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);

  const [visible, setVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [scrollContentHeight, setScrollContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const typeAnim = useRef(new Animated.Value(0)).current;

  const [accounts, setAccounts] = useState<Account[]>(DEFAULT_ACCOUNTS);
  const [selectedAccountId, setSelectedAccountId] = useState('personal');

  const [expenseData, setExpenseData] = useState<ExpenseData>(EMPTY_EXPENSE);
  const [freq, setFreq] = useState<'monthly' | 'custom'>('monthly');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [notifyMe, setNotifyMe] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'description' | 'amount' | null>(null);

  const { maxScrollHeight, scrollEnabled } = useMemo(() => {
    const maxSheetHeight = screenHeight * 0.92;
    const fixedHeight = headerHeight + footerHeight + insets.bottom;
    const maxScrollHeight = maxSheetHeight - fixedHeight;
    return { maxScrollHeight, scrollEnabled: scrollContentHeight > maxScrollHeight };
  }, [screenHeight, headerHeight, footerHeight, insets.bottom, scrollContentHeight]);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => { setVisible(false); resetState(); },
  }));

  const resetState = useCallback(() => {
    setExpenseData(EMPTY_EXPENSE);
    setFreq('monthly');
    setSelectedMonths([]);
    setNotifyMe(false);
    setShowDatePicker(false);
    typeAnim.setValue(0);
    setScrollContentHeight(0);
    animatedHeight.setValue(0);
  }, [typeAnim, animatedHeight]);

  const handleClose = useCallback(() => {
    setVisible(false);
    resetState();
  }, [resetState]);

  useEffect(() => {
    if (scrollContentHeight === 0 || maxScrollHeight <= 0) return;
    const target = Math.min(scrollContentHeight, maxScrollHeight);
    Animated.spring(animatedHeight, {
      toValue: target,
      useNativeDriver: false,
      ...SPRING_CONTENT,
    }).start();
  }, [scrollContentHeight, maxScrollHeight]);

  const handleTypeChange = useCallback((type: 'one-time' | 'fixed') => {
    setExpenseData((prev) => ({ ...prev, type }));
    if (type === 'one-time') {
      setFreq('monthly');
      setSelectedMonths([]);
    }
    Animated.spring(typeAnim, {
      toValue: type === 'one-time' ? 0 : 1,
      useNativeDriver: false,
      ...SPRING_TOGGLE,
    }).start();
    if (type === 'fixed') {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [typeAnim]);

  const handleSave = useCallback(() => {
    if (!expenseData.description || !expenseData.amount || !expenseData.category) {
      Alert.alert(t('addExpense.errors.missingTitle'), t('addExpense.errors.missingBody'));
      return;
    }
    Alert.alert(t('addExpense.success.title'), t('addExpense.success.body'), [
      { text: t('common.done'), onPress: handleClose },
    ]);
  }, [expenseData, handleClose, t]);

  const handleFreqChange = useCallback((value: 'monthly' | 'custom') => {
    setFreq(value);
    if (value === 'custom') {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, []);

  const handleToggleMonth = useCallback((month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  }, []);

  const handleToggleNotify = useCallback(() => setNotifyMe((v) => !v), []);

  const focusedBorder = colors.accent + '66';
  const defaultBorder = colors.border;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFillObject} activeOpacity={1} onPress={handleClose} />

        <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
          {/* Drag handle */}
          <View style={styles.handleWrap}>
            <View style={[styles.handle, { backgroundColor: colors.surface3 }]} />
          </View>

          {/* Header */}
          <View
            style={[styles.header, { borderBottomColor: colors.border }]}
            onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
          >
            <View style={styles.headerLeft}>
              <Text style={[styles.headerTitle, { color: colors.text, fontFamily: fontFamily.headingBold }]}>
                {t('addExpense.title')}{' '}
                <Text style={{ color: colors.accent, fontStyle: 'italic' }}>✦</Text>
              </Text>
              <Text style={[styles.headerSub, { color: colors.textTertiary, fontFamily: fontFamily.body }]}>
                {t('addExpense.subtitle')}
              </Text>
            </View>
            <TouchableOpacity style={[styles.closeBtn, { backgroundColor: colors.surface2 }]} onPress={handleClose}>
              <Ionicons name="close" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Scrollable form */}
          <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
            <ScrollView
              ref={scrollViewRef}
              style={StyleSheet.absoluteFill}
              scrollEnabled={scrollEnabled}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={(_, h) => setScrollContentHeight(h)}
            >
              {/* Amount */}
              <View style={styles.section}>
                <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
                  {t('addExpense.amount')}
                </Text>
                <View style={[styles.amountRow, {
                  backgroundColor: colors.surface2,
                  borderWidth: 1,
                  borderColor: focusedInput === 'amount' ? focusedBorder : defaultBorder,
                }]}>
                  <Text style={[styles.currency, { color: colors.textSecondary, fontFamily: fontFamily.mono }]}>€</Text>
                  <TextInput
                    style={[styles.amountInput, { color: colors.text, fontFamily: fontFamily.mono }]}
                    placeholder="0.00"
                    placeholderTextColor={colors.textTertiary}
                    value={expenseData.amount}
                    onChangeText={(text) => setExpenseData((prev) => ({ ...prev, amount: text }))}
                    keyboardType="decimal-pad"
                    onFocus={() => setFocusedInput('amount')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>

              {/* Description */}
              <View style={styles.section}>
                <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
                  {t('addExpense.description')}
                </Text>
                <TextInput
                  style={[styles.input, {
                    backgroundColor: colors.surface2,
                    color: colors.text,
                    fontFamily: fontFamily.body,
                    borderWidth: 1,
                    borderColor: focusedInput === 'description' ? focusedBorder : defaultBorder,
                  }]}
                  placeholder={t('addExpense.descriptionPlaceholder')}
                  placeholderTextColor={colors.textTertiary}
                  value={expenseData.description}
                  onChangeText={(text) => setExpenseData((prev) => ({ ...prev, description: text }))}
                  onFocus={() => setFocusedInput('description')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              {/* Date + Account row */}
              <View style={[styles.twoCol, { marginBottom: showDatePicker ? 0 : 20 }]}>
                <View style={styles.halfSection}>
                  <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
                    {t('addExpense.date')}
                  </Text>
                  <TouchableOpacity
                    style={[styles.selector, {
                      backgroundColor: colors.surface2,
                      borderWidth: 1,
                      borderColor: showDatePicker ? focusedBorder : defaultBorder,
                    }]}
                    onPress={() => setShowDatePicker((v) => !v)}
                  >
                    <Ionicons name="calendar-outline" size={16} color={colors.secondary} />
                    <Text style={[styles.selectorText, { color: colors.text, fontFamily: fontFamily.body }]}>
                      {expenseData.date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.halfSection}>
                  <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
                    {t('addExpense.account')}
                  </Text>
                  <AccountPicker
                    accounts={accounts}
                    selectedAccountId={selectedAccountId}
                    variant="input"
                    onSelect={setSelectedAccountId}
                  />
                </View>
              </View>

              {/* Inline date picker */}
              {showDatePicker && (
                <View style={[styles.datePickerWrap, { backgroundColor: isDark ? colors.surface3 : colors.surface2 }]}>
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity style={styles.datePickerDoneRow} onPress={() => setShowDatePicker(false)}>
                      <Text style={{ color: colors.accent, fontFamily: fontFamily.bodyMedium, fontSize: 14 }}>{t('common.done')}</Text>
                    </TouchableOpacity>
                  )}
                  <DateTimePicker
                    value={expenseData.date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    maximumDate={new Date()}
                    themeVariant={isDark ? 'dark' : 'light'}
                    textColor={colors.text}
                    accentColor={colors.accent}
                    onChange={(_, selectedDate) => {
                      if (Platform.OS === 'android') setShowDatePicker(false);
                      if (selectedDate) setExpenseData((prev) => ({ ...prev, date: selectedDate }));
                    }}
                  />
                </View>
              )}

              <View style={styles.spacer} />

              {/* Category */}
              <View style={styles.section}>
                <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
                  {t('addExpense.category')}
                </Text>
                <CategoryPicker
                  selectedCategory={expenseData.category}
                  onSelect={(key) => setExpenseData((prev) => ({ ...prev, category: key }))}
                />
              </View>

              {/* Type toggle */}
              <View style={[styles.section, { marginBottom: expenseData.type === 'fixed' ? 20 : 0 }]}>
                <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
                  {t('addExpense.type')}
                </Text>
                <TypeToggle
                  type={expenseData.type}
                  typeAnim={typeAnim}
                  onChangeType={handleTypeChange}
                />
              </View>

              {/* Recurrence (fixed only) */}
              {expenseData.type === 'fixed' && (
                <RecurrenceSection
                  freq={freq}
                  selectedMonths={selectedMonths}
                  notifyMe={notifyMe}
                  onFreqChange={handleFreqChange}
                  onToggleMonth={handleToggleMonth}
                  onToggleNotify={handleToggleNotify}
                />
              )}
            </ScrollView>
          </Animated.View>

          {/* Footer */}
          <View
            style={[styles.footer, {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              paddingBottom: insets.bottom || 16,
            }]}
            onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
          >
            <TouchableOpacity
              onPress={handleSave}
              activeOpacity={0.85}
              style={[styles.submitBtn, { backgroundColor: colors.accent }]}
            >
              <Text style={[styles.submitText, {
                fontFamily: fontFamily.bodyBold,
                color: isDark ? '#080C16' : '#FFFFFF',
              }]}>
                {t('addExpense.addButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

AddExpenseModal.displayName = 'AddExpenseModal';

export default AddExpenseModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    marginBottom: 3,
  },
  headerSub: {
    fontSize: 12,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  spacer: {
    height: 10,
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.4,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  currency: {
    fontSize: 20,
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 12,
  },
  halfSection: {
    flex: 1,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 8,
  },
  selectorText: {
    fontSize: 14,
  },
  datePickerWrap: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 4,
  },
  datePickerDoneRow: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 2,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  submitBtn: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
  },
});
