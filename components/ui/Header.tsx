import ElSalvadorFlag from '@/assets/icons/el-salvador-flag.svg';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Notification } from 'iconsax-react-nativejs';
import { View } from 'react-native';
import Text from './Text';

export default function Header({ title }: { title: string }) {
    const colorTertiary = useThemeColor({ light: Colors.light.tertiary, dark: Colors.dark.tertiary }, 'tertiary');
    const colorText = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
    return (
        <View className='flex-row justify-between items-center w-full py-4'>
            <Text className="text-lg font-semibold" style={{ color: colorText }}>{title}</Text>
            <View className='flex-row items-center gap-3'>
                <Notification size={22} color={colorTertiary} />
                <ElSalvadorFlag width={22} height={22}/>
            </View>
     </View>
    );
}