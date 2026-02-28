import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { Account, AccountPicker, GRADIENT_PRESETS } from './AccountPicker';

const DEFAULT_ACCOUNTS: Account[] = [
  {
    id: 'personal',
    name: 'Personal',
    gradient: GRADIENT_PRESETS[0],
    owners: [{ email: '', alias: 'Me' }],
  },
];

export const HomeTopbar: React.FC = () => {
  const colors = useThemeColors();
  const [accounts, setAccounts] = useState<Account[]>(DEFAULT_ACCOUNTS);
  const [selectedAccountId, setSelectedAccountId] = useState('personal');

  const handleCreateAccount = useCallback((newAccount: Omit<Account, 'id'>) => {
    const id = `account-${Date.now()}`;
    setAccounts((prev) => [...prev, { id, ...newAccount }]);
    setSelectedAccountId(id);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AccountPicker
        accounts={accounts}
        selectedAccountId={selectedAccountId}
        currentUser={{ email: '', alias: 'Me' }}
        variant="pill"
        onSelect={setSelectedAccountId}
        onCreateAccount={handleCreateAccount}
      />
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface2, borderColor: colors.border, borderWidth: 1 }]}>
          <Ionicons name="notifications-outline" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface2, borderColor: colors.border, borderWidth: 1 }]}>
          <Ionicons name="settings-outline" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
