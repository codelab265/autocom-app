import { View, Text } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { Color } from "../../utils/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { useNavigation } from "expo-router";

const ReportItem = ({ report }) => {
  const router = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        router.navigate("ViewLocation", {
          id: report.id,
          user_id: report.user_id,
          first_name: report.user.first_name,
          last_name: report.user.last_name,
          location: report.location,
          latitude: report.latitude,
          longitude: report.longitude,
        })
      }
    >
      <View className="w-full flex flex-col bg-white border border-gray-300 p-2 rounded-md mb-2">
        <View className="w-full flex flex-row">
          <View className="w-16 h-16 bg-orange-200 rounded-md flex items-center justify-center">
            <Text className="text-orange-500">
              <FontAwesome name="map-marker" size={30} />
            </Text>
          </View>
          <View className="ml-2 flex-1 ">
            <View className="w-full flex flex-row justify-between">
              <Text className="text-sm font-Poppins_500">
                {report.user.first_name + " " + report.user.last_name}
              </Text>
              <Text
                className={`${
                  report.attended==1 ? "text-green-500" : "text-red-500"
                }`}
              >
                <FontAwesome name="circle" size={20} />
              </Text>
            </View>
            <View className="mt-1">
              <Text className="font-Poppins_400">{report.location}</Text>
            </View>
            <View className="flex flex-row items-center gap-x-1 mt-1">
              <FontAwesome5 name="clock" color={Color.secondary} />
              <Text className="font-Poppins_500 text-secondary text-xs">
                {moment(report.created_at).fromNow()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReportItem;
