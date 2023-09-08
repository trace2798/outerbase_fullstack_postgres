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

interface SummaryCardProps {
  id: number;
  user_name: string;
  title: string;
  createdAt: Date;
  content: string;
  user_id: string;
}

const SummaryCard: FC<SummaryCardProps> = ({
  id,
  user_name,
  title,
  createdAt,
  content,
  user_id
}) => {
  const { user } = useUser();
  return (
    <>
      <Card key={id} className="w-full">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>By {user_name} {formatTimeToNow(createdAt)}</CardDescription>
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
                      <DropdownMenuItem>
                        <Link href={`/summary/edit/${id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => console.log("Delete")}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mt-5">{content}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default SummaryCard;