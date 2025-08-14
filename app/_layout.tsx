import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageProvider } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import '../lib/i18n'; // Initialize i18n

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <LanguageProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack> 
          <StatusBar style="auto" />
        </SafeAreaView>
      </ThemeProvider>
    </LanguageProvider>
  );
}
