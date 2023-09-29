import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../src/context/AuthContext";
import { useNavigation, useSearchParams } from "expo-router";
import axios from "axios";
import { BASE_URL } from "../src/config/API";
import { GiftedChat } from "react-native-gifted-chat";
import { Avatar } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Color } from "../src/utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

const FireguardChat = () => {
  const [messages, setMessages] = useState([]);
  const { userInfo } = useAuthContext();
  const router = useNavigation();

  const { id, user_id, first_name, last_name } = useSearchParams();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await axios.get(
      `${BASE_URL}/fireguard/messages/${userInfo?.id}/${user_id}`
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
    const response = await axios.post(`${BASE_URL}/fireguard/messages/create`, {
      report_id: id,
      sender_id: userInfo?.id,
      receiver_id: user_id,
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
            label={first_name?.charAt(0)}
            size={30}
            className="bg-orange-100 mr-3"
            color={Color.primary}
            labelStyle={{ fontFamily: "Poppins_600SemiBold" }}
          />
          <Text className="text-base font-Poppins_500 text-orange-100">
            {first_name + " " + last_name}
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
