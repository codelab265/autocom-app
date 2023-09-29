import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "expo-router";
import { BASE_URL2 } from "../../config/API";

const GalleryItem = ({item}) => {

  const data = JSON.stringify(item.uploaded_image);
  const router = useNavigation();
  const user = item.first_name + " " + item.last_name;

  return (
    <TouchableOpacity onPress={()=>router.navigate("UploadedImages", {images:data, user })}>
      <Card mode="contained" contentStyle={{ padding: 5, position: "relative", overflow:"hidden", marginBottom:5 }}>
        <Card.Content className="flex flex-row items-center space-x-2 mb-1 absolute z-10">
          <View className="py-2 px-4 rounded-full bg-white">
            <Text className="text-base font-Poppins_600">
              By {item.first_name} {item.last_name}
            </Text>
          </View>
        </Card.Content>
        <Card.Cover
          source={{ uri: `${BASE_URL2}/${item.uploaded_image[0].uri}` }}
          className=""
        />
        <Card.Actions className="absolute right-0 bottom-0">
          <View className="bg-primary w-10 h-10 flex items-center justify-center rounded-tl-lg rounded-br-lg shadow-md">
            <Text className="font-Poppins_600 text-xl text-orange-50">
              {item.uploaded_image.length}
            </Text>
          </View>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

export default GalleryItem;
