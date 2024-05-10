import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import { BASE_URL, BASE_URL2 } from "../../src/config/API";
import util from "../../src/shared/util";
import Colors from "../../src/shared/Colors";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useAuthContext } from "../../src/context/AuthContext";
import axios from "axios";
import Comment from "../../src/components/buyer/Comment";

const productDetail = () => {
  let { product } = useLocalSearchParams();
  const router = useNavigation();
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [ProductDetails, setProductDetails] = useState(product);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const { userInfo, setProducts } = useAuthContext();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const submitRating = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/buyer/rate-seller`, {
        product_id: ProductDetails.id,
        seller_id: ProductDetails.seller.id,
        buyer_id: userInfo.id,
        rating,
        comment,
      })
      .then((response) => {
        setProducts(response.data.products);
        setProductDetails(response.data.product[0]);
        setLoading(false);
        setRating(0);
        setComment("");
        hideModal();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <View className="flex-1 flex flex-col bg-white relative">
      <View
        className="flex-1 mb-[50px] bg-white"
        style={{ marginTop: insets.top }}
      >
        <ScrollView>
          <View className="w-full h-[350px] relative">
            <View className="absolute flex flex-row justify-between top-1 left-0 w-full z-10 px-4">
              <View>
                <IconButton
                  mode="contained"
                  icon={"arrow-left"}
                  onPress={() => router.goBack()}
                  className="bg-primary rounded-full"
                  iconColor="white"
                />
              </View>
              <View className="flex flex-row">
                <IconButton
                  mode="contained"
                  icon={"store-marker"}
                  onPress={() =>
                    router.navigate("buyer/sellerLocation", { ProductDetails })
                  }
                  className="bg-primary rounded-full"
                  iconColor="white"
                />
                <IconButton
                  mode="contained"
                  icon={"message"}
                  onPress={() =>
                    router.navigate("buyer/chat", {
                      seller_id: ProductDetails.seller_id,
                      name: ProductDetails.seller.name,
                    })
                  }
                  className="bg-primary rounded-full"
                  iconColor="white"
                />
              </View>
            </View>
            <Image
              source={{
                uri: `${BASE_URL2}/${ProductDetails.product_image}`,
              }}
              className="w-full h-full object-cover"
            />
          </View>
          <View className="mt-8 px-4 flex flex-row justify-between">
            <View>
              <Text className="text-xl font-Poppins_600 text-slate-900">
                {ProductDetails.product_name}
              </Text>
              <Text className="font-Poppins_400 text-gray-500">
                {ProductDetails.seller.name}
              </Text>
            </View>
            <View>
              <Text className="text-lg font-Poppins_600 text-slate-900">
                {`${util.peso} ${ProductDetails.price}`}
              </Text>
            </View>
          </View>
          <View className="mt-4 px-4">
            <View>
              <Text className="font-Poppins_400 text-gray-500">
                {ProductDetails.product_description}
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between px-4 mt-4">
            <View>
              <Text className="font-Poppins_600 text-lg text-slate-900">
                Reviews ({ProductDetails.comments.length})
              </Text>
            </View>
            <View className="flex flex-row">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <Text
                  style={{
                    color:
                      index < parseInt(ProductDetails.rating)
                        ? Colors.secondary
                        : "gray",
                  }}
                  key={index}
                >
                  <FontAwesome
                    name={
                      index < parseInt(ProductDetails.rating)
                        ? "star"
                        : "star-o"
                    }
                    size={20}
                  />
                </Text>
              ))}
            </View>
          </View>
          <View className="px-4 mt-4">
            {ProductDetails.comments.map((item, index) => (
              <Comment key={index} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="absolute w-full flex flex-row gap-x-2 px-4 bottom-0 left-0 right-0">
        <Button
          className="bg-secondary flex-grow"
          onPress={() => router.navigate("buyer/checkout", { ProductDetails })}
        >
          <Text className="font-Poppins_600 text-base text-black">Buy</Text>
        </Button>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.ContainerStyle}
          >
            <Text>Rating({rating}): </Text>
            <View className="flex flex-row space-x-3">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <TouchableOpacity
                  onPress={() => setRating(index + 1)}
                  key={index}
                >
                  <Text
                    style={{
                      color: index < rating ? Colors.secondary : "gray",
                    }}
                    key={index}
                  >
                    <FontAwesome
                      name={index < rating ? "star" : "star-o"}
                      size={32}
                    />
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="mt-2">
              <TextInput
                defaultValue={comment}
                onChangeText={(e) => setComment(e)}
                multiline={true}
                numberOfLines={3}
                mode="outlined"
                label={"Comment"}
              />
            </View>
            <Button
              className="bg-primary mt-4"
              textColor="white"
              disabled={comment.length < 3}
              loading={loading}
              onPress={submitRating}
            >
              Submit
            </Button>
          </Modal>
        </Portal>
        <Button
          mode="contained"
          onPress={showModal}
          className="bg-primary ml-2"
        >
          Rate
        </Button>
      </View>
    </View>
  );
};

export default productDetail;

const styles = StyleSheet.create({
  ContainerStyle: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
  },
});
