import { useTheme } from '@/contexts/ThemeContext';
import { useFontFamily } from '@/hooks/useFontFamily';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccountRole } from '@shared/types';

export interface GradientPreset {
  id: string;
  colors: [string, string];
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  { id: 'g1', colors: ['#4DFFA0', '#22D3EE'] }, // green → cyan
  { id: 'g2', colors: ['#5B8AF0', '#A78BFA'] }, // blue → purple
  { id: 'g3', colors: ['#FFB347', '#FF6B6B'] }, // orange → coral
  { id: 'g4', colors: ['#F093FB', '#F5576C'] }, // pink → crimson
  { id: 'g5', colors: ['#4FACFE', '#00F2FE'] }, // sky → cyan
  { id: 'g6', colors: ['#43E97B', '#38F9D7'] }, // green → teal
  { id: 'g7', colors: ['#FA709A', '#FEE140'] }, // pink → amber
  { id: 'g8', colors: ['#A18CD1', '#FBC2EB'] }, // purple → blush
];

export interface AccountOwner {
  email: string;
  alias: string;
  role: AccountRole;
}

export interface Account {
  id: string;
  name: string;
  gradient: GradientPreset;
  owners: AccountOwner[];
}

interface AccountAvatarProps {
  name: string;
  gradient: GradientPreset;
  size?: number;
  fontSize?: number;
}

export const AccountAvatar = ({ name, gradient, size = 36, fontSize = 16 }: AccountAvatarProps) => (
  <LinearGradient
    colors={gradient.colors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
  >
    <Text style={[styles.avatarText, { fontSize }]}>
      {name[0]?.toUpperCase() ?? '?'}
    </Text>
  </LinearGradient>
);

interface AccountPickerProps {
  accounts: Account[];
  selectedAccountId: string;
  currentUser?: { email: string; alias: string };
  variant?: 'pill' | 'input';
  onSelect: (accountId: string) => void;
  onCreateAccount?: (account: Omit<Account, 'id'>) => void;
}

type Screen = 'list' | 'create';

interface OwnerEntry {
  email: string;
  alias: string;
  role: AccountRole;
  isCurrentUser: boolean;
}

const ROLES: AccountRole[] = [AccountRole.OWNER, AccountRole.EDITOR, AccountRole.VIEWER];
const ROLE_LABEL: Record<AccountRole, string> = {
  [AccountRole.OWNER]: 'Owner',
  [AccountRole.EDITOR]: 'Editor',
  [AccountRole.VIEWER]: 'Viewer',
};

const EMPTY_USER = { email: '', alias: '' };

export const AccountPicker = ({
  accounts,
  selectedAccountId,
  currentUser = EMPTY_USER,
  variant = 'pill',
  onSelect,
  onCreateAccount,
}: AccountPickerProps) => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const fontFamily = useFontFamily();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [modalVisible, setModalVisible] = useState(false);
  const [screen, setScreen] = useState<Screen>('list');

  const [newName, setNewName] = useState('');
  const [newGradient, setNewGradient] = useState<GradientPreset>(GRADIENT_PRESETS[0]);
  // owners already confirmed (shown as chips); starts with "Me" (current user)
  const [owners, setOwners] = useState<OwnerEntry[]>([
    { email: currentUser.email, alias: currentUser.alias || 'Me', role: AccountRole.OWNER, isCurrentUser: true },
  ]);
  // the pending "add new owner" form
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingAlias, setPendingAlias] = useState('');
  const [pendingRole, setPendingRole] = useState<AccountRole>(AccountRole.EDITOR);

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId);

  const resetForm = useCallback(() => {
    setNewName('');
    setNewGradient(GRADIENT_PRESETS[0]);
    setOwners([{ email: currentUser.email, alias: currentUser.alias || 'Me', role: AccountRole.OWNER, isCurrentUser: true }]);
    setPendingEmail('');
    setPendingAlias('');
    setPendingRole(AccountRole.EDITOR);
    setScreen('list');
  }, [currentUser.email, currentUser.alias]);

  const openModal = useCallback(() => {
    setModalVisible(true);
    setScreen('list');
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    resetForm();
  }, [resetForm]);

  const handleSelect = useCallback((accountId: string) => {
    onSelect(accountId);
    setModalVisible(false);
  }, [onSelect]);

  const handleAddOwner = useCallback(() => {
    if (!pendingEmail.trim()) return;
    setOwners((prev) => [
      ...prev,
      { email: pendingEmail.trim(), alias: pendingAlias.trim(), role: pendingRole, isCurrentUser: false },
    ]);
    setPendingEmail('');
    setPendingAlias('');
    setPendingRole(AccountRole.EDITOR);
  }, [pendingEmail, pendingAlias, pendingRole]);

  const handleRemoveOwner = useCallback((index: number) => {
    setOwners((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleCreate = useCallback(() => {
    if (!newName.trim() || !onCreateAccount) return;
    onCreateAccount({
      name: newName.trim(),
      gradient: newGradient,
      owners,
    });
    closeModal();
  }, [newName, newGradient, owners, onCreateAccount, closeModal]);

  const canCreate = newName.trim().length > 0;
  const canAddPending = pendingEmail.trim().length > 0;

  const triggerStyle = variant === 'pill'
    ? [styles.triggerPill, { backgroundColor: colors.surface2 }]
    : [styles.triggerInput, { backgroundColor: colors.surface2, borderColor: colors.border }];

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity style={triggerStyle} onPress={openModal} activeOpacity={0.7}>
        {selectedAccount ? (
          <>
            <AccountAvatar
              name={selectedAccount.name}
              gradient={selectedAccount.gradient}
              size={variant === 'pill' ? 24 : 22}
              fontSize={variant === 'pill' ? 11 : 10}
            />
            <Text
              style={[
                variant === 'pill' ? styles.triggerPillText : styles.triggerInputText,
                { color: colors.text, fontFamily: fontFamily.body },
              ]}
              numberOfLines={1}
            >
              {selectedAccount.name}
            </Text>
          </>
        ) : (
          <>
            <Ionicons name="wallet-outline" size={16} color={colors.secondary} />
            <Text
              style={[
                variant === 'pill' ? styles.triggerPillText : styles.triggerInputText,
                { color: colors.textTertiary, fontFamily: fontFamily.body },
              ]}
            >
              {t('addExpense.selectAccount')}
            </Text>
          </>
        )}
        <Ionicons name="chevron-down" size={14} color={colors.textTertiary} />
      </TouchableOpacity>

      {/* Picker modal */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={closeModal}>
        <View style={styles.overlay}>
          <TouchableOpacity style={StyleSheet.absoluteFillObject} activeOpacity={1} onPress={closeModal} />

          <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
            <View style={styles.handleWrap}>
              <View style={[styles.handle, { backgroundColor: colors.surface3 }]} />
            </View>

            {/* Header */}
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
              {screen === 'create' ? (
                <TouchableOpacity onPress={() => setScreen('list')} style={styles.navBtn} activeOpacity={0.7}>
                  <Ionicons name="arrow-back" size={20} color={colors.text} />
                </TouchableOpacity>
              ) : (
                <View style={styles.navBtn} />
              )}
              <Text style={[styles.headerTitle, { color: colors.text, fontFamily: fontFamily.headingBold }]}>
                {screen === 'create' ? t('addExpense.newAccount') : t('addExpense.selectAccount')}
              </Text>
              <TouchableOpacity onPress={closeModal} style={[styles.closeBtn, { backgroundColor: colors.surface2 }]}>
                <Ionicons name="close" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {screen === 'list' ? (
              /* ─── Account list ─── */
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
              >
                {accounts.map((account) => {
                  const isSelected = account.id === selectedAccountId;
                  return (
                    <TouchableOpacity
                      key={account.id}
                      style={[
                        styles.accountRow,
                        {
                          backgroundColor: isSelected ? colors.accent + '12' : colors.surface2,
                          borderColor: isSelected ? colors.accent : colors.border,
                        },
                      ]}
                      onPress={() => handleSelect(account.id)}
                      activeOpacity={0.7}
                    >
                      <AccountAvatar name={account.name} gradient={account.gradient} size={42} fontSize={18} />
                      <View style={styles.accountInfo}>
                        <Text style={[styles.accountName, { color: colors.text, fontFamily: fontFamily.bodyMedium }]}>
                          {account.name}
                        </Text>
                        <Text style={[styles.accountOwners, { color: colors.textTertiary, fontFamily: fontFamily.body }]}>
                          {account.owners.map((o) => o.alias || o.email).join(', ')}
                        </Text>
                      </View>
                      {isSelected && <Ionicons name="checkmark-circle" size={22} color={colors.accent} />}
                    </TouchableOpacity>
                  );
                })}

                {/* Create new — only when onCreateAccount is provided */}
                {onCreateAccount && (
                  <TouchableOpacity
                    style={[styles.createRow, { borderColor: colors.border }]}
                    onPress={() => setScreen('create')}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.createIcon, { backgroundColor: colors.surface3 }]}>
                      <Ionicons name="add" size={22} color={colors.accent} />
                    </View>
                    <Text style={[styles.createText, { color: colors.accent, fontFamily: fontFamily.bodyMedium }]}>
                      {t('addExpense.createAccount')}
                    </Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            ) : (
              /* ─── Create account form ─── */
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
              >
                {/* Live preview */}
                <View style={styles.previewRow}>
                  <AccountAvatar name={newName || '?'} gradient={newGradient} size={60} fontSize={26} />
                  <Text
                    style={[
                      styles.previewName,
                      {
                        color: newName ? colors.text : colors.textTertiary,
                        fontFamily: newName ? fontFamily.headingBold : fontFamily.body,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {newName || t('addExpense.accountNamePlaceholder')}
                  </Text>
                </View>

                {/* Name */}
                <View style={styles.formSection}>
                  <Text style={[styles.formLabel, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
                    {t('addExpense.accountName')}
                  </Text>
                  <TextInput
                    style={[styles.formInput, {
                      backgroundColor: colors.surface2,
                      color: colors.text,
                      fontFamily: fontFamily.body,
                      borderColor: colors.border,
                    }]}
                    placeholder={t('addExpense.accountNamePlaceholder')}
                    placeholderTextColor={colors.textTertiary}
                    value={newName}
                    onChangeText={setNewName}
                  />
                </View>

                {/* Gradient color picker */}
                <View style={styles.formSection}>
                  <Text style={[styles.formLabel, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
                    {t('addExpense.labelColor')}
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.swatchRow}
                    nestedScrollEnabled
                  >
                    {GRADIENT_PRESETS.map((preset) => {
                      const isActive = newGradient.id === preset.id;
                      return (
                        <TouchableOpacity
                          key={preset.id}
                          onPress={() => setNewGradient(preset)}
                          activeOpacity={0.8}
                          style={[
                            styles.swatchWrap,
                            { borderColor: isActive ? colors.text : 'transparent' },
                          ]}
                        >
                          <LinearGradient
                            colors={preset.colors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.swatch}
                          />
                          {isActive && (
                            <View style={styles.swatchCheck}>
                              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>

                {/* Owners section */}
                <View style={styles.formSection}>
                  <Text style={[styles.formLabel, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
                    {t('addExpense.owners')}
                  </Text>

                  {/* Preview chips of confirmed owners */}
                  <View style={styles.ownerChips}>
                    {owners.map((owner, index) => (
                      <View
                        key={index}
                        style={[styles.ownerChip, { backgroundColor: colors.surface2, borderColor: colors.border }]}
                      >
                        <View style={[styles.ownerChipAvatar, { backgroundColor: colors.accent + '22' }]}>
                          <Text style={[styles.ownerChipAvatarText, { color: colors.accent, fontFamily: fontFamily.bodyBold }]}>
                            {(owner.alias || owner.email)[0]?.toUpperCase() ?? '?'}
                          </Text>
                        </View>
                        <View style={styles.ownerChipInfo}>
                          <Text style={[styles.ownerChipAlias, { color: colors.text, fontFamily: fontFamily.bodyMedium }]}>
                            {owner.isCurrentUser ? 'Me' : (owner.alias || owner.email)}
                          </Text>
                          <Text style={[styles.ownerChipRole, { color: colors.textTertiary, fontFamily: fontFamily.body }]}>
                            {ROLE_LABEL[owner.role]}
                          </Text>
                        </View>
                        {!owner.isCurrentUser && (
                          <TouchableOpacity onPress={() => handleRemoveOwner(index)} activeOpacity={0.7}>
                            <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>

                  {/* Add new owner form */}
                  <View style={[styles.addOwnerForm, { backgroundColor: colors.surface2, borderColor: colors.border }]}>
                    <Text style={[styles.addOwnerFormLabel, { color: colors.textSecondary, fontFamily: fontFamily.bodyMedium }]}>
                      Add member
                    </Text>
                    <TextInput
                      style={[styles.addOwnerInput, { color: colors.text, fontFamily: fontFamily.body, borderBottomColor: colors.border }]}
                      placeholder="Email address"
                      placeholderTextColor={colors.textTertiary}
                      value={pendingEmail}
                      onChangeText={setPendingEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    <TextInput
                      style={[styles.addOwnerInput, { color: colors.text, fontFamily: fontFamily.body, borderBottomColor: colors.border }]}
                      placeholder="Alias (display name)"
                      placeholderTextColor={colors.textTertiary}
                      value={pendingAlias}
                      onChangeText={setPendingAlias}
                    />

                    {/* Role picker */}
                    <View style={styles.rolePicker}>
                      {ROLES.map((role) => {
                        const active = pendingRole === role;
                        return (
                          <TouchableOpacity
                            key={role}
                            style={[
                              styles.roleBtn,
                              {
                                backgroundColor: active ? colors.accent : colors.surface3,
                                borderColor: active ? colors.accent : colors.border,
                              },
                            ]}
                            onPress={() => setPendingRole(role)}
                            activeOpacity={0.7}
                          >
                            <Text style={[styles.roleBtnText, {
                              color: active ? (isDark ? '#080C16' : '#fff') : colors.textSecondary,
                              fontFamily: fontFamily.bodyMedium,
                            }]}>
                              {ROLE_LABEL[role]}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    <TouchableOpacity
                      style={[styles.addBtn, { backgroundColor: canAddPending ? colors.accent + '22' : colors.surface3, borderColor: canAddPending ? colors.accent : colors.border }]}
                      onPress={handleAddOwner}
                      disabled={!canAddPending}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="add" size={16} color={canAddPending ? colors.accent : colors.textTertiary} />
                      <Text style={[styles.addBtnText, { color: canAddPending ? colors.accent : colors.textTertiary, fontFamily: fontFamily.bodyMedium }]}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Submit */}
                <TouchableOpacity
                  style={[styles.submitBtn, { backgroundColor: canCreate ? colors.accent : colors.surface3 }]}
                  onPress={handleCreate}
                  activeOpacity={0.85}
                  disabled={!canCreate}
                >
                  <Text style={[styles.submitText, {
                    fontFamily: fontFamily.bodyBold,
                    color: canCreate ? (isDark ? '#080C16' : '#FFFFFF') : colors.textTertiary,
                  }]}>
                    {t('addExpense.createAccountBtn')}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // Trigger variants
  triggerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    gap: 7,
    maxWidth: 260,
  },
  triggerPillText: {
    fontSize: 13,
    flexShrink: 1,
  },
  triggerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 8,
    borderWidth: 1,
  },
  triggerInputText: {
    flex: 1,
    fontSize: 14,
  },
  // Avatar
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  // Modal
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    maxHeight: '85%',
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  navBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    flex: 1,
    textAlign: 'center',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  // Account list
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 15,
    marginBottom: 2,
  },
  accountOwners: {
    fontSize: 12,
  },
  createRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 12,
    marginTop: 4,
  },
  createIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    fontSize: 15,
  },
  // Create form
  previewRow: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  previewName: {
    fontSize: 20,
  },
  formSection: {
    marginBottom: 22,
  },
  formLabel: {
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  formInput: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
  },
  swatchRow: {
    gap: 10,
    paddingBottom: 4,
  },
  swatchWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 2,
    overflow: 'hidden',
  },
  swatch: {
    width: '100%',
    height: '100%',
  },
  swatchCheck: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: 1,
  },
  // Owner chips (preview)
  ownerChips: {
    gap: 8,
    marginBottom: 12,
  },
  ownerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ownerChipAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerChipAvatarText: {
    fontSize: 13,
  },
  ownerChipInfo: {
    flex: 1,
  },
  ownerChipAlias: {
    fontSize: 14,
    marginBottom: 1,
  },
  ownerChipRole: {
    fontSize: 11,
  },
  // Add owner form
  addOwnerForm: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 0,
  },
  addOwnerFormLabel: {
    fontSize: 11,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  addOwnerInput: {
    paddingVertical: 10,
    paddingHorizontal: 2,
    fontSize: 14,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  rolePicker: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  roleBtn: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  roleBtnText: {
    fontSize: 12,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
  },
  addBtnText: {
    fontSize: 14,
  },
  submitBtn: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  submitText: {
    fontSize: 16,
  },
});
