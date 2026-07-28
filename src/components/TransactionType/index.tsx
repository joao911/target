import { View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";
import { Option } from "./option";
import { TransactionTypes } from "@/utils/transationtypes";

interface Props {
  selected: TransactionTypes;
  onChange: (type: TransactionTypes) => void;
}

export const TransactionType = ({ selected, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <Option
        title="Guardar"
        icon="arrow-upward"
        selectedColor={colors.blue[500]}
        isSelected={selected === TransactionTypes.Input}
        onPress={() => onChange(TransactionTypes.Input)}
      />

      <Option
        title="Resgatar"
        icon="arrow-downward"
        selectedColor={colors.red[400]}
        isSelected={selected === TransactionTypes.Output}
        onPress={() => onChange(TransactionTypes.Output)}
      />
    </View>
  );
};
