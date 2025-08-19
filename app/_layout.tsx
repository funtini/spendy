import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import '../lib/i18n'; // Initialize i18n

function AppContent() {
  const { isDark } = useTheme();
  const colors = useThemeColors();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={['bottom']}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="transactions" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </SafeAreaView>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
