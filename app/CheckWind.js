import { View, Text } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { useSearchParams } from "expo-router";

const CheckWind = () => {
  const { latitude, longitude } = useSearchParams();
  const lat = latitude;
  const lon = longitude;
  return (
    <View className="flex-1">
      <WebView
        className="w-full h-full"
        source={{
          uri: `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=4&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`,
        }}
      />
    </View>
  );
};

export default CheckWind;
