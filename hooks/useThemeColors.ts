import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

export const useThemeColors = () => {
  const { isDark } = useTheme();
  const colorScheme = isDark ? 'dark' : 'light';
  
  return Colors[colorScheme];
};
