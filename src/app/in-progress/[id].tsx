import { View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";

export default function InProgress() {
  const param = useLocalSearchParams<{ id: string }>();
  const details = {
    data: {
      current: "R$ 580,00",
      target: "R$ 1790,00",
      percentage: 25,
    },
  };

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
    </View>
  );
}
