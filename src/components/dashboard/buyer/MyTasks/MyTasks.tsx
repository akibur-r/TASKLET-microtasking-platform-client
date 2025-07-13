import useTaskApi from "@/api/useTaskApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import type { TaskType } from "@/types/taskTypes/taskType";
import { format } from "date-fns";
import { CircleCheck, Clock, CreditCard, GripHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

const MyTasks = () => {
  const { getTasks } = useTaskApi();
  const { dbUser } = useDBUser();
  const [myTasks, setMyTasks] = useState<TaskType[] | null>(null);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUserTasks = () => {
      setTasksLoading(true);
      const user_email = dbUser?.email || "";

      getTasks({ user_email: user_email })
        .then((res) => {
          console.log(res);
          setMyTasks(res);
          setTasksLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setTasksLoading(false);
        });
    };

    getUserTasks();
  }, [dbUser]);

  return (
    <section className="space-y-8">
      <SectionHeader name="My Tasks" className="text-center" />
      <main>
        {tasksLoading ? (
          <div className="flex justify-center">
            <LoaderSpinner />
          </div>
        ) : myTasks?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20 hidden md:table-cell">SL.</TableHead>
                <TableHead>
                  <CircleCheck className="md:hidden size-4" />
                  <span className="hidden md:block">Title</span>
                </TableHead>
                <TableHead>
                  <Clock className="md:hidden size-4" />
                  <span className="hidden md:block">Completion Date</span>
                </TableHead>
                <TableHead>
                  <CreditCard className="md:hidden size-4" />
                  <span className="hidden md:block">Total Payment</span>
                </TableHead>
                <TableHead>
                  <GripHorizontal className="md:hidden size-4" />
                  <span className="hidden md:block">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myTasks.map((task: TaskType, idx) => (
                <TableRow>
                  <TableCell className="font-medium  hidden md:table-cell">
                    {idx + 1}
                  </TableCell>
                  <TableCell>{task.task_title}</TableCell>
                  <TableCell>
                    {format(task.completion_date, "dd LLL yyyy")}
                  </TableCell>
                  <TableCell>
                    <span className="opacity-70">$</span>
                    {task.payable_amount * task.required_workers}
                  </TableCell>
                  <TableCell>E | D | DL</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <>You haven't added any task yet</>
        )}
      </main>
    </section>
  );
};

export default MyTasks;
