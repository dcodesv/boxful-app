import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { CloseCircle, Danger, InfoCircle, TickCircle } from "iconsax-react-nativejs";
import { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, StyleSheet, View } from "react-native";
import Button from "./ui/Button";
import Text from "./ui/Text";

interface AlertModalProps {
  visible: boolean;
  type?: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  closeOnBackdrop?: boolean;
}

export default function AlertModal({
  visible,
  type = "info",
  title,
  message,
  onClose,
  onConfirm,
  onCancel,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  showCancelButton = true,
  closeOnBackdrop = true,
}: AlertModalProps) {

  // Acciones por defecto: si no se proporciona onConfirm/onCancel, usa onClose
  const handleConfirm = onConfirm ?? onClose;
  const handleCancel = onCancel ?? onClose;

  // Animaciones
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [visible, scaleAnim, opacityAnim]);

  // Definición de colores para cada tipo
  const colorSuccess = useThemeColor({ light: Colors.light.success, dark: Colors.dark.success }, 'success'); // Verde
  const colorError = useThemeColor({ light: Colors.light.error, dark: Colors.dark.error }, 'error'); // Rojo
  const colorWarning = useThemeColor({ light: Colors.light.warning, dark: Colors.dark.warning }, 'warning'); // Amarillo/Naranja
  const colorInfo = useThemeColor({ light: Colors.light.secondary, dark: Colors.dark.secondary }, 'secondary'); // Azul
  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

  const config = {
    success: {
      icon: <TickCircle size={36} color="#FFFFFF" variant="Bold" />,
      bgIcon: colorSuccess,
      bgIconLight: `${colorSuccess}20`,
      accentColor: colorSuccess,
    },
    error: {
      icon: <CloseCircle size={36} color="#FFFFFF" variant="Bold" />,
      bgIcon: colorError,
      bgIconLight: `${colorError}20`,
      accentColor: colorError,
    },
    warning: {
      icon: <Danger size={36} color="#FFFFFF" variant="Bold" />,
      bgIcon: colorWarning,
      bgIconLight: `${colorWarning}20`,
      accentColor: colorWarning,
    },
    info: {
      icon: <InfoCircle size={36} color="#FFFFFF" variant="Bold" />,
      bgIcon: colorInfo,
      bgIconLight: `${colorInfo}20`,
      accentColor: colorInfo,
    },
  } as const;

  const currentStyle = config[type] || config.info;

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      handleCancel();
    }
  };

  const colorSecondary = useThemeColor({ light: Colors.light.secondary, dark: Colors.dark.secondary }, 'secondary');
  const colorPrimary = useThemeColor({ light: Colors.light.primary, dark: Colors.dark.primary }, 'primary');
  const colorBackgroundMuted = useThemeColor({ light: Colors.light.backgroundSecondary, dark: Colors.dark.backgroundSecondary }, 'backgroundSecondary');
  const colorBorder = useThemeColor({ light: Colors.light.border, dark: Colors.dark.border }, 'border');

  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      {/* Backdrop con blur - clickeable para cerrar */}
      <Pressable
        className="absolute inset-0"
        onPress={handleBackdropPress}
      >
        <View style={styles.overlay} pointerEvents="none" />
      </Pressable>

      {/* Contenedor centrado para el modal */}
      <View style={styles.centeredContainer} pointerEvents="box-none">
        {/* Contenido del modal */}
        <Animated.View
          style={[            
            styles.modalContainer,
            {
              backgroundColor,
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
              borderColor: colorBackgroundMuted,
              borderWidth: 1,
            },
          ]}
        >
          {/* Icono circular */}
          <View
          className="w-24 h-24 rounded-full justify-center items-center mb-4"
          style={{ backgroundColor: currentStyle.bgIconLight }}
          >
            <View
            className="w-16 h-16 rounded-full justify-center items-center"
            style={{ backgroundColor: currentStyle.bgIcon }}
            >
              {currentStyle.icon}
            </View>
          </View>
          
          <View className="w-full justify-center items-center mb-6 gap-4">
          {/* Título */}
          <Text
            as="h2"
            weight="semibold"
            size="xl"
            style={{ color: textColor}}
          >
            {title}
          </Text>
          {/* Mensaje */}
          {message && (
            <Text
              as="p"
              weight="regular"
              size="base"
              className="text-center"
            >
              {message}
            </Text>
          )}
          </View>

          {/* Botones */}
          <View className="flex-row gap-4 w-full justify-between items-center">
              <Button
                title={cancelText}
                onPress={handleCancel}
                variant="secondary"
                size="medium"
                className="flex-1"
                style={{ 
                  backgroundColor: colorBackgroundMuted,
                  borderColor: colorBorder,
                  borderWidth: 1,
                }}
                textStyle={{ color: textColor }}
              />

            { onConfirm && (
            <Button
              title={confirmText}
              onPress={handleConfirm}
              variant="primary"
              size="medium"
              className="flex-1"
              style={[
                styles.button,
                { backgroundColor: colorSecondary },
                !showCancelButton && styles.fullWidthButton,
              ]}
            />
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 2,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  iconOuterCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  iconInnerCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: "#E5E7EB",
  },
  fullWidthButton: {
    flex: 1,
  },
});

