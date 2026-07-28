import { ColorValue, Pressable, Text, PressableProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "@/theme";

interface Props extends PressableProps {
  isSelected: boolean;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  selectedColor: ColorValue;
}

export function Option({
  icon,
  title,
  isSelected,
  selectedColor,
  ...rest
}: Props) {
  return (
    <Pressable
      style={[
        styles.container,
        isSelected && { backgroundColor: selectedColor },
      ]}
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />
      <Text style={[styles.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  );
}
