import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View className="flex flex-1 justify-center items-center">
        <ActivityIndicator/>
      <Text className="mt-2 font-Poppins_400">Getting Data..</Text>
    </View>
  )
}

export default SplashScreen