import React from "react";
import Input, { CurrencyInputProps } from "react-native-currency-input";
import { View, TextInput, TextInputProps, Text } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

type InputProps = CurrencyInputProps & {
  label: string;
  error?: string;
};

export const CurrencyInput = ({ label, error, ...rest }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  );
};
