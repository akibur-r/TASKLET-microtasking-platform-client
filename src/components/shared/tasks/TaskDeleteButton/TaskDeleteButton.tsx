import useTaskApi from "@/api/secure/useTaskApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMyTasksStore } from "@/hooks/stores/useMyTasksStore/useMyTasksStore";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TaskDeleteButtonProps {
  task_id: string;
  payable_amount?: number;
  required_workers?: number;
  showText?: boolean;
}

const TaskDeleteButton = ({
  task_id,
  showText = false,
  payable_amount = 0,
  required_workers = 0,
}: TaskDeleteButtonProps) => {
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { deleteTaskById } = useMyTasksStore();
  const { deleteTask } = useTaskApi();
  const { dbUser, updateCoinBalance } = useDBUser();

  const handleDeleteTask = async () => {
    try {
      setDeleteBtnLoading(true);
      deleteTask({ task_id })
        .then((res) => {
          if (res.deletedCount) {
            // refund if the actor is buyer
            if (dbUser?.role === "buyer") {
              updateCoinBalance(payable_amount * required_workers);
            }

            toast.warning("Deleted", {
              description: "The task was deleted successfully",
            });

            deleteTaskById(task_id);
            setDialogOpen(false);
            setDeleteBtnLoading(false);
          } else {
            toast.error("Not Deleted", { description: "Something went wrong" });
            setDeleteBtnLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setDeleteBtnLoading(false);
        });
    } catch (err) {
      console.error("Delete failed", err);
      setDeleteBtnLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className=" bg-red-500/50 hover:bg-red-500/15 hover:text-red-500 cursor-pointer text-base-content border border-red-500/20"
        >
          {deleteBtnLoading ? (
            <LoaderSpinner size={4} />
          ) : (
            <>
              <Trash />
              {showText && <span className="ml-1">Delete</span>}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete the task from our database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleDeleteTask}
            variant="default"
            className="bg-red-500/70 hover:bg-red-500/80 text-base-content"
          >
            {deleteBtnLoading ? <LoaderSpinner size={12} /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDeleteButton;
