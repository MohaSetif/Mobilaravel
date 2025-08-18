import AuthContext from "@/contexts/authContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useContext } from "react";
import { Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, ScrollView } from "react-native";

export default function HomeScreen() {

  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { user } = auth;

  return (
    <ScrollView className="flex-1 bg-gray-900 px-6 py-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8 mt-12">
        <Text className="text-2xl font-bold text-white">MyApp</Text>
          {!user ? (
            <Pressable onPress={() => router.push('/login')}>
              <Ionicons name="log-in" size={38} color="white" />
            </Pressable>
          ) : (
            <Pressable onPress={() => router.push('/profile')}>
              <Ionicons name="person-circle-outline" size={38} color="white" />
            </Pressable>
          )}
      </View>

      {/* Hero Section */}
      <View className="items-center mb-12">
        <Text className="text-4xl font-extrabold text-white text-center">
          Welcome
        </Text>
        <Text className="text-gray-400 text-center mt-2">
          A modern React Native starter with Tailwind styling.
        </Text>
      </View>

      {/* Features */}
      <View className="space-y-6">
        {/* Feature 1 */}
        <View className="bg-gray-800 p-6 my-2 rounded-2xl border border-gray-700">
          <Text className="text-xl font-semibold text-white mb-2">
            Fast setup
          </Text>
          <Text className="text-gray-400">
            Get started quickly with a preconfigured project using Expo Router,
            Axios, and authentication already integrated.
          </Text>
        </View>

        {/* Feature 2 */}
        <View className="bg-gray-800 p-6 my-2 rounded-2xl border border-gray-700">
          <Text className="text-xl font-semibold text-white mb-2">
            Built with Tailwind
          </Text>
          <Text className="text-gray-400">
            Enjoy rapid UI development with NativeWind, bringing Tailwind CSS
            utilities directly into your React Native components.
          </Text>
        </View>

        {/* Feature 3 */}
        <View className="bg-gray-800 p-6 my-2 rounded-2xl border border-gray-700">
          <Text className="text-xl font-semibold text-white mb-2">
            Ready for customization
          </Text>
          <Text className="text-gray-400">
            Easily extend this template with your own screens, APIs, and
            business logic — perfect as a foundation for any mobile app.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
