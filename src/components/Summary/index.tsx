import { View, Text, ColorValue } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

export type SummaryProps = {
  label: string;
  value: string;
};

type props = {
  data: SummaryProps;
  icon: {
    name: keyof typeof MaterialIcons.glyphMap;
    color: ColorValue;
  };
  isLeft?: boolean;
};
export const Summary = ({ data, icon, isLeft }: props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isLeft && { justifyContent: "flex-end" }]}>
        <MaterialIcons name={icon.name} size={16} color={icon.color} />
        <Text style={styles.label}>{data.label}</Text>
      </View>
      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
};
