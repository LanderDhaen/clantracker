import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { useNavigate } from "react-router-dom";
import { Users, BarChart2, Castle, Hammer, Crown, User } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="py-4 bg-gray-100 flex items-center px-20">
      <div className="flex flex-1 items-center justify-between">
        <Label className="bg-green-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
          <Hammer className="text-white" />
          <span>Beta</span>
        </Label>
        <div className="flex space-x-4 ml-auto">
          <Button variant="link" onClick={() => navigate("/accounts")}>
            <Users className="mr-2" />
            Accounts
          </Button>
          <Button variant="link" onClick={() => navigate("/performances")}>
            <BarChart2 className="mr-2" />
            Performances
          </Button>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex space-x-4">
          <Button variant="link" onClick={() => navigate("/clans")}>
            <Castle className="mr-2" />
            Clans
          </Button>
          <Button variant="link" onClick={() => navigate("/cwls")} disabled>
            <Crown className="mr-2" />
            CWL (coming soon)
          </Button>
        </div>
        <Button
          className="ml-auto"
          variant="outline"
          onClick={() => navigate("/cwls")}
        >
          <User className="mr-2" />
          Log in
        </Button>
      </div>
    </header>
  );
}
