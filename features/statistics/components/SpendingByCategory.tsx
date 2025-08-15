import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const SpendingByCategory: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('statistics.spendingByCategory')}</Text>
      <View style={styles.categoryItem}>
        <View style={styles.categoryIcon}>
          <Ionicons name="restaurant" size={20} color="#FF9500" />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{t('statistics.categories.foodDining')}</Text>
          <Text style={styles.categoryAmount}>$650</Text>
        </View>
        <View style={styles.categoryBar}>
          <View style={[styles.categoryProgress, { width: '65%', backgroundColor: '#FF9500' }]} />
        </View>
      </View>
      
      <View style={styles.categoryItem}>
        <View style={styles.categoryIcon}>
          <Ionicons name="car" size={20} color="#007AFF" />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{t('statistics.categories.transportation')}</Text>
          <Text style={styles.categoryAmount}>$420</Text>
        </View>
        <View style={styles.categoryBar}>
          <View style={[styles.categoryProgress, { width: '42%', backgroundColor: '#007AFF' }]} />
        </View>
      </View>
      
      <View style={styles.categoryItem}>
        <View style={styles.categoryIcon}>
          <Ionicons name="shirt" size={20} color="#AF52DE" />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{t('statistics.categories.shopping')}</Text>
          <Text style={styles.categoryAmount}>$380</Text>
        </View>
        <View style={styles.categoryBar}>
          <View style={[styles.categoryProgress, { width: '38%', backgroundColor: '#AF52DE' }]} />
        </View>
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
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
    marginBottom: 2,
  },
  categoryAmount: {
    fontSize: 14,
    color: "#8E8E93",
  },
  categoryBar: {
    width: 80,
    height: 8,
    backgroundColor: "#F2F2F7",
    borderRadius: 4,
    overflow: "hidden",
  },
  categoryProgress: {
    height: "100%",
    borderRadius: 4,
  },
});
