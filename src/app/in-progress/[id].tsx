import { Text, View, Button } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function InProgress() {
  const param = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>id: {param.id}</Text>
      <Button title="voltar" onPress={() => router.back()} />
    </View>
  );
}
