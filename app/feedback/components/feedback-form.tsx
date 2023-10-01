"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { MessageCircle } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  feedback: z.string().min(5),
  sentiment: z.string(),
  // feedback_identifier: z.string(),
});

interface FeedbackFormProps {}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
      sentiment: "null",
      // feedback_identifier: uuidv4(),
    },
  });

  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      //console.log(values);
      //   await axios.post(`/api/feedback`, values);
      await fetch("https://middle-indigo.cmd.outerbase.io/addFeedback", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          feedback: values.feedback,
          sentiment: values.sentiment,
          // feedback_identifier: values.feedback_identifier,
        }),
      });
      form.reset();
      toast({
        title: "Feedback successfully submitted",
        description: "Thank you for your feedback.",
        variant: "default",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          return toast({
            title: "Too many request.",
            description: "Try in an hour.",
            variant: "default",
          });
        }
      } else {
        console.error(error);
        toast({
          title: "Failed to submit feedback",
          description: "Make sure all fields are filled up.",
          variant: "destructive",
        });
      }
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <div className="fixed right-10 bottom-16">
        <Dialog>
          <DialogTrigger>
            {/* <MessageCircle className="w-10 h-10 text-zinc-700 dark:text-neutral-300" /> */}
            <Button variant="outline">Send a Feedback</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Feedback Form</DialogTitle>
              <DialogDescription>
                Data collected for sentimental analysis of feedback
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-lg grid-cols-12 gap-2 px-2 py-4 mt-5 border rounded-lg md:px-4 focus-within:shadow-sm"
              >
                <FormLabel className="mt-3">Feedback</FormLabel>
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Your feedback/message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="mt-5 w-fit"
                  disabled={isLoading || !form.formState.isValid}
                >
                  Submit
                </Button>
              </form>
            </Form>
            <Button className="w-full mt-10" variant="ghost">
              <DialogClose>Close Dialog</DialogClose>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
