import { StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../../../src/context/AuthContext";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
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
import * as FileSystem from "expo-file-system";

export default function Page() {
  const { Logout, userInfo, products, setProducts } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  };

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
      imageDetector(result.assets[0].uri);
    }
  };

  const imageDetector = async (imageUrl) => {
    setIsLoading(true);
    try {
      const apiKey = "AIzaSyAQrBDvwyt-UZyeTQFmO52xVf5Iu23Qoqw";
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      const base64Image = await FileSystem.readAsStringAsync(imageUrl, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [{ type: "LABEL_DETECTION", maxResults: 3 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiUrl, requestData);
      console.log(apiResponse.data.responses[0].labelAnnotations);
      setPredictions(apiResponse.data.responses[0].labelAnnotations);
      showModal();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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

  const filteredProducts = () => {
    if (search.length < 1) {
      return products;
    } else {
      return products.filter(
        (item) =>
          item.product_name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.name.toLowerCase().includes(search.toLowerCase())
      );
    }
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
              value={search}
              onChangeText={(e) => setSearch(e)}
            />
          </View>
          <View>
            {isLoading ? (
              <View className="flex items-center justify-center">
                <ActivityIndicator size={"small"} />
              </View>
            ) : (
              <IconButton
                icon={"image-search"}
                iconColor="#fff"
                className="bg-primary"
                size={30}
                onPress={pickImage}
              />
            )}
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
                data={filteredProducts()}
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
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text className="font-Poppins_600 text-lg">RESULTS</Text>
          <Divider />
          <View className="mt-2">
            {predictions.map((predict) => (
              <View
                className="flex flex-row items-center justify-between bg-gray-100 p-2 mb-1 rounded-sm"
                key={predict.score}
              >
                <Text className="font-Poppins_400">{predict.description}</Text>
                <Button
                  mode="contained"
                  onPress={() => setSearch(predict.description)}
                >
                  <Text className="font-Poppins_500">Use</Text>
                </Button>
              </View>
            ))}
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}
