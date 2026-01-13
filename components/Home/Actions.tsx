import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Text from "../ui/Text";

interface ActionsProps {
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
    variant: 'filled' | 'outline';
    color: 'primary' | 'secondary';
}

export default function Actions({ title, icon, onPress, variant, color }: ActionsProps) {
    // Background colors
    const colorPrimary = useThemeColor({ light: Colors.light.primary, dark: Colors.dark.primary }, 'primary');
    const colorSecondary = useThemeColor({ light: Colors.light.secondary, dark: Colors.dark.secondary }, 'secondary');
    
    // Text colors for filled variant
    const colorPrimaryText = useThemeColor({ light: Colors.light.primaryText, dark: Colors.dark.primaryText }, 'primaryText');
    const colorSecondaryText = useThemeColor({ light: Colors.light.secondaryText, dark: Colors.dark.secondaryText }, 'secondaryText');
    
    // Background color for light theme (white)
    const backgroundColorLight = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

    // Determine styles based on variant and color
    const isFilled = variant === 'filled';
    const isPrimary = color === 'primary';

    // Background color
    const backgroundColor = isFilled 
        ? (isPrimary ? colorPrimary : colorSecondary)
        : backgroundColorLight;

    // Border color (only for outline)
    const borderColor = isFilled 
        ? 'transparent' 
        : (isPrimary ? colorPrimary : colorSecondary);

    // Text and icon color
    const textColor = isFilled
        ? (isPrimary ? colorPrimaryText : colorSecondaryText)
        : (isPrimary ? colorPrimary : colorSecondary);

    const containerStyle: ViewStyle = {
        backgroundColor,
        borderWidth: isFilled ? 0 : 1,
        borderColor,
    };

    // Clone icon with color if it's a React element
    const iconWithColor = icon && React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<any>, { 
            color: textColor
        } as any)
        : icon;

    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.container, containerStyle]}
            activeOpacity={0.7}
            className="items-center justify-center rounded-xl flex-col p-2"
        >
            {iconWithColor}
            <Text 
                variant={isFilled ? 'inverse' : (isPrimary ? 'primary' : 'secondary')}
                size="sm"
                weight="medium"
                style={{ color: textColor, textAlign: 'center' }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: (Dimensions.get('window').width - 74) * 0.25,
        minHeight: 68,
    },
});