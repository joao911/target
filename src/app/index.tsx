import { View, StatusBar } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { HomeHeader } from "@/components/HomeHeader";
import { Target, TargetProps } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { useCallback, useState } from "react";
import { Loading } from "@/components/Loading";
import { currency } from "@/utils/formarCurrency";
import { useTargetDataBase } from "@/database/useTargetDataBase";

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 50,00" },
  output: { label: "Saidas", value: "R$ 20,00" },
};

export default function Index() {
  const { listBySavedValue } = useTargetDataBase();
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);

  async function fetchTargets(): Promise<TargetProps[]> {
    const response = await listBySavedValue();

    return response.map((item) => ({
      id: String(item.id),
      name: item.name,
      current: currency(item.current),
      target: String(item.amount),
      percentage: item.percentage.toFixed(0) + "%",
    }));
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    const [targetData] = await Promise.all([targetDataPromise]);
    setTargets(targetData);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
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
