import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Text } from "react-native";
import { Animated, Easing, View } from "react-native";

// Color scale based on percentage - with more appealing colors
const getBarColor = (percent: number) => {
    if (percent < 25) return ['#34d399', '#54C392']; // green gradient
    if (percent < 50) return ['#fbbf24', '#f59e0b']; // yellow gradient
    if (percent < 75) return ['#fb923c', '#ea580c']; // orange gradient
    return ['#ef4444', '#dc2626']; // red gradient
  };

const Bar = ({ label, icon, value, max }: { label: string; icon: React.ReactNode; value: number; max: number }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const percent = Math.min((value / max) * 100, 100);
  const gradientColors = getBarColor(percent);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percent,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [percent]);

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-2">
        <View className="mr-2">{icon}</View>
        <Text className="text-white font-medium text-base flex-1">{label}</Text>
        <Text className="text-white font-bold">{value}</Text>
      </View>
      <View className="w-full h-3 rounded-full bg-background-light overflow-hidden">
        <Animated.View
          style={{
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            height: '100%',
          }}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="h-full w-full"
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default Bar;