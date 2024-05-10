import { View, Text } from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../shared/Colors";

const Comment = ({ item }) => {
  console.log(item.rating);
  return (
    <View className="flex flex-row mb-4 w-full">
      <View className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
        <Text className="text-lg font-Poppins_500 text-green-100">
          {item.buyer.name.charAt(0)}
        </Text>
      </View>
      <View className="px-3">
        <Text className="text-lg font-Poppins_600">{item.buyer.name}</Text>
        <View className="flex flex-row">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Text
              style={{
                color: index < item.rating ? Colors.secondary : "gray",
              }}
              key={index}
            >
              <FontAwesome
                name={index < item.rating ? "star" : "star-o"}
                size={16}
              />
            </Text>
          ))}
        </View>
        <View className="w-full">
          <Text>{item.comment}</Text>
        </View>
      </View>
    </View>
  );
};

export default Comment;
