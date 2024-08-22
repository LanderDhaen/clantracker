import { post } from "@/api";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";

export default function useLogoutMutation() {
  const navigate = useNavigate();

  const { trigger: logout } = useSWRMutation("users/logout", post, {
    onSuccess: () => {
      mutate("/users/me", undefined, false);
      navigate("/");
    },
  });

  return logout;
}
