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
  console.log(data);
  return (
    <>
      <div>All Books will be displayed here</div>
    </>
  );
};

export default page;
