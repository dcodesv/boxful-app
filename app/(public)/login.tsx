import FingerPrint from "@/assets/icons/fingerprint.svg";
import BannerLoginDark from "@/assets/images/login-banner-dark.webp";
import BannerLogin from "@/assets/images/login-banner.webp";
import LogoBoxFul from "@/assets/images/logo-boxful.svg";
import AlertModal from "@/components/AlertModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as SystemUI from "expo-system-ui";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const colorScheme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notEnabledModal, setNotEnabledModal] = useState(false);

  // Animaciones
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(30);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(30);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(30);

  useEffect(() => {
    // Animación del logo
    logoOpacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) });
    logoScale.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.back(1.1)) });
    
    // Animación del header con delay
    headerOpacity.value = withDelay(200, withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }));
    headerTranslateY.value = withDelay(200, withTiming(0, { duration: 450, easing: Easing.out(Easing.cubic) }));
    
    // Animación del formulario con más delay
    formOpacity.value = withDelay(350, withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }));
    formTranslateY.value = withDelay(350, withTiming(0, { duration: 450, easing: Easing.out(Easing.cubic) }));
    
    // Animación de los botones con aún más delay
    buttonsOpacity.value = withDelay(500, withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }));
    buttonsTranslateY.value = withDelay(500, withTiming(0, { duration: 450, easing: Easing.out(Easing.cubic) }));
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

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
            <Animated.View 
              className="items-center justify-center top-10 absolute"
              style={logoAnimatedStyle}
            >
              <LogoBoxFul width={150} height={80} />
            </Animated.View>
          </View>

          <View className="flex-col items-start justify-start gap-4 py-6">
            <Animated.View className="mb-4 px-6 w-full" style={headerAnimatedStyle}>
              <Text as="h1" variant="secondary" size="2xl" weight="semibold">
                Bienvenido a boxful 🦄
              </Text>

              <Text as="p" variant="muted" size="base" weight="medium">
                Ingresa tu correo electrónico
              </Text>
            </Animated.View>
            
            <View className="w-full px-6 justify-start gap-4">
              <Animated.View className="mb-4 flex gap-1" style={formAnimatedStyle}>
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
              </Animated.View>

              <Animated.View className="justify-start w-full gap-4" style={buttonsAnimatedStyle}>
                <Pressable className="flex-row items-center justify-center gap-2 py-1" onPress={() => setNotEnabledModal(true)}>
                  <FingerPrint
                    width={24}
                    height={24}
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

                <Pressable className="items-center py-1" onPress={() => setNotEnabledModal(true)}>
                  <Text as="p" variant="secondary" weight="semibold">
                    Registrar cuenta
                  </Text>
                </Pressable>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <AlertModal
        visible={notEnabledModal}
        type="warning"
        title="¡Ups!"
        message="Lo sentimos, pero esta opción no está disponible en este momento"
        onClose={() => setNotEnabledModal(false)}
        cancelText="Entendido"
      />
    </SafeAreaView>
  );
}
