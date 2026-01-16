import Text from '@/components/ui/Text';
import { Modal, View } from 'react-native';

interface ModalScreenProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalScreen({ visible, onClose }: ModalScreenProps) {
  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}
    transparent
    statusBarTranslucent={true}
    >
      <View className="justify-center items-center bg-white rounded-xl p-4">
      <Text as="h1" weight="bold" size="xl">Modal</Text>
      </View>
    </Modal>
  );
}