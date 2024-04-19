import { View, Text } from "react-native";
import React from "react";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const search = () => {
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const GOOGLE_MAPS_APIKEY = "AIzaSyCNfTV36PL_3yIFMxzewyPXvTSqZdldW5k";

  return (
    <View className="flex-1">
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        className="w-full h-full"
        provider={PROVIDER_GOOGLE}
      >
        
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
        <Marker coordinate={origin}  />
      </MapView>
    </View>
  );
};

export default search;
