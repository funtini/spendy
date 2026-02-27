import { useFontFamily } from '@/hooks/useFontFamily';
import { useThemeColors } from '@/hooks/useThemeColors';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OPTIONS = [
  { value: 'one-time' as const, labelKey: 'addExpense.oneTime' },
  { value: 'fixed' as const, labelKey: 'addExpense.fixed' },
];

interface TypeToggleProps {
  type: 'one-time' | 'fixed';
  typeAnim: Animated.Value;
  onChangeType: (type: 'one-time' | 'fixed') => void;
}

const TypeToggle = ({ type, typeAnim, onChangeType }: TypeToggleProps) => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const fontFamily = useFontFamily();
  const [toggleWidth, setToggleWidth] = useState(0);

  const sliderHalfWidth = toggleWidth > 0 ? (toggleWidth - 8) / 2 : 0;

  return (
    <View
      style={[styles.toggle, { backgroundColor: colors.surface2 }]}
      onLayout={(e) => setToggleWidth(e.nativeEvent.layout.width)}
    >
      {sliderHalfWidth > 0 && (
        <Animated.View
          style={[
            styles.slider,
            {
              backgroundColor: colors.accent + '22',
              borderColor: colors.accent,
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
      {OPTIONS.map(({ value, labelKey }) => {
        const isActive = type === value;
        return (
          <TouchableOpacity
            key={value}
            style={styles.btn}
            onPress={() => onChangeType(value)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.btnText,
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
  );
};

export default TypeToggle;

const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  btn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    zIndex: 1,
  },
  btnText: {
    fontSize: 13,
  },
});
