import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import type {
  NewSubmissionType,
  SubmissionType,
} from "@/types/submissionTypes/submissionTypes";

type GetSubmissionsParams = {
  worker_email?: string;
  buyer_email?: string;
  task_id?: string;
  sort_by?: "submission_date";
  order?: "asc" | "desc";
  limit?: number;
  currentPage?: number;
  status?: "pending" | "approved" | "rejected" | null;
  count_property?: "payable_amount" | null;
};

const useSubmissionApi = () => {
  const axiosSecure = useAxiosSecure();

  const getSubmissions = ({
    worker_email = "",
    buyer_email = "",
    task_id = "",
    sort_by = "submission_date",
    order = "desc",
    limit = 0,
    currentPage = 0,
    status = null,
  }: GetSubmissionsParams) => {
    const queryParams: string[] = [];

    if (worker_email)
      queryParams.push(`worker_email=${encodeURIComponent(worker_email)}`);
    if (buyer_email)
      queryParams.push(`buyer_email=${encodeURIComponent(buyer_email)}`);
    if (task_id) queryParams.push(`task_id=${encodeURIComponent(task_id)}`);
    if (sort_by) queryParams.push(`sort_by=${sort_by}`);
    if (order) queryParams.push(`order=${order}`);
    if (limit) queryParams.push(`limit=${limit}`);
    if (currentPage) queryParams.push(`currentPage=${currentPage}`);
    if (status) queryParams.push(`status=${status}`);

    const query = queryParams.length ? `?${queryParams.join("&")}` : "";

    return axiosSecure.get(`/submissions${query}`).then((res) => res.data);
  };

  const getSubmissionsCount = ({
    worker_email = "",
    buyer_email = "",
    task_id = "",
    status = null,
    count_property = null,
  }: GetSubmissionsParams) => {
    const queryParams: string[] = [];

    if (worker_email)
      queryParams.push(`worker_email=${encodeURIComponent(worker_email)}`);
    if (buyer_email)
      queryParams.push(`buyer_email=${encodeURIComponent(buyer_email)}`);
    if (task_id) queryParams.push(`task_id=${encodeURIComponent(task_id)}`);
    if (status) queryParams.push(`status=${status}`);
    if (count_property) queryParams.push(`count_property=${count_property}`);

    const query = queryParams.length ? `?${queryParams.join("&")}` : "";

    return axiosSecure
      .get(`/submissions/count${query}`)
      .then((res) => res.data);
  };

  const addSubmission = (newSubmission: NewSubmissionType) => {
    return axiosSecure
      .post("/submissions", newSubmission)
      .then((res) => res.data);
  };

  const updateSubmission = ({
    body,
    id = "",
  }: {
    body: Partial<SubmissionType>;
    id: string;
  }) => {
    return axiosSecure
      .put(`/submissions?id=${id}`, body)
      .then((res) => res.data);
  };

  return {
    getSubmissions,
    getSubmissionsCount,
    addSubmission,
    updateSubmission,
  };
};

export default useSubmissionApi;
