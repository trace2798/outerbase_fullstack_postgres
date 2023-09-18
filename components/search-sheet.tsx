"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Empty } from "./empty";
import { Loader } from "./loader";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/use-toast";

type PromptFormValues = {
  query: string;
  model: string;
  documents: (object | string)[];
  top_n: number;
  return_documents: boolean;
};

type ReRankDocument = {
  text: string;
  id: string;
  name: string;
};

type ReRankResponse = {
  id: string;
  results: Array<{
    document: ReRankDocument;
    index: number;
    relevance_score: number;
  }>;
  meta: {
    api_version: {
      version: string;
    };
  };
};

export function SearchSheet() {
  const { toast } = useToast();
  const [results, setResults] = useState<ReRankResponse[]>([]);

  const form = useForm<PromptFormValues>({
    // resolver: zodResolver(textSchema),
    defaultValues: {
      query: "",
      model: "rerank-english-v2.0",
      documents: [],
      return_documents: true,
      top_n: 4,
    },
  });

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      const books = await fetch(
        `https://middle-indigo.cmd.outerbase.io/getAllBooks`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          cache: "no-cache",
        }
      );
      const data = await books.json();
      console.log(data, "RERANK DATA");
      // const documentsArray = data.response.items.map(
      //   (item: any) => item.description
      // );
      const documentsArray = data.response.items.map((item: any) => {
        return {
          text: item.description,
          id: item.id,
          name: item.name,
        };
      });

      console.log(documentsArray, "DOCS ARRAY");
      values.documents = documentsArray;
      console.log(values, "TOKEN ARRAY");
      const response = await axios.post("/api/search", {
        values, // Use the converted tokens array
      });

      setResults((current) => [...current, response.data]);
      console.log(response.data);
      toast({
        title: "Success",
        description: "Click to visit the page",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error!",
        description: "Request could not be completed.",
        variant: "destructive",
      });
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Semantic search with AI</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Search Book</SheetTitle>
          <SheetDescription>
            Search made possible with Co.ReRank API
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
              >
                {" "}
                <FormField
                  name="query"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="p-0 m-0">
                        <Input
                          className="w-full pl-3 border border-primary-foreground focus-visible:ring-0 focus-visible:ring-transparent "
                          disabled={isLoading}
                          placeholder="Enter the search query"
                          {...field}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="col-span-12 p-5 mt-5 w-fit lg:col-span-12"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Search
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <SheetFooter></SheetFooter>
        <div className="w-full space-y-4 md:mt-0">
          {isLoading && (
            <div className="flex items-center justify-center w-full p-3 ml-5 rounded-lg w-fill bg-muted">
              <Loader description="Cohere is searching your query." />
            </div>
          )}
          {results.length === 0 && !isLoading && (
            <Empty label="Search the site" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {results.map((result, resultIndex) => (
              <div
                key={resultIndex}
                className={cn(
                  "w-fill flex flex-col items-center rounded-lg",
                  "dark:bg-zinc-900 border border-black/10"
                )}
              >
                {result.results.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={cn(
                      " p-2 w-full flex items-start justify-center rounded-lg",
                      "dark:bg-zinc-900 border border-black/10"
                    )}
                  >
                    <div className="flex-col text-left">
                      <Link href={`/book/${item.document.id}`}>
                        {item.document && (
                          <p className="text-sm">
                            <span className="text-indigo-600 underline "></span>{" "}
                            <span className="text-base hover:text-indigo-400">
                              {" "}
                              {item.document.name}
                            </span>
                            <span className="text-base line-clamp-2 mt-1">
                              {" "}
                              {item.document.text}
                            </span>
                          </p>
                        )}
                        <p className="text-sm">
                          <span className="text-indigo-500 underline ">
                            Relevance Score:
                          </span>{" "}
                          <span className="text-base">
                            {item.relevance_score}
                          </span>
                        </p>
                        <Separator className="my-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
