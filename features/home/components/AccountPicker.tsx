import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const AccountPicker: React.FC = () => {
	const { t } = useTranslation();
	const [isAccountPickerOpen, setIsAccountPickerOpen] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState('Personal Account');

	const accounts = [
		{ id: '1', name: 'Personal Account', type: 'personal' },
		{ id: '2', name: 'Business Account', type: 'business' },
		{ id: '3', name: 'Savings Account', type: 'savings' },
	];

	const handleAccountSelect = (account: { id: string; name: string; type: string }) => {
		setSelectedAccount(account.name);
		setIsAccountPickerOpen(false);
	};

	return (
		<>
			<TouchableOpacity
				style={styles.accountPickerButton}
				onPress={() => setIsAccountPickerOpen(true)}
			>
				<View style={styles.accountIcon}>
					<Ionicons name="person-circle" size={20} color="#007AFF" />
				</View>
				<Text style={styles.accountName} numberOfLines={1}>{selectedAccount}</Text>
				<Ionicons name="chevron-down" size={14} color="#8E8E93" />
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
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>{t('home.selectAccount')}</Text>
							<TouchableOpacity onPress={() => setIsAccountPickerOpen(false)}>
								<Ionicons name="close" size={20} color="#8E8E93" />
							</TouchableOpacity>
						</View>
						<FlatList
							data={accounts}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={[styles.accountItem, selectedAccount === item.name && styles.selectedAccountItem]}
									onPress={() => handleAccountSelect(item)}
								>
									<View style={styles.accountItemIcon}>
										<Ionicons
											name={item.type === 'business' ? 'business' : item.type === 'savings' ? 'wallet' : 'person-circle'}
											size={18}
											color="#007AFF"
										/>
									</View>
									<Text style={[styles.accountItemName, selectedAccount === item.name && styles.selectedAccountItemName]}>
										{item.name}
									</Text>
									{selectedAccount === item.name && (
										<Ionicons name="checkmark" size={18} color="#007AFF" />
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
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 6,
	},
	accountName: {
		fontSize: 13,
		fontWeight: '500',
		color: '#1C1C1E',
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
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		width: '80%',
		maxHeight: '60%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 12,
		elevation: 8,
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E5EA',
	},
	modalTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1C1C1E',
	},
	accountItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 14,
		borderTopWidth: 1,
		borderTopColor: '#F2F2F7',
	},
	selectedAccountItem: {
		backgroundColor: '#F0F8FF',
	},
	accountItemIcon: {
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: '#F2F2F7',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	accountItemName: {
		fontSize: 15,
		color: '#1C1C1E',
		flex: 1,
	},
	selectedAccountItemName: {
		fontWeight: '600',
		color: '#007AFF',
	},
});
