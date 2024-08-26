import { CWLDetail } from "@/api/cwl";
import ClanCard from "@/components/infocards/ClanCard";

interface CWLProfileProps {
  data: CWLDetail;
}

export default function CWLProfile({ data }: CWLProfileProps) {
  const { cwl, clan, performances } = data;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full px-20 pb-10">
      <ClanCard clan={clan} />
    </div>
  );
}
