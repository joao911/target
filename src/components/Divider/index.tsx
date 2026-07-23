import { View, ColorValue } from "react-native";

import { styles } from "./styles";

export const Divider = ({ color }: { color?: ColorValue }) => {
  return <View style={[styles.container, { backgroundColor: color }]} />;
};
