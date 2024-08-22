import { post } from "@/api";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";

export default function useLoginMutation() {
  const navigate = useNavigate();

  const { trigger: login } = useSWRMutation("users/login", post, {
    onSuccess: (data) => {
      mutate("/users/me", data, false);
      navigate("/");
    },
  });

  return login;
}
