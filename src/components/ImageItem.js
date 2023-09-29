import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BASE_URL2 } from "../config/API";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";

const ImageItem = ({ item , role}) => {
  const route = useNavigation();
  return (
    <View className="w-1/2 h-[200px] border-4 border-white  overflow-hidden">
      <TouchableOpacity onPress={()=>route.navigate('ViewImage', {image:item.uri, id:item.id, user_id:item.user_id, role:role})}>
        <Image
          source={{ uri: `${BASE_URL2}/${item.uri}` }}
          resizeMode="cover"
          className="w-full h-full rounded-lg"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ImageItem;
