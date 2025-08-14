import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import pt from '../locales/pt.json';

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

const LANGUAGE_DETECTOR = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Get saved language from AsyncStorage
      const savedLanguage = await AsyncStorage.getItem('user-language');
      if (savedLanguage) {
        return callback(savedLanguage);
      }
      
      // If no saved language, use device locale
      const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
      const supportedLanguage = resources[deviceLanguage as keyof typeof resources] ? deviceLanguage : 'en';
      return callback(supportedLanguage);
    } catch (error) {
      // Fallback to English
      return callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem('user-language', lng);
    } catch (error) {
      // Handle error silently
    }
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: __DEV__,
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;
