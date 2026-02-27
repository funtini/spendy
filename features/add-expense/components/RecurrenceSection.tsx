import { useTheme } from '@/contexts/ThemeContext';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MONTH_KEYS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
] as const;

const FREQ_OPTIONS = [
  { value: 'monthly' as const, labelKey: 'addExpense.monthly' },
  { value: 'custom' as const, labelKey: 'addExpense.custom' },
];

interface RecurrenceSectionProps {
  freq: 'monthly' | 'custom';
  selectedMonths: string[];
  notifyMe: boolean;
  onFreqChange: (v: 'monthly' | 'custom') => void;
  onToggleMonth: (m: string) => void;
  onToggleNotify: () => void;
}

const RecurrenceSection = ({
  freq,
  selectedMonths,
  notifyMe,
  onFreqChange,
  onToggleMonth,
  onToggleNotify,
}: RecurrenceSectionProps) => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const fontFamily = useFontFamily();
  const { isDark } = useTheme();

  return (
    <View style={[styles.box, { backgroundColor: colors.surface2, borderColor: colors.border }]}>
      <Text style={[styles.sectionLabel, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
        {t('addExpense.recurrence')}
      </Text>

      <View style={styles.freqRow}>
        {FREQ_OPTIONS.map(({ value, labelKey }) => {
          const isActive = freq === value;
          return (
            <TouchableOpacity
              key={value}
              style={[
                styles.freqBtn,
                {
                  backgroundColor: isActive ? colors.accent + '22' : colors.surface3,
                  borderColor: isActive ? colors.accent : colors.border,
                },
              ]}
              onPress={() => onFreqChange(value)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.freqBtnText,
                {
                  color: isActive ? colors.accent : colors.textSecondary,
                  fontFamily: isActive ? fontFamily.bodyMedium : fontFamily.body,
                },
              ]}>
                {t(labelKey)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {freq === 'custom' && (
        <View style={styles.monthsSection}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
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
                      backgroundColor: isSelected ? colors.accent + '1A' : colors.surface3,
                      borderColor: isSelected ? colors.accent : colors.border,
                    },
                  ]}
                  onPress={() => onToggleMonth(key)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.monthPillText,
                    { color: isSelected ? colors.accent : colors.textSecondary, fontFamily: fontFamily.body },
                  ]}>
                    {t(`addExpense.months.${key}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.checkRow} onPress={onToggleNotify} activeOpacity={0.7}>
        <View style={[
          styles.checkbox,
          {
            backgroundColor: notifyMe ? colors.accent : 'transparent',
            borderColor: notifyMe ? colors.accent : colors.textTertiary,
          },
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
  );
};

export default RecurrenceSection;

const styles = StyleSheet.create({
  box: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 0.4,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  freqRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
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
  monthsSection: {
    marginBottom: 14,
  },
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
});
