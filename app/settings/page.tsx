import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import TabBookList from "./components/tab-books-list";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const { userId } = auth();
  const books = await prismadb.book.findMany({
    where: {
      user_id: userId,
    },
  });
  return (
    <>
      <div className="pt-24 flex w-full justify-center">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="books">Books you published</TabsTrigger>
            <TabsTrigger value="summaries">Your Summaries/Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="books">
            {books.map((book, index) => (
              <div key={index}>
               <TabBookList src={book.src} name={book.name} author={book.author ?? ""} description={book.description} id={book.id} createdAt={book.createdAt}/>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="summaries">
            Summaries/Reviews you wrote
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default page;
