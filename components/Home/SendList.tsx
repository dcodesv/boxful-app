import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Box } from 'iconsax-react-nativejs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../ui/Text';

type SendStatus = 'completado' | 'pendiente' | 'atrasado';

interface SendItem {
  id: string;
  recipientName: string;
  status: SendStatus;
}

interface SendListProps {
  items?: SendItem[];
  onItemPress?: (item: SendItem) => void;
}

const defaultItems: SendItem[] = [
  {
    id: '1',
    recipientName: 'Saúl López',
    status: 'completado',
  },
  {
    id: '2',
    recipientName: 'Saúl López',
    status: 'pendiente',
  },
  {
    id: '3',
    recipientName: 'Saúl López',
    status: 'atrasado',
  },
  {
    id: '4',
    recipientName: 'Saúl López',
    status: 'atrasado',
  },
  {
    id: '5',
    recipientName: 'Saúl López',
    status: 'atrasado',
  },
  {
    id: '6',
    recipientName: 'Saúl López',
    status: 'atrasado',
  },
];

export default function SendList({ items = defaultItems, onItemPress }: SendListProps) {
  const backgroundColorSecondary = useThemeColor(
    { light: Colors.light.backgroundSecondary, dark: Colors.dark.backgroundSecondary },
    'backgroundSecondary'
  );
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );
  const mutedColor = useThemeColor({ light: Colors.light.iconTertiary, dark: Colors.dark.iconTertiary }, 'iconTertiary');
  const borderColor = useThemeColor({ light: Colors.light.border, dark: Colors.dark.border }, 'border');

  const getStatusColor = (status: SendStatus): string => {
    switch (status) {
      case 'completado':
        return '#4CAF50';
      case 'pendiente':
        return '#FF6139';
      case 'atrasado':
        return '#F44336';
      default:
        return mutedColor;
    }
  };

  const getStatusText = (status: SendStatus): string => {
    switch (status) {
      case 'completado':
        return 'Completado';
      case 'pendiente':
        return 'Pendiente';
      case 'atrasado':
        return 'Atrasado';
      default:
        return '';
    }
  };

  return (    
    <View className="flex-col gap-4 px-4 py-6 my-4 rounded-xl" style={{ backgroundColor: backgroundColorSecondary }}>

      <Text weight="semibold" size="xl">
        Envíos recientes
      </Text>
      
      <View className="flex-col gap-3">
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onItemPress?.(item)}
            activeOpacity={0.7}
            style={[
              styles.card,
              {
                backgroundColor,
                borderWidth: 1,
                borderColor: borderColor,
              },
            ]}
            className="flex-row items-center gap-4 rounded-xl px-4 py-5"
          >
            {/* Icono circular */}
            <View
              style={styles.iconContainer}
              className="w-10 h-10 rounded-full items-center justify-center bg-[#E8DCD9]"
            >
              <Box size={22} color="#60433B" variant="Outline" />
            </View>

            {/* Información del destinatario */}
            <View className="flex-1 flex-col">
              <Text size="xs" variant="muted" weight="regular" className='tracking-wider'>
                Destinatario
              </Text>
              <Text size="base" variant="tertiary" weight="semibold">
                {item.recipientName}
              </Text>
            </View>

            {/* Estado */}
            <Text
              size="xs"
              weight="semibold"
              className='tracking-wide'
              style={{
                color: getStatusColor(item.status),
              }}
            >
              {getStatusText(item.status)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // Estilos adicionales si es necesario
  },
  iconContainer: {
    // Estilos del contenedor del icono
  },
});
