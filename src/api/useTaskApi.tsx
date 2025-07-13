import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import type { newTaskType } from "@/types/taskTypes/newTaskType";
import type { TaskType } from "@/types/taskTypes/taskType";

type GetTasksParams = {
  user_email?: string;
  sort_by?: "completion_date";
  order?: "asc" | "desc";
  limit?: number;
  currentPage?: number;
};

const useTaskApi = () => {
  const axiosSecure = useAxiosSecure();

  const getTasks = ({
    user_email = "",
    sort_by = "completion_date",
    order = "desc",
    limit = 0,
    currentPage = 0,
  }: GetTasksParams) => {
    const queryParams: string[] = [];

    if (user_email) {
      queryParams.push(`user_email=${encodeURIComponent(user_email)}`);
    }
    if (sort_by) queryParams.push(`sort_by=${sort_by}`);
    if (order) queryParams.push(`order=${order}`);
    if (limit) queryParams.push(`limit=${limit}`);
    if (currentPage) queryParams.push(`currentPage=${currentPage}`);

    const query = queryParams.join("&");

    return axiosSecure.get(`/tasks?${query}`).then((res) => res.data);
  };

  const postNewTask = (newTask: newTaskType) => {
    return axiosSecure.post("/tasks", newTask).then((res) => res.data);
  };

  const updateTask = (payload: Partial<TaskType>) => {
    const { _id, ...body } = payload;
    return axiosSecure.put(`/tasks?id=${_id}`, body).then((res) => res.data);
  };

  const deleteTask = ({ task_id = "" }: { task_id: string }) => {
    return axiosSecure
      .delete(`/tasks?task_id=${task_id}`)
      .then((res) => res.data);
  };

  return { getTasks, postNewTask, updateTask, deleteTask };
};

export default useTaskApi;
