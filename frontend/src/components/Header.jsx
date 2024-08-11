import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Users, BarChart2, Castle } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center p-4 bg-gray-100">
      <div className="flex space-x-4">
        <Button variant="link" onClick={() => navigate("/members")}>
          <Users className="mr-2" />
          Members
        </Button>
        <Button variant="link" onClick={() => navigate("/performance")}>
          <BarChart2 className="mr-2" />
          Performance
        </Button>
        <Button variant="link" onClick={() => navigate("/clans")}>
          <Castle className="mr-2" />
          Clans
        </Button>
      </div>
    </div>
  );
}
