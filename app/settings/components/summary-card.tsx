"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { formatTimeToNow } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface SummaryCardProps {
  title: string;
  content: string;
  createdAt: Date;
  id: number;
  data: Data;
}
interface Data {
  response: {
    items: Book[];
  };
}
interface Book {
  name: string;
}

const SummaryCard: FC<SummaryCardProps> = ({
  title,
  content,
  createdAt,
  id,
  data,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const id_to_delete = id;
  const { user } = useUser();
  const onDelete = async () => {
    try {
      // await axios.delete(`/api/summary/${id}`);
      // console.log(id_to_delete);
      //this is the command to every all summaries by userId
      console.log(id_to_delete, "inside delete")
      await fetch(`${process.env.NEXT_PUBLIC_OUTERBASE_SECRET}/deletedAllSummaryById?summary_id=${id_to_delete}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: id_to_delete,
        }),
      });
      toast({
        description: "Success.",
      });
      router.refresh();
      router.push("/settings");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    }
  };
  return (
    <>
      <Card className="">
        <CardHeader className="">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{formatTimeToNow(createdAt)}</CardDescription>
              {data.response.items.map((book: any, index: any) => (
                <div key={index}>On: {book.name}</div>
              ))}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem>
                    <Link href={`/summary/edit/${id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="">{content}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default SummaryCard;
