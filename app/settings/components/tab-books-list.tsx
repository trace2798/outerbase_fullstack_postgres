import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatTimeToNow } from "@/lib/utils";
import { FC } from "react";
import BookCard from "./book-card";

interface TabBookListProps {
  name: string;
  src: string;
  description: string;
  author?: string;
  createdAt: Date;
  id: number;
}

const TabBookList: FC<TabBookListProps> = async ({
  name,
  src,
  description,
  author,
  createdAt,
  id,
}) => {
  const dateObject = new Date(createdAt);
  const avgRating = await fetch(
    `https://middle-indigo.cmd.outerbase.io/averageRatingofSummariesByBookId?book_id=${id}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const avg_rating = await avgRating.json();
  console.log(avg_rating, "AVG_RATING");

  const generateStars = (rating: number) => {
    let stars = "";
    for (let i = 0; i < rating; i++) {
      stars += "⭐";
    }
    return stars;
  };
  return (
    <>
    <BookCard author={author} name={name} description={description} src={src} avg_rating={avg_rating.response.items[0].avg} createdAt={createdAt} id={id} />
      {/* <Card className="w-full flex flex-col lg:flex-row ">
        <CardHeader className="">
          <CardTitle className="text-base">{name}</CardTitle>
          <CardDescription>
            By {author} &nbsp; 
            {formatTimeToNow(dateObject)} 
            <br/>
            <h1 className="my-2">{generateStars(Math.round(avg_rating.response.items[0].avg))} ({Math.round(avg_rating.response.items[0].avg)}/5)</h1>
          </CardDescription>
          <div className="md:w-[350px]">
            <img src={src} alt="book" className="" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="mt-3">{description}</p>
        </CardContent>
      </Card> */}
    </>
  );
};

export default TabBookList;
