import React from 'react';
import { View } from 'react-native';
import { useLinkBuilder, BottomTabBarProps } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type IconMapping = {
  [key: string]: string;
};

const iconMap: IconMapping = {
  index: 'home',
  gallery: 'image',
  profile: 'user',
  scan: 'camera',
};

const NavBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { buildHref } = useLinkBuilder();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <LinearGradient
        colors={['#1E293B', '#0F172A']} // new gradient: slate -> navy
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          flexDirection: 'row',
          borderRadius: 100,
          padding: 5,
          elevation: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#0F172A', // deep navy background
            borderRadius: 100,
            padding: 5,
            elevation: 10,
          }}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const normalizedRouteName = route.name.replace('/', '');
            const iconName = iconMap[normalizedRouteName] || 'circle';

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            if (['login'].includes(route.name)) return null;

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <PlatformPressable
                key={route.key}
                href={buildHref(route.name, route.params)}
                onPress={onPress}
                android_ripple={{
                  color: 'transparent',
                  borderless: true,
                }}
                onLongPress={onLongPress}
                style={{
                  padding: 15,
                  borderRadius: 100,
                  backgroundColor: isFocused ? '#252D59' : 'transparent', // blue for active
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather
                  name={iconName}
                  size={19}
                  color={isFocused ? '#ffffff' : '#94A3B8'} // white when active, slate-400 when idle
                />
              </PlatformPressable>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
};

export default NavBar;
