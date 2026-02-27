import { useTheme } from '@/contexts/ThemeContext';
import { FontFamily, FontFamilyLight } from '@/constants/Styles';

export const useFontFamily = () => {
  const { isDark } = useTheme();
  return isDark ? FontFamily : FontFamilyLight;
};
