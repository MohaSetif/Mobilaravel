import { Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AuthLayout() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center gap-2 px-4 pt-14 pb-4">
        <Pressable
          onPress={() => router.push('/')}
          className="flex-row items-center space-x-3 mt-4"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </Pressable>
      </View>

      {/* Auth Screens */}
      <View className="flex-1 px-4">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}
