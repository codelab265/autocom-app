import { View, Text } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, TextInput } from "react-native-paper";
import { useAuthContext } from "../src/context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../src/config/API";
import { ToastAndroid } from "react-native";

const CreateReport = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { userInfo, location, setReports } = useAuthContext();

  const handleReport = async (values, resetForm) => {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/user/report`, {
        location: values.location,
        user_id: userInfo?.id,
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      })
      .then((response) => {
        setLoading(false);
        ToastAndroid.show("Added successfully", ToastAndroid.LONG);
        setReports(response.data);
       formik.resetForm();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const validationSchema = Yup.object().shape({
    location: Yup.string().required("location is required"),
  });
  const formik = useFormik({
    initialValues: {
      location: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleReport(values);
      resetForm();
    },
  });

  return (
    <View className="flex-1 p-4">
      <View>
        <TextInput
          value={formik.values.location}
          label={"Location"}
          mode="outlined"
          keyboardType="default"
          outlineColor="#ddd"
          onChangeText={formik.handleChange("location")}
          onBlur={formik.handleBlur("location")}
          error={formik.touched.location && formik.errors.location}
        />
        {formik.touched.location && formik.errors.location && (
          <Text className="text-xs font-Poppins_400 text-red-500">
            {formik.errors.location}
          </Text>
        )}
      </View>
      <View className="w-full mt-4">
        <Button
          className="bg-orange-500 w-full py-[4px]"
          onPress={formik.handleSubmit}
          loading={loading}
          disabled={loading}
        >
          <Text className="text-orange-100 font-Poppins_500 text-base">
            Submit
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default CreateReport;
