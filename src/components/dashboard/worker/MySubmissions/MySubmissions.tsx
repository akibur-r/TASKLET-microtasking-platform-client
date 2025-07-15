import useSubmissionApi from "@/api/secure/useSubmissionApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSubmissionStore } from "@/hooks/stores/useSubmissionStore/useSubmissionStore";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import type { SubmissionType } from "@/types/submissionTypes/submissionTypes";
import { format } from "date-fns";
import { CircleDot, Clock, CreditCard, Hash, ListTodo } from "lucide-react";
import { useEffect } from "react";

const MySubmissions = () => {
  const {
    submissions,
    setSubmissions,
    submissionsLoading,
    setSubmissionsLoading,
  } = useSubmissionStore();
  const { dbUser } = useDBUser();
  const { getSubmissions } = useSubmissionApi();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setSubmissionsLoading(true);
        getSubmissions({ worker_email: dbUser?.email || "" })
          .then((res) => {
            setSubmissions(res);
            setSubmissionsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setSubmissionsLoading(false);
          });
      } catch (err) {
        console.error("Fetch submissions error:", err);
        setSubmissionsLoading(false);
      }
    };

    fetchSubmissions();
  }, [dbUser]);

  return (
    <section className="space-y-4">
      <SectionHeader name="My Submissions" className="text-center" />
      {submissionsLoading ? (
        <div className="flex justify-center">
          <LoaderSpinner />
        </div>
      ) : submissions?.length ? (
        <>
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
                <TableHead>
                  <Clock className="md:hidden size-4 mx-auto" />
                  <span className="hidden md:block">Submission Date</span>
                </TableHead>
                <TableHead>
                  <CreditCard className="md:hidden size-4 mx-auto" />
                  <span className="hidden md:block">Payment</span>
                </TableHead>
                <TableHead>
                  <CircleDot className="md:hidden size-4 mx-auto" />
                  <span className="hidden md:block">Status</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission: SubmissionType, idx) => (
                <TableRow key={submission._id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="max-w-48 truncate">
                    {submission.task_title}
                  </TableCell>
                  <TableCell className="">
                    {format(submission.created_at, "dd LLL yyyy 'at' h:mm a")}
                  </TableCell>
                  <TableCell className="">
                    <span className="opacity-70">$</span>
                    {submission.payable_amount}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          submission.status === "approved"
                            ? "success"
                            : submission.status === "rejected"
                            ? "error"
                            : "warning"
                        }
                      >
                        {submission.status}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <>no submissions</>
      )}
    </section>
  );
};

export default MySubmissions;
