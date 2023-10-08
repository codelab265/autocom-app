import { View, Text } from "react-native";
import React from "react";
import {
  useLocalSearchParams,
  useNavigation,
  useSearchParams,
} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Avatar, Button } from "react-native-paper";
import { BASE_URL2 } from "../../src/config/API";
import util from "../../src/shared/util";
import Colors from "../../src/shared/Colors";

const productDetail = () => {
  const { product } = useLocalSearchParams();
  const router = useNavigation();

  return (
    <View className="flex-1">
      <Appbar.Header className="font-Poppins_500">
        <Appbar.BackAction onPress={() => router.goBack()} />
        <Appbar.Content title={product.product_name} />
        <Appbar.Action icon="account-details" onPress={() => {}} />
        <Appbar.Action icon="message" onPress={() => {}} />
      </Appbar.Header>
      <View className="flex-1 bg-white">
        <View className="flex-[4] bg-white p-4 rounded-3xl">
          <View className="flex items-center justify-center">
            <Avatar.Image
              source={{ uri: `${BASE_URL2}/${product.product_image}` }}
              size={300}
            />
          </View>
          <View className="mt-8">
            <Text className="text-xl font-Poppins_600 text-primary">
              {`${util.peso} ${product.price}`}
            </Text>
            <Text className="font-Poppins_400 text-gray-500">
              {product.seller.name}
            </Text>
          </View>
          <View className="mt-4">
            <View className="flex flex-row items-center justify-between">
              <Text className="font-Poppins_500 text-lg">Description</Text>
              {parseInt(product.quantity) > 0 ? (
                <Text className="font-Poppins_500 text-primary">In stock</Text>
              ) : (
                <Text className="font-Poppins_500 text-red-500">
                  Out of stock
                </Text>
              )}
            </View>
            <View>
              <Text className="font-Poppins_400 text-gray-500">
                {product.product_description}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-[1] bg-primary flex items-center justify-center px-4">
          <Button className="bg-green-100 w-full" onPress={()=>router.navigate('buyer/checkout', {product})}>
            <Text className="font-Poppins_600 text-base text-primary">Buy</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default productDetail;
