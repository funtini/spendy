import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode);
  };

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        {availableLanguages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.compactOption,
              currentLanguage === lang.code && styles.compactOptionActive
            ]}
            onPress={() => handleLanguageChange(lang.code)}
          >
            <Text style={[
              styles.compactOptionText,
              currentLanguage === lang.code && styles.compactOptionTextActive
            ]}>
              {lang.code.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {availableLanguages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.option,
              currentLanguage === lang.code && styles.optionActive
            ]}
            onPress={() => handleLanguageChange(lang.code)}
          >
            <Text style={[
              styles.optionText,
              currentLanguage === lang.code && styles.optionTextActive
            ]}>
              {lang.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  compactContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  compactOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  compactOptionActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  compactOptionText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8E8E93',
  },
  compactOptionTextActive: {
    color: '#FFFFFF',
  },
});
