import useAxiosOpen from "@/hooks/useAxiosOpen/useAxiosOpen";
import type { newDBUserType } from "@/types/dbUserType/dbUserType";

const useAuthUserApi = () => {
  const axiosOpen = useAxiosOpen();

  const addUserPromise = (newUser: newDBUserType) => {
    return axiosOpen.post("/users", newUser).then((res) => res.data);
  };

  return { addUserPromise };
};

export default useAuthUserApi;
