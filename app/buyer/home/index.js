import { StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../../../src/context/AuthContext";
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  Searchbar,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../src/shared/Colors";
import { FlatList } from "react-native";
import ProductItem from "../../../src/components/buyer/ProductItem";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../src/config/API";
import { useEffect } from "react";

export default function Page() {
  const { Logout, userInfo, products, setProducts } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/buyer/products`) 
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-4">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center space-x-1">
            <Avatar.Text
              label={userInfo?.name?.charAt(0)}
              size={40}
              className="bg-primary"
              labelStyle={{ fontFamily: "Poppins_600SemiBold" }}
            />
            <View>
              <Text className="font-Poppins_600 text-base">Welcome,</Text>
              <Text className="font-Poppins_400 ">{userInfo?.name}</Text>
            </View>
          </View>
          <View>
            <IconButton icon={"logout"} size={30} background={Colors.primary} />
          </View>
        </View>
        <View className="mt-8">
          <Searchbar
            placeholder="Search"
            inputStyle={{ fontFamily: "Poppins_400Regular" }}
            className="bg-white border border-gray-200"
          />
        </View>
        <View className="flex-1 mt-4">
          <View>
            <Text className="font-Poppins_600 text-xl text-gray-700">
              Products
            </Text>
          </View>
          <View className="flex-1 mt-4">
            {loading ? (
              <View className="flex items-center justify-center">
                <ActivityIndicator size={"small"} />
              </View>
            ) : products.length > 0 ? (
              <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem product={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View className="flex items-center justify-center">
                <Text className="font-Poppins_400 text-base text-gray-500">
                  No products available
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
