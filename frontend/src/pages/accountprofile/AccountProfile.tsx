import DamageChart from "./DamageChart";
import StarsChart from "./StarsChart";

import ClanCard from "@/components/infocards/ClanCard";
import { GetAccountDetailsByIDResponse } from "@backend-types/account";
import AccountCard from "@/components/infocards/AccountCard";

interface AccountProfileProps {
  data: GetAccountDetailsByIDResponse;
}

export default function AccountProfile({ data }: AccountProfileProps) {
  const { account, clan, statistics, performances } = data;

  const filteredPerformances = (year: number) =>
    performances.filter((performance) => performance.year === year);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full px-20 pb-10">
      <AccountCard account={account} />
      <ClanCard clan={clan} />
      {statistics.map((statistic) => (
        <>
          <StarsChart
            statistics={statistic}
            performances={filteredPerformances(statistic.year)}
          />
          <DamageChart
            statistics={statistic}
            performances={filteredPerformances(statistic.year)}
          />
        </>
      ))}
    </div>
  );
}
