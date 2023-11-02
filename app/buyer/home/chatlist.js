import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { useAuthContext } from "../../../src/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { RefreshControl } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../src/config/API";
import ChatItem from "../../../src/components/buyer/ChatItem";

const chatlist = () => {

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuthContext();

  useEffect(() => {
    getConversation();
  }, []);

  const getConversation = async () => {
    setLoading(true);
    console.log(userInfo.id);
    await axios
      .get(`${BASE_URL}/buyer/conversations/${userInfo?.id}`)
      .then((response) => {
        setLoading(false);
        setConversations(response.data);
        console.log(response.data);
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
                />
              )}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getConversation} />
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default chatlist;
