import useUserApi from "@/api/secure/useUserApi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePaymentsStore } from "@/hooks/stores/usePaymentStore/usePaymentStore";
import type { PaymentFromDBType } from "@/types/paymentType/paymentType";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import LoaderSpinner from "../../LoaderSpinner/LoaderSpinner";

interface Props {
  payment: PaymentFromDBType | null;
  showText?: boolean;
  disabled?: boolean;
}

const PaymentStatusUpdateButton = ({
  payment = null,
  showText = false,
  disabled = false,
}: Props) => {
  const { updateUserPaymentPromise } = useUserApi();
  const { deletePaymentById } = usePaymentsStore();
  const [loading, setLoading] = useState(false);

  const handleRoleUpdate = async (status: "approved" | "rejected") => {
    if (!payment) return;

    setLoading(true);

    try {
      await updateUserPaymentPromise({
        body: { status: status },
        id: payment._id || "",
      });

      deletePaymentById(payment._id);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className=" bg-amber-500/50 hover:bg-amber-500/15 hover:text-amber-500 cursor-pointer text-base-content border border-amber-500/20"
          disabled={disabled || loading}
        >
          {loading ? (
            <LoaderSpinner />
          ) : (
            <>
              <Settings2 />
              {showText && "Update Status"}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => handleRoleUpdate("approved")}
          disabled={loading}
          className="flex items-center"
        >
          Approve
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaymentStatusUpdateButton;
