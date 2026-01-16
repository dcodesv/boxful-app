import { Platform } from 'react-native';

const tintColorLight = '#FF6139';
const tintColorDark = '#FF6139';

export const Colors = {
  light: {
    text: '#141F58',
    background: '#F9F6F6',
    backgroundSecondary: '#F3EEEC',
    tint: tintColorLight,
    primary: '#FF6139',
    primaryText: '#FFFFFF',
    secondary: '#2E49CE',
    secondaryText: '#FFFFFF',
    tertiary: '#141F58',
    tertiaryText: '#FFFFFF',
    icon: '#141F58',
    iconPrimary: '#FFFFFF',
    iconSecondary: '#141F58',
    iconTertiary: '#999491',
    tabIconDefault: '#141F58',
    tabIconSelected: tintColorLight,
    border: '#D0B9B3',
    error: '#FF0000',
    success: '#52CC52',
    warning: '#FFA500',
    onboardingDot: '#FFFFFF',
    onboardingDotActive: '#DFFB69',
  },
  dark: {
    text: '#CCC6C2',
    background: '#01050c',
    backgroundSecondary: '#1B1F26',
    tint: tintColorDark,
    primary: '#FF6139',
    primaryText: '#FFFFFF',
    secondary: '#2E49CE',
    secondaryText: '#FFFFFF',
    tertiary: '#999491',
    tertiaryText: '#FFFFFF',
    icon: '#999491',
    iconPrimary: '#FFFFFF',
    iconSecondary: '#141F58',
    iconTertiary: '#999491',
    tabIconDefault: '#999491',
    tabIconSelected: tintColorDark,
    border: '#363C59',
    error: '#FF0000',
    success: '#52CC52',
    warning: '#FFA500',
    onboardingDot: '#FFFFFF',
    onboardingDotActive: '#DFFB69',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'MonaSans-Regular',
    serif: 'MonaSans-Regular',
    rounded: 'MonaSans-Regular',
    mono: 'MonaSans-Regular',
  },
  default: {
    sans: 'MonaSans-Regular',
    serif: 'MonaSans-Regular',
    rounded: 'MonaSans-Regular',
    mono: 'MonaSans-Regular',
  },
  web: {
    sans: "MonaSans-Regular, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "MonaSans-Regular, 'Times New Roman', serif",
    rounded: "MonaSans-Regular, 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "MonaSans-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
