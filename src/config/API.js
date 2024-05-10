import axios from "axios";

// export const BASE_URL = "http://192.168.43.123:80/autocom/public/api";
// export const BASE_URL2 = "http://192.168.43.123:80/autocom/public/storage";
export const api = axios.create({
  baseURL: "https://api.clarifai.com",
  headers: {
    Authorization: "Key c2a80f7507084bbdabaec8a51e6f79af",
  },
});
export const BASE_URL = "https://autocom.codelab265.com/api";
export const BASE_URL2 = "https://autocom.codelab265.com/public/storage";
