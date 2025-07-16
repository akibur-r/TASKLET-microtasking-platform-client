import useSubmissionApi from "@/api/secure/useSubmissionApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import { CheckCheck, DollarSign, Loader } from "lucide-react";
import { useEffect, useState } from "react";
const OverviewStats = () => {
  const { getSubmissionsCount } = useSubmissionApi();
  const { dbUser } = useDBUser();
  const [loading, setLoading] = useState(false);

  const [allSubmissionsCount, setAllSubmissionsCount] = useState<number>(0);
  const [pendingSubmissionsCount, setPendingSubmissionsCount] =
    useState<number>(0);
  const [totalEarning, setTotalEarning] = useState<number>(0);

  useEffect(() => {
    const fetchAllSubmissionsCount = async () => {
      try {
        const res = await getSubmissionsCount({
          worker_email: dbUser?.email || "--",
        });
        setAllSubmissionsCount(res);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPendingSubmissionsCount = async () => {
      try {
        const res = await getSubmissionsCount({
          worker_email: dbUser?.email || "--",
          status: "approved",
        });
        setPendingSubmissionsCount(res);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchTotalEarning = async () => {
      try {
        const res = await getSubmissionsCount({
          worker_email: dbUser?.email || "--",
          status: "approved",
          count_property: "payable_amount",
        });
        setTotalEarning(res);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOverviewData = async () => {
      setLoading(true);
      await fetchAllSubmissionsCount();
      await fetchPendingSubmissionsCount();
      await fetchTotalEarning();
    };

    fetchOverviewData().then(() => setLoading(false));
  }, []);

  return (
    <section className="grid md:grid-cols-3 gap-x-4 gap-y-3">
      {loading ? (
        <>
          {Array.from({ length: 3 }).map(() => (
            <Skeleton className="aspect-video bg-muted rounded-xl flex justify-center items-center">
              <LoaderSpinner />
            </Skeleton>
          ))}
        </>
      ) : (
        <>
          {/* total submission count */}
          <Card className="dark:bg-gradient-to-br from-emerald-700/20 via-card to-emerald-700/20 aspect-video md:aspect-auto lg:aspect-video overflow-hidden">
            <CardContent className="flex flex-col gap-2 justify-center items-center h-full">
              <CheckCheck className="size-12 p-2 rounded-md opacity-70 border border-emerald-600/50 bg-emerald-700/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-500" />
              <h3 className="text-4xl font-bold opacity-90 ">
                {allSubmissionsCount}
              </h3>
              <p className="text-muted-foreground text-center">
                Tasks submitted
              </p>
            </CardContent>
          </Card>

          {/* pending submission count */}
          <Card className="dark:bg-gradient-to-br from-amber-700/20 via-card to-amber-700/20 aspect-video md:aspect-auto lg:aspect-video overflow-hidden">
            <CardContent className="flex flex-col gap-2 justify-center items-center h-full">
              <Loader className="size-12 p-2 rounded-md opacity-70 border border-amber-600/50 bg-amber-700/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-500" />
              <h3 className="text-4xl font-bold opacity-90 ">
                {pendingSubmissionsCount}
              </h3>
              <p className="text-muted-foreground text-center">
                Tasks awaiting review
              </p>
            </CardContent>
          </Card>

          {/* total earning */}
          <Card className="dark:bg-gradient-to-br from-blue-700/20 via-card to-blue-700/20 aspect-video md:aspect-auto lg:aspect-video overflow-hidden">
            <CardContent className="flex flex-col gap-2 justify-center items-center h-full">
              <DollarSign className="size-12 p-2 rounded-md opacity-70 border border-blue-600/50 bg-blue-700/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-500" />
              <h3 className="text-4xl font-bold opacity-90 ">{totalEarning}</h3>
              <p className="text-muted-foreground text-center">
                Total Earnings
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </section>
  );
};

export default OverviewStats;
