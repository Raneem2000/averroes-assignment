import axios from "axios";

export const Axios = axios.create({
  baseURL: " https://my-json-server.typicode.com/MostafaKMilly/demo", // Replace with your API endpoint
  timeout: 5000, // Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json", // Set the default content type for request headers
    // Authorization: "Bearer your-token", // Set authorization headers if needed
  },
});
