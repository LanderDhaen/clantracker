import DamageChart from "./DamageChart";
import StarsChart from "./StarsChart";

export default function Profile({ profile }) {
  const { statistics, performances } = profile;

  const filteredPerformances = (year) =>
    performances.filter((performance) => performance.year === parseInt(year));

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full p-20">
      {statistics.map((statistic) => {
        const year = statistic.year;
        const filteredData = filteredPerformances(year);

        return (
          <>
            <StarsChart statistics={statistic} performances={filteredData} />
            <DamageChart statistics={statistic} performances={filteredData} />
          </>
        );
      })}
    </div>
  );
}
