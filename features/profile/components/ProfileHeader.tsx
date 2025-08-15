import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ProfileHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#FFFFFF" />
        </View>
        <TouchableOpacity style={styles.editAvatar}>
          <Ionicons name="camera" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.userName}>John Doe</Text>
      <Text style={styles.userEmail}>john.doe@example.com</Text>
      <Text style={styles.memberSince}>{t('profile.memberSince', { date: 'January 2024' })}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 14,
    color: "#C7C7CC",
  },
});
