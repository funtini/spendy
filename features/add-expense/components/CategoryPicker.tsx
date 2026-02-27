import { useFontFamily } from '@/hooks/useFontFamily';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { ComponentProps } from 'react';

interface Category {
  key: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  color: string;
}

const CATEGORIES: Category[] = [
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

interface CategoryPickerProps {
  selectedCategory: string;
  onSelect: (key: string) => void;
}

const CategoryPicker = ({ selectedCategory, onSelect }: CategoryPickerProps) => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const fontFamily = useFontFamily();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      nestedScrollEnabled
    >
      {CATEGORIES.map(({ key, icon, color }) => {
        const isSelected = selectedCategory === key;
        return (
          <TouchableOpacity
            key={key}
            style={[
              styles.card,
              {
                backgroundColor: isSelected ? colors.accent + '1A' : colors.surface2,
                borderColor: isSelected ? colors.accent : colors.border,
              },
            ]}
            onPress={() => onSelect(key)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, { backgroundColor: color + '22' }]}>
              <Ionicons name={icon} size={22} color={color} />
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.cardLabel,
                { color: isSelected ? colors.accent : colors.textSecondary, fontFamily: fontFamily.body },
              ]}
            >
              {t(`addExpense.categories.${key}`)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  list: {
    gap: 10,
    paddingBottom: 2,
  },
  card: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    width: 74,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
});
