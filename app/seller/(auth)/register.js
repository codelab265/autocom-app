import React from "react";
import {
  KeyboardAvoidingView,
  Image,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";

import {
  Button,
  Divider,
  Menu,
  RadioButton,
  TextInput,
} from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import * as Yup from "yup";
import { useAuthContext } from "../../../src/context/AuthContext";
import { useFormik } from "formik";

const register = () => {
  const { sellerRegister, Loading, location } = useAuthContext();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      longitude:location?.coords.longitude,
      latitude:location?.coords.latitude,
      password: "",

    },
    validationSchema,
    onSubmit: (values) => {
      sellerRegister(values);
    },
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-4 px-6">
          <Text className="font-Poppins_500 text-lg mt-2">
            Fill in your info
          </Text>
          
          <View className="w-full mt-4">
            <TextInput
              label={"Name"}
              mode="outlined"
              keyboardType="default"
              outlineColor="#ddd"
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
            />
            {formik.touched.name && formik.errors.name && (
              <Text
                className="text-xs font-Poppins_400 text-red-500"
              >
                {formik.errors.name}
              </Text>
            )}
          </View>

          <View className="w-full mt-4">
            <TextInput
              label={"Email"}
              mode="outlined"
              keyboardType="email-address"
              outlineColor="#ddd"
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Text
                className="text-xs font-Poppins_400 text-red-500"
              >
                {formik.errors.email}
              </Text>
            )}
          </View>
          <View className="w-full mt-4">
            <TextInput
              label={"Phone Number"}
              mode="outlined"
              keyboardType="phone-pad"
              outlineColor="#ddd"
              onChangeText={formik.handleChange("phoneNumber")}
              onBlur={formik.handleBlur("phoneNumber")}
              value={formik.values.phoneNumber}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Text
                className="text-xs font-Poppins_400 text-red-500"
              >
                {formik.errors.phoneNumber}
              </Text>
            )}
          </View>

          <View className="w-full mt-4">
            <TextInput
              label={"Password"}
              mode="outlined"
              secureTextEntry
              keyboardType="url"
              outlineColor="#ddd"
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
            />
            {formik.touched.password && formik.errors.password && (
              <Text
                className="text-xs font-Poppins_400 text-red-500"
              >
                {formik.errors.password}
              </Text>
            )}
          </View>

          <View className="w-full mt-4">
            <Button
              className="bg-secondary w-full py-[4px]"
              onPress={formik.handleSubmit}
              loading={Loading}
              disabled={Loading}
            >
              <Text className="text-yellow-800 font-Poppins_500 text-base">
                Sign up
              </Text>
            </Button>
          </View>
          <View className="flex-1 flex-row items-end justify-center gap-x-2 mt-10">
            <Text className="font-Poppins_400 text-base">Have an account?</Text>
            <TouchableOpacity onPress={() => router.push("seller/login")}>
              <Text className="font-Poppins_600 text-base text-secondary">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default register;
