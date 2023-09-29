import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { useAuthContext } from "../src/context/AuthContext";
import { BASE_URL } from "../src/config/API";
import { ToastAndroid } from "react-native";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Image } from "react-native";
import Colors from "../src/shared/Colors";
import {FontAwesome} from "@expo/vector-icons"

const UploadImages = () => {
  const [image, setImage] = useState([]);
  const { userInfo, setUploadedImages } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      image.forEach((item, index) => {
        formData.append(`images[${index}]`, {
          uri: item.uri,
          type: "image/jpeg",
          name: "image.jpg",
        });
      });
      formData.append("user_id", userInfo?.id);

      const response = await axios.post(`${BASE_URL}/user/upload-images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data, headers) => {
          return formData;
        },
      });

      // Handle the response from the server
      console.log(response.data);
      setLoading(false);
      setImage([]);
      setUploadedImages(response.data);
      ToastAndroid.show("Uploaded successfully", ToastAndroid.LONG);
    } catch (error) {
      // Handle error
      setLoading(false);
      console.error(error.message);
      Alert.alert("Error", "Failed to upload image.");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage([...image, ...result.assets]);
    }
  };

  const deleteImageByAssetId = (assetId) => {
    const filteredImages = image.filter((img) => img.assetId !== assetId);
    // Use the filteredImages array in your application
    setImage(filteredImages);
  };

  return (
    <View className="flex-1 p-4">
        {image.length===0 ?(
            <View className="flex-1 items-center justify-center">
            <Button onPress={pickImage}>
              <Text className="text-base font-Poppins_600">Click to select images</Text>
            </Button>
          </View>
        ):(
            <View className="flex flex-1 flex-col">
            {image.map((item, index) => (
              <View
              className="w-full h-[150px] bg-white mb-2 rounded-lg border border-gray-300 relative"
                key={index}
              >
                <TouchableOpacity>
                  <Image
                    resizeMode="contain"
                    source={{ uri: item.uri }}
                    
                    alt="image"
                    className="w-full h-full"
                  />
                </TouchableOpacity>
                <Button
                  
                  onPress={() => deleteImageByAssetId(item.assetId)}
                  className="absolute top-1 right-[1px]"
                >
                  <FontAwesome
                    name="times"
                    size={20}
                    color={Colors.primary}
                  />
                </Button>
              </View>
            ))}
          </View>
        )}
        <Button
          disabled={image.length===0 || loading }
          onPress={handleSubmit}
          mode="contained"
          className="py-1"
          loading={loading}

        >
          <Text className="font-Poppins_500 text-base">
            Upload
          </Text>
        </Button>
      
    </View>
  );
};

export default UploadImages;
