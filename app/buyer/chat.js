import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation, useSearchParams } from "expo-router";
import axios from "axios";
import { GiftedChat } from "react-native-gifted-chat";
import { Avatar } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import Colors from "../../src/shared/Colors";
import { useAuthContext } from "../../src/context/AuthContext";
import { BASE_URL } from "../../src/config/API";

const FireguardChat = () => {
  const [messages, setMessages] = useState([]);
  const { userInfo } = useAuthContext();
  const router = useNavigation();

  const { id, seller_id, name } = useSearchParams();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await axios.get(
      `${BASE_URL}/buyer/messages/${userInfo?.id}/${seller_id}`
    );
    const messages = response.data.map((message) => ({
      _id: message.id,
      text: message.message,
      createdAt: message.created_at,
      user: {
        _id: message.sender_id,
      },
    }));
    setMessages(messages);
  };

  const onSend = async (newMessages) => {
    const response = await axios.post(`${BASE_URL}/buyer/messages/create`, {
      report_id: id,
      buyer_id: userInfo?.id,
      seller_id: seller_id,
      message: newMessages[0].text,
    });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, {
        _id: response.data.id,
        text: response.data.message,
        createdAt: response.data.created_at,
        user: {
          _id: response.data.sender_id,
        },
      })
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <View className="flex flex-row items-center bg-primary p-4">
          <TouchableOpacity onPress={() => router.goBack()}>
            <Text className="text-orange-100 mr-7">
              <FontAwesome5 name="arrow-left" size={24} />
            </Text>
          </TouchableOpacity>
          <Avatar.Text
            label={name?.charAt(0)}
            size={30}
            className="bg-orange-100 mr-3"
            color={Colors.primary}
            labelStyle={{ fontFamily: "Poppins_600SemiBold" }}
          />
          <Text className="text-base font-Poppins_500 text-orange-100">
            {name}
          </Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: userInfo?.id,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FireguardChat;
