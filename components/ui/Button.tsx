import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { DimensionValue, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    title?: string;
    onPress?: () => void;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    Icon?: React.ComponentType<{ size?: number; color?: string }>;
    iconPosition?: 'left' | 'right';
    width?: DimensionValue | undefined;
}

export default function Button({ 
    title, 
    onPress, 
    variant = 'primary', 
    size = 'medium', 
    disabled = false, 
    Icon, 
    iconPosition = 'left',
    width = undefined,
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
    const iconColor = variant === 'primary' ? colorIconPrimary : colorIconSecondary;

    const height = size === 'small' ? 42 : size === 'medium' ? 48 : 56;
    const paddingHorizontal = size === 'small' ? 16 : size === 'medium' ? 20 : 24;
    const iconSize = size === 'small' ? 20 : size === 'medium' ? 22 : 24;
    const textSize = size === 'small' ? 12 : size === 'medium' ? 14 : 16;

    const buttonStyle = [
        styles.button,
        {
            backgroundColor,
            height,
            paddingHorizontal,
            opacity: disabled ? 0.5 : 1,
            width,
        }
    ];

    const textStyle = [
        styles.text,
        {
            color: textColor,
            fontSize: textSize,
        }
    ];

    return (
        <TouchableOpacity 
            onPress={onPress} 
            disabled={disabled} 
            style={buttonStyle}
            activeOpacity={0.7}
            className="flex-row items-center justify-center rounded-xl"
        >
            {Icon && iconPosition === 'left' && (
                <Icon size={iconSize} color={iconColor} />
            )}
            {title && (
                <Text style={textStyle} className="font-mona-medium">
                    {title}
                </Text>
            )}
            {Icon && iconPosition === 'right' && (
                <Icon size={iconSize} color={iconColor} />
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
