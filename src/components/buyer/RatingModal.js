import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../shared/Colors";

const RatingModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [comments, setComment] = React.useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.ContainerStyle}
        >
          <View className="flex flex-row space-x-3">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <TouchableOpacity
                onPress={() => setRating(index + 1)}
                key={index}
              >
                <Text
                  style={{ color: index < rating ? Colors.secondary : "gray" }}
                  key={index}
                >
                  <FontAwesome
                    name={index < rating ? "star" : "star-o"}
                    size={32}
                  />
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            mode="outlined"
            defaultValue={comments}
            onChangeText={setComment}
          />
        </Modal>
      </Portal>
      <Button mode="contained" onPress={showModal} className="bg-primary ml-2">
        Rate
      </Button>
    </>
  );
};

export default RatingModal;

const styles = StyleSheet.create({
  ContainerStyle: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
  },
});
