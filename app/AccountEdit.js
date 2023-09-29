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
import axios from "axios";
import { useAuthContext } from "../src/context/AuthContext";
import { useFormik } from "formik";

const AccountEdit = () => {
  const { updateProfile, Loading, userInfo } = useAuthContext();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Full Name is required"),
    lastName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.string().required("Age is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: userInfo?.id,
      firstName: userInfo?.first_name,
      lastName: userInfo?.last_name,
      email: userInfo?.email,
      phoneNumber: userInfo?.phone_number,
      age: userInfo?.age,
      gender: userInfo?.gender,
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      updateProfile(values);
    },
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-4 px-6">
          <Text className="font-Poppins_500 text-lg mt-2">
            Update your account
          </Text>
          <View className="w-full mt-4">
            <TextInput
              label={"First Name"}
              mode="outlined"
              keyboardType="default"
              outlineColor="#ddd"
              onChangeText={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("firstName")}
              value={formik.values.firstName}
              error={formik.touched.firstName && formik.errors.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Text className="text-xs font-Poppins_400 text-red-500">
                {formik.errors.firstName}
              </Text>
            )}
          </View>
          <View className="w-full mt-4">
            <TextInput
              label={"Last Name"}
              mode="outlined"
              keyboardType="default"
              outlineColor="#ddd"
              onChangeText={formik.handleChange("lastName")}
              onBlur={formik.handleBlur("lastName")}
              value={formik.values.lastName}
              error={formik.touched.lastName && formik.errors.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Text className="text-xs font-Poppins_400 text-red-500">
                {formik.errors.lastName}
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
              <Text className="text-xs font-Poppins_400 text-red-500">
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
              <Text className="text-xs font-Poppins_400 text-red-500">
                {formik.errors.phoneNumber}
              </Text>
            )}
          </View>

          <View className="w-full mt-4">
            <TextInput
              label={"Age"}
              mode="outlined"
              keyboardType="phone-pad"
              outlineColor="#ddd"
              onChangeText={formik.handleChange("age")}
              onBlur={formik.handleBlur("age")}
              value={formik.values.age}
              error={formik.touched.age && formik.errors.age}
            />
            {formik.touched.age && formik.errors.age && (
              <Text className="text-xs font-Poppins_400 text-red-500">
                {formik.errors.age}
              </Text>
            )}
          </View>

          <View className="w-full mt-4 bg-white border border-[#ddd] rounded-md p-1 px-4">
            <Text className="text-base font-Poppins_400">Gender</Text>
            <RadioButton.Group
              onValueChange={formik.handleChange("gender")}
              value={formik.values.gender}
            >
              <View className="flex flex-row gap-x-4">
                <View className="flex flex-row items-center">
                  <Text className="text-small font-Poppins_400">Male</Text>
                  <RadioButton
                    value="Male"
                    status={
                      formik.values.gender == "Male" ? "checked" : "unchecked"
                    }
                  />
                </View>
                <View className="flex flex-row items-center">
                  <Text className="text-small font-Poppins_400">Female</Text>
                  <RadioButton
                    value="Female"
                    status={
                      formik.values.gender == "Female" ? "checked" : "unchecked"
                    }
                  />
                </View>
              </View>
            </RadioButton.Group>
            {formik.touched.gender && formik.errors.gender && (
              <Text className="text-xs font-Poppins_400 text-red-500">
                {formik.errors.gender}
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
              <Text className="text-xs font-Poppins_400 text-red-500">
                {formik.errors.password}
              </Text>
            )}
          </View>

          <View className="w-full mt-4">
            <Button
              className="bg-orange-500 w-full py-[4px]"
              onPress={formik.handleSubmit}
              loading={Loading}
              disabled={Loading}
            >
              <Text className="text-orange-100 font-Poppins_500 text-base">
                Update
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AccountEdit;
