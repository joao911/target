import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CyrrencyInput ";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { Text, View } from "react-native";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subTitle="Economize para alcançar seus objetivos"
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da Meta"
          placeholder="Ex: viagem para praia, smart watch"
        />
        <CurrencyInput label="Valor alvo" value={0} />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
