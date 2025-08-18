import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AuthContext from "@/contexts/authContext";
import { logout } from "@/utils/actions";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext)!;

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          setUser(null);
          router.replace("/login");
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900 p-6">
        <Text className="text-2xl font-bold text-white mb-4">Not Logged In</Text>
        <Text className="text-gray-400 mb-6 text-center">
          Please login to access your profile
        </Text>
        <TouchableOpacity
          className="bg-indigo-500 px-8 py-3 rounded-lg shadow-lg"
          onPress={() => router.replace("/login")}
        >
          <Text className="text-white text-lg font-medium">Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const userInitial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <ScrollView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="bg-gray-800 px-6 py-10 items-center rounded-b-3xl shadow">
        <View className="w-28 h-28 rounded-full mb-4 items-center justify-center mt-8 bg-gray-700 border-4 border-gray-600">
          <Text className="text-4xl font-bold text-white">{userInitial}</Text>
        </View>
        <Text className="text-3xl font-bold text-white mb-1">{user.name}</Text>
        <Text className="text-gray-400 text-lg mb-6">{user.email}</Text>

        <TouchableOpacity
          className="bg-red-500 px-6 py-2 rounded-full flex-row items-center"
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={18} color="white" />
          <Text className="text-white font-medium ml-2">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View className="p-6 space-y-4">
        <Text className="text-lg text-gray-300">Settings and preferences go here.</Text>
        <View className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <Text className="text-white font-semibold">Example card</Text>
          <Text className="text-gray-400 mt-1 text-sm">
            You can add more profile-related content here.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
