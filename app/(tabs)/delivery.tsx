import bannerDark from '@/assets/images/banner-dark.webp';
import banner from '@/assets/images/banner.webp';
import ActionsHome from '@/components/Home/ActionsHome';
import SendList from '@/components/Home/SendList';
import AnimatedTabScreen from '@/components/ui/AnimatedTabScreen';
import Header from '@/components/ui/Header';
import Text from '@/components/ui/Text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Image } from "expo-image";
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );
  return (
    <SafeAreaView 
      style={{ backgroundColor }}
      className="flex-1"
      edges={['top']}
    >
      <AnimatedTabScreen>
        <ScrollView 
          showsVerticalScrollIndicator={true} 
          contentContainerClassName='px-4'
        >
          <Header title="¡Hola, Diego Villalobos!" />
          <View className='my-6 justify-center items-center'>
            <Text as="h3" weight="semibold">¿Qué necesitas hacer?</Text>
          </View>
          <ActionsHome />
          <View className='bg-[#eee6d1] rounded-xl overflow-hidden'>
            <Image 
            cachePolicy="memory-disk"
            priority="high"
            recyclingKey={`banner-delivery-${colorScheme}`}
            transition={200}
            source={colorScheme === "dark" ? bannerDark : banner} 
            contentFit="cover" 
            contentPosition="center" 
            style={{ height: 140, width: '100%' }} />
          </View>
          <SendList />
        </ScrollView>
      </AnimatedTabScreen>
    </SafeAreaView>
  );
}