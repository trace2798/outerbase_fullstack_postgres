import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UseChatHelpers } from "ai/react";
import { ArrowRight } from "lucide-react";

const exampleMessages = [
  {
    heading: "Ask you data a question",
    message: `How many books have I added?`,
  },
  {
    heading: "Ask about books you have added",
    message: "What are the names of the books I have added?",
  },
];

export function EmptyStateAI({ setInput }: Pick<UseChatHelpers, "setInput">) {
  return (
    <>
      <Card
        className="p-5 bg-muted
          "
      >
        <div className="flex flex-col items-center w-full justify-center">
          <p className="w-full mt-3">
            {" "}
            Not custom trained on this data so response likely to hallucinate.
          </p>
          <p className="w-full mt-3">
            The data for the answers have been fetch using Outerbase Commands.
          </p>
        </div>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <ArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </Card>
    </>
  );
}
