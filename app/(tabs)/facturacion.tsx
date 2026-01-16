import constructor from "@/assets/images/constructor.webp";
import AnimatedTabScreen from "@/components/ui/AnimatedTabScreen";
import Header from "@/components/ui/Header";
import Text from "@/components/ui/Text";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FacturacionScreen() {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  return (
    <SafeAreaView
      style={{ backgroundColor }}
      className="flex-1"
      edges={["top"]}
    >
      <AnimatedTabScreen>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerClassName="px-4"
        >
          <Header title="Facturación" />
          <View className="flex-1 flex-col flex justify-center items-center py-10 gap-8 px-4">
            <View className="flex-1 flex-col flex justify-center items-center gap-2">
              <Text as="h1" weight="semibold" size="2xl">
                ¡Ups! Lo sentimos 😢
              </Text>
              <Text as="p" weight="regular" size="lg">
                Esta pantalla está en construcción.
              </Text>
            </View>
            <View 
              className="flex-1 flex-col flex justify-center items-center"
              style={{ flex: 1, width: "100%", minHeight: 250 }}
            >
              <Image 
                source={constructor} 
                contentFit="contain" 
                contentPosition="center" 
                style={{ width: "100%", height: "100%" }} 
              />
            </View>
          </View>
        </ScrollView>
      </AnimatedTabScreen>
    </SafeAreaView>
  );
}