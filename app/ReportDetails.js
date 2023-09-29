import { View, Text } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation, useSearchParams } from "expo-router";
import { ActivityIndicator, Button, FAB } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Color } from "../src/utils/Colors";
import axios from "axios";
import { BASE_URL } from "../src/config/API";
import { useAuthContext } from "../src/context/AuthContext";

const ReportDetails = () => {
  const [loading, setLoading] = useState(false);
  let { report } = useSearchParams();
  const router = useNavigation();
  const { setReports } = useAuthContext();

  report = JSON.parse(report);

  const [mapRegion, setmapRegion] = useState({
    latitude: parseFloat(report.latitude),
    longitude: parseFloat(report.longitude),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleDelete = async () => {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/user/report/delete`, {
        id: report.id,
        user_id: report.user_id,
      })
      .then((response) => {
        setLoading(false);
        setReports(response.data);
        router.goBack();
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View className="flex-1 relative">
      <MapView
        className="w-full h-full"
        initialRegion={mapRegion}
        provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={mapRegion} title={report.location} />
        <Circle radius={500} center={mapRegion} />
      </MapView>
      {loading && (
        <ActivityIndicator
          className="absolute left-0 right-0 top-0 bottom-0"
          size={"large"}
          color={Color.primary}
        />
      )}
      <TouchableOpacity
        className="absolute right-4 bottom-4"
        onPress={handleDelete}
      >
        <FontAwesome name="trash" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default ReportDetails;
