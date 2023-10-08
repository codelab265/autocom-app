import { View, Text } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import Logo from "../../assets/icon.png";
import { BASE_URL2 } from "../../config/API";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProductItem = ({ product }) => {
  return (
    <TouchableOpacity className="flex flex-row items-center h-[120px] w-full bg-white rounded-lg border border-gray-200 p-2 mb-1">
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
        <View className="flex flex-row justify-between ">
          <Text className="font-Poppins_500 text-primary">
            Quantity: {product.quantity}
          </Text>
          <Text className="font-Poppins_500 text-primary">{product.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
