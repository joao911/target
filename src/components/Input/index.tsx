import React from "react";
import { View, TextInput, TextInputProps, Text } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

type InputProps = TextInputProps & {
  label: string;
  error?: boolean;
  textError?: string;
};

export const Input = ({ label, error, textError, ...rest }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, error && { color: colors.red[400] }]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, error && { borderBottomColor: colors.red[400] }]}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
      <Text style={styles.textError}>{textError}</Text>
    </View>
  );
};
