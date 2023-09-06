import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const books = await fetch(
    "https://middle-indigo.cmd.outerbase.io/getAllBooks",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
    }
  );
  const data = await books.json();
  console.log(data, "DATA");
  return (
    <>
      <div className="flex justify-center items-center">
        {data.response.items.map((book: any, index: any) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>{book.name}</CardTitle>
                <CardDescription>By {book.author}</CardDescription>
                <CardContent>
                  <img src={book.src} alt="book" />
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
