import useSubmissionApi from "@/api/secure/useSubmissionApi";
import { Button } from "@/components/ui/button";
import { useSubmissionStore } from "@/hooks/stores/useSubmissionStore/useSubmissionStore";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import LoaderSpinner from "../../LoaderSpinner/LoaderSpinner";

interface RejectButtonProps {
  submissionId: string;
  showText?: boolean;
}

const SubmissionRejectButton = ({
  submissionId,
  showText = false,
}: RejectButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { updateSubmission } = useSubmissionApi();
  const { removeSubmission } = useSubmissionStore();

  const handleReject = async () => {
    setLoading(true);
    try {
      const res = await updateSubmission({
        id: submissionId,
        body: { status: "rejected" },
      });
      if (res.modifiedCount) {
        toast.success("Submission Rejected");
        removeSubmission(submissionId);
        setLoading(false);
      } else {
        toast.error("Submission Failed", {
          description: "Something went wrong.",
        });
        setLoading(false);
      }
    } catch {
      toast.error("Failed to Reject submission");
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className=" bg-red-500/50 hover:bg-red-500/15 hover:text-red-500 cursor-pointer text-base-content border border-red-500/20"
      onClick={handleReject}
      disabled={loading}
    >
      {loading ? (
        <LoaderSpinner size={4} />
      ) : (
        <>
          <X />
          {showText && "Reject"}
        </>
      )}
    </Button>
  );
};

export default SubmissionRejectButton;
