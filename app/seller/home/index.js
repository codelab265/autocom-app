import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Button,
  Divider,
  Searchbar,
} from "react-native-paper";
import { useNavigation } from "expo-router";
import { useAuthContext } from "../../../src/context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../src/config/API";
import ProductItem from "../../../src/components/seller/ProductItem";
import Colors from "../../../src/shared/Colors";

const index = () => {
  const { products, setProducts, userInfo } = useAuthContext();
  const [loading, setLoading] = useState();
  const router = useNavigation();

  useEffect(() => {
    const getProducts = async () => {
      if (userInfo && userInfo.id) {
        // Check if userInfo and userInfo.id are defined
        console.log(userInfo.id);
        setLoading(true);
        try {
          const response = await axios.get(
            `${BASE_URL}/seller/products/${userInfo.id}`
          );
        //   console.log(response.data);
          setProducts(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    getProducts();
  }, [userInfo]);


  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="flex-1">
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text className="font-Poppins_600 text-xl">Home</Text>
          </View>
          <View className="flex flex-row items-center space-x-2">
            <Button
              icon={"plus"}
              mode="contained"
              onPress={() => router.navigate("seller/addproduct")}
              buttonColor={Colors.primary}
            >
              <Text>Create</Text>
            </Button>
          </View>
        </View>
        <View className="mt-8">
          <Searchbar
            mode="bar"
            placeholder="Search"
            className="placeholder:font-Poppins_400"
          />
        </View>
        <View className="mt-8">
          <Text className="font-Poppins_500 text-base">My products</Text>
          <Divider className="mb-3 mt-1" />
          {loading ? (
            <View className="flex items-center justify-center">
              <ActivityIndicator size={"small"} />
            </View>
          ) : products?.length > 0 ? (
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
    </SafeAreaView>
  );
};

export default index;
