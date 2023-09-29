import { View, Text } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { Color } from "../utils/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { useNavigation } from "expo-router";

const ReportItem = ({ report }) => {
  const route = useNavigation();
  const data = JSON.stringify(report);
  return (
    <TouchableOpacity
      onPress={() => route.navigate("ReportDetails", { report: data })}
    >
      <View className="w-full flex flex-col bg-white border border-gray-300 p-2 rounded-md mb-1">
        <View className="flex flex-row justify-between items-center gap-x-1">
          <Text
            className={`${
              report.attended == 1 ? "text-green-500" : "text-red-500"
            }`}
          >
            <FontAwesome name="circle" size={20} />
          </Text>
          <Text className="font-Poppins_500 text-third text-xs">
            {moment(report.created_at).fromNow()}
          </Text>
        </View>
        <Divider className="my-1" />
        <View className="w-full flex flex-row">
          <View className="w-16 h-16 bg-orange-200 rounded-md flex items-center justify-center">
            <Text className="text-orange-500">
              <FontAwesome name="map-marker" size={30} />
            </Text>
          </View>
          <View className="ml-2">
            <View>
              <Text className="font-Poppins_600">{report.location}</Text>
            </View>
            <View className="mt-1">
              <View className="flex flex-row gap-x-1">
                <Text className="text-xs font-Poppins_600">LAT:</Text>
                <Text className="text-xs font-Poppins_400">
                  {report.latitude}
                </Text>
              </View>
              <View className="flex flex-row gap-x-1">
                <Text className="text-xs font-Poppins_600">LONG:</Text>
                <Text className="text-xs font-Poppins_400">
                  {report.longitude}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReportItem;
