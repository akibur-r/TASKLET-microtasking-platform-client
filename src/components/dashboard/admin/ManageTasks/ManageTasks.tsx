import useTaskApi from "@/api/useTaskApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import TaskDeleteButton from "@/components/shared/tasks/TaskDeleteButton/TaskDeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMyTasksStore } from "@/hooks/stores/useMyTasksStore/useMyTasksStore";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import type { TaskType } from "@/types/taskTypes/taskType";
import { format } from "date-fns";
import {
  AtSign,
  CalendarDays,
  GripHorizontal,
  Hash,
  ListTodo,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ManageTasks = () => {
  const { getTasks } = useTaskApi();
  const { dbUser } = useDBUser();
  const { myTasks, setMyTasks } = useMyTasksStore();
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const navigateToDetails = (taskId: string) => {
    navigate(`/dashboard/task/details/${taskId}`);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setTasksLoading(true);
        const res = await getTasks({});
        setMyTasks(res);
      } catch (err) {
        console.error("Fetch tasks error:", err);
      } finally {
        setTasksLoading(false);
      }
    };

    fetchTasks();
  }, [dbUser]);

  return (
    <section className="space-y-8">
      <SectionHeader
        name="Manage Tasks"
        tagline="You are modifying the tasks added by users"
        className="text-center space-y-1"
        taglineClassName="text-accent/90"
      />
      <main>
        {tasksLoading ? (
          <div className="flex justify-center">
            <LoaderSpinner />
          </div>
        ) : myTasks?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-fit">
                  <Hash className="md:hidden size-4" />
                  <span className="hidden md:block">Sl.</span>
                </TableHead>
                <TableHead>
                  <ListTodo className="md:hidden size-4" />
                  <span className="hidden md:block">Title</span>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <AtSign className="md:hidden size-4" />
                  <span className="hidden md:block">Owner Email</span>
                </TableHead>
                <TableHead>
                  <CalendarDays className="md:hidden size-4 mx-auto" />
                  <span className="hidden md:block">Created At</span>
                </TableHead>
                <TableHead>
                  <GripHorizontal className="md:hidden size-4 mx-auto" />
                  <span className="hidden md:block text-center">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myTasks.map((task: TaskType, idx) => (
                <TableRow key={task._id}>
                  <TableCell
                    onClick={() => navigateToDetails(task._id)}
                    className="font-medium cursor-pointer"
                  >
                    {idx + 1}
                  </TableCell>
                  <TableCell
                    onClick={() => navigateToDetails(task._id)}
                    className="cursor-pointer max-w-48 truncate"
                  >
                    {task.task_title}
                  </TableCell>
                  <TableCell
                    onClick={() => navigateToDetails(task._id)}
                    className="cursor-pointer hidden md:table-cell"
                  >
                    {task.task_owner_email}
                  </TableCell>
                  <TableCell
                    onClick={() => navigateToDetails(task._id)}
                    className="cursor-pointer"
                  >
                    {format(task.date_added, "dd LLL yyyy 'at' h:mm a")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center">
                      <TaskDeleteButton
                        payable_amount={task.payable_amount}
                        required_workers={task.required_workers}
                        task_id={task._id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <>You haven't added any task yet.</>
        )}
      </main>
    </section>
  );
};

export default ManageTasks;
