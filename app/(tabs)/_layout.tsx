import { Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { AddExpenseBottomSheet, AddExpenseBottomSheetRef } from '@/features/add-expense';
import { CustomTabBar } from '@/features/shared';

export default function TabLayout() {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<AddExpenseBottomSheetRef>(null);

  const handleAddPress = () => {
    bottomSheetRef.current?.open();
  };

  return (
    <>
      <Tabs
        tabBar={(props) => (
          <CustomTabBar {...props} onAddPress={handleAddPress} />
        )}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: t('navigation.home') }}
        />
        <Tabs.Screen
          name="statistics"
          options={{ title: t('navigation.statistics') }}
        />
        <Tabs.Screen
          name="wallet"
          options={{ title: t('navigation.wallet') }}
        />
        <Tabs.Screen
          name="settings"
          options={{ title: t('navigation.settings') }}
        />
      </Tabs>

      <AddExpenseBottomSheet ref={bottomSheetRef} />
    </>
  );
}
