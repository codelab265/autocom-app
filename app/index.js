import { KeyboardAvoidingView, Image, Text, View } from "react-native";

import Logo from "../src/assets/icon.png";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View className="flex-1 p-4 px-6 flex items-center justify-center">
      <Image source={Logo} className="w-[200px] h-[200px] " />

      <View className="w-full mt-4">
        <Button
          className="bg-primary w-full py-[4px]"
          onPress={() => router.push("buyer/login")}
        >
          <Text className="text-green-100 font-Poppins_500 text-base">
            Buyer
          </Text>
        </Button>
      </View>
      <View className="w-full mt-4">
        <Button
          className="bg-secondary w-full py-[4px]"
          onPress={() => router.push("seller/login")}
        >
          <Text className="text-yellow-800 font-Poppins_500 text-base">
            Seller
          </Text>
        </Button>
      </View>
    </View>
  );
}
