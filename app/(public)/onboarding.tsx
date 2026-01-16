import decoBackground1 from "@/assets/images/onboarding/decoBackground1.webp";
import decoBackground2 from "@/assets/images/onboarding/decoBackground2.webp";
import decoBackground3 from "@/assets/images/onboarding/decoBackground3.webp";

import slide1content from "@/assets/images/onboarding/slide1content.webp";
import slide2content from "@/assets/images/onboarding/slide2content.webp";
import slide3content from "@/assets/images/onboarding/slide3content.webp";

import LogoBoxFul from "@/assets/images/logo-boxful-white.svg";
import decoTop from "@/assets/images/onboarding/decoTop.webp";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ArrowRight } from "iconsax-react-nativejs";
import React from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const Sliders = [
  {
    id: "1",
    titleTop: "Programa entregas hasta",
    titleBottom: "15 días de anticipación",

    background: decoBackground1,
    image: slide1content,
  },
  {
    id: "2",
    titleTop: "Logística simple,",
    titleBottom: "segura y rápida",
    background: decoBackground2,
    image: slide2content,
  },
  {
    id: "3",
    titleTop: "Todo el control",
    titleBottom: "en tus manos",
    background: decoBackground3,
    image: slide3content,
  },
];

export default function OnboardingScreen() {
  
  const { width } = useWindowDimensions(); // Obtener el ancho de la pantalla para el scroll horizontal
  const scrollX = useSharedValue(0); // Valor compartido para la animación de flotación
  
  // Animación de salida
  const exitOpacity = useSharedValue(1);
  const exitTranslateY = useSharedValue(0);

  // Manejador del scroll para las animaciones
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  // Función para navegar después de la animación
  const navigateToLogin = () => {
    router.replace("/(public)/login");
  };

  const handleFinish = () => {
    // Aquí se debe guardar el estado de que el usuario ya vio el onboarding

    const animationDuration = 280;
    // Ejecutar animación de salida
    exitOpacity.value = withTiming(0, { 
      duration: 500, 
      easing: Easing.out(Easing.cubic) 
    });
    exitTranslateY.value = withTiming(80, { 
      duration: animationDuration, 
      easing: Easing.out(Easing.cubic) 
    });
    
    // Navegar después de la animación
    setTimeout(navigateToLogin, animationDuration);
  };

  // Estilo animado para la salida
  const exitAnimatedStyle = useAnimatedStyle(() => ({
    opacity: exitOpacity.value,
    transform: [
      { translateY: exitTranslateY.value },
    ],
  }));

  const RenderItem = ({ item, index }: any) => {
    // Valor compartido para la animación de flotación
    const floatAnimation = useSharedValue(0);

    React.useEffect(() => {
      // Iniciar animación de flotación continua
      floatAnimation.value = withRepeat(
        withTiming(1, {
          duration: 1500,
          easing: Easing.inOut(Easing.cubic),

        }),
        -1, // Repetir infinitamente
        true // Reversar la animación
      );
      
    }, [floatAnimation]);

    // Estilo animado para la flotación
    const floatingStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(floatAnimation.value, [0, 1], [0, 20], Extrapolation.CLAMP),
          },
          {
            translateX: interpolate(floatAnimation.value, [0, 1], [0, 10], Extrapolation.CLAMP),
          },
          {
            scale: interpolate(floatAnimation.value, [0, 1], [0.95, 1.05], Extrapolation.CLAMP),
          }, 
        ],
        opacity: interpolate(floatAnimation.value, [0, 1], [0.6, 1], Extrapolation.CLAMP),
      };
    });

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
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        />

        <Animated.View
          className="flex-1 items-center justify-center mt-24"
          style={floatingStyle}
        >
          <Image
            source={item.image}
            contentFit="contain"
            contentPosition="center"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Animated.View>

        {/* Contenido sobre la imagen */}
        <View className="items-center justify-end py-4 relative mb-28">
          <Text
            as="p"
            size="2xl"
            weight="regular"
            className="text-center"
            style={{ color: "#fff" }}
          >
            {item.titleTop}
          </Text>
          <Text
            as="p"
            size="2xl"
            weight="semibold"
            className="text-center"
            style={{ color: Colors.light.onboardingDotActive }}
          >
            {item.titleBottom}
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
        style={[
          {
            height: 5,
            borderRadius: 6,
            backgroundColor: Colors.light.onboardingDotActive,
          },
          animatedDotStyle,
        ]}
      />
    );
  };

  // Componente para los Puntos (Dots) - solo se muestra si NO está en el último slide
  const Pagination = () => {
    const lastSlideIndex = Sliders.length - 1;
    
    const animatedStyle = useAnimatedStyle(() => {
      const currentSlide = Math.round(scrollX.value / width);
      const opacity = currentSlide === lastSlideIndex ? 0 : 1;
      
      return {
        opacity,
        pointerEvents: currentSlide === lastSlideIndex ? 'none' : 'auto',
      };
    });

    return (
      <Animated.View 
        className="flex-row justify-center absolute bottom-16 w-full gap-1"
        style={animatedStyle}
      >
        {Sliders.map((_, index) => (
          <PaginationDot key={index} index={index} />
        ))}
      </Animated.View>
    );
  };

  // Botón "Iniciar" que solo aparece en el último slide
  const StartButton = () => {
    const lastSlideIndex = Sliders.length - 1;
    const lastSlideOffset = lastSlideIndex * width;
    
    const animatedStyle = useAnimatedStyle(() => {
      const currentSlide = Math.round(scrollX.value / width);
      const isLastSlide = currentSlide === lastSlideIndex;
      
      const opacity = interpolate(
        scrollX.value,
        [(lastSlideIndex - 0.5) * width, lastSlideOffset, (lastSlideIndex + 0.5) * width],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      
      const translateY = interpolate(
        scrollX.value,
        [(lastSlideIndex - 0.5) * width, lastSlideOffset, (lastSlideIndex + 0.5) * width],
        [20, 0, 20],
        Extrapolation.CLAMP
      );
      
      return {
        opacity,
        transform: [{ translateY }],
        pointerEvents: isLastSlide ? 'auto' : 'none',
      };
    });

    return (
      <Animated.View
        className="absolute bottom-12 w-full px-6"
        style={animatedStyle}
      >
        <Button
          title="Iniciar"
          onPress={handleFinish}
          variant="primary"
          size="medium"
          style={{
            borderRadius: 32,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            justifyContent: "space-between",
            width: "auto",
            alignSelf: "center",
            gap: 20,
          }}
          Icon={ArrowRight}
          iconPosition="right"
        />
      </Animated.View>
    );
  };

  return (
    <Animated.View
      className="flex-1"
      style={[
        {
          backgroundColor: Colors.light.secondary,
        },
        exitAnimatedStyle,
      ]}
    >
      <Animated.FlatList
        data={Sliders}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} />
        )}
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
            width: "100%",
            height: 300,
          }}
        />
      </View>

      <View className="mt-16 items-center justify-center absolute top-0 left-0 right-0">
        <LogoBoxFul width={140} height={70} />
      </View>

      <Pagination />
      <StartButton />

      <Pressable
        onPress={handleFinish}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: 36,
          alignItems: "center",
          justifyContent: "center",
        }}
        className="absolute top-12 right-4 flex-row items-center justify-center gap-1"
      >
        <Text
          as="p"
          size="sm"
          weight="semibold"
          style={{ color: "#FFF", opacity: 0.7 }}
        >
          Omitir
        </Text>
      </Pressable>
    </Animated.View>
  );
}
