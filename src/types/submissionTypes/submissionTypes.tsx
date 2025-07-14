export type NewSubmissionType = {
  task_id: string;
  task_title: string;
  payable_amount: number;
  worker_email: string;
  worker_name: string;
  buyer_name: string;
  buyer_email: string;
  submission_details: string;
};

export type SubmissionType = {
  _id: string;

  task_id: string;
  task_title: string;
  payable_amount: number;

  worker_email: string;
  worker_name: string;

  buyer_name: string;
  buyer_email: string;

  submission_details: string;

  created_at: string;
  status: "pending" | "approved" | "rejected";
};
