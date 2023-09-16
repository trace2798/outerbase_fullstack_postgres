"use client";
import { FC } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";

import { ImageUpload } from "@/components/image-upload";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface pageProps {}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  change_image: z.string().min(1, {
    message: "Image is required.",
  }),
  user_id: z.string().min(1, {
    message: "User id is required.",
  }),
  user_name: z.string().min(1, {
    message: "User name is required.",
  }),
  change_id: z.string().min(1, {}),
});

const page: FC<pageProps> = ({}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      change_image: "",
      user_id: user?.id ?? "Anomynous",
      user_name: user?.firstName ?? "Anomynous",
      change_id: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_OUTERBASE_SECRET}/requestForm`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            user_id: values.user_id,
            name: values.name,
            user_name: values.user_name,
            change_image: values.change_image,
            change_id: values.change_id,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.description);
      }

      //   await fetch(
      //     `${process.env.NEXT_PUBLIC_OUTERBASE_SECRET}/sendEmailWithResend`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "content-type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         user_id: values.user_id,
      //         name: values.name,
      //         user_name: values.user_name,
      //         change_image: values.change_image,
      //         change_id: values.change_id,
      //       }),
      //     }
      //   );
      toast({
        description: "Success.",
        duration: 3000,
      });
      router.refresh();
      router.push("/settings");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Outerbase Error" || "Something went wrong.",
        duration: 3000,
      });
    }
  };
  return (
    <>
      <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
          >
            <div className="space-y-2 w-full col-span-2">
              <div>
                <h3 className="text-lg font-medium">General Information</h3>
                <p className="text-sm text-muted-foreground">
                  Add a book to begin discussion
                </p>
              </div>
              {/* <Separator className="bg-primary/10" /> */}
            </div>
            <FormField
              name="change_id"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Book Id number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="1, 2 etc"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Id Number of the book</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name of the book</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="1, 2 etc"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Name of the book</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="change_image"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-center">
              <Button size="lg" disabled={isLoading}>
                Send request
                {/* <Wand2 className="w-4 h-4 ml-2" /> */}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default page;
