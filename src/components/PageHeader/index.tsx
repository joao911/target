import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

type PageHeaderProps = {
  title: string;
  subTitle?: string;
  rightButton?: {
    onPress: () => void;
    icon: keyof typeof MaterialIcons.glyphMap;
  };
};

export const PageHeader = ({
  title,
  rightButton,
  subTitle,
}: PageHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        {rightButton && (
          <TouchableOpacity activeOpacity={0.8} onPress={rightButton.onPress}>
            <MaterialIcons
              name={rightButton.icon}
              size={24}
              color={colors.gray[500]}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subtitle}>{subTitle}</Text>}
    </View>
  );
};
