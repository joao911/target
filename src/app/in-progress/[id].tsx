import { View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { List } from "@/components/List";
import { TransactionTypes } from "@/utils/transationtypes";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { Button } from "@/components/Button";

export default function InProgress() {
  const param = useLocalSearchParams<{ id: string }>();
  const details = {
    data: {
      current: "R$ 580,00",
      target: "R$ 1790,00",
      percentage: 25,
    },
  };

  const transactions: TransactionProps[] = [
    {
      id: "1",
      value: "R$ 50,00",
      date: "2023-01-01",
      description: "Tem descriçao",
      type: TransactionTypes.Input,
    },
    {
      id: "2",
      value: "R$ 50,00",
      date: "2023-01-01",
      description: "Tem descriçao",
      type: TransactionTypes.Output,
    },
  ];

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Meta"
        subTitle="Economize para alcançar seus objetivos"
        rightButton={{
          onPress: () => {},
          icon: "edit",
        }}
      />
      <Progress data={details.data} />
      <List
        title="Transações"
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação cadastrada, toque para adicionar dinheiro"
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${param.id}`)}
      />
    </View>
  );
}
