/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#007AFF';
const tintColorDark = '#0A84FF';

export const Colors = {
  light: {
    text: '#1C1C1E',
    background: '#F2F2F7',
    tint: tintColorLight,
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E5E5EA',
    // Additional light theme colors
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
    surface: '#FFFFFF',
    surfaceSecondary: '#F2F2F7',
    textSecondary: '#8E8E93',
    textTertiary: '#C7C7CC',
    separator: '#E5E5EA',
    highlight: '#778899',
    overlay: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: tintColorDark,
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorDark,
    card: '#1C1C1E',
    border: '#38383A',
    // Additional dark theme colors
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#64D2FF',
    surface: '#1C1C1E',
    surfaceSecondary: '#2C2C2E',
    textSecondary: '#8E8E93',
    textTertiary: '#48484A',
    separator: '#38383A',
    highlight: '#F2F2F7',
    overlay: 'rgba(255, 255, 255, 0.1)',
  },
};
