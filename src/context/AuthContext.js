import React, { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/API";
import { useRouter } from "expo-router";
import { ToastAndroid, Alert } from "react-native";
import * as Location from "expo-location";

export const AuthContext = createContext();

const CheckAuth = (isLogged, authLoading, userInfo) => {
  const router = useRouter();

  useEffect(() => {
    if (authLoading) {
      router.replace("SplashScreen");
    } else {
      if (isLogged) {
        if(userInfo?.role==1 || userInfo?.role==2){
          setImmediate(() => {
            router.replace("fireguard");
          });
        }else{
          setImmediate(() => {
            router.replace("home");
          });
        }
      } else {
        setImmediate(() => {
          router.replace("/");
        });
      }
    }
  }, [isLogged, authLoading]);
};

export const AuthProvider = ({ children }) => {
  const [Loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [granted, setGranted] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    checkLogged();
  }, []);

  CheckAuth(isLogged, authLoading, userInfo);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      } else {
        setGranted(true);
      }
    })();
  }, [location]);

  useEffect(() => {
    (async () => {
      if (!granted) return;
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [granted]);

  const Register = (values) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/register`, values)
      .then((response) => {
        setLoading(false);
        setUserInfo(response.data.data);
        AsyncStorage.setItem("userInfo", JSON.stringify(response.data.data));
        setIsLogged(true);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const Login = (values) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/login`, values)
      .then((response) => {
        setLoading(false);
        if (response.data.status == "success") {
          setUserInfo(response.data.data);
          AsyncStorage.setItem("userInfo", JSON.stringify(response.data.data));
          setIsLogged(true);
          console.log(response.data);
        } else {
          ToastAndroid.show("Invalid email or Password", ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const updateProfile = (values) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/user/update`, values)
      .then((response) => {
        setLoading(false);
        setUserInfo(response.data);
        AsyncStorage.setItem("userInfo", JSON.stringify(response.data));
        setIsLogged(true);
        ToastAndroid.show("Updated successfully", ToastAndroid.LONG);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const Logout = async () => {
    await AsyncStorage.removeItem("userInfo");
    setIsLogged(false);
    setUserInfo({});
    console.log("Logged out");
  };

  const checkLogged = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo) {
      setUserInfo(userInfo);
      setIsLogged(true);
    }
    setAuthLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        Register,
        Loading,
        userInfo,
        isLogged,
        authLoading,
        Login,
        updateProfile,
        Logout,
        uploadedImages,
        setUploadedImages,
        location,
        reports,
        setReports
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
