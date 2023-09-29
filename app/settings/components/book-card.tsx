"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimeToNow } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

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
            <h1 className="text-red-500">
              Book Id: {id} (Required for Image change request)
            </h1>
          </CardDescription>
          <div className="md:w-[250px]">
            <img src={src} alt="book" className="" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-5">
            <Link href="/settings/requestForm">
              <Button variant="ghost" className="font-satoshiMedium">
                Change Image Form
              </Button>
            </Link>
          </div>
          <p className="mt-3 font-ranadeLight">{description}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default BookCard;
