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
    return <SplashScreen />;
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
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="fireguard" options={{ headerShown: false }} />
            <Stack.Screen
              name="AccountDetails"
              options={{ headerTitle: "Account Details" }}
            />
            <Stack.Screen
              name="AccountEdit"
              options={{ headerTitle: "Update Account" }}
            />
            <Stack.Screen
              name="UploadImages"
              options={{ headerTitle: "Upload Images" }}
            />
            <Stack.Screen
              name="UploadedImages"
              options={{ headerTitle: "Uploaded Images" }}
            />
            <Stack.Screen
              name="ReportDetails"
              options={{ headerTitle: "Report Details" }}
            />
            <Stack.Screen
              name="ViewLocation"
              options={{ headerTitle: "Location" }}
            />
            <Stack.Screen
              name="CheckWind"
              options={{ headerTitle: "Wind details for the user" }}
            />
            <Stack.Screen
              name="FireguardChat"
              options={{ headerShown:false }}
            />
            <Stack.Screen
              name="UserChat"
              options={{ headerShown:false }}
            />
            
          </Stack>
        </PaperProvider>
      </AuthProvider>
    </>
  );
};
