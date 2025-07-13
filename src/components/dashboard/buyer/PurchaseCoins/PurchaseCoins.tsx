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
import { Star } from "lucide-react";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { toast } from "sonner";

type PurchaseAmounts = 10 | 150 | 500 | 1000 | 0;

const PurchaseCoins = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<PurchaseAmounts>(0);
  const paymentAmount = {
    0: 0,
    10: 1,
    150: 10,
    500: 20,
    1000: 35,
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmButtonLoading, setConfirmButtonLoading] = useState(false);

  const handlePurchaseConfirmation = () => {
    setConfirmButtonLoading(true);
    toast.success("bought");

    setConfirmButtonLoading(false);
  };

  const handlePurchase = (amount: PurchaseAmounts) => {
    if (amount) {
      setPurchaseAmount(amount);
      setDialogOpen(true);
    }
  };

  return (
    <section className="space-y-8">
      <SectionHeader name="Purchase Coins" className="text-center" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 10 coins */}
        <Button onClick={() => handlePurchase(10)} asChild>
          <Card className="aspect-video lg:aspect-auto  h-full bg-primary/10 border-primary/30 hover:bg-primary/30 py-4">
            <CardContent className="flex flex-col gap-2 items-center justify-center">
              <FaEthereum className="size-8 text-accent" />

              <h3 className="text-lg dark:text-muted-foreground">10 Coins </h3>
              <div>=</div>
              <p className="dark:text-neutral-400 text-xl">$1</p>
            </CardContent>
          </Card>
        </Button>

        {/* 150 coins */}
        <Button onClick={() => handlePurchase(150)} asChild>
          <Card className="aspect-video lg:aspect-auto  h-full bg-primary/15 border-primary/30 hover:bg-primary/30 py-4">
            <CardContent className="flex flex-col gap-2 items-center justify-center">
              <FaEthereum className="size-8 text-accent" />

              <h3 className="text-lg dark:text-muted-foreground">150 Coins </h3>
              <div>=</div>
              <p className="dark:text-neutral-400 text-xl">
                ${paymentAmount[150]}
              </p>
            </CardContent>
          </Card>
        </Button>

        {/* 500 coins */}
        <Button onClick={() => handlePurchase(500)} asChild>
          <Card className="aspect-video lg:aspect-auto  h-full bg-primary/20 border-primary/50 hover:bg-primary/30 py-4">
            <CardContent className="flex flex-col gap-2 items-center justify-center">
              <FaEthereum className="size-8 text-accent" />

              <h3 className="text-lg dark:text-muted-foreground">500 Coins </h3>
              <div>=</div>
              <p className="dark:text-neutral-400 text-xl">
                ${paymentAmount[500]}
              </p>
            </CardContent>
          </Card>
        </Button>

        {/* 1000 coins */}
        <Button onClick={() => handlePurchase(1000)} asChild>
          <Card className="aspect-video lg:aspect-auto  h-full bg-accent/20 border-accent/50 hover:bg-accent/30 py-4 relative">
            <Badge className="absolute -top-1 -left-1 bg-amber-600/80 border-amber-500">
              <Star className="size-2" />
              Best Price
            </Badge>
            <CardContent className="flex flex-col gap-2 items-center justify-center">
              <FaEthereum className="size-8 text-accent" />

              <h3 className="text-lg dark:text-muted-foreground">
                1000 Coins{" "}
              </h3>
              <div>=</div>
              <p className="dark:text-neutral-400 text-xl">
                ${paymentAmount[1000]}
              </p>
            </CardContent>
          </Card>
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription className="max-w-sm">
              <span className="font-medium text-foreground/80">
                ${paymentAmount[purchaseAmount]}
              </span>{" "}
              will be charged in exchange of {purchaseAmount} coins.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>

            <Button
              variant={"default"}
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
