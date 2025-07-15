import useTaskApi from "@/api/secure/useTaskApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useMyTasksStore } from "@/hooks/stores/useMyTasksStore/useMyTasksStore";
import type { TaskType } from "@/types/taskTypes/taskType";
import { PenLine } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import LoaderSpinner from "../../LoaderSpinner/LoaderSpinner";

interface Props {
  task: TaskType;
  showText?: boolean;
}

const TaskUpdateButton = ({ task, showText = false }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateTaskById } = useMyTasksStore();
  const { updateTask } = useTaskApi();

  const titleRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLTextAreaElement>(null);
  const submissionInfoRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const updatedTask: Partial<TaskType> = {
      task_title: titleRef.current?.value ?? "",
      task_detail: detailRef.current?.value ?? "",
      submission_info: submissionInfoRef.current?.value ?? "",
    };

    updateTask({ _id: task._id, ...updatedTask })
      .then((res) => {
        if (res.modifiedCount !== 0) {
          updateTaskById(task._id, updatedTask);
          toast.success("Saved", {
            description: "Your changes were saved successfully",
          });
          setLoading(false);
          setOpen(false);
        } else {
          toast.warning("No changes made");
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className=" bg-amber-500/50 hover:bg-amber-500/15 hover:text-amber-500 cursor-pointer text-base-content border border-amber-500/20"
        >
          {loading ? (
            <LoaderSpinner size={4} />
          ) : (
            <>
              <PenLine />
              {showText && <span className="ml-1">Edit</span>}
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-screen-md w-full space-y-4"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ScrollArea className="h-[50vh]">
            <div className="space-y-3 w-full">
              <div className="grid gap-3">
                <Label htmlFor="task_title">Task Title</Label>
                <Input
                  id="task_title"
                  type="text"
                  name="task_title"
                  placeholder="e.g. Watch my YouTube video"
                  className="w-full"
                  defaultValue={task.task_title}
                  ref={titleRef}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="task_detail">Task Details</Label>
                <Textarea
                  name="task_detail"
                  className="w-full"
                  placeholder="Task detail (describe clearly)"
                  defaultValue={task.task_detail}
                  ref={detailRef}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="submission_info">Submission Info</Label>
                <Input
                  id="submission_info"
                  name="submission_info"
                  placeholder="What to submit (e.g. Screenshot)"
                  defaultValue={task.submission_info}
                  ref={submissionInfoRef}
                />
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderSpinner size={12} /> : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskUpdateButton;
