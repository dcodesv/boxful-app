import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet, ViewProps } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface AnimatedTabScreenProps extends ViewProps {
  children: React.ReactNode;
}

export default function AnimatedTabScreen({
  children,
  style,
  ...props
}: AnimatedTabScreenProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useFocusEffect(
    useCallback(() => {
      // Animación de entrada
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
      translateY.value = withTiming(0, {
        duration: 350,
        easing: Easing.out(Easing.back(1.05)),
      });

      return () => {
        // Resetear valores para la próxima entrada
        opacity.value = 0;
        translateY.value = 20;
      };
    }, [opacity, translateY])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
