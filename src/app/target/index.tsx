import { PageHeader } from "@/components/PageHeader";
import { Text, View } from "react-native";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subTitle="Economize para alcançar seus objetivos"
      />
    </View>
  );
}
