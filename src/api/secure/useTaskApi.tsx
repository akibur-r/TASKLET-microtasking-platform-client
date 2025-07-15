import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import type { newTaskType } from "@/types/taskTypes/newTaskType";
import type { TaskType } from "@/types/taskTypes/taskType";

type GetTasksParams = {
  user_email?: string;
  sort_by?: "completion_date";
  order?: "asc" | "desc";
  limit?: number;
  currentPage?: number;
  taskId?: string;
  active_only?: boolean;
};

const useTaskApi = () => {
  const axiosSecure = useAxiosSecure();

  const getTasks = ({
    user_email = "",
    sort_by = "completion_date",
    order = "desc",
    limit = 0,
    currentPage = 0,
    taskId = "",
    active_only = false,
  }: GetTasksParams) => {
    const queryParams: string[] = [];

    if (user_email) {
      queryParams.push(`user_email=${encodeURIComponent(user_email)}`);
    }
    if (taskId) {
      queryParams.push(`task_id=${taskId}`);
    }

    if (active_only) {
      queryParams.push(`active_only=${active_only && "true"}`);
    }

    if (sort_by) queryParams.push(`sort_by=${sort_by}`);
    if (order) queryParams.push(`order=${order}`);
    if (limit) queryParams.push(`limit=${limit}`);
    if (currentPage) queryParams.push(`currentPage=${currentPage}`);

    const query = queryParams.join("&");

    return axiosSecure.get(`/tasks?${query}`).then((res) => res.data);
  };

  const getTasksCount = (count_property?: string) => {
    const query = count_property
      ? `?count_property=${encodeURIComponent(count_property)}`
      : "";
    return axiosSecure.get(`/tasks/count${query}`).then((res) => res.data);
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

  return { getTasks, getTasksCount, postNewTask, updateTask, deleteTask };
};

export default useTaskApi;
