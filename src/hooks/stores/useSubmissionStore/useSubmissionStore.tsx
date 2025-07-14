import type { SubmissionType } from "@/types/submissionTypes/submissionTypes";
import { create } from "zustand";

interface SubmissionStore {
  submissions: SubmissionType[] | null;
  submissionsLoading: boolean;
  setSubmissions: (submissions: SubmissionType[]) => void;
  setSubmissionsLoading: (loading: boolean) => void;
}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
  submissions: null,
  submissionsLoading: false,

  setSubmissions: (submissions) => set({ submissions }),
  setSubmissionsLoading: (loading) => set({ submissionsLoading: loading }),
}));
