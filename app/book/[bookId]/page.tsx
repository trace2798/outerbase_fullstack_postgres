import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prismadb from "@/lib/prismadb";
import { formatTimeToNow } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { SummaryForm } from "./components/SummaryForm";
import LoginButton from "./components/login-button";

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
    `https://middle-indigo.cmd.outerbase.io/getBookById?id=${idInInt}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await books.json();
  console.log(data.response, "DATA");

  // const book = await prismadb.book.findUnique({
  //   where: {
  //     id: idInInt,
  //     // user_id: userId,
  //   },
  // });
  if (data.response === null) {
    return <h1>No Info Found</h1>;
  }
  const summaries = await prismadb.summary.findMany({
    where: {
      book_id: idInInt,
    },
  });

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full justify-evenly mb-10">
        <div className="w-full lg:w-1/3">
          {data.response.items.map((book: any, index: any) => (
            <Card key={index}>
              <CardHeader className="">
                <CardTitle className="text-base">{book.name}</CardTitle>
                <CardDescription>By {book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={book.src} alt="book" />
                <p className="mt-5">{book.description}</p>
              </CardContent>
            </Card>
          ))}
          {/* <Card>
            <CardHeader className="">
              <CardTitle className="text-base">{book.name}</CardTitle>
              <CardDescription>By {book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={book.src} alt="book" />
              <p className="mt-5">{book.description}</p>
            </CardContent>
          </Card> */}
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
            {/* {userId && <SummaryForm book_id={idInInt.toString()} />} */}
            {/* <SummaryForm book_id={book.id.toString()} /> */}
          </div>
          <div className="space-y-4">
            {summaries.map((summary) => (
              <Card key={summary.id} className="w-full">
                <CardHeader>
                  <CardTitle className="text-base">{summary.title}</CardTitle>
                  <CardDescription>
                    By {summary.user_name} {formatTimeToNow(summary.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mt-5">{summary.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
