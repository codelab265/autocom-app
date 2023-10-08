import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import { useAuthContext } from "../../src/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { BASE_URL } from "../../src/config/API";
import Colors from "../../src/shared/Colors";

const addproduct = () => {
  const { userInfo, categories, setProducts } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    category_id: Yup.string().required("Category is required"),
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.string().required("Price is required"),
    quantity: Yup.string().required("Quantity is required"),
    imageUrl: Yup.object().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      seller_id: userInfo.id,
      category_id: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
      imageUrl: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      addProduct(values);
    },
  });

  const addProduct = (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("seller_id", values.seller_id);
    formData.append("category_id", values.category_id);
    formData.append("product_name", values.name);
    formData.append("product_description", values.description);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    if (values.imageUrl) {
      const uri =
        Platform.OS === "android"
          ? values.imageUrl.uri
          : values.imageUrl.uri.replace("file://", "");
      const filename = values.imageUrl.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;
      const img = { uri: uri, name: `image.${ext}`, type: type };
      console.log(img);
      formData.append("product_image", img);
    }

    axios
      .post(`${BASE_URL}/seller/products/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data, headers) => {
          return formData;
        },
      })
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
        ToastAndroid.show("Added successfully", ToastAndroid.LONG);
        formik.resetForm();
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        formik.setFieldValue("imageUrl", result.assets[0]);
      }
    } catch (error) {
      console.error("Failed to pick an image:", error);
    }
  };
  return (
    <KeyboardAvoidingView className="flex-1">
      <View className="flex-1 p-4 ">
        <ScrollView>
          <View>
            <SelectDropdown
              data={categories}
              onSelect={(selectedItem, index) => {
                formik.setFieldValue("category_id", selectedItem.id);
                console.log(selectedItem.id);
              }}
              defaultButtonText={"Select category"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              // search={true}
            />
          </View>
          <View className="mb-2">
            <TextInput
              mode="outlined"
              label={"Name"}
              outlineColor="#ddd"
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
            />
          </View>

          <View className="mb-2">
            <TextInput
              mode="outlined"
              label={"Description"}
              outlineColor="#ddd"
              multiline={true}
              onChangeText={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              value={formik.values.description}
              error={formik.touched.description && formik.errors.description}
            />
          </View>

          <View className="mb-2">
            <TextInput
              mode="outlined"
              label={"Price"}
              outlineColor="#ddd"
              keyboardType="number-pad"
              onChangeText={formik.handleChange("price")}
              onBlur={formik.handleBlur("price")}
              value={formik.values.price}
              error={formik.touched.price && formik.errors.price}
            />
          </View>

          <View className="mb-4">
            <TextInput
              mode="outlined"
              label={"Quantity"}
              outlineColor="#ddd"
              keyboardType="number-pad"
              onChangeText={formik.handleChange("quantity")}
              onBlur={formik.handleBlur("quantity")}
              value={formik.values.quantity}
              error={formik.touched.quantity && formik.errors.quantity}
            />
          </View>

          <TouchableOpacity
            className="mb-4 flex items-center justify-center rounded-lg border-2 border-dashed border-primary p-4"
            onPress={pickImage}
          >
            {formik.values.imageUrl ? (
              <Avatar.Image
                size={200}
                source={{ uri: formik.values.imageUrl?.uri }}
              />
            ) : (
              <Text className="font-Poppins_500 text-primary">
                Select image
              </Text>
            )}
          </TouchableOpacity>

          <Button
            mode="contained"
            uppercase
            loading={loading}
            disabled={loading}
            onPress={formik.handleSubmit}
            buttonColor={Colors.primary}
          >
            <Text className="font-Poppins_500 text-green-100">Add product</Text>
          </Button>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default addproduct;

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontFamily: "Poppins_400Regular",
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontFamily: "Poppins_400Regular",
  },
});
