import useTaskApi from "@/api/useTaskApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import { ClipboardList, Hourglass } from "lucide-react";
import { useEffect, useState } from "react";

const Overview = () => {
  const { getTasksCount } = useTaskApi();
  const [loading, setLoading] = useState(false);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [pendingTaskCount, setPendingTaskCount] = useState<number>(0);
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

    const fetchOverviewData = async () => {
      setLoading(true);
      await fetchTaskCount();
      await fetchPendingTaskCount();
    };

    fetchOverviewData().then(() => setLoading(false));
  }, []);

  console.log(pendingTaskCount);

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
              <Card className="dark:bg-gradient-to-tr from-primary/20 via-card to-primary/20 aspect-video overflow-hidden">
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

              <Card className="dark:bg-gradient-to-tr from-accent/20 via-card to-accent/20 aspect-video overflow-hidden">
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
              <Card className="dark:bg-gradient-to-tr from-blue-500/20 via-card to-blue-500/20">
                <CardHeader>
                  <CardTitle></CardTitle>
                </CardHeader>
              </Card>
            </>
          )}
        </div>
      </main>
    </section>
  );
};

export default Overview;
