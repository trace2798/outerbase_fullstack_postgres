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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { formatTimeToNow } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
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
  rating: number;
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
  rating,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const id_to_delete = id;
  const { user } = useUser();
  const dateObject = new Date(createdAt);
  const onDelete = async () => {
    try {
      // await axios.delete(`/api/summary/${id}`);
      // console.log(id_to_delete);
      //this is the command to every all summaries by userId
      console.log(id_to_delete, "inside delete");
      await fetch(
        `${process.env.NEXT_PUBLIC_OUTERBASE_SECRET}/deleteSummaryById`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: id.toString(),
          }),
        }
      );
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
  const generateStars = (rating: number) => {
    let stars = "";
    for (let i = 0; i < rating; i++) {
      stars += "⭐";
    }
    return stars;
  };
  return (
    <>
      <Card className="">
        <CardHeader className="">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-base font-satoshiBlack">
                {title}
              </CardTitle>
              <CardDescription>
                {formatTimeToNow(dateObject)} <br />
                {data.response.items.map((book: any, index: any) => (
                  <Link
                    href={`/book/${book.id}`}
                    key={index}
                    className="hover:text-indigo-400"
                  >
                    On: {book.name}
                  </Link>
                ))}
              </CardDescription>
              <h1 className="mt-2"> {generateStars(Number(rating))}</h1>
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
                  <Link href={`/summary/edit/${id}`}>
                    {" "}
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-ranadeRegular">{content}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default SummaryCard;
