import useUserApi from "@/api/useUserApi";
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
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
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
            toast.success("User deleted", {
              description: `${res.taskDeleteResult.deletedCount} tasks an ${res.submissionDeleteResult.deletedCount} submissions were deleted.`,
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
          variant="destructive"
          size="sm"
          className="flex items-center gap-1"
          disabled={disabled}
        >
          <BiTrashAlt />
          {showText && "Delete"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be
            undone.
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
