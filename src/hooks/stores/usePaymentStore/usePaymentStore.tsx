import type { PaymentFromDBType } from "@/types/paymentType/paymentType";
import { create } from "zustand";

interface PaymentStore {
  payments: PaymentFromDBType[] | null;
  paymentsLoading: boolean;
  setPayments: (payments: PaymentFromDBType[]) => void;
  setPaymentsLoading: (loading: boolean) => void;
}

export const usePaymentsStore = create<PaymentStore>((set) => ({
  payments: null,
  paymentsLoading: false,

  setPayments: (payments) => set({ payments }),
  setPaymentsLoading: (loading) => set({ paymentsLoading: loading }),
}));
