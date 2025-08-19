import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const ProfileButton: React.FC = () => {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <TouchableOpacity 
      style={[styles.profileButton, { backgroundColor: colors.surfaceSecondary }]} 
      onPress={() => router.push('/profile')}
    >
      <Ionicons name="person" size={20} color={colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    alignSelf: 'center',
  },
});
