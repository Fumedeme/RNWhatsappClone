import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import calls from "@/assets/data/calls.json";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { SegmentedControl } from "@/components/SegmentedControl";
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";

const transition = CurvedTransition.delay(100);

const Calls = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);
  const [selectedOption, setSelectedOption] = useState("All");

  const onEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (selectedOption === "All") {
      setItems(calls);
    } else {
      setItems(calls.filter((items) => items.missed));
    }
  }, [selectedOption]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={["All", "Missed"]}
              selectedOption={selectedOption}
              onOptionPress={setSelectedOption}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                {isEditing ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={defaultStyles.block}>
          <Animated.FlatList
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            itemLayoutAnimation={transition}
            renderItem={({ item, index }) => (
              <Animated.View
                entering={FadeInUp.delay(index * 20)}
                exiting={FadeOutUp}
              >
                <View style={[defaultStyles.item]}>
                  <Image source={{ uri: item.img }} style={styles.avatar} />

                  <View style={{ flex: 1, gap: 2 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: item.missed ? Colors.red : "#000",
                      }}
                    >
                      {item.name}
                    </Text>

                    <View style={{ flexDirection: "row", gap: 4 }}>
                      <Ionicons
                        name={item.video ? "videocam" : "call"}
                        size={16}
                        color={Colors.gray}
                      />
                      <Text style={{ color: Colors.gray, flex: 1 }}>
                        {item.incoming ? "Incoming" : "Outgoing"}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: Colors.gray }}>
                      {format(item.date, "MM.dd.yy")}
                    </Text>
                    <Ionicons
                      name="information-circle-outline"
                      size={24}
                      color={Colors.primary}
                    />
                  </View>
                </View>
              </Animated.View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Calls;
