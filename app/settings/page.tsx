import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { FC } from "react";
import TabBookList from "./components/tab-books-list";
import TabSummaryList from "./components/tab-summary-list";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }
  const bookByUserId = await fetch(
    `https://middle-indigo.cmd.outerbase.io/getBooksByUserId?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  //console.log(bookByUserId, "OUTERBASE COMMAND");
  const books = await bookByUserId.json();

  const summariesByUserId = await fetch(
    `https://middle-indigo.cmd.outerbase.io/getSummariesByUserId?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  //console.log(summariesByUserId, "OUTERBASE COMMAND Summary");
  //console.log(books, "BOOKS");
  const summaries = await summariesByUserId.json();
  return (
    <>
      <div className="pt-12 flex mx-[5vw] flex-col w-fit justify-center items-center">
        <h1 className="mb-10 text-2xl">
          Here you can view all the books you have added and all the
          summaries/reviews you have posted
        </h1>
        <Tabs defaultValue="account" className="w-full mx-[10vw] mb-10">
          <TabsList>
            <TabsTrigger value="books">Books you added</TabsTrigger>
            <TabsTrigger value="summaries">Your Summaries/Reviews</TabsTrigger>
          </TabsList>
          <TabsContent
            value="books"
            className="space-y-4 space-x-4 grid grid-cols-1 lg:grid-cols-2"
          >
            {books.response.items.map((book: any, index: any) => (
              <div key={index} className="">
                <TabBookList
                  src={book.src}
                  name={book.name}
                  author={book.author ?? ""}
                  description={book.description}
                  id={book.id}
                  createdAt={book.createdAt}
                />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="summaries" className="space-y-4">
            {summaries.response.items.map((summary: any, index: any) => (
              <div key={index} className="">
                <TabSummaryList
                  content={summary.content}
                  title={summary.title}
                  id={summary.id}
                  createdAt={summary.createdAt}
                  book_id={summary.book_id}
                  rating={summary.rating}
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default page;
