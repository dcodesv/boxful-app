import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import '../global.css';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCustomFonts } from '@/utils/fonts';

// Mantener la pantalla de splash visible mientras se cargan las fuentes
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [fontsLoaded, fontError] = useCustomFonts();
  
  // Obtener el color de fondo según el tema
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Ocultar la pantalla de splash cuando las fuentes estén cargadas o haya un error
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Configurar el color de fondo de la barra de estado de Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemUI.setBackgroundColorAsync(backgroundColor);
    }
  }, [backgroundColor]);

  // No renderizar hasta que las fuentes estén cargadas
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar 
          style={colorScheme === 'dark' ? 'light' : 'dark'} 
          backgroundColor={backgroundColor}
        />
      </ThemeProvider>
  );
}
