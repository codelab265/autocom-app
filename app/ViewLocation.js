import { View, Text } from "react-native";
import React, { useState } from "react";
import { useNavigation, useSearchParams } from "expo-router";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Button } from "react-native-paper";
import { useAuthContext } from "../src/context/AuthContext";

const ViewLocation = () => {
  const { id, user_id, first_name, last_name, latitude, longitude } =
    useSearchParams();
  const router = useNavigation();
  const { location } = useAuthContext();
  const [mapRegion, setmapRegion] = useState({
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const [coordinates] = useState([
    {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    },
    {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    },
  ]);
  const GOOGLE_MAPS_APIKEY = "AIzaSyCG9E5E7_YCna0L7GCr8BJgGjLlxkkJE-8";

  return (
    <View className="flex-1 relative">
      <MapView
        className="w-full h-full"
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
          strokeWidth={4}
          strokeColor="red"
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
      </MapView>
      <Button
        mode="contained"
        className="absolute bottom-3 right-3"
        onPress={() =>
          router.navigate("FireguardChat", {
            id: id,
            user_id: user_id,
            first_name: first_name,
            last_name: last_name,
          })
        }
      >
        <Text>Chat</Text>
      </Button>
      <Button
        mode="contained"
        className="absolute bottom-3 right-28"
        onPress={() =>
          router.navigate("CheckWind", {
            latitude,
            longitude,
          })
        }
      >
        <Text>Check wind</Text>
      </Button>
    </View>
  );
};

export default ViewLocation;
