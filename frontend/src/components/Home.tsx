import { Users, BarChart2, Castle } from "lucide-react";
import InfoCard from "./InfoCard";

export default function Home() {
  const cards = [
    {
      title: "Accounts",
      info: "View detailed profiles, oversee administrative tasks, and track performance metrics. This section lets you inspect and update account information and monitor individual performance within your clan family.",
      text: "Go to Accounts",
      URL: "/accounts",
      icon: <Users className="mr-4" />,
    },
    {
      title: "Performances",
      info: "View and analyze comprehensive individual performance data and statistics from CWL. This area provides insights from stars to damage, helping you make data-driven decisions for your next CWL line-up.",
      text: "View Performances",
      URL: "/performances",
      icon: <BarChart2 className="mr-4" />,
    },
    {
      title: "Clans",
      info: "Explore, manage, and interact with clans within the family. This section includes features for clan management and viewing clan details. Push your clan to the next level with our distribution charts and CWL breakdowns.",
      text: "Explore Clans",
      URL: "/clans",
      icon: <Castle className="mr-4" />,
    },
  ];

  return (
    <div className="flex items-center justify-center h-full w-full px-20 py-40">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {cards.map((card) => (
          <InfoCard
            key={card.URL}
            title={card.title}
            info={card.info}
            text={card.text}
            URL={card.URL}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
}
