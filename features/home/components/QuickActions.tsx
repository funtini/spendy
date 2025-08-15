import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const QuickActions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>
      <View style={styles.actionButtons}>
        <View style={styles.actionButton}>
          <Ionicons name="add-circle" size={24} color="#007AFF" />
          <Text style={styles.actionText}>{t('home.addExpense')}</Text>
        </View>
        
        <View style={styles.actionButton}>
          <Ionicons name="analytics" size={24} color="#34C759" />
          <Text style={styles.actionText}>{t('home.viewReports')}</Text>
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
  actionButtons: {
    flexDirection: "row",
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1C1C1E",
    marginTop: 8,
  },
});
