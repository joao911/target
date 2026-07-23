import React from "react";
import {
  View,
  FlatList,
  FlatListProps,
  StyleProp,
  ViewStyle,
  Text,
} from "react-native";

import { styles } from "./styles";
import { Divider } from "../Divider";
import { colors } from "@/theme";

type Props<T> = FlatListProps<T> & {
  title?: string;
  emptyMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const List = <T,>({
  title,
  emptyMessage,
  containerStyle,
  data,
  renderItem,
  ...rest
}: Props<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider color={colors.gray[200]} />}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>{emptyMessage}</Text>
        )}
        {...rest}
      />
    </View>
  );
};
