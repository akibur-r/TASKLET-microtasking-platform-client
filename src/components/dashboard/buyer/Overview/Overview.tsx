import useTaskApi from "@/api/secure/useTaskApi";
import useUserApi from "@/api/secure/useUserApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import { ClipboardList, Coins, DollarSign, Hourglass } from "lucide-react";
import { useEffect, useState } from "react";

const Overview = () => {
  const { getTasksCount } = useTaskApi();
  const { getUserPaymentsCountPromise } = useUserApi();
  const [loading, setLoading] = useState(false);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [pendingTaskCount, setPendingTaskCount] = useState<number>(0);
  const [userPaymentsCount, setUserPaymentsCount] = useState<{
    paidAmount: number;
    coinAmount: number;
  } | null>(null);
  const { dbUser } = useDBUser();

  useEffect(() => {
    const fetchTaskCount = async () => {
      try {
        const res = await getTasksCount();
        setTaskCount(res);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPendingTaskCount = async () => {
      try {
        const res = await getTasksCount("pending_tasks");
        setPendingTaskCount(res);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserPaymentsCount = async () => {
      try {
        const res = await getUserPaymentsCountPromise();
        setUserPaymentsCount(res);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOverviewData = async () => {
      setLoading(true);
      await fetchTaskCount();
      await fetchPendingTaskCount();
      await fetchUserPaymentsCount();
    };

    fetchOverviewData().then(() => setLoading(false));
  }, []);

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-xl font-medium font-fancy">{dbUser?.name}</h2>
        <Badge variant={"success"}>{dbUser?.role}</Badge>
      </header>
      <main>
        <div className="grid md:grid-cols-3 gap-x-4 gap-y-3">
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
              <Card className="dark:bg-gradient-to-tr from-primary/20 via-card to-primary/20 aspect-video md:aspect-auto lg:aspect-video overflow-hidden">
                <CardContent className="flex justify-between items-end h-full">
                  <div className="flex flex-col justify-end h-full">
                    <h3 className="text-7xl md:text-3xl lg:text-8xl font-bold opacity-90">
                      {taskCount}
                    </h3>
                    <p className="text-muted-foreground">Tasks posted</p>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <ClipboardList className="size-[55%] text-primary drop-shadow-2xl drop-shadow-primary/30" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gradient-to-tr from-accent/20 via-card to-accent/20 aspect-video md:aspect-auto lg:aspect-video overflow-hidden">
                <CardContent className="flex justify-between items-end h-full">
                  <div className="flex flex-col justify-end h-full">
                    <h3 className="text-7xl md:text-3xl lg:text-8xl font-bold opacity-90">
                      {pendingTaskCount}
                    </h3>
                    <p className="text-muted-foreground">Pending tasks </p>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <Hourglass className="size-[55%] text-accent drop-shadow-2xl drop-shadow-accent/50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="p-0 dark:bg-gradient-to-tr from-blue-500/20 via-card to-blue-500/20 overflow-hidden">
                <CardContent className="p-2 lg:p-4 h-full grid grid-cols-2 gap-2">
                  <Card className="bg-accent/10 h-full">
                    <CardContent className="flex flex-col gap-2 items-center justify-around h-full">
                      <DollarSign className="text-accent size-10 md:size-6 lg:size-10" />
                      <h3 className="text-3xl md:text-xl font-bold">
                        {userPaymentsCount?.paidAmount ?? 0}
                      </h3>
                      <p className="text-muted-foreground md:text-sm  text-center">
                        Total Paid
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/10">
                    <CardContent className="flex flex-col gap-2 items-center justify-around h-full">
                      <Coins className="text-primary size-10 md:size-6 lg:size-10" />
                      <h3 className="text-3xl md:text-xl font-bold">
                        {userPaymentsCount?.paidAmount ?? 0}
                      </h3>
                      <p className="text-muted-foreground md:text-sm  text-center">
                        Coins Purchased
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </section>
  );
};

export default Overview;
