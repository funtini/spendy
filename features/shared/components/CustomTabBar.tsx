import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFontFamily } from '@/hooks/useFontFamily';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@/contexts/ThemeContext';

interface CustomTabBarProps extends BottomTabBarProps {
  onAddPress: () => void;
}

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home',
  statistics: 'bar-chart',
  wallet: 'wallet',
  settings: 'settings-sharp',
  debug: 'bug',
};

const TAB_ICONS_OUTLINE: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  statistics: 'bar-chart-outline',
  wallet: 'wallet-outline',
  settings: 'settings-outline',
  debug: 'bug-outline',
};

export const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation, onAddPress }) => {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const ff = useFontFamily();
  const { isDark } = useTheme();

  const routes = state.routes;
  const leftRoutes = routes.slice(0, 2);
  const rightRoutes = routes.slice(2);

  const fabBg = isDark ? '#4DFFA0' : '#E8533A';
  const fabIconColor = isDark ? '#080C16' : '#FFFFFF';
  const fabShadow = isDark ? '#4DFFA0' : '#E8533A';

  const renderTab = (route: typeof routes[0], index: number) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;
    const routeName = route.name;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const iconName = isFocused
      ? TAB_ICONS[routeName] ?? 'home'
      : TAB_ICONS_OUTLINE[routeName] ?? 'home-outline';

    const label = options.title ?? routeName;

    return (
      <TouchableOpacity
        key={route.key}
        style={styles.tab}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Ionicons
          name={iconName}
          size={22}
          color={isFocused ? colors.accent : colors.tabIconDefault}
        />
        <Text style={[styles.tabLabel, {
          color: isFocused ? colors.accent : colors.tabIconDefault,
          fontFamily: ff.bodyMedium,
        }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {
      backgroundColor: colors.surface,
      borderTopColor: colors.border,
      paddingBottom: insets.bottom,
      height: 70 + insets.bottom,
    }]}>
      <View style={styles.tabRow}>
        <View style={styles.tabGroup}>
          {leftRoutes.map((route, i) => renderTab(route, i))}
        </View>

        <TouchableOpacity style={styles.fabContainer} onPress={onAddPress} activeOpacity={0.85}>
          <View style={[styles.fab, {
            backgroundColor: fabBg,
            shadowColor: fabShadow,
          }]}>
            <Ionicons name="add" size={28} color={fabIconColor} />
          </View>
        </TouchableOpacity>

        <View style={styles.tabGroup}>
          {rightRoutes.map((route, i) => renderTab(route, i + 2))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
  },
  tabGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
  },
  fabContainer: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
});
