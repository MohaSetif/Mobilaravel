import { View, Text, Animated, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Card } from '@/constants/Cards';

export default function CardContainer({ card }: { card: Card }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        // Fade and slide in animation
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          })
        ]).start();

      }, []);

  return (
    <Animated.View style={[styles.featureCard, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}>
        <View className="bg-green-900/20 p-6 rounded-2xl border border-green-500/30">
            <View className="flex-row items-center mb-4">
                <View className="bg-green-600 p-3 rounded-lg">
                <MaterialCommunityIcons name={card.icon} size={24} color="white" />
                </View>
                <Text className="text-white text-xl font-bold ml-3">{card.title}</Text>
            </View>
            <Text className="text-gray-300 text-base">
                {card.text}
            </Text>
        </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  featureCard: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  }
});