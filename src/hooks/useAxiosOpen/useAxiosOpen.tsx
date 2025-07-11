import { baseURL } from "@/utils/baseURL";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const useAxiosOpen = () => {
  return axiosInstance;
};

export default useAxiosOpen;
