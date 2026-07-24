import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

type Props = TouchableOpacityProps & {
  title: string;
  isProcessing?: boolean;
};
export const Button = ({ title, isProcessing = false, ...rest }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isProcessing}
      style={styles.container}
      {...rest}
    >
      <Text style={styles.title}>
        {isProcessing ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
};
