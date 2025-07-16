import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import type { dbUserType } from "@/types/dbUserType/dbUserType";
import type {
  PaymentFromDBType,
  PaymentType,
} from "@/types/paymentType/paymentType";

interface GetUsersParams {
  role?: string;
  limit?: number;
  sort_by?: string;
}

type GetUsersCountParams = {
  filter?: Partial<dbUserType>;
  count_property?: "coinBalance" | null;
};

interface GetUserPaymentsParams {
  limit?: number;
  currentPage?: number;
  sort_by?: "created_at" | "price";
  order?: "asc" | "desc";
  status?: "pending" | "approved" | "rejected";
  payment_type?: "withdrawal" | "purchase" | "refund";
}

const useUserApi = () => {
  const axiosSecure = useAxiosSecure();

  const getUserInfoPromise = () => {
    return axiosSecure.get("/user").then((res) => res.data);
  };

  const getUsersInfoPromise = ({
    role = "",
    limit = 0,
    sort_by = "",
  }: GetUsersParams = {}) => {
    const queryParams: string[] = [];

    if (role) queryParams.push(`role=${encodeURIComponent(role)}`);
    if (limit) queryParams.push(`limit=${limit}`);
    if (sort_by) queryParams.push(`sort_by=${encodeURIComponent(sort_by)}`);

    const query = queryParams.length ? `?${queryParams.join("&")}` : "";

    return axiosSecure.get(`/users${query}`).then((res) => res.data);
  };

  const getUsersCountPromise = ({
    filter,
    count_property = null,
  }: GetUsersCountParams = {}) => {
    const params: GetUsersCountParams = {};
    if (filter) params.filter = filter;
    if (count_property) params.count_property = count_property;

    return axiosSecure.get(`/users/count`, { params }).then((res) => res.data);
  };

  const getUserPaymentPromise = (params?: GetUserPaymentsParams) => {
    return axiosSecure
      .get("/users/payments", { params })
      .then((res) => res.data);
  };

  const getUserPaymentsCountPromise = (body?: Partial<PaymentFromDBType>) => {
    return axiosSecure
      .get(`/users/payments/count`, { params: body })
      .then((res) => res.data);
  };

  const addUserPaymentPromise = (paymentInfo: PaymentType) => {
    return axiosSecure
      .post("/users/payments", paymentInfo)
      .then((res) => res.data);
  };

  const updateUserPromise = ({
    body,
    user_email = "",
  }: {
    body: Partial<dbUserType>;
    user_email: string;
  }) => {
    return axiosSecure
      .put(`/users?user_email=${user_email}`, body)
      .then((res) => res.data);
  };

  const deleteUserPromise = (user_email: string) => {
    return axiosSecure
      .delete(`/users?user_email=${user_email}`)
      .then((res) => res.data);
  };

  return {
    getUserInfoPromise,
    getUsersInfoPromise,
    getUsersCountPromise,
    getUserPaymentPromise,
    getUserPaymentsCountPromise,
    addUserPaymentPromise,
    updateUserPromise,
    deleteUserPromise,
  };
};

export default useUserApi;
