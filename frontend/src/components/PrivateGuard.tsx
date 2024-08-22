import { ReactNode } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";

interface PrivateGuardProps {
  children: ReactNode;
}

export default function PrivateGuard({ children }: PrivateGuardProps) {
  const { data } = useSessionUser();

  if (data) {
    return <>{children}</>;
  }

  return null;
}
