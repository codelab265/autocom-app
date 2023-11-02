import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Avatar, Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import moment from "moment";
import Colors from "../../shared/Colors";

const ChatItem = ({ item }) => {
  const router = useNavigation();
  console.log(item);
  return (
    <TouchableOpacity
      onPress={() =>
        router.navigate("buyer/chat", {
          seller_id: item.seller_id,
          name: item.seller.name,
        })
      }
    >
      <View className="flex flex-row w-full p-4 bg-white">
        <View className="w-[15%]">
          <Avatar.Text
            size={50}
            label={item.seller.name.charAt(0)}
            style={{ backgroundColor: Colors.primary }}
            labelStyle={{ color: "#fff", fontFamily: "Poppins_500Medium" }}
          />
        </View>
        <View className="flex flex-col w-[85%] pl-2">
          <View className="flex flex-row justify-between items-center">
            <View className="">
              <Text className="text-base font-Poppins_600">
                {item.seller.name}
              </Text>
            </View>
            <View>
              <Text className="text-xs font-Poppins_400">
                {moment(item.last_message?.updated_at).format("LT")}
              </Text>
            </View>
          </View>
          <View className="truncate">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="font-Poppins_400 text-xs text-gray-600"
            >
              {item.last_message?.message}
            </Text>
          </View>
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export default ChatItem;
