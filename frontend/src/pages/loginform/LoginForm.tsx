import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import useLoginMutation from "@/hooks/useLoginMutation";

export default function LoginForm() {
  const login = useLoginMutation();

  const formSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    login(data);
  };

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={loginForm.control}
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
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
