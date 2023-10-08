import { View, Text } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Button, Divider, TextInput } from "react-native-paper";
import { useAuthContext } from "../../src/context/AuthContext";
import Colors from "../../src/shared/Colors";
import util from "../../src/shared/util";
import axios from "axios";
import { BASE_URL } from "../../src/config/API";
import { Alert } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const checkout = () => {
  const { product } = useLocalSearchParams();
  const { userInfo, setOrders } = useAuthContext();
  const router = useNavigation();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const completeOrder = async () => {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/buyer/order/complete`, {
        buyer_id: userInfo?.id,
        seller_id: product.seller.id,
        product_id: product.id,
        amount: product.price,
      })
      .then((response) => {
        setLoading(false);
        setOrders(response.data);
        Alert.alert("Message", "Order completed successfully");
        router.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView className="flex-1">
      <View className="flex-1 p-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text className="font-Poppins_600 text-lg">
              {product.product_name}
            </Text>
            <Text className="font-Poppins_400 text-gray-600">
              Amount: {product.price}
            </Text>
          </View>

          <View className="mt-4">
            <TextInput
              value={userInfo.name}
              label={"Full name"}
              mode="outlined"
              outlineColor="#ddd"
              disabled={true}
              className="mb-2"
            />
            <TextInput
              value={userInfo.email}
              label={"Email address"}
              mode="outlined"
              outlineColor="#ddd"
              disabled={true}
              className="mb-2"
            />
            <TextInput
              value={userInfo.phone_number}
              label={"Phone number"}
              mode="outlined"
              outlineColor="#ddd"
              disabled={true}
              className="mb-2"
            />
            <Divider className="my-3" />
            <View className="mt-4">
              <Text className="font-Poppins_600 text-lg text-red-500">
                *Delivery address
              </Text>
              <TextInput
                value={address}
                onChangeText={(e) => setAddress(e)}
                label={"Address"}
                mode="outlined"
                outlineColor="#ddd"
                className="mb-2"
              />
            </View>
            <View className="mt-4">
              <Button
                className="bg-primary"
                disabled={!address || loading ? true : false}
                onPress={completeOrder}
                loading={loading}
              >
                <Text className="font-Poppins_600 text-base text-green-100">
                  Complete Order ({`${util.peso} ${product.price}`})
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default checkout;
