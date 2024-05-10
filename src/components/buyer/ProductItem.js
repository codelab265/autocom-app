import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import { BASE_URL2 } from "../../config/API";
import util from "../../shared/util";
import { useNavigation } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../shared/Colors";

const ProductItem = ({ product }) => {
  const router = useNavigation();

  return (
    <TouchableOpacity
      className="flex flex-row items-center h-[120px] w-full bg-white rounded-lg border border-gray-200 p-2 mb-1"
      onPress={() =>
        router.navigate("buyer/productDetail", { product: product })
      }
    >
      <View className="w-[85px] h-[100px] overflow-hidden rounded-md">
        <Image
          source={{ uri: `${BASE_URL2}/${product.product_image}` }}
          className="w-full h-full object-cover"
        />
      </View>
      <View className="flex-1 px-4 w-full">
        <View>
          <Text className="text-base font-Poppins_500">
            {product.product_name}
          </Text>
          <Text className="text-sm font-Poppins_400 text-gray-500">
            {product?.category?.name}
          </Text>
        </View>
        <View className="flex flex-row justify-between mt-1">
          <View className="flex flex-row">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Text
                style={{
                  color:
                    index < parseInt(product.rating)
                      ? Colors.secondary
                      : "gray",
                }}
                key={index}
              >
                <FontAwesome
                  name={index < parseInt(product.rating) ? "star" : "star-o"}
                  size={16}
                />
              </Text>
            ))}
          </View>
          <Text className="font-Poppins_600 text-lg">{`${util.peso} ${parseInt(
            product.price
          ).toFixed(0)}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
