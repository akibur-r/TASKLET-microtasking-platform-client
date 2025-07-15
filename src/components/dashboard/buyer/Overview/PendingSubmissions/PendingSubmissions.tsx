import useSubmissionApi from "@/api/secure/useSubmissionApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SubmissionApproveButton from "@/components/shared/submissions/SubmissionApproveButton/SubmissionApproveButton";
import SubmissionDetailsButton from "@/components/shared/submissions/SubmissionDetailsButton/SubmissionDetailsButton";
import SubmissionRejectButton from "@/components/shared/submissions/SubmissionRejectButton/SubmissionRejectButton";
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
import { useEffect } from "react";
import { toast } from "sonner";

const PendingSubmissions = () => {
  const { dbUser } = useDBUser();
  const { getSubmissions } = useSubmissionApi();

  const {
    submissions,
    setSubmissions,
    submissionsLoading,
    setSubmissionsLoading,
  } = useSubmissionStore();

  useEffect(() => {
    const fetchPendingSubmissions = async () => {
      setSubmissionsLoading(true);
      try {
        const res = await getSubmissions({
          buyer_email: dbUser?.email || "",
          sort_by: "submission_date",
          order: "asc",
          status: "pending",
        });
        setSubmissions(res);
        setSubmissionsLoading(false);
      } catch {
        toast.error("Failed to fetch submissions");
        setSubmissionsLoading(false);
      }
    };

    fetchPendingSubmissions();
  }, [dbUser]);

  return (
    <>
      {submissionsLoading ? (
        <div className="flex justify-center">
          <LoaderSpinner />
        </div>
      ) : !submissions?.length ? (
        <p>No pending submissions found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-fit">Sl.</TableHead>
              <TableHead>Worker Name</TableHead>
              <TableHead>Task Title</TableHead>
              <TableHead className="text-center">Payment</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission: SubmissionType, idx) => (
              <TableRow key={submission._id}>
                <TableCell className="font-semibold">{idx + 1}</TableCell>
                <TableCell>{submission.worker_name}</TableCell>
                <TableCell className="max-w-48 truncate">
                  {submission.task_title}
                </TableCell>
                <TableCell className="text-center">
                  ${submission.payable_amount}
                </TableCell>
                <TableCell>
                  <div className="  flex justify-center gap-2">
                    <SubmissionDetailsButton submission={submission} />
                    <SubmissionApproveButton submissionId={submission._id} />
                    <SubmissionRejectButton submissionId={submission._id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default PendingSubmissions;
