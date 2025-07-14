import useSubmissionApi from "@/api/useSubmissionApi";
import useTaskApi from "@/api/useTaskApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import type { NewSubmissionType } from "@/types/submissionTypes/submissionTypes";
import type { TaskType } from "@/types/taskTypes/taskType";
import { formatDistanceToNow, isPast } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const TaskDetails = () => {
  const { taskId } = useParams();
  const { getTasks } = useTaskApi();
  const { dbUser } = useDBUser();
  const { addSubmission } = useSubmissionApi();
  const navigate = useNavigate();

  const [task, setTask] = useState<TaskType | null>(null);
  const [taskLoading, setTaskLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [taskOwner, setTaskOwner] = useState<"self" | "other">("other");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const submission_details = formData.get("submission_details") as string;

    if (!submission_details) {
      toast.error("Submission failed", {
        description: "You must provide submission details",
      });
      setSubmitLoading(false);
      return;
    }

    const newSubmission: NewSubmissionType = {
      task_id: task?._id || "",
      task_title: task?.task_title || "",
      payable_amount: task?.payable_amount || 0,
      worker_email: dbUser?.email || "",
      worker_name: dbUser?.name || "",
      buyer_name: task?.task_owner_name || "",
      buyer_email: task?.task_owner_email || "",
      submission_details,
    };

    try {
      addSubmission(newSubmission)
        .then((res) => {
          if (res.insertedId) {
            // success
            toast.success("Submission successful", {
              description:
                "Your submission will be reviewed by the employer soon",
            });
            setSubmitLoading(false);
            navigate("/dashboard/available-tasks");
          } else {
            toast.error("Submission failed", {
              description: "Something went wrong",
            });
            setSubmitLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Submission failed", {
            description: "Something went wrong",
          });
          setSubmitLoading(false);
        });
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Submission failed", { description: "Something went wrong" });
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    const fetchTask = () => {
      setTaskLoading(true);
      getTasks({ taskId })
        .then((res) => {
          if (res.length) {
            setTask(res[0]);

            if (res[0].task_owner_email === dbUser?.email) setTaskOwner("self");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTaskLoading(false);
        });
    };

    fetchTask();
  }, []);

  return (
    <div>
      {taskLoading ? (
        <LoaderSpinner />
      ) : task ? (
        <>
          <section className="space-y-4">
            <header className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-x-16 gap-y-4">
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-fancy">
                  Task: {task.task_title}
                </h1>
                <div className="grid md:grid-cols-2 gap-2 lg:gap-3">
                  <div>
                    <h3 className="text-sm text-muted-foreground">Buyer</h3>
                    <p>{task.task_owner_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Posted</h3>
                    <p>{formatDistanceToNow(task.date_added)} ago</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Payment</h3>
                    <p>{task.payable_amount} coins per submission</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      {dbUser?.role === "worker"
                        ? "Can Submit"
                        : "Worker Needed"}
                    </h3>
                    <p>{task.required_workers} times</p>
                  </div>
                  <div className="lg:col-span-2 bg-primary/15 dark:bg-primary/5 border border-primary/30 dark:border-primary/15 rounded-lg p-2">
                    <h3 className="text-sm text-muted-foreground">
                      Remaining Time to Submit
                    </h3>
                    <p>
                      {isPast(task.completion_date)
                        ? "Expired"
                        : formatDistanceToNow(task.completion_date)}
                    </p>
                  </div>
                </div>
              </div>
              <Card className="p-0 w-full aspect-video overflow-hidden">
                <CardContent className="p-0 h-full">
                  <img
                    src={task.task_image_url}
                    alt="Task"
                    className="w-full h-full object-contain"
                  />
                </CardContent>
              </Card>
            </header>

            <Separator />

            <main className="space-y-4">
              <div className="text-center md:text-left space-y-2">
                <SectionHeader name="Description" headingClassName="text-xl" />
                <p>{task.task_detail}</p>
              </div>

              <div className="text-center md:text-left space-y-2">
                <SectionHeader
                  name="Submission Details"
                  headingClassName="text-xl"
                />
                <p className="text-amber-600 dark:text-amber-400">
                  {task.submission_info}
                </p>
              </div>

              {taskOwner === "other" && !(dbUser?.role === "admin") && (
                <div className="space-y-2">
                  <SectionHeader
                    name="Submit Your Work"
                    className="text-center md:text-left"
                    headingClassName="text-xl"
                  />
                  <Card className="p-2 md:p-3">
                    <CardContent className="p-2 md:p-3">
                      <form onSubmit={handleSubmit}>
                        <div className="md:col-span-2 grid gap-3">
                          <Label htmlFor="submission_details">
                            Submission Details
                          </Label>
                          <Textarea
                            name="submission_details"
                            placeholder="Submission Details (e.g. Here is the link to the screenshot...)"
                          />
                        </div>

                        <Button
                          disabled={submitLoading}
                          type="submit"
                          className="w-full mt-8"
                        >
                          {submitLoading ? (
                            <LoaderSpinner
                              size={12}
                              className="text-amber-700 dark:text-amber-500"
                            />
                          ) : (
                            "Submit Task"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}
            </main>
          </section>
        </>
      ) : (
        <>Task not found</>
      )}
    </div>
  );
};

export default TaskDetails;
