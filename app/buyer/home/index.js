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
import { BASE_URL, api } from "../../../src/config/API";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import * as ImageManipulator from "expo-image-manipulator";
import Constants from "expo-constants";

export default function Page() {
  const { Logout, userInfo, products, setProducts } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result);
      const imgManipulated = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [
          {
            resize: { width: 900 },
          },
        ],
        {
          compress: 1,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );

      setSelectedImage(imgManipulated.uri);
      imageDetector(imgManipulated.base64);
    }
  };

  const imageDetector = async (imgBase64) => {
    try {
      const USER_ID = "cvgixrkf0o6o";
      const APP_ID = "autocom";
      const MODEL_ID = "general-image-recognition";
      const MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";
      const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg";
      const PAT = "c2a80f7507084bbdabaec8a51e6f79af";
      const raw = JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: imgBase64,
              },
            },
          },
        ],
      });

      const requestOptions = {
        headers: {
          Authorization: "Key c2a80f7507084bbdabaec8a51e6f79af",
        },
        body: raw,
      };

      const response = await axios.post(
        "https://api.clarifai.com/v2/models/general-image-recognition/versions/aa7f35c01e0642fda5cf400f543e7c40/outputs",
        requestOptions
      );

      console.log(response.data.data);
    } catch (error) {
      if (error.response) {
        console.error(
          "Server error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

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
        <View className="mt-8 flex flex-row justify-between items-center">
          <View className="w-[85%]">
            <Searchbar
              placeholder="Search"
              inputStyle={{ fontFamily: "Poppins_400Regular" }}
              className="bg-white border border-gray-200"
            />
          </View>
          <View>
            <IconButton
              icon={"image-search"}
              iconColor="#fff"
              className="bg-primary"
              size={30}
              onPress={pickImage}
            />
          </View>
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
      </View>
    </SafeAreaView>
  );
}
