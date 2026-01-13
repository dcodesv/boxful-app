import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/Haptics';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { CalendarSearch, ChartSuccess, Home2, MenuBoard, Profile } from 'iconsax-react-nativejs';

export default function TabLayout() {
  const colorBackground = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const tabIconDefault = useThemeColor({ light: Colors.light.tabIconDefault, dark: Colors.dark.tabIconDefault }, 'tabIconDefault');
  const tabIconSelected = useThemeColor({ light: Colors.light.tabIconSelected, dark: Colors.dark.tabIconSelected }, 'tabIconSelected');
  const tabBarIcons = [
    {
      name: 'delivery',
      title: 'Envío',
      icon: Home2,
    },
    {
      name: 'history',
      title: 'Historial',
      icon: CalendarSearch,
    },
    {
      name: 'analitics',
      title: 'Analíticas',
      icon: ChartSuccess,
    },
    {
      name: 'facturacion',
      title: 'Facturación',
      icon: MenuBoard,
    },
    {
      name: 'cuenta',
      title: 'Cuenta',
      icon: Profile,
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabIconSelected,
        tabBarInactiveTintColor: tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colorBackground,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
          height: 80,
          paddingTop: 6,
        },
      }}>
      {tabBarIcons.map((tab) => {
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color }) => (
                <tab.icon
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
