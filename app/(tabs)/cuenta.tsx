import AlertModal from "@/components/AlertModal";
import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import Text from "@/components/ui/Text";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { router } from "expo-router";
import {
  Call,
  Logout,
  Sms,
  User
} from "iconsax-react-nativejs";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const userData = {
  name: "Diego Villalobos",
  email: "diego@boxful.com",
  phone: "+503 7890-1234",
  avatar: null,
};

export default function CuentaScreen() {
  const [logoutModal, setLogoutModal] = useState(false);
  const [resetOnboardingModal, setResetOnboardingModal] = useState(false);

  // Colores del tema
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const backgroundSecondary = useThemeColor(
    { light: Colors.light.backgroundSecondary, dark: Colors.dark.backgroundSecondary },
    "backgroundSecondary"
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );
  const textMuted = useThemeColor(
    { light: Colors.light.iconTertiary, dark: Colors.dark.iconTertiary },
    "iconTertiary"
  );
  const iconColor = useThemeColor(
    { light: Colors.light.icon, dark: Colors.dark.icon },
    "icon"
  );
  const borderColor = useThemeColor(
    { light: Colors.light.border, dark: Colors.dark.border },
    "border"
  );
  const primaryColor = useThemeColor(
    { light: Colors.light.primary, dark: Colors.dark.primary },
    "primary"
  );

  // Función para cerrar sesión
  const handleLogout = () => {
    setLogoutModal(false);
    router.replace("/(public)/login");
  };

  // Función para resetear onboarding
  const handleResetOnboarding = () => {
    setResetOnboardingModal(false);
    router.replace("/(public)/onboarding");
  };

  return (
    <SafeAreaView
      style={{ backgroundColor }}
      className="flex-1"
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 pb-8"
      >
        <Header title="Cuenta" />

        
        <View className="items-center mt-6 mb-8">
          <View
            className="w-24 h-24 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
              <User size={48} color={primaryColor} variant="TwoTone" />
          </View>
          <Text as="h3" weight="semibold" style={{ color: textColor }}>
            {userData.name}
          </Text>
          
          <Text
            as="p"
            size="base"
            weight="regular"
            style={{ color: textMuted }}
            className="mt-1"
          >
            {userData.email}
          </Text>
        </View>

        {/* Sección de contacto */}
        <View className="mb-6">
          <Text
            as="p"
            size="base"
            weight="regular"
            style={{ color: textMuted }}
            className="mb-3"
          >
            Contacto
          </Text>

          <View
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: backgroundSecondary }}
          >
            <MenuItem
              icon={<Call size={20} color={iconColor} variant="TwoTone" />}
              label="Teléfono"
              value={userData.phone}
              textColor={textColor}
              textMuted={textMuted}
              borderColor={borderColor}
              showBorder
            />

            <MenuItem
              icon={<Sms size={20} color={iconColor} variant="TwoTone" />}
              label="Correo electrónico"
              value={userData.email}
              textColor={textColor}
              textMuted={textMuted}
              borderColor={borderColor}
            />
          </View>
        </View>

        <View className="flex flex-col gap-4">
        <Button
            title="Resetear Onboarding"
            variant="secondary"
            size="large"
            width="100%"
            onPress={() => setResetOnboardingModal(true)}
            style={{ backgroundColor: backgroundSecondary, borderColor: borderColor, borderWidth: 1 }}
            textStyle={{ color: textColor }}
            
          />
        
          <Button
            title="Cerrar sesión"
            variant="primary"
            size="large"
            width="100%"
            Icon={Logout}
            onPress={() => setLogoutModal(true)}
          />
        </View>

        {/* Modal de cerrar sesión */}
        <AlertModal
          visible={logoutModal}
          type="warning"
          title="¿Cerrar sesión?"
          message="¿Estás seguro de que deseas cerrar tu sesión?"
          onClose={() => setLogoutModal(false)}
          onConfirm={handleLogout}
          confirmText="Cerrar sesión"
          cancelText="Cancelar"
          showCancelButton
        />

        {/* Modal de resetear onboarding */}
        <AlertModal
          visible={resetOnboardingModal}
          type="info"
          title="Resetear Onboarding"
          message="¿Deseas volver a ver la introducción de la aplicación?"
          onClose={() => setResetOnboardingModal(false)}
          onConfirm={handleResetOnboarding}
          confirmText="Resetear"
          cancelText="Cancelar"
          showCancelButton
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente de item del menú
interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  textColor: string;
  textMuted: string;
  borderColor: string;
  showBorder?: boolean;
  onPress?: () => void;
}

function MenuItem({
  icon,
  label,
  value,
  textColor,
  textMuted,
  borderColor,
  showBorder = false,
  onPress,
}: MenuItemProps) {
  const content = (
    <View
      className="flex-row items-center px-4 py-4"
      style={showBorder ? { borderBottomWidth: 1, borderBottomColor: borderColor } : {}}
    >
      <View className="mr-3">{icon}</View>
      <View className="flex-1">
        <Text as="p" size="xs" style={{ color: textMuted }}>
          {label}
        </Text>
        <Text as="p" weight="medium" style={{ color: textColor }}>
          {value}
        </Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} className="active:opacity-70">
        {content}
      </Pressable>
    );
  }

  return content;
}
