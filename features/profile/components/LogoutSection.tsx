import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const LogoutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.logoutButton}>
      <Ionicons name="log-out" size={20} color="#FFFFFF" />
      <Text style={styles.logoutText}>{t('profile.signOut')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FF3B30",
    margin: 20,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 10,
  },
});
