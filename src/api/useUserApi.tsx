import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";

const useUserApi = () => {
  const axiosSecure = useAxiosSecure();

  const getUserInfoPromise = () => {
    return axiosSecure.get("/users").then((res) => res.data);
  };

  return { getUserInfoPromise };
};

export default useUserApi;
