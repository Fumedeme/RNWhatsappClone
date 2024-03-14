import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React, { useState, useCallback, useEffect, useRef } from "react";
import messageData from "@/assets/data/messages.json";
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  SystemMessage,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import ChatMessageBox from "@/components/ChatMessageBox";
import ReplyMessageBar from "@/components/ReplyMessageBar";

const Page = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");

  const swipeableRowRef = useRef<Swipeable | null>(null);
  const [replyMessage, setReplyMessage] = useState<
    IMessage | null | undefined
  >();

  useEffect(() => {
    setMessages([
      ...messageData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? "You" : "Bob",
          },
        };
      }),
      {
        _id: 0,
        system: true,
        text: "All your base are belong to us",
        createdAt: new Date(),
        user: {
          _id: 0,
          name: "Bot",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  return (
    <ImageBackground
      source={require("@/assets/images/pattern.png")}
      style={{
        flex: 1,
        marginBottom: insets.bottom,
        backgroundColor: Colors.background,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{ _id: 1 }}
        renderSystemMessage={(props) => (
          <SystemMessage {...props} textStyle={{ color: Colors.gray }} />
        )}
        onInputTextChanged={setText}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        maxComposerHeight={100}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{ right: { color: "#000" } }}
              wrapperStyle={{
                left: { backgroundColor: "#fff" },
                right: { backgroundColor: Colors.lightGreen },
              }}
            />
          );
        }}
        renderSend={(props) => (
          <View
            style={{
              flexDirection: "row",
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              paddingHorizontal: 14,
            }}
          >
            {text?.length > 0 && (
              <Send containerStyle={{ justifyContent: "center" }} {...props} />
            )}
            {text?.length === 0 && (
              <>
                <Ionicons
                  name="camera-outline"
                  color={Colors.primary}
                  size={28}
                />
                <Ionicons name="mic-outline" color={Colors.primary} size={28} />
              </>
            )}
          </View>
        )}
        textInputProps={styles.composer}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{ backgroundColor: Colors.background }}
            renderActions={() => (
              <View
                style={{
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                  left: 5,
                }}
              >
                <Ionicons name="add" color={Colors.primary} size={28} />
              </View>
            )}
          />
        )}
        renderMessage={(props) => (
          <ChatMessageBox
            {...props}
            updateRowRef={updateRowRef}
            setReplyOnSwipeOpen={setReplyMessage}
          />
        )}
        renderChatFooter={() => (
          <ReplyMessageBar
            clearReply={() => setReplyMessage(null)}
            message={replyMessage}
          />
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  composer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 10,
    fontSize: 16,
    marginVertical: 4,
    paddingTop: 8,
  },
});
export default Page;
