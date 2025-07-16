// import useSubmissionApi from "@/api/secure/useSubmissionApi";
import useUserApi from "@/api/secure/useUserApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import { CheckCheck, DollarSign, Users } from "lucide-react";
import { useEffect, useState } from "react";

const OverviewStats = () => {
  // const { getSubmissionsCount } = useSubmissionApi();
  const { getUserPaymentsCountPromise, getUsersCountPromise } = useUserApi();
  const { dbUser } = useDBUser();
  const [loading, setLoading] = useState(false);
  const [totalPayments, setTotalPayments] = useState<{
    paidAmount: number;
    coinAmount: number;
  } | null>(null);
  const [totalWorkers, setTotalWorkers] = useState<number>(0);
  const [totalBuyers, setTotalBuyers] = useState<number>(0);
  const [totalCoins, setTotalCoins] = useState<number>(0);

  useEffect(() => {
    const fetchTotalWorkers = async () => {
      try {
        const res = await getUsersCountPromise({
          filter: { role: "worker" },
        });

        setTotalWorkers(res);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTotalBuyers = async () => {
      try {
        const res = await getUsersCountPromise({
          filter: { role: "buyer" },
        });

        setTotalBuyers(res);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTotalCoins = async () => {
      try {
        const res = await getUsersCountPromise({
          count_property: "coinBalance",
        });

        setTotalCoins(res);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTotalPayments = async () => {
      try {
        const res = await getUserPaymentsCountPromise({
          payment_type: "withdrawal",
          status: "approved",
        });

        setTotalPayments(res);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOverviewData = async () => {
      setLoading(true);
      await fetchTotalWorkers();
      await fetchTotalBuyers();
      await fetchTotalCoins();
      await fetchTotalPayments();
    };

    fetchOverviewData().then(() => setLoading(false));
  }, [dbUser]);

  return (
    <section className="grid md:grid-cols-2 gap-x-4 gap-y-3">
      {loading ? (
        <>
          {Array.from({ length: 4 }).map(() => (
            <Skeleton className="aspect-video bg-muted rounded-xl flex justify-center items-center">
              <LoaderSpinner />
            </Skeleton>
          ))}
        </>
      ) : (
        <>
          {/* total workers */}
          <Card className="transition duration-300 dark:bg-gradient-to-bl from-emerald-700/20 via-card to-emerald-700/20 hover:bg-none dark:hover:bg-none hover:bg-emerald-700/5 dark:hover:bg-emerald-700/20 aspect-video md:aspect-auto lg:aspect-video overflow-hidden">
            <CardContent className="flex flex-col gap-4 md:gap-6 justify-center items-center h-full">
              <Users className="size-12 lg:size-16 p-2 rounded-md opacity-70 border border-emerald-600/50 bg-emerald-700/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-500" />
              <h3 className="text-4xl lg:text-5xl font-bold opacity-90 ">{totalWorkers}</h3>
              <p className="text-muted-foreground text-center">Total workers</p>
            </CardContent>
          </Card>

          {/* total buyers */}
          <Card className="transition duration-300 dark:bg-gradient-to-br from-stone-700/20 via-card to-stone-700/20 hover:bg-none dark:hover:bg-none hover:bg-stone-700/5 dark:hover:bg-stone-700/20 aspect-video md:aspect-auto lg:aspect-video overflow-hidden">
            <CardContent className="flex flex-col gap-4 md:gap-6 justify-center items-center h-full">
              <CheckCheck className="size-12 lg:size-16 p-2 rounded-md opacity-70 border border-stone-600/50 bg-stone-700/10 dark:bg-stone-500/20 text-stone-700 dark:text-stone-500" />
              <h3 className="text-4xl lg:text-5xl font-bold opacity-90 ">{totalBuyers}</h3>
              <p className="text-muted-foreground text-center">Total buyers</p>
            </CardContent>
          </Card>

          {/* total available coins */}
          <Card className="transition duration-300 dark:bg-gradient-to-br from-amber-700/20 via-card to-amber-700/20 hover:bg-none dark:hover:bg-none hover:bg-amber-700/5 dark:hover:bg-amber-700/10 aspect-video md:aspect-auto lg:aspect-video overflow-hidden">
            <CardContent className="flex flex-col gap-4 md:gap-6 justify-center items-center h-full">
              <CheckCheck className="size-12 lg:size-16 p-2 rounded-md opacity-70 border border-amber-700/50 bg-amber-700/10 dark:bg-amber-700/20 text-amber-700 dark:text-amber-700" />
              <h3 className="text-4xl lg:text-5xl font-bold opacity-90 ">{totalCoins}</h3>
              <p className="text-muted-foreground text-center">
                Total Available Coins
              </p>
            </CardContent>
          </Card>

          {/* total payments */}
          <Card className="transition duration-300 dark:bg-gradient-to-tr from-sky-700/20 via-card to-sky-700/20 hover:bg-none dark:hover:bg-none hover:bg-sky-700/5 dark:hover:bg-sky-700/10 aspect-video md:aspect-auto lg:aspect-video overflow-hidden">
            <CardContent className="flex flex-col gap-4 md:gap-6 justify-center items-center h-full">
              <DollarSign className="size-12 lg:size-16 p-2 rounded-md opacity-70 border border-sky-600/50 bg-sky-700/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-500" />
              <h3 className="text-4xl lg:text-5xl font-bold opacity-90 ">
                {totalPayments?.paidAmount}
              </h3>
              <p className="text-muted-foreground text-center">Total Paid</p>
            </CardContent>
          </Card>
        </>
      )}
    </section>
  );
};

export default OverviewStats;
