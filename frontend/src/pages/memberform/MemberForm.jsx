import React from "react";
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
import { formatTownhall } from "@/lib/formatTownhall";

import { post, put } from "../../api";
import useSWRMutation from "swr/mutation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

export default function MemberForm({ accounts, clans, townhalls, member }) {
  const navigate = useNavigate();

  const { trigger: createMember } = useSWRMutation("/accounts", post, {
    onSuccess: () => {
      toast.success("Member created successfully.");
      navigate("/members");
    },
    onError: () => {
      toast.error("An error occurred while creating the member.");
    },
  });

  const { trigger: updateMember } = useSWRMutation(
    `/accounts/${member?.ID}`,
    put,
    {
      onSuccess: () => {
        toast.success("Member updated successfully.");
        navigate(`/members/${member?.ID}`);
      },
      onError: () => {
        toast.error("An error occurred while updating the member.");
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

  const memberForm = useForm({
    defaultValues: {
      username: member?.username || "",
      name: member?.name || "",
      role: member?.role || undefined,
      nationality: member?.nationality || undefined,
      joined: member?.joined ? new Date(member.joined) : undefined,
      left: member?.left ? new Date(member.left) : undefined,
      accountID: member?.mainID || undefined,
      townhallID: member?.townhall || undefined,
      clanID: member?.clan.ID || undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );

    if (member) {
      updateMember(filteredData);
    } else {
      createMember(filteredData);
    }
  };

  const nationalities = ["Belgian", "Dutch"];

  return (
    <Form {...memberForm}>
      <ToastContainer position="bottom-right" theme="colored" />
      <form onSubmit={memberForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={memberForm.control}
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
          control={memberForm.control}
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
          control={memberForm.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ? field.value.toString() : ""}
                value={field.value ? field.value.toString() : ""}
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
          control={memberForm.control}
          name="townhallID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Townhall</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : ""}
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
                      <div className="flex items-center space-x-2">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            formatTownhall(townhall.level)
                          )}
                        ></span>
                        TH {townhall.level}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={memberForm.control}
          name="clanID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clan</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : ""}
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
          control={memberForm.control}
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
          control={memberForm.control}
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
                      {accounts.map((account) => (
                        <SelectItem
                          key={account.ID}
                          value={account.ID.toString()}
                        >
                          <div className="flex items-center space-x-2">
                            <span
                              className={cn(
                                "w-2 h-2 rounded-full mr-2",
                                formatTownhall(account.townhall)
                              )}
                            ></span>
                            TH {account.townhall} | {account.username}
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
          control={memberForm.control}
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
          control={memberForm.control}
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
        <div className="flex justify-center ">
          <Button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            <FileInput className="mr-2" />
            {member ? "Update Member" : "Create Member"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
