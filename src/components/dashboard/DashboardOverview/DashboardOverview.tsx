import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { useDBUser } from "@/hooks/useDBUser/useDBUser";
import AdminOverview from "../admin/Overview/Overview";
import BuyerOverview from "../buyer/Overview/Overview";
import WorkerOverview from "../worker/Overview/Overview";

const DashboardOverview = () => {
  const { dbUser, dbUserLoading } = useDBUser();

  if (dbUserLoading)
    return (
      <div className="flex justify-center">
        <LoaderSpinner />
      </div>
    );

  if (dbUser?.role === "buyer") return <BuyerOverview />;
  else if (dbUser?.role === "admin") return <AdminOverview />;
  else if (dbUser?.role === "worker") return <WorkerOverview />;
  else return <>Invalid access request</>;
};

export default DashboardOverview;
