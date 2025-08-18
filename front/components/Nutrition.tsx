import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';

import type { IconProps } from '@expo/vector-icons/build/createIconSet';

export const getNutritionIcon = (key: string, size = 20, color = '#ffffff'): React.ReactNode => {
  switch (key) {
    case 'energyKcal':
      return <MaterialCommunityIcons name="lightning-bolt" size={size} color={color} />;
    case 'sugar':
      return <MaterialCommunityIcons name="spoon-sugar" size={size} color={color} />;
    case 'saturatedFat':
      return <FontAwesome5 name="cheese" size={size} color={color} />;
    case 'sodium':
      return <MaterialCommunityIcons name="shaker-outline" size={size} color={color} />;
    case 'fiber':
      return <MaterialCommunityIcons name="fruit-cherries" size={size} color={color} />;
    case 'protein':
      return <MaterialCommunityIcons name="arm-flex" size={size} color={color} />;
    case 'fruitsPercentage':
      return <MaterialCommunityIcons name="fruit-watermelon" size={size} color={color} />;
    default:
      return <MaterialCommunityIcons name="food-apple" size={size} color={color} />;
  }
};

// Readable label mapping
export const NUTRITION_LABELS: Record<string, string> = {
  energyKcal: 'Energy (kcal)',
  sugar: 'Sugar (g)',
  saturatedFat: 'Saturated Fat (g)',
  sodium: 'Sodium (g)',
  fiber: 'Fiber (g)',
  protein: 'Protein (g)',
  fruitsPercentage: 'Fruits (%)',
};

export const NUTRITION_MAX = {
    energyKcal: 800,
    sugar: 50,
    saturatedFat: 20,
    sodium: 2,
    fiber: 10,
    protein: 50,
    fruitsPercentage: 100,
  };
