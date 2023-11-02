import { View, Text } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../src/config/API";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Badge, Divider } from "react-native-paper";

import OrderItem from "../../../src/components/OrderItem";
import { useAuthContext } from "../../../src/context/AuthContext";
import { FlatList } from "react-native-gesture-handler";
import { ScrollView } from "react-native";

const orders = () => {
  const { orders, setOrders, userInfo } = useAuthContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      if (userInfo && userInfo.id) {
        // Check if userInfo and userInfo.id are defined
        console.log(userInfo.id);
        setLoading(true);
        try {
          const response = await axios.get(
            `${BASE_URL}/seller/orders/${userInfo.id}`
          );
        //   console.log(response.data);
          setOrders(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    getOrders();
  }, [userInfo]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-4">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-Poppins_600 text-lg">Orders</Text>
          <Badge className="bg-primary">
            <Text className="text-green-100">{orders?.length}</Text>
          </Badge>
        </View>
        <Divider className="my-3" />
        <View className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <View className="flex items-center justify-center">
                <ActivityIndicator size={"small"} />
              </View>
            ) : !loading && orders.length > 0 ? (
              
              orders.map((item) => <OrderItem order={item} key={item.id} role={2} />)
            ) : (
              <View className="flex items-center justify-center">
                <Text className="font-Poppins_400 text-base text-gray-500">
                  No orders available
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default orders;
