import { View, Text } from "react-native";
import React from "react";
import { useNavigation, useRouter, useSearchParams } from "expo-router";
import ImageItem from "../src/components/ImageItem";
import { FlatList } from "react-native";

const UploadedImages = () => {
  let { images, user } = useSearchParams();
  if (!images) {
    // Handle the case when images is undefined or empty
    return null;
  } else {
    images = JSON.parse(images);
  }   
  const router = useRouter();
  const navigate = useNavigation();

  return (
    <View className="flex-1">
      <View className="flex flex-row items-center space-x-1 px-4 pt-4">
        <Text className="font-Poppins_400">By </Text><Text className="font-Poppins_500">{user}</Text>
      </View>
      <View className="flex-1 p-4">
        <FlatList
          numColumns={2}
          data={images}
          renderItem={({ item }) => (
            <ImageItem item={item} role={true} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: "space-between" }}
        />
      </View>
    </View>
  );
};

export default UploadedImages;
