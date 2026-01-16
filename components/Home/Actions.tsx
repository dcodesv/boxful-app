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

    const colorPrimary = useThemeColor({ light: Colors.light.primary, dark: Colors.dark.primary }, 'primary');
    const colorSecondary = useThemeColor({ light: Colors.light.secondary, dark: Colors.dark.secondary }, 'secondary');

    const colorPrimaryText = useThemeColor({ light: Colors.light.primaryText, dark: Colors.dark.primaryText }, 'primaryText');
    const colorSecondaryText = useThemeColor({ light: Colors.light.secondaryText, dark: Colors.dark.secondaryText }, 'secondaryText');

    const backgroundColorLight = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

    const isFilled = variant === 'filled';
    const isPrimary = color === 'primary';

    const backgroundColor = isFilled 
        ? (isPrimary ? colorPrimary : colorSecondary)
        : backgroundColorLight;

    const borderColor = isFilled 
        ? 'transparent' 
        : (isPrimary ? colorPrimary : colorSecondary);

    const textColor = isFilled
        ? (isPrimary ? colorPrimaryText : colorSecondaryText)
        : (isPrimary ? colorPrimary : colorSecondary);

    const containerStyle: ViewStyle = {
        backgroundColor,
        borderWidth: isFilled ? 0 : 1,
        borderColor,
    };


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