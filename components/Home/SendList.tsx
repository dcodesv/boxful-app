import { Text } from "@/components";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Box } from "iconsax-react-nativejs";
import { TouchableOpacity, View } from "react-native";

type SendStatus = "completado" | "pendiente" | "atrasado";

interface SendItem {
  id: string;
  recipientName: string;
  status: SendStatus;
}

interface SendListProps {
  items?: SendItem[];
  onItemPress?: (item: SendItem) => void;
}

// Datos de prueba para mostrar mientras no haya conexión con el backend
const defaultItems: SendItem[] = [
  { id: "1", recipientName: "Saúl López", status: "completado" },
  { id: "2", recipientName: "María García", status: "pendiente" },
  { id: "3", recipientName: "Carlos Martínez", status: "atrasado" },
  { id: "4", recipientName: "Ana Rodríguez", status: "pendiente" },
  { id: "5", recipientName: "Pedro Sánchez", status: "completado" },
  { id: "6", recipientName: "Laura Fernández", status: "atrasado" },
];

// Colores para los estados de los envíos
const statusColors = {
  completado: { light: "#4CAF50", dark: "#66BB6A" },
  pendiente: { light: "#FF6139", dark: "#FF8A65" },
  atrasado: { light: "#F44336", dark: "#EF5350" },
};

// Textos para los estados
const statusLabels: Record<SendStatus, string> = {
  completado: "Completado",
  pendiente: "Pendiente",
  atrasado: "Atrasado",
};

export default function SendList({ items = defaultItems, onItemPress }: SendListProps) {
  const colorScheme = useColorScheme();
  
  // Colores del tema
  const bgSecondary = useThemeColor(
    { light: Colors.light.backgroundSecondary, dark: Colors.dark.backgroundSecondary },
    "backgroundSecondary"
  );
  const bgCard = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const borderColor = useThemeColor(
    { light: Colors.light.border, dark: Colors.dark.border },
    "border"
  );
  const iconBg = useThemeColor(
    { light: "#E8DCD9", dark: "#3D2E2A" },
    "background"
  );
  const iconColor = useThemeColor(
    { light: "#60433B", dark: "#C4A99E" },
    "text"
  );

  // Obtener el color según el estado y el tema actual
  const getStatusColor = (status: SendStatus): string => {
    const colors = statusColors[status];
    return colorScheme === "dark" ? colors.dark : colors.light;
  };

  return (
    <View 
      className="flex-col gap-4 px-4 py-6 my-4 rounded-xl" 
      style={{ backgroundColor: bgSecondary }}
    >
      <Text weight="semibold" size="xl">
        Envíos recientes
      </Text>

      <View className="flex-col gap-3">
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onItemPress?.(item)}
            activeOpacity={0.7}
            className="flex-row items-center gap-4 rounded-xl px-4 py-5"
            style={{
              backgroundColor: bgCard,
              borderWidth: 1,
              borderColor: borderColor,
            }}
          >
            {/* Icono del paquete */}
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: iconBg }}
            >
              <Box size={22} color={iconColor} variant="Outline" />
            </View>

            {/* Info del destinatario */}
            <View className="flex-1 flex-col">
              <Text size="xs" variant="muted" weight="regular" className="tracking-wider">
                Destinatario
              </Text>
              <Text size="base" variant="tertiary" weight="semibold">
                {item.recipientName}
              </Text>
            </View>

            {/* Badge de estado */}
            <Text
              size="xs"
              weight="semibold"
              className="tracking-wide"
              style={{ color: getStatusColor(item.status) }}
            >
              {statusLabels[item.status]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
