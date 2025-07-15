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
          className=" bg-amber-500/50 hover:bg-amber-500/15 hover:text-amber-500 cursor-pointer text-base-content border border-amber-500/20"
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
