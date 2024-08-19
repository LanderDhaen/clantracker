import useSWR from "swr";
import { get } from "../../api";
import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import AccountForm from "./AccountForm";

import AsyncData from "@/components/AsyncData";

export default function AccountFormPage() {
  const { id } = useParams();

  const {
    data: accounts,
    isLoading: accountsLoading,
    error: accountsError,
  } = useSWR(`/accounts/main-accounts`, get);
  const {
    data: clans,
    isLoading: clansLoading,
    error: clansError,
  } = useSWR(`/clans`, get);
  const {
    data: townhalls,
    isLoading: townhallsLoading,
    error: townhallsError,
  } = useSWR(`/townhalls`, get);
  const {
    data: member,
    isLoading: memberLoading,
    error: memberError,
  } = useSWR(id ? `/accounts/${id}` : null, get);

  return (
    <div className="flex justify-center items-center">
      <AsyncData
        loading={
          accountsLoading || clansLoading || townhallsLoading || memberLoading
        }
        error={accountsError || clansError || townhallsError || memberError}
      >
        <Card className="w-full max-w-3xl bg-white shadow-lg rounded-3xl ">
          <CardHeader>
            <CardTitle>{id ? `Update Member` : "Create Member"}</CardTitle>
            <CardDescription>
              {id
                ? "Update the details of this clan member"
                : "Fill out the form to create a new clan member"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm
              accounts={accounts}
              clans={clans}
              townhalls={townhalls}
              member={member}
            />
          </CardContent>
        </Card>
      </AsyncData>
    </div>
  );
}
