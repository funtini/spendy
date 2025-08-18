import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const ProfileButton: React.FC = () => {
	const router = useRouter();
	return (
		<TouchableOpacity style={styles.profileButton} onPress={() => router.push('/(tabs)/profile')}>
			<Ionicons name="person" size={20} color="#007AFF" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	profileButton: {
		width: 34,
		height: 34,
		borderRadius: 17,
		backgroundColor: '#F2F2F7',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 15,
		marginVertical: 5,
	},
});
