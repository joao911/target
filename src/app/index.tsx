import { View } from "react-native";
import { router } from "expo-router";

import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 50,00" },
  output: { label: "Saidas", value: "R$ 20,00" },
};

const targets = [
  {
    id: "1",
    name: "Comprar uma cadeira ergonômica",
    percentage: "75%",
    current: "R$ 9000,00",
    target: "R$ 1.200,00",
  },
  {
    id: "2",
    name: "Comprar uma cadeira ergonômica",
    percentage: "75%",
    current: "R$ 9000,00",
    target: "R$ 1.200,00",
  },
  {
    id: "3",
    name: "Comprar uma cadeira ergonômica",
    percentage: "75%",
    current: "R$ 9000,00",
    target: "R$ 1.200,00",
  },
];
export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta cadastrada"
        containerStyle={{ paddingHorizontal: 24 }}
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
