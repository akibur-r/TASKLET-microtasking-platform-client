import { Separator } from "@/components/ui/separator";
import OverviewHeader from "../../shared/OverviewHeader/OverviewHeader";
import OverviewStats from "./OverviewStats/OverviewStats";
import WithdrawRequests from "./WithdrawRequests/WithdrawRequests";

const Overview = () => {
  return (
    <section className="space-y-4">
      <OverviewHeader />
      <OverviewStats />
      <Separator />
      <WithdrawRequests />
    </section>
  );
};

export default Overview;
