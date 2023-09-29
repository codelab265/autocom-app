import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter, useSearchParams } from "expo-router";
import { Image } from "react-native";
import { BASE_URL, BASE_URL2 } from "../src/config/API";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Dialog, Portal } from "react-native-paper";
import axios from "axios";
import { useAuthContext } from "../src/context/AuthContext";

const ViewImage = () => {
  const { image, id, user_id, role } = useSearchParams();
  const { setUploadedImages } = useAuthContext();
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const handleDelete = async () => {
    setIsLoading(true);
    await axios
      .post(`${BASE_URL}/user/images/delete`, { id, user_id })
      .then((response) => {
        setIsLoading(false);
        setVisible(false);
        setUploadedImages(response.data);
        router.back();
      })
      .catch((error) => {
        setVisible(false);
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <View className="flex-1 relative">
      <Image
        source={{ uri: `${BASE_URL2}/${image}` }}
        resizeMode="cover"
        className="w-full h-full"
      />

      {!role && (
        <View className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center bg-white rounded-bl-md border-l-4 border-b-4 border-primary">
          <TouchableOpacity onPress={showDialog}>
            <Text className="text-red-500">
              <FontAwesome name="times" size={20} />
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Warning</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this image?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button
              onPress={handleDelete}
              loading={isLoading}
              disabled={isLoading}
            >
              <Text className="text-red-500">Yes, continue</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ViewImage;
