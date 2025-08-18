import axios from "axios";
import { Platform } from "react-native";
import { getToken, setToken } from "./tokenService";
import { deleteItemAsync } from "expo-secure-store";
import { AI_URL, API_URL } from "@/constants/config";

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  name: string;
  confirmPassword: string;
}

/**
 * Login Function
 */
export async function loginUser(data: LoginForm): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: data.email,
      password: data.password,
      device_name: `${Platform.Version} - ${Platform.OS}`,
    });

    if (response.data?.token) {
      await setToken(response.data.token);
      return { success: true, message: "Logged in successfully." };
    }

    return { success: false, message: "Login failed. Please try again." };
  } catch (error: any) {
    const errors = error.response?.data?.errors;

    if (errors) {
      const messages = Object.values(errors).flat();
      return { success: false, message: messages[0] as string };
    }

    return { success: false, message: "An error occurred while logging in." };
  }
}

/**
 * Register Function
 */
export async function registerUser(data: RegisterForm): Promise<{ success: boolean; message: string }> {
  if (data.password !== data.confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  try {
    const response = await axios.post(`${API_URL}/register`, {
      name: data.name,
      email: data.email,
      password: data.password,
      device_name: `${Platform.Version} - ${Platform.OS}`,
    });

    if (response.data?.token) {
      await setToken(response.data.token);
      return { success: true, message: "Account created successfully." };
    }

    return { success: false, message: "Registration failed." };
  } catch (error: any) {
    const errors = error.response?.data?.errors;

    if (errors) {
      const messages = Object.values(errors).flat();
      return { success: false, message: messages[0] as string };
    }

    return { success: false, message: "An error occurred while registering." };
  }
}

/**
 * Load Current User Function
 */
export async function loadCurrentUser(): Promise<any> {
  try {
    const token = await getToken();
    if (!token) return null

    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return { success: false, message: "Couldn't retrieve current user's name!" };
  }
}

/**
 * Logout of current session
 */
export async function logout(): Promise<any> {
  const token = await getToken()
  await axios.post(`${API_URL}/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

  await setToken(null)
}