import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SubmissionType } from "@/types/submissionTypes/submissionTypes";
import { Info } from "lucide-react";

interface SubmissionDetailsButtonProps {
  submission: SubmissionType;
  showText?: boolean;
}

const SubmissionDetailsButton = ({
  submission,
  showText = false,
}: SubmissionDetailsButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className=" bg-blue-200/50 hover:bg-blue-200/15 hover:text-blue-200 cursor-pointer text-base-content border border-blue-200/20"
        >
          <Info />
          {showText && <span className="ml-1">Delete</span>}
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="p-0">
        <h3 className="p-4 text-xl font-semibold text-accent">
          Submission Details
        </h3>
        <ScrollArea className="h-[50vh] px-4">
          <div className="whitespace-pre-wrap">
            {submission.submission_details}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionDetailsButton;
