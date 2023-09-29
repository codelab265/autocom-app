import { View, Text, FlatList, RefreshControl } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import ChatItem from "../../src/components/ChatItem";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "expo-router";
import axios from "axios";
import { BASE_URL } from "../../src/config/API";
import { useAuthContext } from "../../src/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { Color } from "../../src/utils/Colors";

const chat = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuthContext();
  const router = useNavigation();

  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/user/conversations/${userInfo?.id}`)
      .then((response) => {
        setLoading(false);
        setConversations(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <View className="flex-1">
        <View className="flex flex-row items-center py-2 px-4 shadow-lg bg-primary pt-4">
          <Text className="text-lg text-orange-100 font-Poppins_500">
            Messages
          </Text>
        </View>
        <View className="flex-1">
          {!loading && conversations.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Text className="font-Poppins_400 mt-4">
                No conversations yet
              </Text>
            </View>
          ) : (
            <FlatList
              data={conversations}
              renderItem={({ item }) => (
                <ChatItem
                  item={item}
                  onPress={() => console.log("something")}
                />
              )}
              keyExtractor={(item) => item.id}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={getConversations} />}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default chat;
