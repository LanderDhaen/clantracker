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
import { getTownhalls } from "@/api/townhall";
import { getClans } from "@/api/clan";
import { getMainAccounts, getAccountByID } from "@/api/account";

export default function AccountFormPage() {
  const { id } = useParams();

  const {
    data: mainAccounts,
    isLoading: accountsLoading,
    error: accountsError,
  } = getMainAccounts();
  const {
    data: clans,
    isLoading: clansLoading,
    error: clansError,
  } = getClans();
  const {
    data: townhalls,
    isLoading: townhallsLoading,
    error: townhallsError,
  } = getTownhalls();
  const {
    data: account,
    isLoading: accountLoading,
    error: accountError,
  } = getAccountByID(id);

  return (
    <div className="flex justify-center items-center">
      <AsyncData
        loading={
          accountsLoading || clansLoading || townhallsLoading || accountLoading
        }
        error={accountsError || clansError || townhallsError || accountError}
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
              mainAccounts={mainAccounts!}
              clans={clans!}
              townhalls={townhalls!}
              account={account!}
            />
          </CardContent>
        </Card>
      </AsyncData>
    </div>
  );
}
