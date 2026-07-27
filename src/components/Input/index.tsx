import React from "react";
import { View, TextInput, TextInputProps, Text } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export const Input = ({ label, error, ...rest }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  );
};
