import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Eye, EyeSlash } from "iconsax-react-nativejs";
import { useState } from "react";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import Text from "./Text";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export default function Input({
  label,
  error,
  showPasswordToggle = false,
  secureTextEntry,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const colorBorder = useThemeColor(
    { light: Colors.light.border, dark: Colors.dark.border },
    "border"
  );
  const colorError = useThemeColor(
    { light: Colors.light.error, dark: Colors.dark.error },
    "error"
  );
  const colorSecondary = useThemeColor(
    { light: Colors.light.secondary, dark: Colors.dark.secondary },
    "secondary"
  );
  const colorText = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );
  const colorPlaceholder = useThemeColor(
    { light: Colors.light.iconTertiary, dark: Colors.dark.iconTertiary },
    "iconTertiary"
  );
  const colorIcon = useThemeColor(
    { light: Colors.light.iconTertiary, dark: Colors.dark.iconTertiary },
    "iconTertiary"
  );

  const isPasswordInput = showPasswordToggle || secureTextEntry;
  const shouldShowPassword = isPasswordInput && showPassword;

  return (
    <View className="py-2">
      <Text
        as="p"
        variant="muted"
        size="sm"
        weight="medium"
        className="mb-1 ml-2"
        style={{
          color: error ? colorError : isFocused ? colorSecondary : colorText,
        }}
      >
        {label}
      </Text>
      <View className="relative">
        <TextInput
          {...props}
          secureTextEntry={
            isPasswordInput ? !shouldShowPassword : secureTextEntry
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colorPlaceholder}
          className="w-full border rounded-xl px-4 py-4 text-base"
          style={{
            borderColor: error
              ? colorError
              : isFocused
                ? colorSecondary
                : colorBorder,
            color: error ? colorError : isFocused ? colorSecondary : colorText,
            fontFamily: "MonaSans-Regular",
            paddingRight: isPasswordInput ? 50 : 16,
          }}
        />
        {isPasswordInput && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2"
          >
            {showPassword ? (
              <EyeSlash size={20} color={colorIcon} />
            ) : (
              <Eye size={20} color={colorIcon} />
            )}
          </Pressable>
        )}
      </View>
      {error && (
        <Text
          as="p"
          variant="error"
          size="sm"
          weight="semibold"
          className="ml-2 mt-1"
        >
          {error}
        </Text>
      )}
    </View>
  );
}
