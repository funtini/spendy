import { useTheme } from '@/contexts/ThemeContext';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useThemeColors } from '@/hooks/useThemeColors';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Animated,
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

const FOOTER_HEIGHT = 92;

const CATEGORIES = [
  { key: 'housing',       icon: 'home-outline',            color: '#FF6B35' },
  { key: 'food',          icon: 'restaurant-outline',      color: '#4CAF50' },
  { key: 'shopping',      icon: 'bag-outline',             color: '#E91E8C' },
  { key: 'vacation',      icon: 'airplane-outline',        color: '#00BCD4' },
  { key: 'subscriptions', icon: 'repeat-outline',          color: '#9C27B0' },
  { key: 'health',        icon: 'heart-outline',           color: '#F44336' },
  { key: 'car',           icon: 'car-outline',             color: '#43A047' },
  { key: 'leisure',       icon: 'film-outline',            color: '#7E57C2' },
  { key: 'school',        icon: 'book-outline',            color: '#FF9800' },
  { key: 'utilities',     icon: 'flash-outline',           color: '#FFC107' },
  { key: 'clothing',      icon: 'shirt-outline',           color: '#EC407A' },
  { key: 'children',      icon: 'happy-outline',           color: '#42A5F5' },
  { key: 'investments',   icon: 'trending-up-outline',     color: '#26A69A' },
  { key: 'gaming',        icon: 'game-controller-outline', color: '#5C6BC0' },
];

const MONTH_KEYS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
] as const;

interface ExpenseData {
  description: string;
  amount: string;
  type: 'one-time' | 'fixed';
  date: Date;
  category: string;
}

export interface AddExpenseBottomSheetRef {
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

const AddExpenseBottomSheet = forwardRef<AddExpenseBottomSheetRef>((_, ref) => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const fontFamily = useFontFamily();
  const { isDark } = useTheme();
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const sheetRef = useRef<BottomSheet>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const [expenseData, setExpenseData] = useState<ExpenseData>(EMPTY_EXPENSE);
  const [freq, setFreq] = useState<'monthly' | 'custom'>('monthly');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [notifyMe, setNotifyMe] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'description' | 'amount' | null>(null);
  const [toggleWidth, setToggleWidth] = useState(0);

  const typeAnim = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    open: () => sheetRef.current?.snapToIndex(0),
    close: () => sheetRef.current?.close(),
  }));

  const resetState = useCallback(() => {
    setExpenseData(EMPTY_EXPENSE);
    setFreq('monthly');
    setSelectedMonths([]);
    setNotifyMe(false);
    setShowDatePicker(false);
    typeAnim.setValue(0);
  }, [typeAnim]);

  const handleClose = useCallback(() => {
    sheetRef.current?.close();
    resetState();
  }, [resetState]);

  const handleTypeChange = useCallback((type: 'one-time' | 'fixed') => {
    setExpenseData((prev) => ({ ...prev, type }));
    if (type === 'one-time') {
      setFreq('monthly');
      setSelectedMonths([]);
    }
    Animated.spring(typeAnim, {
      toValue: type === 'one-time' ? 0 : 1,
      useNativeDriver: false,
      friction: 8,
      tension: 60,
    }).start();
    if (type === 'fixed') {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
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
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, []);

  const toggleMonth = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    []
  );

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={safeAreaBottom}>
        <View style={[styles.footer, { backgroundColor: colors.surface }]}>
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
      </BottomSheetFooter>
    ),
    [safeAreaBottom, colors.surface, colors.accent, handleSave, fontFamily.bodyBold, isDark, t]
  );

  const accentColor = colors.accent;
  const sliderHalfWidth = toggleWidth > 0 ? (toggleWidth - 8) / 2 : 0;
  const focusedBorder = accentColor + '66';
  const defaultBorder = colors.border;

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      enableDynamicSizing
      maxDynamicContentSize={screenHeight * 0.92}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}
      backgroundStyle={{ backgroundColor: colors.surface }}
      handleIndicatorStyle={{ backgroundColor: colors.surface3, width: 40 }}
      onClose={resetState}
    >
      <BottomSheetScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: FOOTER_HEIGHT + safeAreaBottom + 16 },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.headerTitle, { color: colors.text, fontFamily: fontFamily.headingBold }]}>
              {t('addExpense.title')}{' '}
              <Text style={{ color: accentColor, fontStyle: 'italic' }}>✦</Text>
            </Text>
            <Text style={[styles.headerSub, { color: colors.textTertiary, fontFamily: fontFamily.body }]}>
              {t('addExpense.subtitle')}
            </Text>
          </View>
          <TouchableOpacity style={[styles.closeBtn, { backgroundColor: colors.surface2 }]} onPress={handleClose}>
            <Ionicons name="close" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

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
            <TouchableOpacity style={[styles.selector, { backgroundColor: colors.surface2, borderWidth: 1, borderColor: defaultBorder }]}>
              <Ionicons name="wallet-outline" size={16} color={colors.secondary} />
              <Text style={[styles.selectorText, { color: colors.text, fontFamily: fontFamily.body }]}>
                {t('addExpense.personalAccount')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Inline date picker */}
        {showDatePicker && (
          <View style={[styles.datePickerWrap, { backgroundColor: isDark ? colors.surface3 : colors.surface2 }]}>
            {Platform.OS === 'ios' && (
              <TouchableOpacity style={styles.datePickerDoneRow} onPress={() => setShowDatePicker(false)}>
                <Text style={{ color: accentColor, fontFamily: fontFamily.bodyMedium, fontSize: 14 }}>{t('common.done')}</Text>
              </TouchableOpacity>
            )}
            <DateTimePicker
              value={expenseData.date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={new Date()}
              themeVariant={isDark ? 'dark' : 'light'}
              textColor={colors.text}
              accentColor={accentColor}
              onChange={(_, selectedDate) => {
                if (Platform.OS === 'android') setShowDatePicker(false);
                if (selectedDate) setExpenseData((prev) => ({ ...prev, date: selectedDate }));
              }}
            />
          </View>
        )}

        <View style={{ height: 10 }} />

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
            {t('addExpense.category')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {CATEGORIES.map(({ key, icon, color }) => {
              const isSelected = expenseData.category === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.categoryCard,
                    {
                      backgroundColor: isSelected ? accentColor + '1A' : colors.surface2,
                      borderColor: isSelected ? accentColor : colors.border,
                    },
                  ]}
                  onPress={() => setExpenseData((prev) => ({ ...prev, category: key }))}
                  activeOpacity={0.7}
                >
                  <View style={[styles.categoryIconCircle, { backgroundColor: color + '22' }]}>
                    <Ionicons name={icon as any} size={22} color={color} />
                  </View>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.categoryCardLabel,
                      { color: isSelected ? accentColor : colors.textSecondary, fontFamily: fontFamily.body },
                    ]}
                  >
                    {t(`addExpense.categories.${key}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Type — animated radio toggle */}
        <View style={[styles.section, { marginBottom: expenseData.type === 'fixed' ? 20 : 0 }]}>
          <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
            {t('addExpense.type')}
          </Text>
          <View
            style={[styles.typeToggle, { backgroundColor: colors.surface2 }]}
            onLayout={(e) => setToggleWidth(e.nativeEvent.layout.width)}
          >
            {sliderHalfWidth > 0 && (
              <Animated.View
                style={[
                  styles.typeSlider,
                  {
                    backgroundColor: accentColor + '22',
                    borderColor: accentColor,
                    width: sliderHalfWidth,
                    transform: [{
                      translateX: typeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, sliderHalfWidth],
                      }),
                    }],
                  },
                ]}
              />
            )}
            {([
              { value: 'one-time' as const, labelKey: 'addExpense.oneTime' },
              { value: 'fixed' as const, labelKey: 'addExpense.fixed' },
            ]).map(({ value, labelKey }) => {
              const isActive = expenseData.type === value;
              return (
                <TouchableOpacity
                  key={value}
                  style={styles.typeBtn}
                  onPress={() => handleTypeChange(value)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.typeBtnText,
                    {
                      color: isActive ? accentColor : colors.textSecondary,
                      fontFamily: isActive ? fontFamily.bodyMedium : fontFamily.body,
                    }
                  ]}>
                    {t(labelKey)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Fixed extra fields */}
        {expenseData.type === 'fixed' && (
          <View style={[styles.fixedBox, { backgroundColor: colors.surface2, borderColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium, marginBottom: 10 }]}>
              {t('addExpense.recurrence')}
            </Text>

            <View style={[styles.twoCol, { marginBottom: 14 }]}>
              {([
                { value: 'monthly' as const, labelKey: 'addExpense.monthly' },
                { value: 'custom' as const, labelKey: 'addExpense.custom' },
              ]).map(({ value, labelKey }) => {
                const isActive = freq === value;
                return (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.freqBtn,
                      {
                        backgroundColor: isActive ? accentColor + '22' : colors.surface3,
                        borderColor: isActive ? accentColor : colors.border,
                      },
                    ]}
                    onPress={() => handleFreqChange(value)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.freqBtnText,
                      {
                        color: isActive ? accentColor : colors.textSecondary,
                        fontFamily: isActive ? fontFamily.bodyMedium : fontFamily.body,
                      }
                    ]}>
                      {t(labelKey)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {freq === 'custom' && (
              <View style={{ marginBottom: 14 }}>
                <Text style={[styles.label, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium, marginBottom: 8 }]}>
                  {t('addExpense.selectMonths')}
                </Text>
                <View style={styles.pillGrid}>
                  {MONTH_KEYS.map((key) => {
                    const isSelected = selectedMonths.includes(key);
                    return (
                      <TouchableOpacity
                        key={key}
                        style={[
                          styles.monthPill,
                          {
                            backgroundColor: isSelected ? accentColor + '1A' : colors.surface3,
                            borderColor: isSelected ? accentColor : colors.border,
                          },
                        ]}
                        onPress={() => toggleMonth(key)}
                        activeOpacity={0.7}
                      >
                        <Text style={[
                          styles.monthPillText,
                          { color: isSelected ? accentColor : colors.textSecondary, fontFamily: fontFamily.body }
                        ]}>
                          {t(`addExpense.months.${key}`)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.checkRow} onPress={() => setNotifyMe((v) => !v)} activeOpacity={0.7}>
              <View style={[
                styles.checkbox,
                {
                  backgroundColor: notifyMe ? accentColor : 'transparent',
                  borderColor: notifyMe ? accentColor : colors.textTertiary,
                }
              ]}>
                {notifyMe && (
                  <Text style={[styles.checkMark, { color: isDark ? '#080C16' : '#FFFFFF' }]}>✓</Text>
                )}
              </View>
              <Text style={[styles.checkLabel, { color: colors.textSecondary, fontFamily: fontFamily.body }]}>
                {t('addExpense.notifyMe')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

AddExpenseBottomSheet.displayName = 'AddExpenseBottomSheet';

export default AddExpenseBottomSheet;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 22,
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
  section: {
    marginBottom: 20,
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
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryList: {
    gap: 10,
    paddingBottom: 2,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    width: 74,
  },
  categoryIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryCardLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  typeToggle: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    position: 'relative',
  },
  typeSlider: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    zIndex: 1,
  },
  typeBtnText: {
    fontSize: 13,
  },
  fixedBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 4,
  },
  freqBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
  },
  freqBtnText: {
    fontSize: 12,
  },
  monthPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  monthPillText: {
    fontSize: 11,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    fontSize: 12,
    fontWeight: '700',
  },
  checkLabel: {
    fontSize: 13,
    flex: 1,
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
