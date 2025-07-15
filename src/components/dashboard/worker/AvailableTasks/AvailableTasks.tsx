import useTaskApi from "@/api/secure/useTaskApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { useMyTasksStore } from "@/hooks/stores/useMyTasksStore/useMyTasksStore";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import type { TaskType } from "@/types/taskTypes/taskType";
import { useEffect, useState } from "react";
import TaskCard from "../../task/TaskCard/TaskCard";

const AvailableTasks = () => {
  const { getTasks } = useTaskApi();
  const { dbUser } = useDBUser();
  const { myTasks, setMyTasks } = useMyTasksStore();
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setTasksLoading(true);
        getTasks({ active_only: true })
          .then((res) => {
            setMyTasks(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setTasksLoading(false);
          });
      } catch (err) {
        console.error("Fetch tasks error:", err);
        setTasksLoading(false);
      }
    };

    fetchTasks();
  }, [dbUser]);

  return (
    <section className="space-y-8">
      <SectionHeader name="Available Tasks" className="text-center" />
      <main>
        {tasksLoading ? (
          <div className="flex justify-center">
            <LoaderSpinner />
          </div>
        ) : myTasks?.length ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
            {myTasks.map((task: TaskType) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <>No available task. Check back later.</>
        )}
      </main>
    </section>
  );
};

export default AvailableTasks;
