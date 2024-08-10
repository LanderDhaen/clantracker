import { Button } from "@/components/ui/Button"; // Import Button from shadcn ui
import { useNavigate } from "react-router-dom";
import { Users, BarChart2 } from "lucide-react";

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
      </div>
    </div>
  );
}
