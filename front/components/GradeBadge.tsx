import { Text, View } from "react-native";

// Grade color mapping
const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'A': return '#22c55e'; // green
    case 'B': return '#84cc16'; // lime
    case 'C': return '#eab308'; // yellow
    case 'D': return '#f97316'; // orange
    case 'E': return '#ef4444'; // red
    default: return '#64748b'; // slate
  }
};
// Grade Badge Component
const GradeBadge = ({ grade }: { grade: string }) => {
  const color = getGradeColor(grade);
  
  return (
    <View style={{ backgroundColor: color }} className="w-16 h-16 rounded-full items-center justify-center">
      <Text className="text-white text-3xl font-bold">{grade}</Text>
    </View>
  );
};

export default GradeBadge;