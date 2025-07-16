import useUserApi from "@/api/secure/useUserApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import type {
  PaymentMethodType,
  PaymentType,
} from "@/types/paymentType/paymentType";
import { paymentMethods } from "@/utils/paymentMethods";
import { useState } from "react";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { toast } from "sonner";

const Withdrawals = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [coinAmount, setCoinAmount] = useState<number>(0);
  const [payableAmount, setPayableAmount] = useState<number>(0);
  const { dbUser, updateCoinBalance } = useDBUser();
  const { addUserPaymentPromise } = useUserApi();

  const coinBalance = dbUser?.coinBalance || 0;
  const cashBalance = coinBalance > 0 ? coinBalance / 20 : 0;

  const handleWithdrawAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let coinsToWithdraw = Number(e.target.value);
    if (!Number.isInteger(coinsToWithdraw)) {
      toast.error("Withdraw amount must be an integer");
      coinsToWithdraw = Math.floor(coinsToWithdraw);
    }

    if (coinsToWithdraw > (dbUser?.coinBalance || 0)) {
      toast.error("Insufficient coin balance");
      e.target.value = "0";
      setCoinAmount(0);
      setPayableAmount(0);

      return;
    }

    let amountToPay = coinsToWithdraw / 20;
    if (coinsToWithdraw < 200) {
      amountToPay = 0;
    }

    setCoinAmount(coinsToWithdraw);
    setPayableAmount(amountToPay);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payment_method = formData.get("payment_method") as PaymentMethodType;
    const account_number = formData.get("account_number") as string;

    let error_message = "";

    if (!payment_method) {
      error_message = "Please select a payment method";
    } else if (!account_number) {
      error_message = "Please enter your account number";
    }

    if (error_message) {
      toast.error("Withdraw request failed", { description: error_message });
      setSubmitLoading(false);
      return;
    }

    const paymentDetails: PaymentType = {
      status: "pending",
      payment_type: "withdrawal",
      payment_info: { coins: coinAmount, price: payableAmount },
      user_email: dbUser?.email ?? "",
      account_number,
      payment_method,
      note: "",
    };

    addUserPaymentPromise(paymentDetails)
      .then((res) => {
        if (res.insertedId) {
          updateCoinBalance(coinAmount * -1);
        }

        setSubmitLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSubmitLoading(false);
      });
  };

  return (
    <section className="space-y-4 lg:space-y-8">
      <Card>
        <CardContent className="grid gap-x-6 gap-y-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex flex-col gap-3 items-center justify-center">
              <CardDescription>Total Coins Earned</CardDescription>
              <div className="flex justify-center items-center gap-2">
                <FaEthereum className="size-10 text-accent" />
                <p className="font-semibold text-2xl lg:text-4xl">
                  {coinBalance}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-3 items-center justify-center">
              <CardDescription>Total Cash Balance</CardDescription>
              <div className="flex justify-center items-center gap-2">
                <FaDollarSign className="size-10 text-accent" />
                <p className="font-semibold text-2xl lg:text-4xl">
                  {cashBalance}
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <div className="space-y-3">
        <SectionHeader name="Withdraw Coins" />
        <Card className="p-2 md:p-3">
          <form onSubmit={handleSubmit}>
            <CardContent className="p-2 md:p-3 grid md:grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="coin_amount">Coins to Withdraw</Label>
                <Input
                  type="number"
                  name="coin_amount"
                  placeholder="Enter coin amount..."
                  onChange={handleWithdrawAmountChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="payable_amount">Payable Amount</Label>
                <Input
                  type="number"
                  name="payable_amount"
                  value={payableAmount}
                  disabled
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="payment_method">Payment Method</Label>
                </div>

                <Select name="payment_method">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods
                      .filter((m) => m !== "Card")
                      .map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="account_number">Account Number</Label>
                <Input
                  type="text"
                  name="account_number"
                  placeholder="e.g. 019XXXXXXXX"
                />
              </div>

              <Button
                disabled={submitLoading || !payableAmount}
                type="submit"
                className="w-full mt-8 md:col-span-2"
              >
                {submitLoading ? (
                  <LoaderSpinner
                    size={4}
                    className="text-amber-700 dark:text-amber-500"
                  />
                ) : (
                  "Request Withdraw"
                )}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Withdrawals;
