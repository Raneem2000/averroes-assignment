import axios from "axios";

export const Axios = axios.create({
  baseURL: " https://my-json-server.typicode.com/MostafaKMilly/demo",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
