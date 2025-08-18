import { Text, View } from "react-native";

const SectionCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <View className="bg-background-light p-5 rounded-xl mb-5 shadow-lg">
    <View className="flex-row items-center mb-4">
      {icon}
      <Text className="text-white font-bold text-lg ml-2">{title}</Text>
    </View>
    {children}
  </View>
);

export default SectionCard;
