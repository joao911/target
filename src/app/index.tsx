import { View, Text, Button } from "react-native";

import { HomeHeader } from "@/components/HomeHeader";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={{ total: "R$ 0,00" }} />
    </View>
  );
}
