import { View, StatusBar } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { Target, TargetProps } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { useCallback, useState } from "react";
import { Loading } from "@/components/Loading";
import { currency } from "@/utils/formarCurrency";
import { useTargetDataBase } from "@/database/useTargetDataBase";

export default function Index() {
  const { listBySavedValue, resume } = useTargetDataBase();
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const [summary, setSummary] = useState<HomeHeaderProps>({
    total: currency(0),
    input: {
      label: "Entradas",
      value: currency(0),
    },
    output: {
      label: "Saídas",
      value: currency(0),
    },
  });

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

  async function getSummary(): Promise<HomeHeaderProps> {
    try {
      const response = await resume();

      const input = Number(response?.input ?? 0);
      const output = Number(response?.output ?? 0);

      return {
        total: currency(input - output),
        input: {
          label: "Entradas",
          value: currency(input),
        },
        output: {
          label: "Saídas",
          value: currency(output),
        },
      };
    } catch (erro: unknown) {
      console.log("error summary", erro);
      throw erro;
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    const summaryPromise = getSummary();
    const [targetData, summaryData] = await Promise.all([
      targetDataPromise,
      summaryPromise,
    ]);
    setTargets(targetData);
    setSummary(summaryData);
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
