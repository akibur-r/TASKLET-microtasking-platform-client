import ApprovedSubmissions from "../../shared/ApprovedSubmissions/ApprovedSubmissions";
import OverviewHeader from "../../shared/OverviewHeader/OverviewHeader";
import OverviewStats from "./OverviewStats/OverviewStats";

const Overview = () => {
  return (
    <section className="space-y-4">
      <OverviewHeader />

      <OverviewStats />
      <ApprovedSubmissions />
    </section>
  );
};

export default Overview;
