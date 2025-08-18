import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';

import NavBar from '@/components/NavBar';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { loadCurrentUser } from '@/utils/actions';
import AuthContext, { User } from '@/contexts/authContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await loadCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.log("Failed to load the user: ", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' } // Hide the default tab bar
        }}
        tabBar={(props) => <NavBar {...props} />} // Use our custom NavBar as the tab bar
        >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="gallery"
          options={{
            title: 'Gallery',
          }}
        />
        {!user ? (
          <Tabs.Screen
            name="login"
            options={{
              title: 'Login',
            }}
          />
        ) : (
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
            }}
          />
        )}
      </Tabs>
    </AuthContext.Provider>
  );
}