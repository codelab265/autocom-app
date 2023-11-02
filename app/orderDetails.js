import { View, Text, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Divider } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Colors from "../src/shared/Colors";
import axios from "axios";
import { BASE_URL } from "../src/config/API";
import { useAuthContext } from "../src/context/AuthContext";

const orderDetails = () => {
  let { order, role } = useLocalSearchParams();
  const { setOrders } = useAuthContext();
  const router = useNavigation();
  const [newOrder, setNewOrder] = useState(order);
  const [loading, setLoading] = useState(false);
  const name = role == 3 ? order.seller.name : order.buyer.name;
  const email = role == 3 ? order.seller.email : order.buyer.email;
  const phoneNumber =
    role == 2 ? order.seller?.phone_number : order.buyer?.phone_number;

  const orderStatus = [
    { status: "Pending", color: "yellow" },
    { status: "completed", color: "green" },
    { status: "canceled", color: "red" },
  ];

  const completeOrder = async (id) => {
    setLoading(true);
    axios.post(`${BASE_URL}/seller/order/complete/${id}`).then((response) => {
      setNewOrder(response.data.order);
      setOrders(response.data.orders);
      ToastAndroid.show("Order complete", ToastAndroid.LONG);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    });
  }

  const cancelOrder = async (id) => {
    setLoading(true);
    axios.post(`${BASE_URL}/buyer/order/cancel/${id}`).then((response) => {
      setNewOrder(response.data.order);
      setOrders(response.data.orders);
      ToastAndroid.show("Order cancelled", ToastAndroid.LONG);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    });
  }
  return (
    <View className="flex-1">
      <View className="flex flex-row items-center bg-primary p-4">
        <Avatar.Icon
          icon={"account-details"}
          size={60}
          className="rounded-md bg-white"
        />
        <View className="pl-2">
          <Text className="font-Poppins_600 text-lg text-green-100">
            {name}
          </Text>
          <Text className="font-Poppins_400 text-xs text-green-100">
            {email}
          </Text>
          <Text className="font-Poppins_400 text-xs text-green-100">
            {phoneNumber}
          </Text>
        </View>
      </View>
      <View className="mt-4 px-4">
        <Text className="font-Poppins_600 text-lg">Order Details</Text>
        <Divider />
        <View className="">
          <View className="flex flex-row items-center justify-between mt-2">
            <Text className="font-Poppins_400 text-gray-600">Product:</Text>
            <Text className="font-Poppins_600 text-base text-primary">
              {order.product.product_name}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between mt-2">
            <Text className="font-Poppins_400 text-gray-600">Amount:</Text>
            <Text className="font-Poppins_600 text-base text-primary">
              {order.amount}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between mt-2">
            <Text className="font-Poppins_400 text-gray-600">Status:</Text>
            <Text className="font-Poppins_600 text-base text-primary">
              {orderStatus[newOrder.status].status}
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-4 px-4">
        <Text className="font-Poppins_600 text-lg">Address</Text>
        <Divider />
        <View className="">
          <Text className="font-Poppins_400">{order?.address}</Text>
        </View>
      </View>

      {role == 2 ? (
        <View className="mt-4 px-4 w-full flex flex-row items-center">
          <View className="w-1/2 pr-1">
            <Button
              icon={"message"}
              mode="contained"
              buttonColor={Colors.primary}
              onPress={()=> router.navigate('seller/chat', {
                buyer_id: order.buyer_id,
                name: order.buyer.name,
              })}

            >
              <Text className="font-Poppins_600 text-base">Chat</Text>
            </Button>
          </View>
          <View className="w-1/2 pl-1">
            {newOrder.status == 0 ? (
              <Button
                icon={"check"}
                mode="contained"
                buttonColor={Colors.third}
                loading={loading}
                disabled={loading}
                onPress={()=>completeOrder(newOrder.id)}
              >
                <Text className="font-Poppins_600 text-base">
                  Complete order
                </Text>
              </Button>
            ) : null}
          </View>
        </View>
      ) : (
        <View className="mt-4 px-4 w-full flex flex-row items-center">
          <View className="w-1/2 pr-1">
            <Button
              icon={"message"}
              mode="contained"
              buttonColor={Colors.primary}
            >
              <Text className="font-Poppins_600 text-base">Chat</Text>
            </Button>
          </View>
          <View className="w-1/2 pl-1">
            {newOrder.status == 0 ? (
              <Button
                icon={"cancel"}
                mode="contained"
                buttonColor={Colors.third}
                loading={loading}
                disabled={loading}
                onPress={()=>cancelOrder(newOrder.id)}
              >
                <Text className="font-Poppins_600 text-base">Cancel</Text>
              </Button>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
};

export default orderDetails;
