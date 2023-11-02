import { SplashScreen, Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";
import Colors from "../src/shared/Colors";
import { AuthProvider, useAuthContext } from "../src/context/AuthContext";
import { PaperProvider } from "react-native-paper";

export default () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return SplashScreen.hideAsync();
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />
      <AuthProvider>
        <PaperProvider>
          <Stack
            screenOptions={{
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: Colors.primary },
            }}
          >
            <Stack.Screen
              name="index"
              options={{ headerTitle: "Home", headerShown: false }}
            />
            <Stack.Screen
              name="SplashScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AccountDetails"
              options={{ headerTitle: "Account Details" }}
            />
            <Stack.Screen
              name="AccountEdit"
              options={{ headerTitle: "Update Account" }}
            />
            <Stack.Screen
              name="buyer/(auth)/login"
              options={{ headerTitle: "Buyer sign in" }}
            />
            <Stack.Screen
              name="seller/(auth)/login"
              options={{ headerTitle: "Seller sign in" }}
            />

            <Stack.Screen
              name="buyer/(auth)/register"
              options={{ headerTitle: "Buyer sign up" }}
            />
            <Stack.Screen
              name="seller/(auth)/register"
              options={{ headerTitle: "Seller sign up" }}
            />
            <Stack.Screen name="seller/home" options={{ headerShown: false }} />

            <Stack.Screen
              name="seller/addproduct"
              options={{ headerTitle: "Add Product" }}
            />
            <Stack.Screen name="buyer/home" options={{ headerShown: false }} />
            <Stack.Screen
              name="buyer/productDetail"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="buyer/checkout"
              options={{ headerTitle: "Delivery Information" }}
            />
            <Stack.Screen
              name="orderDetails"
              options={{ headerTitle: "Order Details" }}
            />

            <Stack.Screen
              name="seller/chat"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="buyer/chat"
              options={{ headerShown: false }}
            />
          </Stack>
        </PaperProvider>
      </AuthProvider>
    </>
  );
};
