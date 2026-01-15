import bandSplash from '@/assets/images/bandSplash.webp';
import LogoBoxFul from '@/assets/images/logo-boxful.svg';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Image } from 'expo-image';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true); 
  const hasSeenOnboarding = false;
  const isAuthenticated = false;
  const backgroundColor = useThemeColor({ light: Colors.light.backgroundSecondary, dark: Colors.dark.backgroundSecondary }, 'backgroundSecondary');

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center"
      style={{
        backgroundColor: backgroundColor,
      }}
      >
        <LogoBoxFul width={150} height={80} />
        <Image source={bandSplash}
        contentFit="cover"
        contentPosition="center"
        style={{ width: '100%', height: 300, position: 'absolute', bottom: 0 }}
         />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/delivery" />;
  }
  if (!hasSeenOnboarding) {
    return <Redirect href="/(public)/onboarding" />;
  }
  return <Redirect href="/(public)/login" />;
}