import useAxiosOpen from "@/hooks/useAxiosOpen/useAxiosOpen";
import type { UserType } from "@/types/dbUserType/dbUserType";

const useAuthUserApi = () => {
  const axiosOpen = useAxiosOpen();

  const addUserPromise = (newUser: UserType) => {
    return axiosOpen.post("/users", newUser).then((res) => res.data);
  };

  return { addUserPromise };
};

export default useAuthUserApi;
