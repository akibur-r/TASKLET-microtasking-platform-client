import useUserApi from "@/api/useUserApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import {
  coinPrices,
  type CoinPriceOption,
} from "@/types/paymentType/paymentType";
import { Star } from "lucide-react";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { toast } from "sonner";

const PurchaseCoins = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<CoinPriceOption | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmButtonLoading, setConfirmButtonLoading] = useState(false);

  const { addUserPaymentPromise } = useUserApi();
  const { dbUser, updateCoinBalance } = useDBUser();

  const handlePurchase = (plan: CoinPriceOption) => {
    setPurchaseAmount(plan);
    setDialogOpen(true);
  };

  const handlePurchaseConfirmation = async () => {
    if (!purchaseAmount) return;

    setConfirmButtonLoading(true);
    await addUserPaymentPromise({
      payment_info: purchaseAmount,
      payment_method: "Card",
      payment_type: "purchase",
      user_email: dbUser?.email || "",
    })
      .then((res) => {
        if (res.insertedId) {
          updateCoinBalance(purchaseAmount.coins);

          toast.success("Payment Successful", {
            description: `${purchaseAmount.coins} coins was added to your balance.`,
          });

          setDialogOpen(false);
        } else {
          toast.error("Payment Failed", {
            description: "Something went wrong",
          });
        }
      })
      .catch(() => {
        toast.error("Payment Failed", {
          description: "Something went wrong",
        });
      })
      .finally(() => {
        setConfirmButtonLoading(false);
      });
  };

  return (
    <section className="space-y-8">
      <SectionHeader name="Purchase Coins" className="text-center" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coinPrices.map((plan: CoinPriceOption) => (
          <Button key={plan.coins} onClick={() => handlePurchase(plan)} asChild>
            <Card
              className={`aspect-video h-full py-4 border-primary/30 hover:bg-primary/30 ${
                plan.coins === 1000
                  ? "bg-accent/20 border-accent/50 hover:bg-accent/30 relative"
                  : plan.coins === 500
                  ? "bg-primary/20"
                  : plan.coins === 150
                  ? "bg-primary/15"
                  : "bg-primary/10"
              }`}
            >
              {plan.coins === 1000 && (
                <Badge className="absolute -top-1 -left-1 bg-amber-600/80 border-amber-500">
                  <Star className="size-3 mr-1" />
                  Best Price
                </Badge>
              )}

              <CardContent className="flex flex-col gap-2 items-center justify-center">
                <FaEthereum className="size-8 text-accent" />
                <h3 className="text-lg dark:text-muted-foreground">
                  {plan.coins} Coins
                </h3>
                <div>=</div>
                <p className="dark:text-neutral-400 text-xl">${plan.price}</p>
              </CardContent>
            </Card>
          </Button>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription className="max-w-sm">
              <span className="font-medium text-foreground/80">
                ${purchaseAmount?.price}
              </span>{" "}
              will be charged in exchange of {purchaseAmount?.coins} coins.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button
              variant="default"
              className="bg-primary/70 hover:bg-primary/80 text-base-content flex items-center justify-center"
              onClick={handlePurchaseConfirmation}
            >
              {confirmButtonLoading ? <LoaderSpinner /> : "Confirm Purchase"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PurchaseCoins;
