import SendList from '@/components/Home/SendList';
import Header from '@/components/ui/Header';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );
  return (
    <SafeAreaView 
      style={{ backgroundColor }}
      className={`flex-1  bg-[${backgroundColor}]`}
      edges={['top']}
    >
      <ScrollView showsVerticalScrollIndicator={true} contentContainerClassName='px-4'>
        <Header title="Historial" />
        <SendList />
      </ScrollView>
    </SafeAreaView>
  );
}

