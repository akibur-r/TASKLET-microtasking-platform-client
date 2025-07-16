import OverviewHeader from "../../shared/OverviewHeader/OverviewHeader";
import OverviewStats from "./OverviewStats/OverviewStats";

const Overview = () => {
  return (
    <section className="space-y-4">
      <OverviewHeader />
      <OverviewStats />
    </section>
  );
};

export default Overview;
