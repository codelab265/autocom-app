import { View, Text } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { BASE_URL2 } from "../config/API";
import util from "../shared/util";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment/moment";
import { useNavigation } from "expo-router";

export default function OrderItem({ order, role }) {
  const router = useNavigation();
   const orderStatus = [
    { status: "Pending", color: "yellow" },
    { status: "Completed", color: "green" },
   { status: "Cancelled", color: "red" },
  ];
  return (
    <TouchableOpacity
      className="flex-1 flex-row items-center h-[90px] w-full bg-white rounded-lg border border-gray-200 p-2 mb-1"
      onPress={() => router.navigate("orderDetails", { order, role})}
    >
      <Avatar.Image
        source={{ uri: `${BASE_URL2}/${order.product.product_image}` }}
      />
      <View className="pl-3 flex-1">
        <View className="">
          <Text className="font-Poppins_600 text-lg">
            {order.product.product_name}
          </Text>
          <Text className="font-Poppins_500 text-primary text-base">
            {`${util.peso} ${order.amount}`}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="font-Poppins_400 text-gray-600">
            {orderStatus[order.status].status}
          </Text>
          <Text className="font-Poppins_400 text-xs text-gray-600">
            {moment(order.created_at).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
