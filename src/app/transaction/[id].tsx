import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CyrrencyInput ";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TransactionType } from "@/components/TransactionType";
import { useState } from "react";
import { TransactionTypes } from "@/utils/transationtypes";

export default function Transaction() {
  const [type, setType] = useState(TransactionTypes.Input);
  const param = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova Transação"
        subTitle="A cada valor guardado você fica mais proximo da dua meta. Se esforce para guardar e evite retirar"
        rightButton={{
          onPress: () => {},
          icon: "edit",
        }}
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <CurrencyInput label="Valor alvo (R$)" value={0} />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: viagem para praia, smart watch"
        />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
