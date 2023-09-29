import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Avatar, Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import moment from "moment";

const ChatItem = ({item}) => {
  const  randomColor = ()=> {
    return 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
}

  const width = Dimensions.get("screen").width;

  const getColor = () => {
    const chatIndex = Math.floor(Math.random() * chatColors.length);
    const index = chatIndex % chatColors.length;
    return chatColors[index];
  };

  const router = useNavigation();
  return (
    <TouchableOpacity onPress={()=>router.navigate('FireguardChat', {
        user_id:item.receiver_id,
        first_name:item.receiver.first_name,
        last_name:item.receiver.last_name
    })}>
      <View className="flex flex-row w-full p-4 bg-white">
        <View className="w-[15%]">
          <Avatar.Text
            size={50}
            label={item.receiver.first_name.charAt(0)} 
            style={{ backgroundColor: randomColor() }}
            labelStyle={{ color: "#fff", fontFamily: "Poppins_500Medium" }}
          />
        </View>
        <View className="flex flex-col w-[85%] pl-2">
          <View className="flex flex-row justify-between items-center">
            <View className="">
              <Text className="text-base font-Poppins_600">
                {item.receiver.first_name+" "+item.receiver.last_name}
              </Text>
            </View>
            <View>
              <Text className="text-xs font-Poppins_400">
                {moment(item.last_message.updated_at).format('LT')}
              </Text>
            </View>
          </View>
          <View className="truncate">
            <Text numberOfLines={1} ellipsizeMode="tail" className="font-Poppins_400 text-xs text-gray-600"
            >
              {item.last_message.message}
            </Text>
          </View>
        </View>
      </View>
      <Divider/>
    </TouchableOpacity>
  );
};

export default ChatItem;
