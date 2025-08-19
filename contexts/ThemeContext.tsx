import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedThemeMode = await AsyncStorage.getItem('theme-mode');
      if (savedThemeMode !== null) {
        setThemeModeState(savedThemeMode as ThemeMode);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem('theme-mode', mode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Determine if dark mode should be active
  const isDark = themeMode === 'system' 
    ? systemColorScheme === 'dark'
    : themeMode === 'dark';

  const value: ThemeContextType = {
    themeMode,
    isDark,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
