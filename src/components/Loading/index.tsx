import React from "react";
import { ActivityIndicator, View } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

export const Loading: React.FC = () => {
  return (
    <ActivityIndicator style={styles.container} color={colors.blue[500]} />
  );
};
