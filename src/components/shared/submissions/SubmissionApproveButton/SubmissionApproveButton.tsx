import useSubmissionApi from "@/api/secure/useSubmissionApi";
import { Button } from "@/components/ui/button";
import { useSubmissionStore } from "@/hooks/stores/useSubmissionStore/useSubmissionStore";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import LoaderSpinner from "../../LoaderSpinner/LoaderSpinner";

interface ApproveButtonProps {
  submissionId: string;
  showText?: boolean;
}

const SubmissionApproveButton = ({
  submissionId,
  showText = false,
}: ApproveButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { updateSubmission } = useSubmissionApi();
  const { removeSubmission } = useSubmissionStore();

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await updateSubmission({
        id: submissionId,
        body: { status: "approved" },
      });
      if (res.modifiedCount) {
        toast.success("Submission approved");
        removeSubmission(submissionId);
        setLoading(false);
      } else {
        toast.error("Submission Failed", {
          description: "Something went wrong.",
        });
        setLoading(false);
      }
    } catch {
      toast.error("Failed to approve submission");
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className=" bg-emerald-500/50 hover:bg-emerald-500/15 hover:text-emerald-5bg-emerald-500 cursor-pointer text-base-content border border-emerald-500/30"
      onClick={handleApprove}
      disabled={loading}
    >
      {loading ? (
        <LoaderSpinner size={4} />
      ) : (
        <>
          <Check />
          {showText && "Approve"}
        </>
      )}
    </Button>
  );
};

export default SubmissionApproveButton;
