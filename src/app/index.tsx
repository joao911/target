import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { fontFamily } from "@/theme";

export default function Index() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontFamily: fontFamily.bold }}>Index</Text>
      <Button
        title="Go to Target"
        onPress={() => {
          router.navigate("Target");
        }}
      />
      <Button
        title="Transação"
        onPress={() => {
          router.navigate("/transaction/132");
        }}
      />
      <Button
        title="Progresso"
        onPress={() => {
          router.navigate("/in-progress/002");
        }}
      />
    </View>
  );
}
