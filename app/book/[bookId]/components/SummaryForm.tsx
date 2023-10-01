"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  book_id: z.string().min(1, {
    message: "Book id is required.",
  }),
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  user_name: z.string().min(1, {
    message: "User name is required.",
  }),
  rating: z.string(),
});

export const SummaryForm = ({ book_id }: { book_id: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  //console.log(user);
  //console.log(book_id);
  //console.log(user?.firstName);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      user_id: user?.id,
      book_id: book_id,
      title: "",
      user_name: user?.firstName ?? "Anonymous",
      rating: "4",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //console.log(values);
      await fetch(
        `${process.env.NEXT_PUBLIC_OUTERBASE_SECRET}/publishASummaryBasedOnBookId`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            user_id: values.user_id,
            content: values.content,
            book_id: values.book_id,
            title: values.title,
            user_name: values.user_name,
            rating: values.rating,
          }),
        }
      );
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
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1-5)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How many point will you give this book?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
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
              Publish Summary
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
