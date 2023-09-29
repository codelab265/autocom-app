import { View, Text, FlatList } from "react-native";
import React from "react";
import { useAuthContext } from "../../src/context/AuthContext";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../src/config/API";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScrollView } from "react-native-gesture-handler";

import GalleryItem from "../../src/components/fireguard/GalleryItem";
import { ActivityIndicator } from "react-native-paper";
import { Color } from "../../src/utils/Colors";

const Gallery = () => {
  const router = useNavigation();
  const { userInfo, uploadedImages, setUploadedImages } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/fireguard/images`)
      .then((response) => {
        setLoading(false);
        setUploadedImages(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row items-center py-2 px-4 shadow-lg bg-primary pt-4">
        <Text className="text-lg text-orange-100 font-Poppins_500">
          Uploaded Images
        </Text>
      </View>
      <View className="flex-1 p-4">
        {loading && (
          <View className="flex justify-center">
            <ActivityIndicator size={"small"} color={Color.primary} />
          </View>
        )}

        {!loading && uploadedImages.length == 0 && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-base font-Poppins_500 text-gray-500">
              No images were uploaded
            </Text>
          </View>
        )}

        {!loading && uploadedImages.length > 0 && (
          <FlatList
            data={uploadedImages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <GalleryItem item={item} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Gallery;
