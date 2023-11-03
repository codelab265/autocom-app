import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";

const sellerLocation = () => {
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const GOOGLE_MAPS_APIKEY = "AIzaSyAQrBDvwyt-UZyeTQFmO52xVf5Iu23Qoqw";
  const { product } = useLocalSearchParams();
  console.log(product);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  return (
    <View className="flex-1">
      {location ? (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          className="w-full h-full"
          provider={PROVIDER_GOOGLE}
        >
          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            destination={`${product.seller.latitude}, ${product.seller.longitude}`}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="red"
          />
          <Marker
            coordinate={{
              latitude: parseFloat(product.seller.latitude),
              longitude: parseFloat(product.seller.longitude),
            }}
            pinColor="red"
          />
          <Circle
            center={{
              latitude: parseFloat(product.seller.latitude),
              longitude: parseFloat(product.seller.longitude),
            }}
            radius={400}
            strokeWidth={3}
            strokeColor="red"
          />
        </MapView>
      ) : (
        <View className="flex flex-row items-center justify-center space-x-2 mt-1">
          <ActivityIndicator />
          <Text className="font-Poppins_400 text-base">
            Getting your location..
          </Text>
        </View>
      )}
    </View>
  );
};

export default sellerLocation;
