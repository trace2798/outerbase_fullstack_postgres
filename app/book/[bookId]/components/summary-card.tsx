"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimeToNow } from "@/lib/utils";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface SummaryCardProps {
  id: number;
  user_name: string;
  title: string;
  createdAt: Date;
  content: string;
  user_id: string;
  rating: string;
}

const SummaryCard: FC<SummaryCardProps> = ({
  id,
  user_name,
  title,
  createdAt,
  content,
  user_id,
  rating,
}) => {
  const { user } = useUser();
  const dateObject = new Date(createdAt);
  const router = useRouter();
  const { toast } = useToast();
  const onDelete = async () => {
    try {
      // await axios.delete(`/api/summary/${id}`);
      // console.log(id_to_delete);
      //this is the command to every all summaries by userId
      // console.log(id_to_delete, "inside delete");
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
      // router.push("/settings");
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
      <Card key={id} className="w-full">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-base capitalize">{title}</CardTitle>
              <CardDescription>
                By {user_name} {formatTimeToNow(dateObject)} <br />{" "}
                <h1 className="my-2"> {generateStars(Number(rating))}</h1>
              </CardDescription>
              {/* {data.response.items.map((book: any, index: any) => (
                <div key={index}>On: {book.name}</div>
              ))} */}
            </div>
            <div>
              {user_id === user?.id && (
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
                      <Link
                        href={`/summary/edit/${id}`}
                        className="hover:cursor-pointer"
                      >
                        <DropdownMenuItem className="hover:cursor-pointer">
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onDelete}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="normal-case">{content}</CardContent>
      </Card>
    </>
  );
};

export default SummaryCard;
