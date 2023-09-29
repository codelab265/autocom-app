import { View, Text } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import { Avatar, Divider } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useAuthContext } from "../src/context/AuthContext";

const AccountDetails = () => {
  const { userInfo } = useAuthContext();
  const router = useRouter();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 ">
        <View className="flex-[2] bg-primary flex items-center justify-center">
          <View className="w-28 h-28 bg-orange-100 rounded-full flex items-center justify-center">
            <Text className="font-Poppins_600 text-3xl text-primary">
            {userInfo?.first_name?.charAt(0) + "" + userInfo?.last_name?.charAt(0)}
            </Text>
          </View>
          <View className="flex flex-col items-center mt-4">
            <Text className="text-2xl font-Poppins_600 text-orange-100">
              {userInfo?.first_name + " " + userInfo?.last_name}
            </Text>
            <Text className="text-orange-100 font-Poppins_400">
            {userInfo?.email}
            </Text>
          </View>
        </View>
        <View className="flex-[3] px-4 mt-10">
          <View className="">
            <Text className="font-Poppins_500 text-lg">First Name</Text>
            <Text className="font-Poppins_400 text-gray-500">
             {userInfo?.first_name}
            </Text>
          </View>
          <Divider className="mb-4" />
          <View className="">
            <Text className="font-Poppins_500 text-lg">Last Name</Text>
            <Text className="font-Poppins_400 text-gray-500">
             {userInfo?.last_name}
            </Text>
          </View>
          <Divider className="mb-4" />
          <View className="">
            <Text className="font-Poppins_500 text-lg">Email</Text>
            <Text className="font-Poppins_400 text-gray-500">
            {userInfo?.email}
            </Text>
          </View>
          <Divider className="mb-4" />
          <View className="">
            <Text className="font-Poppins_500 text-lg">Phone Number</Text>
            <Text className="font-Poppins_400 text-gray-500">
            {userInfo?.phone_number}
            </Text>
          </View>
          <Divider className="mb-4" />
          <View className="">
            <Text className="font-Poppins_500 text-lg">Gender</Text>
            <Text className="font-Poppins_400 text-gray-500">
            {userInfo?.gender}
            </Text>
          </View>
          <Divider className="mb-4" />
          <View className="">
            <Text className="font-Poppins_500 text-lg">Age</Text>
            <Text className="font-Poppins_400 text-gray-500">
            {userInfo?.age}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountDetails;
