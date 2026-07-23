import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Transaction() {
  const param = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>id: {param.id}</Text>
    </View>
  );
}
