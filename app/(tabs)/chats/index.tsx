import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import chats from "@/assets/data/chats.json";
import { defaultStyles } from "@/constants/Styles";
import ChatRow from "@/components/ChatRow";

const Page = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <FlatList
        data={chats}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        renderItem={({ item }) => <ChatRow {...item} />}
      ></FlatList>
    </ScrollView>
  );
};

export default Page;
