import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Colors from "../../../src/shared/Colors";

export default function () {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { paddingVertical: 10, height: 70, marginVertical: 0 },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="flex flex-col items-center justify-center">
              <FontAwesome name="home" size={20} color={color} />
              <Text
                className={focused ? "font-Poppins_500" : "font-Poppins_400"}
                style={{ color: color }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="flex flex-col items-center justify-center">
              <FontAwesome name="search" size={20} color={color} />
              <Text
                className={focused ? "font-Poppins_500" : "font-Poppins_400"}
                style={{ color: color }}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="flex flex-col items-center justify-center">
              <FontAwesome name="list" size={20} color={color} />
              <Text
                className={focused ? "font-Poppins_500" : "font-Poppins_400"}
                style={{ color: color }}
              >
                Orders
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chatlist"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="flex flex-col items-center justify-center">
              <FontAwesome name="commenting-o" size={20} color={color} />
              <Text
                className={focused ? "font-Poppins_500" : "font-Poppins_400"}
                style={{ color: color }}
              >
                Chat
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="flex flex-col items-center justify-center relative">
              <FontAwesome name="shopping-bag" size={20} color={color} />
              <Text
                className={focused ? "font-Poppins_500" : "font-Poppins_400"}
                style={{ color: color }}
              >
                cart
              </Text>
              <View className="absolute flex items-center justify-center w-6 h-6 rounded-full bg-secondary -top-3 -right-3">
                  <Text>2</Text>
              </View>
            </View>
          ),
          
        }}
      /> */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="flex flex-col items-center justify-center">
              <FontAwesome name="user" size={20} color={color} />
              <Text
                className={focused ? "font-Poppins_500" : "font-Poppins_400"}
                style={{ color: color }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
