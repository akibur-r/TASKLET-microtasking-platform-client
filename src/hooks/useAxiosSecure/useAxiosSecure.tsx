import { baseURL } from "@/utils/baseURL";
import axios from "axios";
import { useAuth } from "../useAuth/useAuth";

const useAxiosSecure = () => {
  const { user, token } = useAuth();

  const axiosInstance = axios.create({
    baseURL,
  });

  axiosInstance.interceptors.request.use((config) => {
    if (user) {
      config.headers.authorization = `Bearer ${token}`;
      config.headers.user_email = user.email;
    }
    return config;
  });

  return axiosInstance;
};

export default useAxiosSecure;
