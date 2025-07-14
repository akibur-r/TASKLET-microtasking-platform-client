import useTaskApi from "@/api/useTaskApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import type { newTaskType } from "@/types/taskTypes/newTaskType";
import { uploadToImgBB } from "@/utils/functions/uploadToImgBB";
import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const AddTask = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const { dbUser, updateCoinBalance } = useDBUser();
  const { postNewTask } = useTaskApi();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [amountToPay, setAmountToPay] = useState<number>(0);
  const [newTask, setNewTask] = useState<newTaskType | null>(null);
  const [confirmButtonLoading, setConfirmButtonLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadToImgBB(file);

    if (url) {
      setImagePreview(url);
    } else {
      alert("Failed to upload image.");
    }
    setUploading(false);
  };

  const handlePaymentConfirmation = () => {
    setConfirmButtonLoading(true);
    if (newTask) {
      postNewTask(newTask)
        .then((res) => {
          if (res.insertedId) {
            toast.success("Task Added");
            updateCoinBalance(-amountToPay);
          }

          setConfirmButtonLoading(false);
          // setDialogOpen(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Not Added", { description: "Something went wrong." });
          setConfirmButtonLoading(false);
        });
    } else {
      setConfirmButtonLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const rawDate = formData.get("completion_date")?.toString().trim() || "";
    const parsedDate = new Date(rawDate);
    const completion_date = isNaN(parsedDate.getTime())
      ? ""
      : parsedDate.toISOString();

    const taskToSubmit: newTaskType = {
      task_title: formData.get("task_title")?.toString().trim() || "",
      task_detail: formData.get("task_detail")?.toString().trim() || "",
      required_workers: Number(formData.get("required_workers")),
      payable_amount: Number(formData.get("payable_amount")),
      completion_date,
      submission_info: formData.get("submission_info")?.toString().trim() || "",
      task_image_url: imagePreview,
      task_owner_email: dbUser?.email || "",
      task_owner_name: dbUser?.name || "",
    };

    let error = "";

    if (!taskToSubmit.task_title) {
      error = "You must add a task title";
    } else if (!taskToSubmit.task_detail) {
      error = "You must provide task details";
    } else if (
      isNaN(taskToSubmit.required_workers) ||
      taskToSubmit.required_workers < 1 ||
      !Number.isInteger(taskToSubmit.required_workers)
    ) {
      error = "You must require at least 1 valid worker";
    } else if (
      isNaN(taskToSubmit.payable_amount) ||
      taskToSubmit.payable_amount < 1
    ) {
      error = "You must pay at least 1 coin per worker";
    } else if (!completion_date) {
      error = "You must add a valid task completion date";
    } else if (!taskToSubmit.submission_info) {
      error = "You must add task submission information";
    } else if (!taskToSubmit.task_image_url) {
      error = "Task image was not uploaded properly";
    }

    if (error) {
      toast.error("Failed to add task.", { description: error });
      return;
    }

    setAmountToPay(taskToSubmit.payable_amount * taskToSubmit.required_workers);
    setDialogOpen(true);

    if ((dbUser?.coinBalance || 0) < amountToPay) {
      return;
    }

    setNewTask(taskToSubmit);
  };

  return (
    <>
      <SectionHeader name="Add a Task" className="text-center mb-4" />
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 grid gap-3">
                <Label htmlFor="task_title">Task Title</Label>
                <Input
                  id="task_title"
                  type="text"
                  name="task_title"
                  placeholder="e.g. Watch my YouTube video"
                />
              </div>

              <div className="md:col-span-2 grid gap-3">
                <Label htmlFor="task_detail">Task Details</Label>
                <Textarea
                  name="task_detail"
                  placeholder="Task detail (describe clearly)"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="required_workers">Workers Needed</Label>
                <Input
                  id="required_workers"
                  type="number"
                  name="required_workers"
                  placeholder="e.g. 10"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="payable_amount">Payment Per Worker</Label>
                <Input
                  type="number"
                  name="payable_amount"
                  placeholder="Coins to pay per worker (e.g. 10)"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="completion_date">Completion Deadline</Label>
                <Input
                  type="date"
                  name="completion_date"
                  placeholder="Completion Deadline"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="completion_date">Submission Info</Label>
                <Input
                  name="submission_info"
                  placeholder="What to submit (e.g. Screenshot)"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <Label htmlFor="task_image">Task Image</Label>
                <div className="relative h-full aspect-video">
                  <Avatar className=" w-full h-full border border-border rounded-lg">
                    <AvatarImage
                      src={uploading ? "" : imagePreview}
                      className="object-contain"
                    />
                    <AvatarFallback className="flex rounded items-center justify-center bg-secondary">
                      {uploading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <div className="flex flex-col items-center text-muted-foreground">
                          <Upload className="w-6 h-6" />
                          <div>Upload Image</div>
                        </div>
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-8">
                Add Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            {(dbUser?.coinBalance || 0) < amountToPay ? (
              <>
                <DialogTitle className="text-destructive">
                  Not enough coins!
                </DialogTitle>
                <DialogDescription className="max-w-sm">
                  You don't have enough coins to pay the required amount. Please
                  buy more coins or change the work amount.
                </DialogDescription>
              </>
            ) : (
              <>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription className="max-w-sm">
                  <span className="font-semibold text-foreground">
                    {amountToPay + " "}
                  </span>{" "}
                  coin{amountToPay > 1 ? "s" : ""} will be deducted from your
                  balance. Click on "Add Task" if you are absolutely sure to
                  pay.
                </DialogDescription>
              </>
            )}
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>

            {(dbUser?.coinBalance || 0) < amountToPay ? (
              <Button
                className="bg-accent hover:bg-accent/80 text-black"
                asChild
              >
                <Link to={"/dashboard/purchase-coins"}>Purchase Coins</Link>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handlePaymentConfirmation();
                }}
                variant={"default"}
                className="bg-primary/70 hover:bg-primary/80 text-base-content flex items-center justify-center"
                disabled={confirmButtonLoading}
              >
                {confirmButtonLoading ? <LoaderSpinner /> : "Add Task"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTask;
