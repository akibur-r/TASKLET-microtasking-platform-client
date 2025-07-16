import useUserApi from "@/api/secure/useUserApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import PaymentStatusUpdateButton from "@/components/shared/payments/PaymentStatusUpdateButton/PaymentStatusUpdateButton";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePaymentsStore } from "@/hooks/stores/usePaymentStore/usePaymentStore";
import type { PaymentFromDBType } from "@/types/paymentType/paymentType";
import { format, formatDistanceToNowStrict } from "date-fns";
import { useEffect } from "react";
import { toast } from "sonner";

const WithdrawRequests = () => {
  const { payments, setPayments, paymentsLoading, setPaymentsLoading } =
    usePaymentsStore();
  const { getUserPaymentPromise } = useUserApi();

  useEffect(() => {
    const fetchPayments = () => {
      setPaymentsLoading(true);
      getUserPaymentPromise({ payment_type: "withdrawal", status: "pending" })
        .then((res) => {
          setPayments(res || []);
          setPaymentsLoading(false);
        })
        .catch((err) => {
          toast.error("Failed to fetch withdraw requests");
          console.log(err);
          setPaymentsLoading(false);
        });
    };
    fetchPayments();
  }, []);

  return (
    <>
      <SectionHeader name="Withdrawal Requests" />
      <Separator />
      {paymentsLoading ? (
        <div className="flex justify-center">
          <LoaderSpinner />
        </div>
      ) : !payments?.length ? (
        <p>No pending withdraw requests found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-fit">Sl.</TableHead>
              <TableHead>Worker Email</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment: PaymentFromDBType, idx) => (
              <TableRow key={payment._id}>
                <TableCell className="font-semibold">{idx + 1}</TableCell>
                <TableCell>{payment.user_email}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      {formatDistanceToNowStrict(payment.created_at) + " ago"}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {format(payment.created_at, "dd LLLL yyyy 'at' h:mm a")}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="text-center">${payment.price}</TableCell>
                <TableCell>{payment.payment_method}</TableCell>
                <TableCell>{payment.account_number || "-"}</TableCell>
                <TableCell>
                  <PaymentStatusUpdateButton payment={payment} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default WithdrawRequests;
