import decoBackground1 from '@/assets/images/onboarding/decoBackground1.webp';
import decoBackground2 from '@/assets/images/onboarding/decoBackground2.webp';
import decoBackground3 from '@/assets/images/onboarding/decoBackground3.webp';

import slide1content from '@/assets/images/onboarding/slide1content.webp';
import slide2content from '@/assets/images/onboarding/slide2content.webp';
import slide3content from '@/assets/images/onboarding/slide3content.webp';

import LogoBoxFul from '@/assets/images/logo-boxful-white.svg';
import decoTop from '@/assets/images/onboarding/decoTop.webp';
import Text from '@/components/ui/Text';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';

// Datos de tus 3 pantallas (Boxful)
const DATA = [
  {
    id: '1',
    title: 'Programa entregas hasta\n15 días de anticipación',
    background: decoBackground1,
    image: slide1content,
  },
  {
    id: '2',
    title: 'Logística simple,\nsegura y rápida',
    background: decoBackground2,
    image: slide2content,
  },
  {
    id: '3',
    title: 'Todo el control\nen tus manos',
    background: decoBackground3,
    image: slide3content,
  },
];

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const scrollX = useSharedValue(0);

  // Manejador del scroll para las animaciones
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const handleFinish = async () => {
    // AQUÍ: Guardarías en AsyncStorage que ya vio el onboarding
    // await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(public)/login');
  };

  const RenderItem = ({ item, index }: any) => {
    return (
      <View 
        style={{
          width: width,
          flex: 1,
        }}
        className="relative"
      >
        
        {/* Imagen de fondo que cubre todo */}
        <Image
          source={item.background}
          contentFit="cover"
          contentPosition="center"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
        />

        <View className="flex-1 items-center justify-center mt-24"
        >
        <Image
          source={item.image}
          contentFit="contain"
          contentPosition="center"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        </View>
        
        {/* Contenido sobre la imagen */}
        <View className="items-center justify-end py-4 relative mb-28">
            <Text as="p" size="2xl" weight="regular" className="text-center" style={{ color: '#fff' }}>
              {item.title}
            </Text>
        </View>
      </View>
    );
  };

  // Componente individual para cada punto de paginación
  const PaginationDot = ({ index }: { index: number }) => {
    const animatedDotStyle = useAnimatedStyle(() => {
      const widthDot = interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [20, 30, 20],
        Extrapolation.CLAMP
      );
      
      // Animamos la opacidad
      const opacity = interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.4, 1, 0.4],
        Extrapolation.CLAMP
      );

      return { width: widthDot, opacity };
    });

    return (
      <Animated.View
        style={[{ height: 5, borderRadius: 6, backgroundColor: Colors.light.onboardingDotActive }, animatedDotStyle]}
      />
    );
  };

  // Componente para los Puntos (Dots)
  const Pagination = () => {
    return (
      <View className="flex-row justify-center absolute bottom-16 w-full gap-1">
        {DATA.map((_, index) => (
          <PaginationDot key={index} index={index} />
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1"
    style={{
      backgroundColor: Colors.light.secondary,
    }}
    >
      <Animated.FlatList
        data={DATA}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
      />
      <View className="absolute top-0 left-0 w-full">
        <Image
          source={decoTop}
          contentFit="cover"
          contentPosition="center"
          className="w-full h-full"
          style={{
            width: '100%',
            height: 300,
          }}
        />
        </View>

      <View className="mt-16 items-center justify-center absolute top-0 left-0 right-0">
          <LogoBoxFul width={140} height={70} />
        </View>
      
      <Pagination />

      <Pressable
        onPress={handleFinish}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: 36,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="absolute top-12 right-4 flex-row items-center justify-center gap-1"
      >
        <Text as="p" size="sm" weight="semibold" style={{ color: "#FFF", opacity: 0.7 }}>Omitir</Text>
      </Pressable>
    </View>
  );
}