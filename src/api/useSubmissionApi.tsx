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

    const query = queryParams.join("&");

    return axiosSecure.get(`/submissions?${query}`).then((res) => res.data);
  };

  const addSubmission = (newSubmission: NewSubmissionType) => {
    return axiosSecure
      .post("/submissions", newSubmission)
      .then((res) => res.data);
  };

  const updateSubmission = (payload: Partial<SubmissionType>) => {
    const { _id, ...body } = payload;
    return axiosSecure
      .put(`/submissions?id=${_id}`, body)
      .then((res) => res.data);
  };

  return {
    getSubmissions,
    addSubmission,
    updateSubmission,
  };
};

export default useSubmissionApi;
