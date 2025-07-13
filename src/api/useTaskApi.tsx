import useAxiosSecure from "@/hooks/useAxiosSecure/useAxiosSecure";
import type { newTaskType } from "@/types/taskTypes/newTaskType";

const useTaskApi = () => {
  const axiosSecure = useAxiosSecure();

  const postNewTask = (newTask: newTaskType) => {
    return axiosSecure.post("/tasks", newTask).then((res) => res.data);
  };

  return { postNewTask };
};

export default useTaskApi;
