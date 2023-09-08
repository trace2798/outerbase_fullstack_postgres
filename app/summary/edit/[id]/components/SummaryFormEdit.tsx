"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Content is required.",
  }),
  user_id: z.string().min(1, {
    message: "User id is required.",
  }),
  book_id: z.number().min(1, {
    message: "Book id is required.",
  }),
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  user_name: z.string().min(1, {
    message: "User name is required.",
  }),
  id: z.number().min(1, {
    message: "id is required.",
  }),
});

export const SummaryFormEdit = ({
  content,
  user_id,
  book_id,
  title,
  user_name,
  id,
}: {
  book_id: number;
  content: string;
  user_id: string;
  title: string;
  user_name: string;
  id: number;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  console.log(user);
  console.log(book_id);
  console.log(user?.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
      user_id: user_id ?? user?.id,
      book_id: book_id as unknown as number,
      title: title,
      user_name: user_name ?? user?.firstName,
      id: id,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // await fetch(`${process.env.OUTERBASE_SECRET}/updateSummaryByIdPut`, {
      //   method: "PUT",
      console.log(values);
      await fetch(`${process.env.OUTERBASE_SECRET}/updateSummaryById`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          user_id: values.user_id,
          content: values.content,
          book_id: values.book_id,
          title: values.title,
          user_name: values.user_name,
          id: values.id,
        }),
      });

      toast({
        description: "Success.",
        duration: 3000,
      });
      form.reset();
      router.refresh();
      router.push(`/book/${book_id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="text-lg font-medium">Add a summary/review</h3>
              <p className="text-sm text-muted-foreground">
                Add your summary/review to begin discussion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="A read of a lifetime"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Title for your summary/review
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Summary/Review</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="The Wonderful Wizard of Oz is about"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Summary/Review of the book.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <Separator className="bg-primary/10" />
          </div>

          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              Update Summary/Review
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
