import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import type { PaymentType } from "@/types/paymentType/paymentType";

const useUserApi = () => {
  const axiosSecure = useAxiosSecure();

  const getUserInfoPromise = () => {
    return axiosSecure.get("/users").then((res) => res.data);
  };

  const getAllUserInfoPromise = () => {
    return axiosSecure.get("/users/all").then((res) => res.data);
  };

  const getUserPaymentPromise = () => {
    return axiosSecure.get("/users/payments").then((res) => res.data);
  };

  const addUserPaymentPromise = (paymentInfo: PaymentType) => {
    return axiosSecure
      .post("/users/payments", paymentInfo)
      .then((res) => res.data);
  };

  const deleteUserPromise = (user_email: string) => {
    return axiosSecure
      .delete(`/users?user_email=${user_email}`)
      .then((res) => res.data);
  };

  return {
    getUserInfoPromise,
    getAllUserInfoPromise,
    getUserPaymentPromise,
    addUserPaymentPromise,
    deleteUserPromise,
  };
};

export default useUserApi;
