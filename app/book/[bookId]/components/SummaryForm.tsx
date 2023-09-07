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

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Name is required.",
  }),
  user_id: z.string().min(1, {
    message: "User id is required.",
  }),
  book_id: z.string().min(1, {
    message: "User name is required.",
  }),
});

export const SummaryForm = ({ book_id }: { book_id: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  console.log(user);
  console.log(book_id);
  console.log(user?.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      user_id: user?.id,
      book_id: book_id,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      await fetch(
        "https://middle-indigo.cmd.outerbase.io/publishASummaryBasedOnBookId",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            user_id: values.user_id,
            content: values.content,
            book_id: values.book_id,
          }),
        }
      );
      toast({
        description: "Success.",
        duration: 3000,
      });
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
              <h3 className="text-lg font-medium">Add a summary</h3>
              <p className="text-sm text-muted-foreground">
                Add your summary/review to begin discussion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <div className="grid grid-cols-1 gap-4">
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
              Publish Summary
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
