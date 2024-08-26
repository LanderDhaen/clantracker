import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { FileInput, XCircleIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { Calendar } from "@/components/ui/Calendar";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

import { ROLES, formatRole } from "@/lib/formatRole";

import { post, put } from "../../api";
import useSWRMutation from "swr/mutation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import {
  GetMainAccountsResponse,
  GetAccountByIDResponse,
} from "@backend-types/account";
import { getAllClansResponse } from "@backend-types/clan";
import { getAllTownhallsResponse } from "@backend-types/townhall";
import { Badge } from "@/components/ui/Badge";
import { colorTownhall } from "@/lib/formatTownhall";

interface AccountFormProps {
  mainAccounts: GetMainAccountsResponse;
  clans: getAllClansResponse;
  townhalls: getAllTownhallsResponse;
  account: GetAccountByIDResponse;
}

const nationalities = ["Belgian", "Dutch"];

export default function AccountForm({
  mainAccounts,
  clans,
  townhalls,
  account,
}: AccountFormProps) {
  const navigate = useNavigate();

  const { trigger: createAccount } = useSWRMutation("/accounts", post, {
    onSuccess: () => {
      toast.success("Account created successfully.");
      navigate("/accounts");
    },
    onError: () => {
      toast.error("An error occurred while creating the account.");
    },
  });

  const { trigger: updateAccount } = useSWRMutation(
    `/accounts/${account?.ID}`,
    put,
    {
      onSuccess: () => {
        toast.success("Account updated successfully.");
        navigate(`/accounts/${account?.ID}`);
      },
      onError: () => {
        toast.error("An error occurred while updating the account.");
      },
    }
  );

  const formSchema = z.object({
    username: z.string().min(1, { message: "Required" }),
    name: z.string().optional(),
    role: z.number(),
    nationality: z.string(),
    joined: z.date({
      message: "Required",
    }),
    left: z.date().optional().nullable(),
    accountID: z.number().optional().nullable(),
    townhallID: z.number(),
    clanID: z.number(),
  });

  const accountForm = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: account?.username || "",
      name: account?.name || "",
      role: account?.role || undefined,
      nationality: account?.nationality || undefined,
      joined: account?.joined ? new Date(account.joined) : undefined,
      left: account?.left ? new Date(account.left) : undefined,
      accountID: account?.mainID || undefined,
      townhallID: account?.townhallID || undefined,
      clanID: account?.clanID || undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );

    if (account) {
      updateAccount(filteredData);
    } else {
      createAccount(filteredData);
    }
  };

  return (
    <Form {...accountForm}>
      <form onSubmit={accountForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={accountForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={accountForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={accountForm.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ? field.value : ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a nationality" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {nationalities.map((nationality) => (
                    <SelectItem key={nationality} value={nationality}>
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={accountForm.control}
          name="townhallID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Townhall</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value ? field.value.toString() : ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a townhall" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {townhalls.map((townhall) => (
                    <SelectItem
                      key={townhall.ID}
                      value={townhall.ID.toString()}
                    >
                      <Badge color={colorTownhall(townhall.level)}>
                        TH {townhall.level}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={accountForm.control}
          name="clanID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clan</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value ? field.value.toString() : ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a clan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clans.map((clan) => (
                    <SelectItem key={clan.ID} value={clan.ID.toString()}>
                      {clan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={accountForm.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString() || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role from the dropdown" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ROLES).map((role) => (
                    <SelectItem key={role} value={role.toString()}>
                      {formatRole(role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={accountForm.control}
          name="accountID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Account</FormLabel>
              <div className="flex items-center space-x-2">
                <FormControl className="flex-1">
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an account" />
                    </SelectTrigger>
                    <SelectContent>
                      {mainAccounts.map((account) => (
                        <SelectItem
                          key={account.ID}
                          value={account.ID.toString()}
                        >
                          <div className="flex items-center space-x-1">
                            <Badge color={colorTownhall(account.townhall)}>
                              TH {account.townhall}
                            </Badge>
                            <span>| {account.username}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {field.value && (
                  <Button
                    variant="ghost"
                    className="ml-2"
                    onClick={() => field.onChange(null)}
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={accountForm.control}
          name="joined"
          render={({ field }) => (
            <FormItem className="flex flex-col pt-1">
              <FormLabel className="pb-1">Joined on</FormLabel>
              <div className="flex items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2012-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {field.value && (
                  <Button
                    variant="ghost"
                    className="ml-2"
                    onClick={() => field.onChange(null)}
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={accountForm.control}
          name="left"
          render={({ field }) => (
            <FormItem className="flex flex-col pt-1">
              <FormLabel className="pb-1">Left on</FormLabel>
              <div className="flex items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2012-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {field.value && (
                  <Button
                    variant="ghost"
                    className="ml-2"
                    onClick={() => field.onChange(null)}
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center ">
          <Button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            <FileInput className="mr-2" />
            {account ? "Update Account" : "Create Account"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
