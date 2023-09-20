// "use client";

// import axios from "axios";
// import { useRouter } from "next/navigation";
// // import { ChatCompletionRequestMessage } from "openai";
// import { ElementRef, useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// // import { Heading } from "@/components/heading";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { UserAvatar } from "@/components/user-avatar";
// import { cn } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Empty } from "@/components/empty";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useTheme } from "next-themes";
// import { BeatLoader } from "react-spinners";
// import { BotAvatar } from "./components/bot-avatar";
// import { formSchema } from "./constants";

// const ConversationPage = () => {
//   const router = useRouter();
//   const { theme } = useTheme();
//   const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
//   const scrollRef = useRef<ElementRef<"div">>(null);
//   useEffect(() => {
//     scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages.length]);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: "",
//     },
//   });

//   const isLoading = form.formState.isSubmitting;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const userMessage: ChatCompletionRequestMessage = {
//         role: "user",
//         content: values.prompt,
//       };
//       const newMessages = [...messages, userMessage];

//       const response = await axios.post("/api/aichat", {
//         messages: newMessages,
//       });
//       setMessages((current) => [...current, userMessage, response.data]);

//       form.reset();
//     } catch (error: any) {
//       if (error?.response?.status === 403) {
//       } else {
//         // toast.error("Something went wrong.");
//       }
//     } finally {
//       router.refresh();
//     }
//   };

//   return (
//     <div>
//       <div className="px-4 lg:px-8 flex flex-col">
//         <ScrollArea className="space-y-4 mt-4">
//           {messages.length === 0 && !isLoading && (
//             <Empty label="No conversation started." />
//           )}
//           <div className="flex flex-col-reverse gap-y-4">
//             {/* {[...messages]
//               .slice()
//               .reverse()
//               .map((message) => (
//                 <div
//                   key={message.content}
//                   className={cn(
//                     "p-8 w-full flex items-start gap-x-8 rounded-lg",
//                     message.role === "user"
//                       ? "bg-muted-foreground border border-black/10 max-w-sm"
//                       : "bg-muted max-w-sm"
//                   )}
//                 >
//                   {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
//                   <p className="text-sm">{message.content}</p>
//                 </div>
//               ))} */}
//             {[...messages]
//               .slice()
//               .reverse()
//               .map((message) => (
//                 <div
//                   key={message.content}
//                   className={cn(
//                     "p-4 w-full flex items-start gap-x-8 rounded-lg max-w-lg",
//                     message.role === "user"
//                       ? "self-end bg-muted-foreground border border-black/10"
//                       : "self-start bg-muted"
//                   )}
//                 >
//                   {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
//                   <p className="text-sm">{message.content}</p>
//                 </div>
//               ))}
//           </div>
//         </ScrollArea>
//         <div ref={scrollRef} />
//         {isLoading && (
//           <div className="p-4 rounded-lg w-1/2 flex items-center justify-center bg-muted mt-10">
//             <BeatLoader
//               color={theme === "light" ? "black" : "white"}
//               size={5}
//             />
//           </div>
//         )}
//         <div className="my-10 ">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="
//                 rounded-lg
//                 border
//                 w-full
//                 p-4
//                 px-3
//                 md:px-6
//                 focus-within:shadow-sm
//                 grid
//                 grid-cols-12
//                 gap-2
//               "
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-10">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                         disabled={isLoading}
//                         placeholder="Ask your data. It will only respond based on the data you have added."
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 className="col-span-12 lg:col-span-2 w-full"
//                 type="submit"
//                 disabled={isLoading}
//                 size="icon"
//               >
//                 Ask AI
//               </Button>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversationPage;
"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { useTheme } from "next-themes";
import { ElementRef, useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";
import { EmptyStateAI } from "./components/empty";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    data,
    isLoading,
    setInput,
  } = useChat();
  const { theme } = useTheme();
  const scrollRef = useRef<ElementRef<"div">>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.length > 0 ? (
        messages.map((m) => (
          <div
            key={m.id}
            className={cn("whitespace-pre-wrap", {
              "text-blue-500 text-right p-4  gap-x-8 rounded-lg max-w-lg ":
                m.role === "user",
              "text-green-500 p-4 w-full flex items-start gap-x-8 rounded-lg max-w-lg bg-muted":
                m.role !== "user",
            })}
          >
            {m.role === "user" ? "" : ""}
            {m.content}
          </div>
        ))
      ) : (
        <>
          <EmptyStateAI setInput={setInput} />
        </>
      )}
      <form onSubmit={handleSubmit}>
        {isLoading && (
          <div className="p-4 rounded-lg w-1/2 flex items-center justify-center bg-muted mt-10">
            <BeatLoader
              color={theme === "light" ? "black" : "white"}
              size={5}
            />
          </div>
        )}
        <div ref={scrollRef} />
        <Input
          className="fixed bottom-0 w-[80vw] md:w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Talk to your data..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
