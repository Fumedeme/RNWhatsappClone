import { View, Text } from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";

export interface ChatRowProps {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}

const ChatRow: FC<ChatRowProps> = ({
  id,
  from,
  date,
  img,
  msg,
  read,
  unreadCount,
}) => {
  return (
    <Link href={"/"} asChild>
      <Text>{from}</Text>
    </Link>
  );
};

export default ChatRow;
