import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Users, BarChart2, Castle } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center p-4 bg-gray-100">
      <div className="flex space-x-4">
        <Button variant="link" onClick={() => navigate("/accounts")}>
          <Users className="mr-2" />
          Accounts
        </Button>
        <Button variant="link" onClick={() => navigate("/performances")}>
          <BarChart2 className="mr-2" />
          Performances
        </Button>
        <Button variant="link" onClick={() => navigate("/clans")}>
          <Castle className="mr-2" />
          Clans
        </Button>
      </div>
    </div>
  );
}
