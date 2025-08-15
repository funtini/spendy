import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const WeeklyTrend: React.FC = () => {
  const { t } = useTranslation();

  return (
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
