import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import * as Location from "expo-location";
import { BASE_URL } from "../config/API";
import { useRouter } from "expo-router";

export const AuthContext = createContext();

const CheckAuth = (isLogged, authLoading, userInfo, router) => {
  useEffect(() => {
    if (authLoading) {
      router.replace("SplashScreen");
    } else {
      if (isLogged) {
        if (userInfo?.role == 1 || userInfo?.role == 2) {
          setImmediate(() => {
            router.replace("seller/home");
          });
        } else {
          setImmediate(() => {
            router.replace("buyer/home");
          });
        }
      } else {
        setImmediate(() => {
          router.replace("/");
        });
      }
    }
  }, [isLogged, authLoading]);

}
export const AuthProvider = ({ children }) => {
  const [Loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [granted, setGranted] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const router = useRouter();

  useEffect(() => {
    checkLogged();
  }, []);

  CheckAuth(isLogged, authLoading, userInfo, router);

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

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const sellerRegister = useCallback((values) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/seller/register`, values)
      .then((response) => {
        setLoading(false);
        setUserInfo(response.data.user);
        setCategories(response.data.categories);
        setProducts(response.data.products);
        AsyncStorage.setItem("userInfo", JSON.stringify(response.data.user));
        setIsLogged(true);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const buyerRegister = useCallback((values) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/buyer/register`, values)
      .then((response) => {
        setLoading(false);
        setUserInfo(response.data.user);
        setCategories(response.data.categories);
        setProducts(response.data.products);
        AsyncStorage.setItem("userInfo", JSON.stringify(response.data.user));
        setIsLogged(true);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const Login = useCallback((values) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/login`, values)
      .then((response) => {
        setLoading(false);
        if (response.data.status == "success") {
          setUserInfo(response.data.user);
          setCategories(response.data.categories);
          setProducts(response.data.products);
          AsyncStorage.setItem("userInfo", JSON.stringify(response.data.data));
          setIsLogged(true);
        } else {
          ToastAndroid.show("Invalid email or Password", ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const updateProfile = useCallback((values) => {
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
  }, []);

  const Logout = useCallback(async () => {
    await AsyncStorage.removeItem("userInfo");
    setIsLogged(false);
    setUserInfo({});
    console.log("Logged out");
  }, []);

  const checkLogged = useCallback(async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo) {
      setUserInfo(userInfo);
      setIsLogged(true);
    }
    setAuthLoading(false);
  }, []);

  const authContextValue = useMemo(() => ({
    sellerRegister,
    buyerRegister,
    Login,
    Loading,
    userInfo,
    isLogged,
    authLoading,
    updateProfile,
    categories,
    products,
    orders,
    setOrders,
    setProducts,
    setCategories,
    Logout,
    location,
  }), [sellerRegister, Login, Loading, userInfo, isLogged, authLoading, updateProfile, categories, products, orders,setOrders, setProducts, setCategories, Logout, location]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
