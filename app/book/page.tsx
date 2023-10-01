import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const books = await fetch(`${process.env.OUTERBASE_SECRET}/getAllBooks`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    cache: "no-cache",
  });
  const data = await books.json();
  //console.log(data, "DATA");
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
        {data.response.items.map((book: any, index: any) => (
          <Card key={index} className="max-w-sm">
            <Link href={`/book/${book.id}`}>
              <CardHeader>
                <CardTitle className="text-base font-ranadeLight">
                  {book.name}
                </CardTitle>
                <CardDescription>By {book.author}</CardDescription>
                <CardContent>
                  <img src={book.src} alt="book" />
                </CardContent>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
};

export default page;
