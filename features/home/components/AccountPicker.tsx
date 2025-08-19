import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const AccountPicker: React.FC = () => {
	const { t } = useTranslation();
	const colors = useThemeColors();
	const [isAccountPickerOpen, setIsAccountPickerOpen] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState('Personal Account');

	// Mock accounts - in real app this would come from state/props
	const accounts = [
		'Personal Account',
		'Business Account',
		'Savings Account',
		'Investment Account'
	];

	const handleAccountSelect = (account: string) => {
		setSelectedAccount(account);
		setIsAccountPickerOpen(false);
	};

	return (
		<>
			<TouchableOpacity
				style={[styles.accountPickerButton, { backgroundColor: colors.surfaceSecondary }]}
				onPress={() => setIsAccountPickerOpen(true)}
			>
				<View style={[styles.accountIcon, { backgroundColor: colors.card }]}>
					<Ionicons name="person-circle" size={20} color={colors.primary} />
				</View>
				<Text style={[styles.accountName, { color: colors.text }]} numberOfLines={1}>{selectedAccount}</Text>
				<Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
			</TouchableOpacity>

			<Modal
				visible={isAccountPickerOpen}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setIsAccountPickerOpen(false)}
			>
				<TouchableOpacity
					style={styles.modalOverlay}
					activeOpacity={1}
					onPress={() => setIsAccountPickerOpen(false)}
				>
					<View style={[styles.modalContent, { backgroundColor: colors.card }]}>
						<View style={styles.modalHeader}>
							<Text style={[styles.modalTitle, { color: colors.text }]}>{t('home.selectAccount')}</Text>
							<TouchableOpacity onPress={() => setIsAccountPickerOpen(false)}>
								<Ionicons name="close" size={24} color={colors.textSecondary} />
							</TouchableOpacity>
						</View>
						
						<FlatList
							data={accounts}
							keyExtractor={(item) => item}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={[
										styles.accountItem,
										{ borderBottomColor: colors.separator }
									]}
									onPress={() => handleAccountSelect(item)}
								>
									<View style={[styles.accountItemIcon, { backgroundColor: colors.surfaceSecondary }]}>
										<Ionicons name="person-circle" size={20} color={colors.primary} />
									</View>
									<Text style={[styles.accountItemName, { color: colors.text }]}>{item}</Text>
									{selectedAccount === item && (
										<Ionicons name="checkmark" size={20} color={colors.primary} />
									)}
								</TouchableOpacity>
							)}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	accountPickerButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 5,
		paddingVertical: 6,
		borderRadius: 18,
		maxWidth: 260,
	},
	accountIcon: {
		width: 26,
		height: 26,
		borderRadius: 13,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 6,
	},
	accountName: {
		fontSize: 13,
		fontWeight: '500',
		flexShrink: 1,
		marginRight: 6,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		width: '80%',
		maxHeight: '60%',
		borderRadius: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 8,
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		paddingBottom: 15,
		borderBottomWidth: 1,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: '600',
	},
	accountItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		borderBottomWidth: 1,
	},
	accountItemIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 15,
	},
	accountItemName: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
	},
});
