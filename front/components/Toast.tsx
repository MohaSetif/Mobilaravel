import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface ToastProps {
  text: string;
  status: number;
  onDismiss?: () => void;
  position?: 'top' | 'bottom';
  visible?: boolean;
  duration?: number;
}

const Toast = ({ 
  text, 
  status, 
  onDismiss,
  position = 'bottom',
  visible = true,
  duration = 3000
}: ToastProps) => {
  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(position === 'top' ? -20 : 20)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  
  // Track if the toast is currently visible
  const isVisible = useRef(false);
  
  // Handle auto-dismissal timer
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // When visible prop changes
    if (visible && !isVisible.current) {
      // Show animation
      isVisible.current = true;
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
      
      // Set auto-dismiss timer
      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          handleDismiss();
        }, duration);
      }
    } else if (!visible && isVisible.current) {
      // Hide toast if visibility is turned off
      handleDismiss();
    }
    
    // Clean up timer on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible]);

  const handleDismiss = () => {
    if (!isVisible.current) return;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Hide animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(translateY, {
        toValue: position === 'top' ? -20 : 20,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
    ]).start(() => {
      isVisible.current = false;
      if (onDismiss) {
        onDismiss();
      }
    });
  };

  // Don't render anything if not visible and animation has completed
  if (!visible && !isVisible.current) return null;

  // Determine toast type styling
  const isSuccess = status >= 200 && status < 300;
  const isWarning = status >= 300 && status < 400;
  const isError = status >= 400;

  const getToastIcon = () => {
    if (isSuccess) return 'check-circle-outline';
    if (isWarning) return 'alert-circle-outline';
    return 'close-circle-outline';
  };

  const getToastColor = () => {
    if (isSuccess) return styles.successContainer;
    if (isWarning) return styles.warningContainer;
    return styles.errorContainer;
  };

  const getToastTitle = () => {
    if (isSuccess) return 'Success';
    if (isWarning) return 'Warning';
    return 'Error';
  };

  const positionStyle = position === 'top' ? styles.topPosition : styles.bottomPosition;

  return (
    <View style={[styles.overlayContainer, positionStyle]}>
      <Animated.View 
        style={[
          styles.container, 
          getToastColor(),
          {
            opacity,
            transform: [
              { translateY },
              { scale }
            ]
          }
        ]}
      >
        <View style={styles.contentContainer}>
          {/* Header with icon and title */}
          <View style={styles.header}>
            <MaterialCommunityIcons 
              name={getToastIcon()} 
              size={20} 
              color="#FFFFFF" 
              style={styles.icon}
            />
            <Text style={styles.title}>
              {getToastTitle()}
            </Text>
            <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
              <MaterialCommunityIcons 
                name="close" 
                size={18} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
          
          {/* Toast message */}
          <Text style={styles.message}>
            {text}
          </Text>
        </View>
        
        {/* Progress indicator */}
        <ProgressBar duration={duration} isVisible={isVisible.current} />
      </Animated.View>
    </View>
  )
}

// Progress indicator component
const ProgressBar = ({ duration, isVisible }: { duration: number, isVisible: boolean }) => {
  const width = useRef(new Animated.Value(100)).current;
  
  useEffect(() => {
    if (isVisible && duration > 0) {
      // Reset to full width
      width.setValue(100);
      
      // Animate to 0 width over duration
      Animated.timing(width, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
        easing: Easing.linear
      }).start();
    }
  }, [isVisible, duration]);
  
  return (
    <View>
      <Animated.View 
        style={[
          {
            width: width.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%']
            })
          }
        ]} 
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  topPosition: {
    top: 50,
  },
  bottomPosition: {
    bottom: 50,
  },
  container: {
    width: width - 32,
    maxWidth: 500,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#212123', // gray-800
    overflow: 'hidden'
  },
  successContainer: {
    borderColor: '#10B981',
    borderWidth: 1
  },
  warningContainer: {
    borderColor: '#F59E0B', // yellow-500
    borderWidth: 1
  },
  errorContainer: {
    borderColor: '#EF4444', // red-500
    borderWidth: 1
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 16,
  },
  message: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontSize: 14,
    paddingLeft: 28,
  },
  closeButton: {
    padding: 4,
  }
});

export default Toast