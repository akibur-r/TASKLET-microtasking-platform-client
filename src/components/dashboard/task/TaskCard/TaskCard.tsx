import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { TaskType } from "@/types/taskTypes/taskType";
import { format } from "date-fns";
import { Link } from "react-router";

interface TaskCardProps {
  task: TaskType;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card key={task._id} className="p-2 flex flex-col justify-between gap-2">
      <CardHeader className="p-2 font-medium">
        <h2>
          {task.task_title.slice(0, 100) +
            (task.task_title.length > 100 && "...")}
        </h2>
      </CardHeader>
      <CardContent className="px-2 text-sm flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-2">
          {/* Buyer name */}
          <div>
            <p className="text-muted-foreground text-xs">Buyer</p>
            <h3>{task.task_owner_name}</h3>
          </div>

          {/* Expiration */}
          <div>
            <p className="text-muted-foreground text-xs">Expires</p>
            <h3>
              {format(new Date(task.completion_date), "dd LLL yyyy  h:mm a")}
            </h3>
          </div>

          {/* Submissions Needed */}
          <div>
            <p className="text-muted-foreground text-xs">Submissions needed</p>
            <h3>{task.required_workers}</h3>
          </div>

          {/* Payable Amount */}
          <div>
            <p className="text-muted-foreground text-xs">Payment</p>
            <h3>{task.payable_amount} coins per submission</h3>
          </div>
        </div>
        <CardFooter className="p-0 pt-2">
          <Link
            to={`/dashboard/task/details/${task._id}`}
            className="underline text-amber-600 dark:text-amber-500"
          >
            View Details
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
