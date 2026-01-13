import { useFonts } from 'expo-font';

//Mapa con todas las fuentes MonaSans disponibles
export const fontMap = {
  'MonaSans-Regular': require('../assets/fonts/MonaSans-Regular.ttf'),
  'MonaSans-Light': require('../assets/fonts/MonaSans-Light.ttf'),
  'MonaSans-Medium': require('../assets/fonts/MonaSans-Medium.ttf'),
  'MonaSans-SemiBold': require('../assets/fonts/MonaSans-SemiBold.ttf'),
  'MonaSans-Bold': require('../assets/fonts/MonaSans-Bold.ttf'),
  'MonaSans-ExtraBold': require('../assets/fonts/MonaSans-ExtraBold.ttf'),
  'MonaSans-Black': require('../assets/fonts/MonaSans-Black.ttf'),
} as const;

export function useCustomFonts() {
  const [fontsLoaded, fontError] = useFonts(fontMap);
  return [fontsLoaded, fontError] as const;
}

export const fontNames = {
  regular: 'MonaSans-Regular',
  light: 'MonaSans-Light',
  medium: 'MonaSans-Medium',
  semibold: 'MonaSans-SemiBold',
  bold: 'MonaSans-Bold',
  extrabold: 'MonaSans-ExtraBold',
  black: 'MonaSans-Black',
} as const;
