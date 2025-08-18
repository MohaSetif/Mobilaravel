import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { loginUser, registerUser, LoginForm, RegisterForm } from "@/utils/actions";

export default function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleLogin() {
    setError("");
    setLoading(true);
    const res = await loginUser(loginForm);
    setLoading(false);
    if (res.success) {
      router.replace("/");
    } else {
      setError(res.message);
    }
  }

  async function handleRegister() {
    setError("");
    setLoading(true);
    const res = await registerUser(registerForm);
    setLoading(false);
    if (res.success) {
      router.replace("/");
    } else {
      setError(res.message);
    }
  }

  return (
    <View className="flex-1 justify-center items-center px-4 bg-gray-900">
      {/* Toggle Buttons */}
      <View className="flex-row bg-gray-800 rounded-full p-1 mb-6 w-full max-w-sm">
        <Pressable
          className={`flex-1 p-2 rounded-full ${mode === "login" ? "bg-gray-700" : ""}`}
          onPress={() => setMode("login")}
        >
          <Text className={`text-center font-bold ${mode === "login" ? "text-indigo-400" : "text-gray-400"}`}>
            Login
          </Text>
        </Pressable>
        <Pressable
          className={`flex-1 p-2 rounded-full ${mode === "register" ? "bg-gray-700" : ""}`}
          onPress={() => setMode("register")}
        >
          <Text className={`text-center font-bold ${mode === "register" ? "text-indigo-400" : "text-gray-400"}`}>
            Register
          </Text>
        </Pressable>
      </View>

      {/* Error / Loading */}
      {error ? <Text className="text-red-500 mb-3">{error}</Text> : null}
      {loading ? <Text className="text-indigo-400 mb-3">Please wait...</Text> : null}

      {/* Forms */}
      {mode === "login" ? (
        <View className="w-full max-w-sm">
          <TextInput
            placeholder="Email"
            value={loginForm.email}
            onChangeText={(text) => setLoginForm((p) => ({ ...p, email: text }))}
            placeholderTextColor="gray"
            className="w-full p-3 my-2 border border-gray-600 rounded-md text-white"
          />
          <View className="relative w-full my-2">
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={loginForm.password}
              onChangeText={(text) => setLoginForm((p) => ({ ...p, password: text }))}
              placeholderTextColor="gray"
              className="w-full p-3 pr-10 border border-gray-600 rounded-md text-white"
            />
            <TouchableOpacity className="absolute right-3 top-3" onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-indigo-500 p-3 rounded-lg mt-4" onPress={handleLogin}>
            <Text className="text-white text-center font-medium">Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="w-full max-w-sm">
          <TextInput
            placeholder="Name"
            value={registerForm.name}
            onChangeText={(text) => setRegisterForm((p) => ({ ...p, name: text }))}
            placeholderTextColor="gray"
            className="w-full p-3 my-2 border border-gray-600 rounded-md text-white"
          />
          <TextInput
            placeholder="Email"
            value={registerForm.email}
            onChangeText={(text) => setRegisterForm((p) => ({ ...p, email: text }))}
            placeholderTextColor="gray"
            className="w-full p-3 my-2 border border-gray-600 rounded-md text-white"
          />
          <View className="relative w-full my-2">
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={registerForm.password}
              onChangeText={(text) => setRegisterForm((p) => ({ ...p, password: text }))}
              placeholderTextColor="gray"
              className="w-full p-3 pr-10 border border-gray-600 rounded-md text-white"
            />
            <TouchableOpacity className="absolute right-3 top-3" onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View className="relative w-full my-2">
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirm}
              value={registerForm.confirmPassword}
              onChangeText={(text) => setRegisterForm((p) => ({ ...p, confirmPassword: text }))}
              placeholderTextColor="gray"
              className="w-full p-3 pr-10 border border-gray-600 rounded-md text-white"
            />
            <TouchableOpacity className="absolute right-3 top-3" onPress={() => setShowConfirm(!showConfirm)}>
              <Feather name={showConfirm ? "eye-off" : "eye"} size={20} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-indigo-500 p-3 rounded-lg mt-4" onPress={handleRegister}>
            <Text className="text-white text-center font-medium">Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
