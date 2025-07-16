import useUserApi from "@/api/secure/useUserApi";
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
import { useDBUsersStore } from "@/hooks/stores/useDBUserStore/useDBUserStore";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  userEmail: string;
  showText?: boolean;
  disabled?: boolean;
}

const UserDeleteButton = ({
  userEmail,
  showText = false,
  disabled = false,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { deleteUserPromise } = useUserApi();
  const { deleteUserByEmail } = useDBUsersStore();

  const handleDelete = async () => {
    setLoading(true);
    try {
      deleteUserPromise(userEmail)
        .then((res) => {
          if (res.deletedCount) {
            deleteUserByEmail(userEmail);

            console.log(res);

            toast.success("User deleted", {
              description: `${res.taskDeleteResult.deletedCount} tasks and ${res.submissionDeleteResult.deletedCount} submissions were deleted.`,
            });
          } else {
            toast.error("Use not deleted", {
              description: "Something went wrong",
            });
          }
        })
        .catch((err) => {
          toast.error("Use not deleted", {
            description: "Something went wrong",
          });
          console.log(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.error("Delete user failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className=" bg-red-500/50 hover:bg-red-500/15 hover:text-red-500 cursor-pointer text-base-content border border-red-500/20"
          disabled={disabled || loading}
        >
          <Trash />
          {showText && "Delete"}
        </Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription className="flex flex-col gap-y-1">
            <p className="inline space-x-0.5">
              <span>
                Are you sure you want to delete the user account? All
                information including all the
              </span>
              <span className="font-medium">payment histories</span>,{" "}
              <span className="font-medium">tasks</span> and{" "}
              <span className="font-medium">submissions</span> will be deleted.
            </p>
            <p className="text-destructive">
              NOTE: This action cannot be undone.
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <LoaderSpinner size={4} /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDeleteButton;
