import useUserApi from "@/api/secure/useUserApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePaymentsStore } from "@/hooks/stores/usePaymentStore/usePaymentStore";
import type { PaymentFromDBType } from "@/types/paymentType/paymentType";
import { format } from "date-fns";
import { useEffect } from "react";
import {
  FaCalendarAlt,
  FaCoins,
  FaCreditCard,
  FaDollarSign,
  FaHashtag,
} from "react-icons/fa";
const PaymentHistory = () => {
  const { payments, setPayments, paymentsLoading, setPaymentsLoading } =
    usePaymentsStore();
  const { getUserPaymentPromise } = useUserApi();

  useEffect(() => {
    const fetchPayments = () => {
      setPaymentsLoading(true);
      getUserPaymentPromise()
        .then((res) => {
          setPayments(res);
          setPaymentsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPaymentsLoading(false);
        });
    };
    fetchPayments();
  }, []);

  return (
    <section className="space-y-8">
      <SectionHeader name="Payment History" className="text-center" />
      <div>
        {paymentsLoading ? (
          <div className="flex justify-center">
            <LoaderSpinner />
          </div>
        ) : payments?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-fit">
                  <FaHashtag className="md:hidden size-4" />
                  <span className="hidden md:block text-amber-600 dark:text-accent">
                    SL.
                  </span>
                </TableHead>
                <TableHead>
                  <FaCalendarAlt className="md:hidden size-4" />
                  <span className="hidden md:block text-amber-600 dark:text-accent">
                    Payment Time
                  </span>
                </TableHead>
                <TableHead className="text-center">
                  <FaCoins className="md:hidden size-4 mx-auto" />
                  <span className="hidden md:block text-amber-600 dark:text-accent">
                    Coin Amount
                  </span>
                </TableHead>
                <TableHead className="text-center">
                  <FaDollarSign className="md:hidden size-4 mx-auto" />
                  <span className="hidden md:block text-amber-600 dark:text-accent">
                    Price
                  </span>
                </TableHead>
                <TableHead className="text-center">
                  <FaCreditCard className="md:hidden size-4 mx-auto" />
                  <span className="hidden md:block text-amber-600 dark:text-accent">
                    Payment Method
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment: PaymentFromDBType, idx) => (
                <TableRow>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    {format(payment.created_at, "dd LLL yyyy 'at' h:mm a")}
                  </TableCell>
                  <TableCell className="text-center">{payment.coins}</TableCell>
                  <TableCell className="text-center">
                    <span className="opacity-80">$</span>
                    {payment.price}
                  </TableCell>
                  <TableCell className="text-center">
                    {payment.payment_method}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <>You didn't make any payment yet</>
        )}
      </div>
    </section>
  );
};

export default PaymentHistory;
