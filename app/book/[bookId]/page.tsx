import { FC } from "react";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SummaryForm } from "./components/SummaryForm";

interface BookIdPageProps {
  params: {
    bookId: string;
  };
}

const page = async ({ params }: BookIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const idInInt = Number(params.bookId);

  const book = await prismadb.book.findUnique({
    where: {
      id: idInInt,
      user_id: userId,
    },
  });
  if (book === null) {
    return <h1>No Info Found</h1>;
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center max-md:items-center lg:justify-between">
        <Card className="max-w-lg">
          <CardHeader className="">
            <CardTitle className="text-base">{book.name}</CardTitle>
            <CardDescription>By {book.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={book.src} alt="book" />
            <p className="mt-5">{book.description}</p>
          </CardContent>
        </Card>
        <SummaryForm book_id={book.id.toString()} />
      </div>
    </>
  );
};

export default page;
