import { MaterialIcons, FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export type NutrientKey = 'energy_kcal' | 'fat' | 'saturated_fat' | 'sugars' | 'salt' | 
                   'fiber' | 'proteins' | 'carbohydrates' | 'fruits_vegetables_nuts';

export type NutritionData = Record<NutrientKey, number>;
export type NutriScoreResult = {
  nutriscore: string;
  nutrition: any;
};

export type NutrientMapping = {
  display: string;
  fastApiKey: string;
  icon: JSX.Element;
  maxValue: number;
  unit: string;
};

// Constants
export const NUTRIENT_MAPPING: Record<NutrientKey, NutrientMapping> = {
  energy_kcal: { 
    display: 'Energy (kcal)', 
    fastApiKey: 'energy_kcal', 
    icon: <MaterialIcons name="local-fire-department" size={24} color="#FFA500" />, 
    maxValue: 800, 
    unit: 'kcal' 
  },
  fat: { 
    display: 'Fat (g)', 
    fastApiKey: 'fat', 
    icon: <FontAwesome name="tint" size={20} color="#FFD700" />, 
    maxValue: 70, 
    unit: 'g' 
  },
  saturated_fat: { 
    display: 'Saturated Fat (g)', 
    fastApiKey: 'saturated_fat', 
    icon: <MaterialIcons name="warning" size={24} color="#FF6347" />, 
    maxValue: 20, 
    unit: 'g' 
  },
  sugars: { 
    display: 'Sugar (g)', 
    fastApiKey: 'sugars', 
    icon: <MaterialCommunityIcons name="candy" size={24} color="#FF69B4" />, 
    maxValue: 90, 
    unit: 'g' 
  },
  salt: { 
    display: 'Salt (g)', 
    fastApiKey: 'salt', 
    icon: <MaterialCommunityIcons name="shaker-outline" size={24} color="#FFFFFF" />, 
    maxValue: 6, 
    unit: 'g' 
  },
  fiber: { 
    display: 'Fiber (g)', 
    fastApiKey: 'fiber', 
    icon: <MaterialCommunityIcons name="grass" size={24} color="#7CFC00" />, 
    maxValue: 30, 
    unit: 'g' 
  },
  proteins: { 
    display: 'Protein (g)', 
    fastApiKey: 'proteins', 
    icon: <Ionicons name="body" size={24} color="#00BFFF" />, 
    maxValue: 60, 
    unit: 'g' 
  },
  carbohydrates: { 
    display: 'Carbohydrates (g)', 
    fastApiKey: 'carbohydrates', 
    icon: <MaterialCommunityIcons name="rice" size={24} color="#F5DEB3" />, 
    maxValue: 300, 
    unit: 'g' 
  },
  fruits_vegetables_nuts: { 
    display: 'Fruits, Vegetables & Nuts (%)', 
    fastApiKey: 'fruits_vegetables_nuts', 
    icon: <MaterialCommunityIcons name="food-apple" size={24} color="#32CD32" />, 
    maxValue: 100, 
    unit: '%' 
  },
};

export const GRADE_DETAILS: Record<string, string> = {
  'A': 'Excellent nutritional quality',
  'B': 'Good nutritional quality',
  'C': 'Average nutritional quality',
  'D': 'Poor nutritional quality, do not eat it frequently',
  'E': 'Unfavorable nutritional quality, avoid eating it!'
};

export const getGradeColor = (grade: string | null) => {
  const upperGrade = grade ? grade.toUpperCase() : '';
  const colors = {
    'A': { primary: '#22c55e', gradient: ['#22c55e', '#16a34a'] },
    'B': { primary: '#84cc16', gradient: ['#84cc16', '#65a30d'] },
    'C': { primary: '#eab308', gradient: ['#eab308', '#ca8a04'] },
    'D': { primary: '#f97316', gradient: ['#f97316', '#ea580c'] },
    'E': { primary: '#ef4444', gradient: ['#ef4444', '#dc2626'] },
  };
  return colors[upperGrade] || { primary: '#64748b', gradient: ['#64748b', '#475569'] };
};