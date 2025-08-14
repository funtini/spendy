import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatisticsScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('statistics.title')}</Text>
          <Text style={styles.subtitle}>{t('statistics.subtitle')}</Text>
        </View>

        {/* Monthly Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('statistics.monthlyOverview')}</Text>
          <View style={styles.monthlyStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$2,450</Text>
              <Text style={styles.statLabel}>{t('statistics.totalSpent')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$890</Text>
              <Text style={styles.statLabel}>{t('statistics.remaining')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$3,340</Text>
              <Text style={styles.statLabel}>{t('statistics.budget')}</Text>
            </View>
          </View>
        </View>

        {/* Spending by Category */}
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

        {/* Weekly Trend */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('statistics.weeklyTrend')}</Text>
          <View style={styles.weeklyChart}>
            <View style={styles.chartBar}>
              <Text style={styles.chartLabel}>{t('statistics.weekDays.mon')}</Text>
              <View style={[styles.chartBarFill, { height: '60%' }]} />
              <Text style={styles.chartValue}>$120</Text>
            </View>
            <View style={styles.chartBar}>
              <Text style={styles.chartLabel}>{t('statistics.weekDays.tue')}</Text>
              <View style={[styles.chartBarFill, { height: '40%' }]} />
              <Text style={styles.chartValue}>$80</Text>
            </View>
            <View style={styles.chartBar}>
              <Text style={styles.chartLabel}>{t('statistics.weekDays.wed')}</Text>
              <View style={[styles.chartBarFill, { height: '80%' }]} />
              <Text style={styles.chartValue}>$160</Text>
            </View>
            <View style={styles.chartBar}>
              <Text style={styles.chartLabel}>{t('statistics.weekDays.thu')}</Text>
              <View style={[styles.chartBarFill, { height: '30%' }]} />
              <Text style={styles.chartValue}>$60</Text>
            </View>
            <View style={styles.chartBar}>
              <Text style={styles.chartLabel}>{t('statistics.weekDays.fri')}</Text>
              <View style={[styles.chartBarFill, { height: '90%' }]} />
              <Text style={styles.chartValue}>$180</Text>
            </View>
            <View style={styles.chartBar}>
              <Text style={styles.chartLabel}>{t('statistics.weekDays.sat')}</Text>
              <View style={[styles.chartBarFill, { height: '70%' }]} />
              <Text style={styles.chartValue}>$140</Text>
            </View>
            <View style={styles.chartBar}>
              <Text style={styles.chartLabel}>{t('statistics.weekDays.sun')}</Text>
              <View style={[styles.chartBarFill, { height: '50%' }]} />
              <Text style={styles.chartValue}>$100</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
  },
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
  monthlyStats: {
    flexDirection: "row",
    gap: 15,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
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
  weeklyChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 200,
    paddingTop: 20,
  },
  chartBar: {
    alignItems: "center",
    flex: 1,
  },
  chartLabel: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 10,
  },
  chartBarFill: {
    width: 20,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    marginBottom: 10,
  },
  chartValue: {
    fontSize: 10,
    color: "#8E8E93",
  },
});
