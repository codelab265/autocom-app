import { View, Text, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../src/context/AuthContext";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { Color } from "../../src/utils/Colors";
import ChatItem from "../../src/components/fireguard/ChatItem";
import { BASE_URL } from "../../src/config/API";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuthContext();

  useEffect(() => {
    getConversation();
  }, []);

  const getConversation = async () => {
    setLoading(true);

    await axios
      .get(`${BASE_URL}/fireguard/conversations/${userInfo?.id}`)
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
                  onPress={() => console.log("something")}
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

export default Chat;
