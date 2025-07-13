import type { TaskType } from "@/types/taskTypes/taskType";
import { create } from "zustand";

interface TaskStore {
  myTasks: TaskType[] | null;
  setMyTasks: (tasks: TaskType[]) => void;
  deleteTaskById: (id: string) => void;
  updateTask: (task: TaskType) => void;
  updateTaskById: (id: string, updatedTask: Partial<TaskType>) => void;
}

export const useMyTasksStore = create<TaskStore>((set) => ({
  myTasks: null,
  setMyTasks: (tasks) => set({ myTasks: tasks }),
  deleteTaskById: (id) =>
    set((state) => ({
      myTasks: state.myTasks?.filter((task) => task._id !== id) || [],
    })),

  updateTaskById: (id: string, updatedTask: Partial<TaskType>) =>
    set((state) => ({
      myTasks:
        state.myTasks?.map((task) =>
          task._id === id ? { ...task, ...updatedTask } : task
        ) || [],
    })),

  updateTask: (updatedTask) =>
    set((state) => ({
      myTasks:
        state.myTasks?.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        ) || [],
    })),
}));
