import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Text as TextComponent, TextProps } from 'react-native';

type TextVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'muted' | 'inverse' | 'error' | 'success' | 'warning';
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

interface CustomTextProps extends TextProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    variant?: TextVariant;
    size?: TextSize;
    weight?: TextWeight;
}

export default function Text({ 
    children, 
    as, 
    variant = 'default',
    size,
    weight = 'regular',
    style,
    className,
    ...props 
}: CustomTextProps) {
    // Mapeo de tamaños basado en 'as' si no se especifica size
    const sizeMap: Record<string, TextSize> = {
        h1: '4xl',
        h2: '3xl',
        h3: '2xl',
        h4: 'xl',
        h5: 'lg',
        h6: 'base',
        p: 'base',
        span: 'base',
        div: 'base',
    } as const;

    const finalSize = size || (as ? sizeMap[as] : 'base');

    // Mapeo de tamaños a clases de Tailwind
    const sizeClasses: Record<TextSize, string> = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
    };

    // Mapeo de pesos a clases de Tailwind
    const weightClasses: Record<TextWeight, string> = {
        light: 'font-light',
        regular: 'font-regular',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black',
    };

    // Colores basados en variante y tema
    const colorDefault = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
    const colorPrimary = useThemeColor({ light: Colors.light.primary, dark: Colors.dark.primary }, 'primary');
    const colorSecondary = useThemeColor({ light: Colors.light.secondary, dark: Colors.dark.secondary }, 'secondary');
    const colorTertiary = useThemeColor({ light: Colors.light.tertiary, dark: Colors.dark.tertiary }, 'tertiary');
    const colorMuted = useThemeColor({ light: Colors.light.iconTertiary, dark: Colors.dark.iconTertiary }, 'iconTertiary');
    const colorInverse = useThemeColor({ light: Colors.dark.text, dark: Colors.light.text }, 'text');
    const colorError = useThemeColor({ light: Colors.light.error, dark: Colors.dark.error }, 'error');
    const colorSuccess = useThemeColor({ light: Colors.light.success, dark: Colors.dark.success }, 'success');
    const colorWarning = useThemeColor({ light: Colors.light.warning, dark: Colors.dark.warning }, 'warning');

    const variantColors: Record<TextVariant, string> = {
        default: colorDefault,
        primary: colorPrimary,
        secondary: colorSecondary,
        tertiary: colorTertiary,
        muted: colorMuted,
        inverse: colorInverse,
        error: colorError,
        success: colorSuccess,
        warning: colorWarning,
    };

    const textColor = variantColors[variant];
    
    // Combinar className interno con el className pasado como prop
    const baseClassName = `${sizeClasses[finalSize]} ${weightClasses[weight]}`;
    const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;

    return (
        <TextComponent 
            className={combinedClassName}
            style={[{ color: textColor }, style]}
            {...props}
        >
            {children}
        </TextComponent>
    );
}