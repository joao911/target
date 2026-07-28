import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    height: 42,
    width: "100%",
    flexDirection: "row",
    borderBottomColor: colors.gray[200],
    borderRadius: 8,
    overflow: "hidden",
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
    gap: 7,
  },
  title: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
  },
});
