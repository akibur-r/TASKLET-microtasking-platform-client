import type { SubmissionType } from "@/types/submissionTypes/submissionTypes";
import { create } from "zustand";

interface SubmissionStore {
  submissions: SubmissionType[] | null;
  submissionsLoading: boolean;
  setSubmissions: (submissions: SubmissionType[]) => void;
  setSubmissionsLoading: (loading: boolean) => void;
  removeSubmission: (id: string) => void;
}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
  submissions: null,
  submissionsLoading: false,

  setSubmissions: (submissions) => set({ submissions }),
  setSubmissionsLoading: (loading) => set({ submissionsLoading: loading }),
  removeSubmission: (id) =>
    set((state) => ({
      submissions: state.submissions?.filter((s) => s._id !== id) || [],
    })),
}));
