"use client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimeToNow } from "@/lib/utils";
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

interface BookCardProps {
  createdAt: Date;
  description: string;
  id: number;
  name: string;
  src: string;
  author: string | undefined;
  avg_rating: any;
}

const BookCard: FC<BookCardProps> = ({
  createdAt,
  description,
  id,
  name,
  src,
  author,
  avg_rating,
}) => {
  const generateStars = (rating: number) => {
    let stars = "";
    for (let i = 0; i < rating; i++) {
      stars += "⭐";
    }
    return stars;
  };
  const dateObject = new Date(createdAt);
  return (
    <>
      <Card className="w-full flex flex-col lg:flex-row ">
        <CardHeader className="">
          <CardTitle className="text-base">{name}</CardTitle>
          <CardDescription>
            By {author} &nbsp;
            {formatTimeToNow(dateObject)}
            <br />
            <h1 className="my-2">
              {generateStars(Math.round(avg_rating))} ({Math.round(avg_rating)}
              /5)
            </h1>
          </CardDescription>
          <div className="md:w-[350px]">
            <img src={src} alt="book" className="" />
          </div>
        </CardHeader>
        <CardContent>
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
              <DropdownMenuContent align="end" className="w-[200px]">
                <Link href={`/summary/edit/${id}`}>
                  {" "}
                  <DropdownMenuItem>Request Image Change</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="mt-3">{description}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default BookCard;
