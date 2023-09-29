import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { useAuthContext } from "../../src/context/AuthContext";

const Windmap = () => {
  const { location } = useAuthContext();
  const lat = location?.coords?.latitude;
  const lon = location?.coords?.longitude;
  
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

export default Windmap;
