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
                style={{ color:color }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tabs.Screen name="products"
      options={{
        tabBarIcon: ({ color, focused }) => (
          <View className="flex flex-col items-center justify-center">
            <FontAwesome name="tag" size={20} color={color} />
            <Text
              className={focused ? "font-Poppins_500" : "font-Poppins_400"}
              style={{ color:color }}
            >
              Products
            </Text>
          </View>
        ),
      }}
      /> */}
      <Tabs.Screen name="orders"
      options={{
        tabBarIcon: ({ color, focused }) => (
          <View className="flex flex-col items-center justify-center">
            <FontAwesome name="list" size={20} color={color} />
            <Text
              className={focused ? "font-Poppins_500" : "font-Poppins_400"}
              style={{ color:color }}
            >
              Orders
            </Text>
          </View>
        ),
      }}
      />
      <Tabs.Screen name="chatlist"
      options={{
        tabBarIcon: ({ color, focused }) => (
          <View className="flex flex-col items-center justify-center">
            <FontAwesome name="commenting-o" size={20} color={color} />
            <Text
              className={focused ? "font-Poppins_500" : "font-Poppins_400"}
              style={{ color:color }}
            >
              Chat
            </Text>
          </View>
        ),
      }}
      />
      <Tabs.Screen name="profile"
      options={{
        tabBarIcon: ({ color, focused }) => (
          <View className="flex flex-col items-center justify-center">
            <FontAwesome name="user" size={20} color={color} />
            <Text
              className={focused ? "font-Poppins_500" : "font-Poppins_400"}
              style={{ color:color }}
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
