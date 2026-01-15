import BannerLoginDark from "@/assets/images/login-banner-dark.webp";
import BannerLogin from "@/assets/images/login-banner.webp";
import LogoBoxFul from "@/assets/images/logo-boxful.svg";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { Fingerprint } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const colorScheme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (Platform.OS === "android") {
      SystemUI.setBackgroundColorAsync(backgroundColor);
    }
    return () => {
      if (Platform.OS === "android") {
        SystemUI.setBackgroundColorAsync(backgroundColor);
      }
    };
  }, [backgroundColor]);

  const handleLogin = () => {
    console.log("Iniciando sesión con:", email, password);
    router.replace("/(tabs)/delivery");
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        translucent={true}
        backgroundColor={backgroundColor}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ backgroundColor: backgroundColor, flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center flex-1 min-h-[250px] w-full relative">
            <Image
              source={colorScheme === "dark" ? BannerLoginDark : BannerLogin}
              contentFit="cover"
              contentPosition="center"
              style={{
                width: "100%",
                height: "100%",
                flex: 1,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
            <View className="items-center justify-center top-10 absolute">
              <LogoBoxFul width={150} height={80} />
            </View>
          </View>

          <View className="flex-col items-start justify-start gap-4 py-6">
            <View className="mb-4 px-6 w-full">
              <Text as="h1" variant="secondary" size="2xl" weight="semibold">
                Bienvenido a boxful 🦄
              </Text>

              <Text as="p" variant="muted" size="base" weight="medium">
                Ingresa tu correo electrónico
              </Text>
            </View>
            <View className="w-full px-6 justify-start gap-4">
              <View className="mb-4 flex gap-1">
                <View>
                  <Input
                    value={email}
                    label="Correo electrónico"
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Correo electrónico"
                  />
                </View>
                <View>
                  <Input
                    value={password}
                    label="Contraseña"
                    onChangeText={setPassword}
                    keyboardType="default"
                    autoCapitalize="none"
                    placeholder="Contraseña"
                    secureTextEntry={true}
                  />
                </View>
              </View>

              <View className="justify-start w-full gap-4">
                <Pressable className="flex-row items-center justify-center gap-2 py-1">
                  <Fingerprint
                    color={
                      colorScheme === "dark"
                        ? Colors.dark.secondary
                        : Colors.light.secondary
                    }
                    size={24}
                  />

                  <Text
                    as="p"
                    variant="muted"
                    size="base"
                    weight="medium"
                    style={{
                      color:
                        colorScheme === "dark"
                          ? Colors.dark.secondary
                          : Colors.light.secondary,
                    }}
                  >
                    Ingresar con passkey
                  </Text>
                </Pressable>

                <Button
                  title="Iniciar sesión"
                  onPress={handleLogin}
                  variant="secondary"
                  size="medium"
                  width="100%"
                />

                <View className="flex-row justify-center items-center gap-2 overflow-hidden">
                  <View
                    className="h-px w-full opacity-45"
                    style={{
                      backgroundColor:
                        colorScheme === "dark"
                          ? Colors.dark.iconTertiary
                          : Colors.light.iconTertiary,
                    }}
                  />

                  <Text as="p" variant="muted" size="base" weight="regular">
                    o también{" "}
                  </Text>

                  <View
                    className="h-px w-full opacity-45"
                    style={{
                      backgroundColor:
                        colorScheme === "dark"
                          ? Colors.dark.iconTertiary
                          : Colors.light.iconTertiary,
                    }}
                  />
                </View>

                <Pressable className="items-center py-1">
                  <Text as="p" variant="secondary" weight="semibold">
                    Registrar cuenta
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
