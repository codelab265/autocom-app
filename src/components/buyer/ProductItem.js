import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import { BASE_URL2 } from "../../config/API";
import util from "../../shared/util";
import { useNavigation } from "expo-router";

const ProductItem = ({ product }) => {
  const router = useNavigation();

  return (
    <TouchableOpacity
      className="flex flex-row items-center h-[120px] w-full bg-white rounded-lg border border-gray-200 p-2 mb-1"
      onPress={() =>
        router.navigate("buyer/productDetail", { product: product })
      }
    >
      <Avatar.Image
        source={{ uri: `${BASE_URL2}/${product.product_image}` }}
        size={100}
        className="bg-gray-100"
      />
      <View className="flex-1 px-4 w-full">
        <View>
          <Text className="text-lg font-Poppins_500">
            {product.product_name}
          </Text>
          <Text className="font-Poppins_400 text-gray-500">
            {product?.category?.name}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="font-Poppins_500 text-primary">{`${
            util.peso
          } ${parseInt(product.price).toFixed(0)}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
