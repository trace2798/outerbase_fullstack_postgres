import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import TabBookList from "./components/tab-books-list";
import TabSummaryList from "./components/tab-summary-list";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }
  const books = await prismadb.book.findMany({
    where: {
      user_id: userId,
    },
  });
  const summaries = await prismadb.summary.findMany({
    where: {
      user_id: userId,
    },
  });
  console.log(summaries, "SUMMARIES");
  return (
    <>
      <div className="pt-24 flex mx-[10vw] flex-col w-fit justify-center items-center">
        <h1 className="mb-10 text-2xl">
          Here you can view all the books in your collection and all the
          summaries/reviews you have posted
        </h1>
        <Tabs defaultValue="account" className="w-full mx-[10vw] mb-10">
          <TabsList>
            <TabsTrigger value="books">Books you published</TabsTrigger>
            <TabsTrigger value="summaries">Your Summaries/Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="books" className="space-y-4">
            {books.map((book, index) => (
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
            {summaries.map((summary, index) => (
              <div key={index} className="">
                <TabSummaryList
                  content={summary.content}
                  title={summary.title}
                  id={summary.id}
                  createdAt={summary.createdAt}
                  book_id={summary.book_id}
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
