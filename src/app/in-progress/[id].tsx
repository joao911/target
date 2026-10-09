import { Alert, StatusBar, View } from "react-native";
import { useCallback, useState } from "react";
import { map } from "lodash";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";

import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { Progress } from "@/components/Progress";
import { currency } from "@/utils/formarCurrency";
import { PageHeader } from "@/components/PageHeader";
import { useTargetDataBase } from "@/database/useTargetDataBase";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTransactionsDatabase } from "@/database/useTransactionDataBase";
import { TransactionTypes } from "@/utils/transationtypes";

export default function InProgress() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const { listById, remove } = useTransactionsDatabase();
  const param = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });

  const { getByID } = useTargetDataBase();

  async function getData(id: string) {
    try {
      const response = await getByID(Number(id));

      setDetails({
        name: response?.name || "",
        current: currency(response?.current || 0),
        target: currency(response?.amount || 0),
        percentage: Number(response?.percentage),
      });
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getTransactions() {
    try {
      setLoading(true);
      const response = await listById(String(param.id));
      setTransactions(
        map(response, (item) => ({
          id: String(item.id),
          value: String(item.amount),
          date: String(item.created_at),
          description: String(item.observation),
          type:
            item.amount > 0 ? TransactionTypes.Input : TransactionTypes.Output,
        })),
      );
    } catch (error: any) {
      console.log("getTransactions error", error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData(String(param.id));
      getTransactions();
    }, []),
  );

  if (loading) {
    return <Loading />;
  }

  function handleRemoveTransaction(id: string) {
    Alert.alert("Remover", "Tem certeza que deseja remover essa transação?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeTransaction(id) },
    ]);
  }

  async function removeTransaction(id: string) {
    try {
      await remove(id);
      await getTransactions();
      await getData(String(param.id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title={details.name}
        rightButton={{
          onPress: () => router.navigate(`/target?id=${param.id}`),
          icon: "edit",
        }}
      />
      <Progress data={details} />
      <List
        title="Transações"
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => {
              handleRemoveTransaction(item.id);
            }}
          />
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
