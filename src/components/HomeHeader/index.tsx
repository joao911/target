import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { colors } from "@/theme";
import { Divider } from "../Divider";

export type HomeHeaderProps = {
  total: string;
};

type Props = {
  data: HomeHeaderProps;
};

export const HomeHeader = ({ data }: Props) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blue[500], colors.blue[500]]}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>
      <Divider color={colors.blue[400]} />
    </LinearGradient>
  );
};
