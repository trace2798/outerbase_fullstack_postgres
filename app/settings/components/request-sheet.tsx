"use client";
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/image-upload";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { formatTimeToNow } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

interface RequestSheetProps {
  src: string;
  name: string;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  src: z.string().min(1, {
    message: "Image is required.",
  }),
  user_id: z.string().min(1, {
    message: "User id is required.",
  }),
  user_name: z.string().min(1, {
    message: "User name is required.",
  }),
  change_image: z.string().min(1, {
    message: "Image is required.",
  }),
});

const RequestSheet: FC<RequestSheetProps> = ({ src, name }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      src: src,
      user_id: user?.id ?? "Anomynous",
      user_name: user?.firstName ?? "Anomynous",
      change_image: "",
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
            src: values.src,
            change_image: values.change_image,
          }),
        }
      );
      // console.log(response);
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
      //         author: values.author,
      //         name: values.name,
      //         user_name: values.user_name,
      //       }),
      //     }
      //   );
      toast({
        description: "Success.",
        duration: 3000,
      });
      router.refresh();
      router.push("/book");
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-24 border rounded-lg md:px-4 focus-within:shadow-sm"
        >
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
          <div className="w-full mt-24 flex justify-center">
            <Button size="lg" disabled={isLoading}>
              Submit Form
              {/* <Wand2 className="w-4 h-4 ml-2" /> */}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RequestSheet;
