import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs";
import { SummaryForm } from "./components/SummaryForm";
import LoginButton from "./components/login-button";
import SummaryCard from "./components/summary-card";

interface BookIdPageProps {
  params: {
    bookId: string;
  };
}

const page = async ({ params }: BookIdPageProps) => {
  const { userId } = auth();

  // if (!userId) {
  //   return redirectToSignIn();
  // }

  const idInInt = Number(params.bookId);

  const books = await fetch(
    `${process.env.NEXT_PUBLIC_OUTERBASE_SECRET}/getBookById?id=${idInInt}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log(books, "BOOKS");
  const data = await books.json();
  console.log(data.response, "DATA");

  if (data.response === null) {
    return <h1>No Info Found</h1>;
  }

  const summary = await fetch(
    `${process.env.OUTERBASE_SECRET}/getSummaryByBookId?book_id=${idInInt}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log(summary, "SUMMARY");
  const summar = await summary.json();
  console.log(summar.response, "Summaries");

  const avgRating = await fetch(
    `https://middle-indigo.cmd.outerbase.io/averageRatingofSummariesByBookId?book_id=${idInInt}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
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
      <div className="flex flex-col lg:flex-row w-full justify-evenly mb-10">
        <div className="w-full lg:w-1/3">
          {data.response.items.map((book: any, index: any) => (
            <Card key={index}>
              <CardHeader className="">
                <CardTitle className="text-base">{book.name}</CardTitle>
                <CardDescription>
                  By {book.author} <Separator className="my-2" />
                  {generateStars(Math.round(avg_rating.response.items[0].avg))} ({Math.round(avg_rating.response.items[0].avg)}/5)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img src={book.src} alt="book" />
                <p className="mt-3">{book.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="w-full lg:w-2/3 lg:mx-[5vw]">
          <div>
            {" "}
            {userId ? (
              <SummaryForm book_id={idInInt.toString()} />
            ) : (
              <div className="flex items-center justify-center my-5">
                <LoginButton />
              </div>
            )}
         </div>
          <div className="space-y-4">
            {summar.response.items.slice().reverse().map((summary: any) => (
              <SummaryCard
                id={summary.id}
                title={summary.title}
                content={summary.content}
                user_name={summary.user_name}
                createdAt={summary.createdAt}
                user_id={summary.user_id}
                key={summary.id}
                rating={summary.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
