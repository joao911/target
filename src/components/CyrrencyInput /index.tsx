import Input, { CurrencyInputProps } from "react-native-currency-input";
import { View, Text, ColorValue } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

type InputProps = CurrencyInputProps & {
  label: string;
  error?: boolean;
  textError?: string;
};

export const CurrencyInput = ({
  label,
  error,
  textError,
  ...rest
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, error && { color: colors.red[400] }]}>
        {label}
      </Text>
      <Input
        prefix=" "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        style={[styles.input, error && { borderBottomColor: colors.red[400] }]}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
      <Text style={styles.textErros}>{textError}</Text>
    </View>
  );
};
