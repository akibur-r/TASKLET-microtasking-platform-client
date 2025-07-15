import useAxiosOpen from "@/hooks/useAxiosOpen/useAxiosOpen";

const useTopUsersApi = () => {
  const axiosOpen = useAxiosOpen();

  const getTopUsersPromise = () => {
    return axiosOpen.get("/users/top").then((res) => res.data);
  };

  return { getTopUsersPromise };
};

export default useTopUsersApi;
