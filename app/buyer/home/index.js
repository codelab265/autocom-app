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
import Slider from "@react-native-community/slider";
import * as Location from "expo-location";
import PredictedItem from "../../../src/components/buyer/PredictedItem";

export default function Page() {
  const { Logout, userInfo, products, setProducts } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [fromRadius, setFromRadius] = useState(false);
  const [location, setLocation] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (error) {
        console.log("Error when trying to get location:", error);
      }
    })();
  }, []);

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
    let result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setImage(result);
      imageDetector(result.assets[0].uri);
    }
  };

  const imageDetector = async (imageUrl) => {
    setIsLoading(true);
    try {
      const apiKey = "AIzaSyCNfTV36PL_3yIFMxzewyPXvTSqZdldW5k";
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
      const predicts = apiResponse.data.responses[0].labelAnnotations;
      const filteredData = predicts?.filter(
        (item) => !item.description.toLowerCase().includes("sky")
      );

      const modifiedData = filteredData.map((item) => {
        if (item.description.includes("lighting")) {
          return {
            ...item,
            description: "light",
          };
        }

        if (item.description.includes("rim")) {
          return {
            ...item,
            description: "hubcab",
          };
        }

        return item;
      });
      console.log(modifiedData);
      setPredictions(modifiedData);
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredProducts = () => {
    // Filter by search query
    const currentLat = location?.coords.latitude;
    const currentLon = location?.coords.longitude;

    let filtered = products?.filter(
      (item) =>
        item.product_name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.name.toLowerCase().includes(search.toLowerCase()) ||
        item.product_description.toLowerCase().includes(search.toLowerCase())
    );

    // Filter by radius
    if (fromRadius) {
      filtered = filtered?.filter((item) => {
        if (
          currentLat &&
          currentLon &&
          item.seller.latitude &&
          item.seller.longitude
        ) {
          // Calculate distance between current location and seller's location
          const distance = getDistanceFromLatLonInKm(
            currentLat,
            currentLon,
            item.seller.latitude,
            item.seller.longitude
          );
          // Return true if within the specified radius, otherwise false
          return distance <= sliderValue;
        }
        // Return false if any of the necessary coordinates are missing
        return false;
      });
    }

    return filtered;
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const PredictedProducts = products.filter((product) =>
    predictions.some(
      (predict) =>
        product.product_name
          .toLowerCase()
          .includes(predict.description.toLowerCase()) ||
        product.category.name
          .toLowerCase()
          .includes(predict.description.toLowerCase())
    )
  );
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
            <View>
              <Text>Range:</Text>
            </View>
            <View className="flex flex-row items-center w-full mb-8">
              <View className="flex flex-grow">
                <Slider
                  style={{ width: "100%", height: 40 }}
                  minimumValue={0}
                  maximumValue={50}
                  value={sliderValue}
                  onValueChange={(value) => setSliderValue(value)}
                  minimumTrackTintColor="#ddd"
                  maximumTrackTintColor="#000000"
                />
              </View>
              <View>
                <Text>{sliderValue} KM</Text>
              </View>
            </View>

            {PredictedProducts.length > 0 &&
              PredictedProducts.map((predict) => (
                <PredictedItem product={predict} key={predict.id} />
              ))}

            {PredictedProducts.length === 0 && (
              <View className="p-2">
                <Text className="font-Poppins_400 text-base text-gray-500">
                  No products found
                </Text>
              </View>
            )}
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}
