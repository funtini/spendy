import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { useSelectedAccount } from '@/contexts/AccountContext';
import { useAccounts, useCreateAccount, useAddAccountMember } from '@/hooks/queries';
import { Account, AccountPicker, GRADIENT_PRESETS } from './AccountPicker';
import type { AccountDto, AccountRole } from '@shared/types';

const gradientFromId = (id: string) =>
  GRADIENT_PRESETS[id.charCodeAt(0) % GRADIENT_PRESETS.length];

const dtoToAccount = (dto: AccountDto): Account => ({
  id: dto.id,
  name: dto.name,
  gradient: gradientFromId(dto.id),
  owners: [{ email: '', alias: dto.alias ?? dto.role, role: dto.role as AccountRole, isCurrentUser: true }],
});

export const HomeTopbar: React.FC = () => {
  const colors = useThemeColors();
  const { selectedAccountId, setSelectedAccountId } = useSelectedAccount();
  const { data: accountsData } = useAccounts();
  const createAccount = useCreateAccount();
  const addMember = useAddAccountMember();

  const accounts: Account[] = (accountsData?.data ?? []).map(dtoToAccount);
  const currentId = selectedAccountId ?? accounts[0]?.id ?? '';

  // Auto-select first account when accounts load and none is selected
  useEffect(() => {
    if (!selectedAccountId && accounts.length > 0) {
      setSelectedAccountId(accounts[0].id);
    }
  }, [accounts, selectedAccountId, setSelectedAccountId]);

  const handleCreateAccount = useCallback(
    async (newAccount: Omit<Account, 'id'>) => {
      const currentUserOwner = newAccount.owners[0];
      const alias = currentUserOwner?.alias && currentUserOwner.alias !== 'Me'
        ? currentUserOwner.alias
        : undefined;

      const result = await createAccount.mutateAsync({ name: newAccount.name, alias });
      setSelectedAccountId(result.id);

      // Add additional members (skip index 0 = current user)
      const additionalOwners = newAccount.owners.slice(1);
      for (const owner of additionalOwners) {
        if (owner.email) {
          await addMember.mutateAsync({
            accountId: result.id,
            data: { email: owner.email, alias: owner.alias || undefined, role: owner.role },
          });
        }
      }
    },
    [createAccount, setSelectedAccountId, addMember],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AccountPicker
        accounts={accounts}
        selectedAccountId={currentId}
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
