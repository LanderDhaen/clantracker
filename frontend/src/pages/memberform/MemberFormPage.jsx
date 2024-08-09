import useSWR from "swr";
import { get } from "../../api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import MemberForm from "./MemberForm";

export default function MemberFormPage() {
  const { data: accounts } = useSWR(`/accounts/main-accounts`, get);
  const { data: clans } = useSWR(`/clans`, get);
  const { data: townhalls } = useSWR(`/townhalls`, get);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className=" w-full max-w-3xl bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Member Form</CardTitle>
          <CardDescription>
            Fill out the form to create a new clan member
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accounts && clans && townhalls && (
            <MemberForm
              accounts={accounts}
              clans={clans}
              townhalls={townhalls}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
