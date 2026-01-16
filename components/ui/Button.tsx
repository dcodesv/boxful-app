import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { ActivityIndicator, DimensionValue, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
    title?: string;
    onPress?: () => void;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    Icon?: React.ComponentType<{ size?: number; color?: string }>;
    iconPosition?: 'left' | 'right';
    iconColor?: string;
    width?: DimensionValue | undefined;
    style?: StyleProp<ViewStyle>;
    className?: string;
    textStyle?: StyleProp<TextStyle>;
}

export default function Button({ 
    title, 
    onPress, 
    variant = 'primary', 
    size = 'medium', 
    disabled = false,
    loading = false,
    Icon, 
    iconPosition = 'left',
    iconColor = undefined,
    width = undefined,
    style = {},
    className = '',
    textStyle = {},
}: ButtonProps) {
    // Background colors
    const colorPrimary = useThemeColor({ light: Colors.light.primary, dark: Colors.dark.primary }, 'primary');
    const colorSecondary = useThemeColor({ light: Colors.light.secondary, dark: Colors.dark.secondary }, 'secondary');

    // Text colors
    const colorPrimaryText = useThemeColor({ light: Colors.light.primaryText, dark: Colors.dark.primaryText }, 'primaryText');
    const colorSecondaryText = useThemeColor({ light: Colors.light.secondaryText, dark: Colors.dark.secondaryText }, 'secondaryText');

    // Icon colors
    const colorIconPrimary = useThemeColor({ light: Colors.light.iconPrimary, dark: Colors.dark.iconPrimary }, 'iconPrimary');
    const colorIconSecondary = useThemeColor({ light: Colors.light.iconSecondary, dark: Colors.dark.iconSecondary }, 'iconSecondary');

    const backgroundColor = variant === 'primary' ? colorPrimary : colorSecondary;
    const textColor = variant === 'primary' ? colorPrimaryText : colorSecondaryText;
    const iconColorComponent = variant === 'primary' ? colorIconPrimary : colorIconSecondary;

    const height = size === 'small' ? 42 : size === 'medium' ? 48 : 56;
    const paddingHorizontal = size === 'small' ? 16 : size === 'medium' ? 20 : 24;
    const iconSize = size === 'small' ? 20 : size === 'medium' ? 22 : 24;
    const textSize = size === 'small' ? 12 : size === 'medium' ? 14 : 16;

    const buttonStyle = [
        {
            backgroundColor,
            height,
            paddingHorizontal,
            opacity: disabled || loading ? 0.7 : 1,
            width,
        },
        styles.button,
    ];

    const textStyleComponent = [
        {
            color: textColor,
            fontSize: textSize,
        },
        styles.text,
    ];

    return (
        <TouchableOpacity 
            onPress={onPress} 
            disabled={disabled || loading} 
            activeOpacity={0.7}
            className={`flex-row items-center justify-center rounded-xl ${className}`}
            style={[buttonStyle, style]}
        >
            {loading ? (
                <ActivityIndicator size="small" color={textColor} />
            ) : (
                <>
                    {Icon && iconPosition === 'left' && (
                        <Icon size={iconSize} color={iconColorComponent || iconColor} />
                    )}
                    {title && (
                        <Text style={[styles.text, textStyleComponent, textStyle]} className="font-mona-medium">
                            {title}
                        </Text>
                    )}
                    {Icon && iconPosition === 'right' && (
                        <Icon size={iconSize} color={iconColorComponent || iconColor} />
                    )}
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    text: {
        fontSize: 14,
        fontFamily: 'MonaSans-Medium',
    },
});
