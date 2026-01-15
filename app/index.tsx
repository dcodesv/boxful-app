import { Redirect } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true); 
  const hasSeenOnboarding = false;
  const isAuthenticated = false;

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-orange-500 font-bold">Cargando Boxful...</Text>
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