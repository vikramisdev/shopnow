// lib/axios.ts
import { setupCache } from "axios-cache-interceptor";
import axios from "axios";

const axiosInstance = setupCache(
	axios.create({
		baseURL: "https://dummyjson.com",
		timeout: 10000,
	})
);

export default axiosInstance;
