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
    }
  );
  const data = await books.json();
  console.log(data, "DATA");
  return (
    <>
      <div>All Books will be displayed here</div>
      {data.response.items.map((book: any, index: any) => (
        <div key={index}>
          <Card>
            <CardHeader>
              <CardTitle>{book.name}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
              <CardContent>
                <img src={book.src} alt="book" />
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      ))}
    </>
  );
};

export default page;
