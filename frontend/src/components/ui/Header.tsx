import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Users, BarChart2, Castle, Swords, User, Medal } from "lucide-react";
import { useSessionUser } from "@/hooks/useSessionUser";
import useLogoutMutation from "@/hooks/useLogoutMutation";

export default function Header() {
  const navigate = useNavigate();
  const logout = useLogoutMutation();
  const { data: user, isLoading } = useSessionUser();

  if (isLoading) {
    return null;
  }

  return (
    <header className="py-4 bg-gray-100 flex items-center justify-between px-20">
      <div className="flex space">
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
        <Button variant="link" onClick={() => navigate("/cwls")}>
          <Swords className="mr-2" />
          CWL
        </Button>
        <Button variant="link" onClick={() => navigate("/bonus")} disabled>
          <Medal className="mr-2" />
          Bonus
        </Button>
      </div>
      {user ? (
        <Button variant="outline" onClick={() => logout()}>
          Log out
        </Button>
      ) : (
        <Button variant="outline" onClick={() => navigate("/login")}>
          <User className="mr-2" />
          Log in
        </Button>
      )}
    </header>
  );
}
